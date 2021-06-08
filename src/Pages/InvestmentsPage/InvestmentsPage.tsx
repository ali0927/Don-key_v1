/* eslint-disable react-hooks/exhaustive-deps */

import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useMemo, useState } from "react";
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
import { ButtonWidget, LightGrayButton } from "components/Button";
import { WithDrawPopup } from "components/WithDrawPopup";
import { useHistory } from "react-router";
import { AxiosResponse } from "axios";
import { MyInitialInvestment, MyInvestment } from "components/MyInvestment";
import { getPoolContract } from "helpers";
import { InvestmentBlackBox } from "./InvestmentBlackBox/InvestmentBlackBox";

import { theme } from "theme";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { GridBackground } from "components/GridBackground";
import { IFarmer } from "interfaces";

const HeadingTitle = styled.p({
  fontFamily: "ObjectSans-Bold",
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

const WithDrawButton = styled(LightGrayButton)`
  border: 0px !important;
`;

const CenteredBox = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
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

  const [loading, setLoading] = useState(true);

  const [{ data }] = useAxios("/api/v2/farmer");

  const farmers: IFarmer[] = useMemo(() => {
    if (data) {
      return data.data.map((item: any) => {
        const farmer: IFarmer = {
          GUID: item.GUID,
          name: `Don - ${item.name}`,
          description: item.description,
          picture: item.picture,
          pool_version: item.pool_version,
          poolAddress: item.poolAddress,
          profit24hours: item.profit24hours || "-",
          profit7days: item.profit7days || "-",
          telegram: item.telegram,
          twitter: item.twitter,
          profit: item.profit || "-",
          descriptionTitle: item.descriptionTitle,
          status: item.status,
          apy: item.strategy.apy,
          strategyImage: item.strategy.strategyImage,
          investors: item.investors,
        };
        return farmer;
      });
    }
    return [];
  }, [data]);
  const [myInvestments, setMyInvestments] = useState<IFarmer[]>([]);

  const [withDraw, setWidthDraw] = useState({
    open: false,
    farmerName: "",
    poolAddress: "",
    pool_version: 1,
  });

  const { showNotification } = useNotification();

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((old) => !old);
  };

  useEffect(() => {
    if (farmers.length > 0) {
      const CalInvestments = async () => {
        const finalInvestments: IFarmer[] = [];
        for (let invest of farmers) {
          try {
            const contract = await getPoolContract(web3, invest.poolAddress, 2);
            const accounts = await web3.eth.getAccounts();
            const isInvested = await contract.methods
              .isInvestor(accounts[0])
              .call();
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
  }, [farmers]);

  const handleSuccess = (farmerName: string) => {
    handleRefresh();
    showNotification({
      msg: (
        <>
          <p className="text-center m-0">{`Money Withdrawn from Farmer ${farmerName} Successfully.`}</p>
        </>
      ),
    });
    handleCloseWithDraw();
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
    (farmerName: string, poolAddress: string, pool_version: number) => () => {
      setWidthDraw({
        open: true,
        farmerName: farmerName,
        poolAddress: poolAddress,
        pool_version: pool_version,
      });
    };

  const handleCloseWithDraw = () => {
    setWidthDraw({
      open: false,
      farmerName: "",
      poolAddress: "",
      pool_version: 1,
    });
  };

  const handleFindFarmers = () => {
    history.push("/dashboard");
  };

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/dashboard/farmer/" + poolAddress);
  };

  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <Section>
        <Head className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col lg={12}>
                <HeadingTitle>My Investments</HeadingTitle>
              </Col>
            </Row>
          </Container>
        </Head>
      </Section>
      <GridBackground className="py-5">
        <div className="mt-5 mb-5 tablebgHead">
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
                      <CustomTableHeading className="py-4">
                        #
                      </CustomTableHeading>
                      <EmptyTableHeading></EmptyTableHeading>
                      <CustomTableHeading>FARMER NAME</CustomTableHeading>
                      <CustomTableHeading>INVESTED AMOUNT</CustomTableHeading>
                      <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>
                      <CustomTableHeading>ACTION</CustomTableHeading>
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
                            onClick={RedirectToFarmerProfile(investment.GUID)}
                            className="font-weight-bold"
                          >
                            {investment.name}
                          </CustomTableData>

                          <CustomTableData>
                            <MyInitialInvestment
                              poolAddress={investment.poolAddress}
                            />
                          </CustomTableData>
                          <CustomTableData className="bold">
                            <TotalProfitLoss
                              refresh={refresh}
                              poolAddress={investment.poolAddress}
                            />
                          </CustomTableData>
                          <CustomTableData className="investment_table_btn">
                            <WithDrawButton
                              onClick={handleOpenWithDraw(
                                investment.name,
                                investment.poolAddress,
                                investment.pool_version
                                  ? investment.pool_version
                                  : 1
                              )}
                            >
                              Withdraw
                            </WithDrawButton>
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
                      You’re not following any farmers
                    </ZeroInvestmentContent>
                    <CenteredBox className="mb-5">
                      <ButtonWidget
                        className="mt-4"
                        varaint="contained"
                        containedVariantColor="black"
                        height="50px"
                        width="210px"
                        onClick={handleFindFarmers}
                      >
                        Explore Farmers
                      </ButtonWidget>
                    </CenteredBox>
                  </ZeroInvestmentInnerBox>
                </ZeroInvestmentBox>
              </>
            )}
          </Container>
        </div>
      </GridBackground>
      <Footer />
      {withDraw.open && (
        <WithDrawPopup
          open={withDraw.open}
          poolVersion={withDraw.pool_version}
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
