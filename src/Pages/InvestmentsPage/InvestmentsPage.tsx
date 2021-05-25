/* eslint-disable no-empty-pattern */
import { NavBar } from "components/Navbar/NavBar";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { useWeb3 } from "don-components";
import "./InvestmentsPage.scss";
import { useAxios } from "hooks/useAxios";
import { IMyInvestments } from "./interfaces/IMyInvestments";
import { useNotification } from "components/Notification";
import { LoadingPage } from "Pages/LoadingPage";
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
import { StrategyName } from "components/StrategyName";
import { UserWalletBoard } from "components/UserWalletBoard";
import { getLpTokensTotal, getPoolContract, getTotalPoolValue } from "helpers";
import { InvestmentBlackBox } from "./InvestmentBlackBox/InvestmentBlackBox";
import { useSelector } from "react-redux";
import { IStoreState } from "interfaces";

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
`;

// const InvestmentDisplay = styled.div`
//   background: #000;
//   color: #fff;
//   padding: 1.5rem;
//   border-radius: 4px;
// `;

// const InvestCardButton = styled.button`
//   padding: 0.5rem 2rem;
//   width: 100%;
//   font-size: 14px;
//   text-align: center;
//   border-radius: 4px;
//   border: 0;
//   background-color: rgba(245, 242, 144, 1);
//   transition: all 0.3s linear;
//   color: #000;
//   &:hover {
//     opacity: 0.8;
//   }
//   &:focus {
//     outline: none;
//   }
// `;


// async function fetchBalance() {
//   //const web3 = (await getWeb3()) as Web3;
//   //const accounts = await web3.eth.getAccounts();

//   //const WBNB = new web3.eth.Contract(PoolAbi as any, poolAddress);
//   //const balance = await WBNB.methods.gettInvested().call();
//   // var fBalance = parseFloat(
//   //   parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(5)
//   // );
//   return 0;
// }

export const InvestmentsPage = () => {
  const poolAddress = useSelector((state: IStoreState) => state.farmer)?.poolAddress as string;
  //  const [balance, setBalance] = useState(0);

  //const [isReady, setIsReady] = useState(false);

  const web3 = useWeb3();

  const history = useHistory();

  const [{ data }] = useAxios({ method: "GET", url: "/api/v2/farmer" });

  const [{ data: farmesInvestmentData, loading }] = useAxios(
    { method: "GET", url: "/api/v2/investments" },
    { useCache: false }
  );

  const [{}] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );

  const [myInvestments, setMyInvestments] = useState<IMyInvestments[]>([]);

  const [withDraw, setWidthDraw] = useState({
    open: false,
    farmerName: "",
    poolAddress: "",
  });

  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      //const balance = await fetchBalance();
      //setBalance(balance);
      //  setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (farmesInvestmentData) {
        const CalInvestments = async() => {
          const investments: IMyInvestments[] = farmesInvestmentData.data;
          const finalInvestments: IMyInvestments[] = [];
          for(let invest of investments){
            const contract = await getPoolContract(web3, invest.poolAddress);
            const accounts = await web3.eth.getAccounts();
            const isInvested = await contract.methods.isInvestor(accounts[0]).call();
            if(isInvested){
              finalInvestments.push(invest);
            }
          }
          setMyInvestments(finalInvestments);
        }
        CalInvestments();
    }
  }, [farmesInvestmentData]);

  const handleSuccess = (farmerName: string) => () => {
    const updatedList = myInvestments.filter(
      (x) => x.poolAddress !== poolAddress
    );
    setMyInvestments(updatedList);
    showNotification({
      msg: (
        <>
          <p className="text-center m-0">{`Money Withdraw into Farmer ${farmerName} Successfully.`}</p>
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

  if (!data) {
    return <LoadingPage />;
  }

  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <section className="bg-buru">
        <div className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col lg={6}>
                <HeadingTitle>My Investments</HeadingTitle>
              </Col>
              <Col lg={6}>
                {myInvestments.length > 0 && (
                  <>
                     <InvestmentBlackBox poolAddress={poolAddress} myInvestments={myInvestments}/>
                  </>
                )}
              </Col>
              {/* <div className="firstLetter image-col mr-4">
                 <img
                  className="img-fluid farmer-image"
                  src={
                    ""
                  }
                  alt={"investment"}
                />
              </div> */}

              {/* <div className="firstHeading_container col-lg-6 mr-4">
                <div className="firstHeading investment-heading mb-3">
                  {farmer.name}
                </div>
                <span className="description_title">Description</span>
                <span className="description_content description-width">
                  <ShowMoreContent content={farmer.description || ""} length={140} />
                </span>
              </div>

              <TotalInvestedMoney className="col-lg-4" balance={balance} /> */}
            </Row>
            {/* <div className="header_separator" />
            <DetailsTable farmer={farmer} /> */}
          </Container>
        </div>
      </section>
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
                      <CustomTableHeading>NAME OF STRATEGY</CustomTableHeading>
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
                          <CustomTableData className="bold">
                            {investment.name}
                          </CustomTableData>
                          <CustomTableData className="bold">
                            {investment.strategies.length > 0 ? (
                              <>
                                <StrategyName
                                  strategyAddress={
                                    investment.strategies[0].strategyAddress
                                  }
                                />
                              </>
                            ) : (
                              "-"
                            )}
                          </CustomTableData>
                          <CustomTableData>
                            {" "}
                            <MyInvestment
                              poolAddress={investment.poolAddress}
                            />
                          </CustomTableData>
                          <CustomTableData className="bold">$0</CustomTableData>
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

            {/* <div className="mt-4 pagePosition">
                <p className="pageTable">Showing 1-10 of 120</p>
                <div className="paginationTable">
                  <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{120}</Pagination.Item>

                    <Pagination.Next />
                  </Pagination>
                </div>
                <div className="dropTable">
                  Show rows
                  <span>
                    <img
                      src="/assets/images/selectdrop.png"
                      className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
                      alt="Logo"
                    />
                  </span>
                  <Form.Group>
                    <Form.Control as="select">
                      <option>100</option>
                      <option>200</option>
                      <option>300</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div> */}
            {/* {InvestmentListData.length !== 0 && (
                <div className="investment_no_data">
                  <Button className="btnYellow">
                    Find some Farmers to Invest
                  </Button>
                </div>
              )} */}
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
            getTotalPoolValue(web3, poolAddress);
            getLpTokensTotal(web3, poolAddress);
          }}
          onError={handleError}
          onClose={handleCloseWithDraw}
        />
      )}
    </div>
  );
};
