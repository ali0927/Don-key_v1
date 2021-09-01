/* eslint-disable react-hooks/exhaustive-deps */

import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { useWeb3 } from "don-components";
import "./InvestmentsPage.scss";
import { USDViewProvider } from "contexts/USDViewContext";
import { Switch, withStyles } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
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
import { MyInitialInvestment } from "components/MyInvestment";
import { getPoolContract, calculateInitialInvestmentInUSD } from "helpers";
import { theme } from "theme";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { GridBackground } from "components/GridBackground";
import { IFarmerInter } from "interfaces";
import { formatNum } from "../../Pages/FarmerBioPage/DetailTable";
import {
  BSCChainId,
  PolygonChainId,
  useWeb3Network,
} from "components/Web3NetworkDetector";
import { NetworkButton } from "Pages/DashboardPage/DashboardPage";
import { StakingInfo } from "./StakingInfo/StakingInfo";
import { NetworksMap } from "components/NetworkProvider/NetworkProvider";
import { gql, useQuery } from "@apollo/client";
import { useStakingContract } from "hooks";

const HeadingTitle = styled.p({
  fontFamily: "ObjectSans-Bold",
  fontSize: "45px",
  fontWeight: 800,
  color: "#070602",
  marginBottom: 30,
});


export const ZeroInvestmentBox = styled.div({
  // minHeight: 00,
  minHeight: 200,
  display: "flex",
  justifyContent: "center",
  position: "relative",
});

export const ZeroInvestmentInnerBox = styled.div({
  maxWidth: 599,
});

export const ZeroInvestmentContent = styled.div({
  fontStyle: "normal",
  fontWeight: 800,
  textAlign: "center",
  fontSize: "50px",
});

const WithDrawButton = styled(LightGrayButton)`
  border-radius: 10px;
  background: linear-gradient(0deg, #F2F4F7 0%, #F0F2F5 48.04%, #FFFFFF 100%);
  height: 34px;
  width: 114px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #9B9B9B;
  border: 1px solid #E5E6EA !important;
  :hover {
    background: #ffec5c;
    border: 0px !important;
    color: #000000;
  }
`;

export const CenteredBox = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

const AnimationDiv = styled.div({
  minHeight: 500,
});

const CustomTable = styled(Table)`
    border-radius: 5px 5px 0px 0px;
    text-align: center;
`;

const EmptyTableHeading = styled(TableHeading)`
  min-width: 75px;
`;

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

const CustomTableHeading = styled(TableHeading)`
  text-align: center;
`;

const CustomTableData = styled(TableData)`
  font-size: 16px;
  font-family: Roboto;
  cursor: ${(props: { cursor?: string }) =>
    props.cursor ? props.cursor : "auto"};
`;

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Head = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const YellowSwitch = withStyles({
  switchBase: {
    color: yellow[300],
    "&$checked": {
      color: yellow[500],
    },
    "&$checked + $track": {
      backgroundColor: yellow[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: "#d9d9d9",
  },
})(Switch);

const ALL_FARMER_QUERY = gql`
  query allFarmerQuery {
    farmers(where: { active_eq: true, status_in: ["active"] }) {
      name
      description
      farmerImage {
        url
      }
      active
      twitter
      telegram
      poolAddress
      poolVersion
      network {
        name
        chainId
        symbol
      }
    }
  }
`;



const TotalInvestedAmount = styled.span`
  font-family: ObjectSans-Bold;
  font-size: 50px;
  font-weight: 700;
`;

export const InvestmentsPage = () => {
  const web3 = useWeb3();
  const [poolAddresses, setPoolAddresses] = useState<
    { name: string; poolAddress: string; initialInvestmentinUSD: string }[]
  >([]);
  const [myInvestments, setMyInvestments] = useState<IFarmerInter[]>([]);
  const {investedAmount} = useStakingContract();
  const { data } = useQuery(ALL_FARMER_QUERY);
  const [initialCheck, setInitialCheck] = useState(true);
  const [isInUsd, setIsInUsd] = useState(true);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const { chainId: network } = useWeb3Network();
  const [strategyNetworkFilter, setStrategyNetworkFilter] = useState(network);

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

  const handleToggle = () => {
    toggleCurrency();
    setInitialCheck(!initialCheck);
  };

  useEffect(() => {
    if (data && data.farmers.length > 0) {
      let arr: any = [];
      const CalInvestments = async () => {
        const finalInvestments: IFarmerInter[] = [];
        setLoading(true);
        for (let invest of data.farmers as IFarmerInter[]) {
          try {
            const contract = await getPoolContract(web3, invest.poolAddress, 2);
            const accounts = await web3.eth.getAccounts();
            const isInvested = await contract.methods
              .isInvestor(accounts[0])
              .call();
            if (isInvested) {
              const amounts = [
                calculateInitialInvestmentInUSD(
                  web3,
                  invest.poolAddress,
                  accounts[0]
                ),
              ];
              const results = await Promise.all(amounts);

              arr.push({
                name: invest.name,
                poolAddress: invest.poolAddress,
                initialInvestmentinUSD: results[0],
              });
              finalInvestments.push(invest);
            }
          } catch (e) {
            console.error(e);
          }
        }
        setPoolAddresses(arr);
        setLoading(false);
        setMyInvestments(finalInvestments);
      };
      CalInvestments();
    }
  }, [data, refresh]);

  const filteredInvestMents = useMemo(() => {
    return myInvestments.filter((item) => {
      return item.network?.chainId === strategyNetworkFilter;
    });
  }, [myInvestments, strategyNetworkFilter]);

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

  const handleFindd = () => {
    history.push("/dashboard");
  };

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/dashboard/farmer/" + poolAddress);
  };

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);
  const { chainId } = useWeb3Network();

  return (
    <USDViewProvider
      value={{
        isUSD: isInUsd,
        toggle: toggleCurrency,
      }}
    >
      <div className="bgColor investment_header_container">
        <NavBar variant="loggedin" />
        <Section>
          <Head className="navbanHead rounded-0 pt-5 pb-5">
            <Container>
              <Row>
                <Col lg={12}>
                  <HeadingTitle>My Investments</HeadingTitle>
                  <div className="d-flex align-items-center justify-content-between mb-5 flex-wrap">
                    <TotalInvestedAmount>${investedAmount}</TotalInvestedAmount>
                    <div className="d-flex px-2 flex-wrap">
                    <NetworkButton
                      active={strategyNetworkFilter === BSCChainId}
                      onClick={() => setStrategyNetworkFilter(BSCChainId)}
                    >
                      BSC
                    </NetworkButton>
                    <NetworkButton
                      active={strategyNetworkFilter === PolygonChainId}
                      onClick={() => setStrategyNetworkFilter(PolygonChainId)}
                    >
                      Polygon
                    </NetworkButton>
                  </div>
                 </div>
                  {chainId === NetworksMap.BSC && <StakingInfo />}
               
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
              {!loading && filteredInvestMents.length > 0 && (
                <>
                  <div className="d-flex align-items-center"  style={{marginBottom: 20}}>
                    {"Base Token"}
                    <YellowSwitch
                      value={true}
                      onChange={handleToggle}
                      checked={initialCheck}
                    />{" "}
                    USD
                  </div>
                  <TableResponsive>
                    <CustomTable style={{borderRadius: "5px 5px 0px 0px;"}}>
                      <TableHead>
                        <TableRow isHoverOnRow={false}>
                          <CustomTableHeading className="py-4">
                            #
                          </CustomTableHeading>
                          <EmptyTableHeading></EmptyTableHeading>
                          <CustomTableHeading>FARMER NAME</CustomTableHeading>
                          <CustomTableHeading>
                            INVESTED AMOUNT
                          </CustomTableHeading>
                          <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>
                          <CustomTableHeading>DON REWARDS</CustomTableHeading>
                          <CustomTableHeading style={{textAlign: 'center'}}>ACTION</CustomTableHeading>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredInvestMents.map((investment, index) => {
                          let poolAddressFinal = poolAddresses.find(
                            (item: any) => {
                              return investment.name === item.name;
                            }
                          );
                          let initialInvestmentinUSD =
                            poolAddressFinal?.initialInvestmentinUSD || "0";

                          return (
                            <TableRow key={investment.guid}>
                              <CustomTableData style={{color: '#9B9B9B'}}>{index + 1}</CustomTableData>
                              <CustomTableData>
                                <StyledImage src={investment.farmerImage.url} />
                              </CustomTableData>
                              <CustomTableData
                                cursor="pointer"
                                onClick={RedirectToFarmerProfile(
                                  investment.guid
                                )}
                                style={{fontWeight: 500}}
                               
                              >
                                {investment.name}
                              </CustomTableData>

                              <CustomTableData>
                                {isInUsd && !!poolAddressFinal ? (
                                  `$${formatNum(initialInvestmentinUSD)}`
                                ) : (
                                  <MyInitialInvestment
                                    poolAddress={investment.poolAddress}
                                  />
                                )}
                              </CustomTableData>
                              <CustomTableData className="bold">
                                <TotalProfitLoss
                                  refresh={refresh}
                                  poolAddress={investment.poolAddress}
                                />
                              </CustomTableData>
                              <CustomTableData>$1000</CustomTableData>
                              <CustomTableData>
                                <div className="d-flex justify-content-center">
                                <WithDrawButton
                                  onClick={handleOpenWithDraw(
                                    investment.name,
                                    investment.poolAddress,
                                    investment.poolVersion
                                      ? investment.poolVersion
                                      : 1
                                  )}
                                >
                                  WITHDRAW
                                </WithDrawButton>
                                </div>
                              </CustomTableData>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </CustomTable>
                  </TableResponsive>
                </>
              )}

              {!loading && filteredInvestMents.length === 0 && (
                <>
                  <ZeroInvestmentBox>
                    <ZeroInvestmentInnerBox>
                      <ZeroInvestmentContent>
                        You’re not following any Farmers
                      </ZeroInvestmentContent>
                      <CenteredBox className="mb-5">
                        <ButtonWidget
                          className="mt-4"
                          varaint="contained"
                          containedVariantColor="black"
                          height="50px"
                          width="210px"
                          onClick={handleFindd}
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
    </USDViewProvider>
  );
};
