/* eslint-disable no-empty-pattern */
import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { useWeb3 } from "don-components";
import "./InvestmentsPage.scss";
import { useAxios } from "hooks/useAxios";
import { IMyInvestments } from "./interfaces/IMyInvestments";
import { useNotification } from "components/Notification";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
} from "components/Table";
import { LightGrayButton } from "components/Button";
import { RocketIcon, ZeroInvestmentIcon } from "icons";
import { WithDrawPopup } from "components/WithDrawPopup";
import { useHistory } from "react-router";
import { AxiosResponse } from "axios";
import { MyInvestment } from "components/MyInvestment";
import { getPoolContract } from "helpers";
import { InvestmentBlackBox } from "./InvestmentBlackBox/InvestmentBlackBox";

import { theme } from "theme";
import { TotalProfitLoss } from "components/TotalProfitLoss";

const HeadingTitle = styled.p({
  fontFamily: "Roboto",
  fontSize: "45px",
  fontStyle: "normal",
  fontWeight: 800,
  letterSpacing: "0em",
  textAlign: "left",
  color: "#070602",
});

const ZeroInvestmentBox = styled.div({
  minHeight: 600,
  display: "flex",
  justifyContent: "center",
  position: "relative",
});

const ZeroInvestmentInnerBox = styled.div({
  maxWidth: 599,
});

const ZeroInvestmentContent = styled.div({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 800,
  textAlign: "center",
  fontSize: "50px",
});

const BlackButton = styled(LightGrayButton)({
  fontSize: "16px !important",
  width: "192px !important",
  background: "#222222 !important",
  color: "#fff !important",
  height: "50px !important",
  marginTop: "2rem",
});

const CenteredBox = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

const CustomizeRockerIcon = styled(RocketIcon)({
  position: "absolute",
  left: 0,
  bottom: "-10%",
});

const AnimationDiv = styled.div({
  minHeight: 500,
});

const EmptyTableHeading = styled(TableHeading)`
  min-width: 75px;
`;

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
`;

const CustomTableHeading = styled(TableHeading)`
  text-align: center;
`;

const CustomTableData = styled(TableData)`
  text-align: center;
  cursor: ${(props: { cursor?: string }) =>
    props.cursor ? props.cursor : "auto"};
`;

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Head = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

export const InvestmentsPage = () => {
  const web3 = useWeb3();

  const history = useHistory();

  const [{ data: farmesInvestmentData }, refetch] = useAxios(
    { method: "GET", url: "/api/v2/investments" },
    { useCache: false, manual: true }
  );

  const [{}] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );
  const [loading, setLoading] = useState(true);
  const [myInvestments, setMyInvestments] = useState<IMyInvestments[]>([]);

  const [withDraw, setWidthDraw] = useState({
    open: false,
    farmerName: "",
    poolAddress: "",
  });

  const { showNotification } = useNotification();

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((old) => !old);
  };

  useEffect(() => {
    refetch();
    setLoading(true);
  }, [refresh]);

  useEffect(() => {
    if (farmesInvestmentData) {
      const CalInvestments = async () => {
        const investments: IMyInvestments[] = farmesInvestmentData.data;
        const finalInvestments: IMyInvestments[] = [];
        for (let invest of investments) {
          try {
            const contract = await getPoolContract(web3, invest.poolAddress);
            const accounts = await web3.eth.getAccounts();
            const isInvested = await contract.methods
              .isInvestor(accounts[0])
              .call();
            console.log(isInvested, "IsInvested");
            if (isInvested) {
              finalInvestments.push(invest);
            }
          } catch (e) {
            console.error(e);
          }
        }
        setLoading(false);
        setMyInvestments(finalInvestments);
      };
      CalInvestments();
    }
  }, [farmesInvestmentData]);

  const handleSuccess = (farmerName: string) => {
    handleRefresh();
    showNotification({
      msg: (
        <>
          <p className="text-center m-0">{`Money Withdrawn from Farmer ${farmerName} Successfully.`}</p>
        </>
      ),
    });
  };

  const handleError = (response?: AxiosResponse<any>) => {
    let errorMessage = "Could not withdraw Money. An error occurred";
    if (response && response.status === 404) {
      errorMessage =
        "You have already withdraw form this pull or not invested into this pool.";
    }

    showNotification({
      msg: (
        <>
          <p className="text-center m-0">{errorMessage}</p>
        </>
      ),
      type: "error",
    });
  };

  const handleOpenWithDraw =
    (farmerName: string, poolAddress: string) => () => {
      setWidthDraw({
        open: true,
        farmerName: farmerName,
        poolAddress: poolAddress,
      });
    };

  const handleCloseWithDraw = () => {
    setWidthDraw({
      open: false,
      farmerName: "",
      poolAddress: "",
    });
  };

  const handleFindFarmers = () => {
    history.push("/dashboard");
  };

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/farmer/" + poolAddress);
  };

  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <Section>
        <Head className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col lg={6}>
                <HeadingTitle>My Investments</HeadingTitle>
              </Col>
              <Col lg={6}>
                {myInvestments.length > 0 && (
                  <>
                    <InvestmentBlackBox
                      onRefresh={handleRefresh}
                      myInvestments={myInvestments}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Head>
      </Section>
      <section>
        <div className="mt-4 mb-5 tablebgHead">
          <Container>
            {loading && (
              <>
                <AnimationDiv className="d-flex align-items-center justify-content-center">
                  <Spinner animation="border" />
                </AnimationDiv>
              </>
            )}
            {!loading && myInvestments.length > 0 && (
              <TableResponsive>
                <Table>
                  <TableHead>
                    <TableRow isHoverOnRow={false}>
                      <CustomTableHeading>#</CustomTableHeading>
                      <EmptyTableHeading></EmptyTableHeading>
                      <CustomTableHeading>NAME OF FARMER</CustomTableHeading>
                      <CustomTableHeading>BUSD INVESTED</CustomTableHeading>
                      <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>
                      <CustomTableHeading>WITHDRAW BUSD</CustomTableHeading>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myInvestments.map((investment, index) => {
                      return (
                        <TableRow key={index}>
                          <CustomTableData>{index + 1}</CustomTableData>
                          <CustomTableData>
                            <StyledImage src={investment.picture} />
                          </CustomTableData>
                          <CustomTableData
                            cursor="pointer"
                            onClick={RedirectToFarmerProfile(
                              investment.poolAddress
                            )}
                            className="bold"
                          >
                            {investment.name}
                          </CustomTableData>

                          <CustomTableData>
                            {" "}
                            <MyInvestment
                              poolAddress={investment.poolAddress}
                            />
                          </CustomTableData>
                          <CustomTableData className="bold"><TotalProfitLoss refresh={refresh} poolAddress={investment.poolAddress} /></CustomTableData>
                          <CustomTableData className="investment_table_btn">
                            <LightGrayButton
                              onClick={handleOpenWithDraw(
                                investment.name,
                                investment.poolAddress
                              )}
                            >
                              Withdraw
                            </LightGrayButton>
                          </CustomTableData>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableResponsive>
            )}

            {!loading && myInvestments.length === 0 && (
              <>
                <ZeroInvestmentBox>
                  <ZeroInvestmentInnerBox>
                    <ZeroInvestmentContent>
                      Find Some Farmers For Investment
                    </ZeroInvestmentContent>
                    <CenteredBox className="mb-5">
                      <BlackButton onClick={handleFindFarmers}>
                        Find Farmers
                      </BlackButton>
                    </CenteredBox>
                    <CenteredBox className="mt-5">
                      <ZeroInvestmentIcon />
                    </CenteredBox>
                  </ZeroInvestmentInnerBox>
                  <CustomizeRockerIcon />
                </ZeroInvestmentBox>
              </>
            )}
          </Container>
        </div>
      </section>
      <Footer />
      {withDraw.open && (
        <WithDrawPopup
          open={withDraw.open}
          poolAddress={withDraw.poolAddress}
          onSuccess={() => {
            handleSuccess(withDraw.farmerName);
          }}
          onError={handleError}
          onClose={handleCloseWithDraw}
        />
      )}
    </div>
  );
};
