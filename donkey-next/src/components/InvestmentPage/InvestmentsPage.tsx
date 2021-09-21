/* eslint-disable react-hooks/exhaustive-deps */

import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { USDViewProvider } from "contexts/USDViewContext";
import { Switch, withStyles } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { useNotification } from "components/Notification";
import moment from "moment";
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
import {
  getPoolContract,
  calculateInitialInvestmentInUSD,
  getDonPrice,
  fixUrl,
  captureException,
  formatNum,
} from "helpers";
import { theme } from "theme";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { GridBackground } from "components/GridBackground";
import { IFarmerInter } from "interfaces";
import { StakingInfo } from "./StakingInfo/StakingInfo";
import { gql, useQuery } from "@apollo/client";
import { useStakingContract } from "hooks";
import BigNumber from "bignumber.js";
import { breakPoints } from "breakponts";
import {
  AVAX_CHAIN_ID,
  BINANCE_CHAIN_ID,
  getWeb3,
  POLYGON_CHAIN_ID,
  useWeb3Context,
} from "don-components";
import { DonAccordion } from "./DonAccordion/DonAccordion";
import { NetworkButton } from "components/NetworkButton";

const HeadingTitle = styled.div`
  font-family: ObjectSans-Bold;
  font-size: 24px;
  font-weight: 800;
  color: #070602;
  margin-bottom: 20px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 45px;
    margin-bottom: 30px;
  }
`;

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

export const ZeroInvestmentContent = styled.div`
  font-style: normal;
  font-weight: 800;
  text-align: center;
  font-size: 24px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 50px;
  }
`;

const WithDrawButton = styled(LightGrayButton)`
  border-radius: 10px;
  background: linear-gradient(0deg, #f2f4f7 0%, #f0f2f5 48.04%, #ffffff 100%);
  height: 34px;
  width: 114px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #9b9b9b;
  border: 1px solid #e5e6ea !important;
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
  font-family: "Poppins";
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
  query allFarmerQuery($chainId: Int!) {
    farmers(
      where: {
        status_in: ["active", "deprecated"]
        network: { chainId: $chainId }
      }
    ) {
      name
      description
      farmerImage {
        url
      }
      slug
      guid
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
      last_cycle
    }
  }
`;

const TotalInvestedAmount = styled.span`
  font-family: ObjectSans-Bold;
  font-size: 50px;
  font-weight: 700;
  @media only screen and (max-width: ${breakPoints.sm}) {
    font-size: 36px;
  }
`;

type ExtraInfo = {
  name: string;
  poolAddress: string;
  initialInvestmentinUSD: string;
  isWithdrawRequest: boolean;
}[];

export const InvestmentsPage = () => {
  const [poolAddresses, setPoolAddresses] = useState<ExtraInfo>([]);
  const [myInvestments, setMyInvestments] = useState<IFarmerInter[]>([]);

  const [initialCheck, setInitialCheck] = useState(true);
  const [isInUsd, setIsInUsd] = useState(true);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [oldInvestments, setOldInvestments] = useState<IFarmerInter[]>([]);
  const { chainId: network, address } = useWeb3Context();
  const [strategyNetworkFilter, setStrategyNetworkFilter] = useState(network);

  const [withDraw, setWidthDraw] = useState({
    open: false,
    farmerName: "",
    poolAddress: "",
    pool_version: 1,
  });
  const { data } = useQuery(ALL_FARMER_QUERY, {
    variables: { chainId: network },
  });
  const { showNotification } = useNotification();

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((old) => !old);
  };

  const [investedAmount, setInvestedAmount] = useState("0");

  const handleToggle = () => {
    toggleCurrency();
    setInitialCheck(!initialCheck);
  };
  const web3 = getWeb3(network);
  useEffect(() => {
    if (data && data.farmers.length > 0) {
      let arr: ExtraInfo = [];
      const CalInvestments = async () => {
        let investedAmount = new BigNumber(0);
        const finalInvestments: IFarmerInter[] = [];
        const oldInvestments: IFarmerInter[] = [];
        setLoading(true);
        const responses = (data.farmers as IFarmerInter[]).map(async invest => {
          try {
            const contract = await getPoolContract(web3, invest.poolAddress, 3);
            // const accounts = await web3.eth.getAccounts();
            const isInvested = await contract.methods
              .isInvestor(address)
              .call();
            if (isInvested) {
              const amounts = [
                calculateInitialInvestmentInUSD(
                  web3,
                  invest.poolAddress,
                  address
                ),
                (async () => {
                  try {
                    if (invest.poolVersion > 2) {
                      return await contract.methods
                        .isWithdrawalRequested(address)
                        .call();
                    } else {
                      return false;
                    }
                  } catch (e) {
                    captureException(e, "Withdraw Requested");
                    return false;
                  }
                })(),
              ];

              const results = await Promise.all(amounts);
              investedAmount = investedAmount.plus(new BigNumber(results[0]));
              arr.push({
                name: invest.name,
                poolAddress: invest.poolAddress,
                initialInvestmentinUSD: results[0],
                isWithdrawRequest: results[1],
              });
              if (invest.poolVersion > 2) {
                finalInvestments.push(invest);
              } else {
                oldInvestments.push(invest);
              }
            }
          } catch (e) {
            captureException(e, "CalInvestments");
          }
        })

        await Promise.all(responses);
     
        setPoolAddresses(arr);
        setLoading(false);
        setMyInvestments(finalInvestments);
        setOldInvestments(oldInvestments);
        setInvestedAmount(investedAmount.toFixed(3));
      };
      CalInvestments();
    }
  }, [data, refresh, network, address]);

  const filteredInvestMents = useMemo(() => {
    return myInvestments.filter((item) => {
      return item.network?.chainId === strategyNetworkFilter;
    });
  }, [myInvestments, strategyNetworkFilter]);

  const filteredOldInvestMents = useMemo(() => {
    return oldInvestments.filter((item) => {
      return item.network?.chainId === strategyNetworkFilter;
    });
  }, [oldInvestments, strategyNetworkFilter]);

  const {
    investedAmount: investAmount,
    tier,
    pendingReward,
  } = useStakingContract();

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
  const { chainId, switchNetwork } = useWeb3Context();
  const [donPrice, setDonPrice] = useState({ isReady: false, price: "-" });
  useEffect(() => {
    (async () => {
      if (network === BINANCE_CHAIN_ID) {
        const donPrice = await getDonPrice(network === BINANCE_CHAIN_ID);
        setDonPrice({ isReady: true, price: donPrice });
      }
    })();
  }, [network]);
  const renderSwitch = () => {
    if (
      !loading &&
      (filteredInvestMents.length > 0 || filteredOldInvestMents.length > 0)
    ) {
      return (
        <div
          className="align-items-center d-none d-lg-flex"
          style={{ marginBottom: 20 }}
        >
          {"Base Token"}
          <YellowSwitch
            value={true}
            onChange={handleToggle}
            checked={initialCheck}
          />{" "}
          USD
        </div>
      );
    }
  };

  const renderNoInvestmentsFound = () => {
    if (
      !loading &&
      filteredOldInvestMents.length === 0 &&
      filteredInvestMents.length === 0
    ) {
      if (strategyNetworkFilter !== network) {
        const handleSwitch = () => {
          switchNetwork(strategyNetworkFilter as number);
        };
        return (
          <>
            <ZeroInvestmentBox>
              <ZeroInvestmentInnerBox>
                <ZeroInvestmentContent>
                  Switch Network to view These Investments
                </ZeroInvestmentContent>
                <CenteredBox className="mb-5">
                  <ButtonWidget
                    className="mt-4"
                    varaint="contained"
                    containedVariantColor="black"
                    height="50px"
                    width="210px"
                    onClick={handleSwitch}
                  >
                    Switch Network
                  </ButtonWidget>
                </CenteredBox>
              </ZeroInvestmentInnerBox>
            </ZeroInvestmentBox>
          </>
        );
      }
      return (
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
      );
    }
  };

  const renderNewInvestments = () => {
    if (!loading && filteredInvestMents.length > 0) {
      return (
        <>
          <TableResponsive className="d-none d-lg-block">
            <CustomTable style={{ borderRadius: "5px 5px 0px 0px;" }}>
              <TableHead>
                <TableRow isHoverOnRow={false}>
                  <CustomTableHeading className="py-4">#</CustomTableHeading>
                  <EmptyTableHeading></EmptyTableHeading>
                  <CustomTableHeading>FARMER NAME</CustomTableHeading>
                  <CustomTableHeading>INVESTED AMOUNT</CustomTableHeading>
                  <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>
                  <CustomTableHeading>LAST CYCLE</CustomTableHeading>
                  {BINANCE_CHAIN_ID === network && tier.tier > 0 && (
                    <CustomTableHeading>DON REWARDS</CustomTableHeading>
                  )}
                  <CustomTableHeading style={{ textAlign: "center" }}>
                    ACTION
                  </CustomTableHeading>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvestMents.map((investment, index) => {
                  let poolAddressFinal = poolAddresses.find((item: any) => {
                    return investment.name === item.name;
                  });
                  let initialInvestmentinUSD =
                    poolAddressFinal?.initialInvestmentinUSD || "0";
                  const isWithdrawRequested =
                    poolAddressFinal?.isWithdrawRequest;
                  return (
                    <>
                      <TableRow key={investment.guid}>
                        <CustomTableData style={{ color: "#9B9B9B" }}>
                          {index + 1}
                        </CustomTableData>
                        <CustomTableData>
                          <StyledImage
                            src={fixUrl(investment?.farmerImage?.url)}
                          />
                        </CustomTableData>
                        <CustomTableData
                          cursor="pointer"
                          onClick={RedirectToFarmerProfile(investment.slug)}
                          style={{ fontWeight: 500 }}
                        >
                          {investment.name}
                        </CustomTableData>
                        <CustomTableData>
                          {isInUsd && !!poolAddressFinal ? (
                            `$${formatNum(initialInvestmentinUSD)}`
                          ) : (
                            <MyInitialInvestment
                              chainId={network}
                              poolAddress={investment.poolAddress}
                            />
                          )}
                        </CustomTableData>
                        <>
                          {BINANCE_CHAIN_ID === network && tier.tier > 0 && (
                            <CustomTableData>
                              {(() => {
                                const dons = new BigNumber(pendingReward)
                                  .multipliedBy(initialInvestmentinUSD)
                                  .dividedBy(investAmount);
                                if (isInUsd) {
                                  return donPrice.isReady
                                    ? `$${dons
                                        .multipliedBy(donPrice.price)
                                        .toFixed(2)}`
                                    : "-";
                                } else {
                                  return `${dons.toFixed(2)} DON`;
                                }
                              })()}
                            </CustomTableData>
                          )}
                        </>
                        <CustomTableData className="bold">
                          <TotalProfitLoss
                            chainId={network}
                            refresh={refresh}
                            poolAddress={investment.poolAddress}
                          />
                        </CustomTableData>
                        <CustomTableData>
                          {moment
                            .duration(
                              moment().diff(moment(investment.last_cycle))
                            )
                            .humanize()}{" "}
                          ago
                        </CustomTableData>
                        <>
                          {BINANCE_CHAIN_ID === network && tier.tier > 0 && (
                            <CustomTableData>
                              {(() => {
                                const dons = new BigNumber(pendingReward)
                                  .multipliedBy(initialInvestmentinUSD)
                                  .dividedBy(investAmount);
                                if (isInUsd) {
                                  return donPrice.isReady
                                    ? `$${dons
                                        .multipliedBy(donPrice.price)
                                        .toFixed(2)}`
                                    : "-";
                                } else {
                                  return `${dons.toFixed(2)} DON`;
                                }
                              })()}
                            </CustomTableData>
                          )}
                        </>
                        <>
                          <CustomTableData>
                            <div className="d-flex justify-content-center">
                              <WithDrawButton
                                onClick={
                                  !isWithdrawRequested
                                    ? handleOpenWithDraw(
                                        investment.name,
                                        investment.poolAddress,
                                        investment.poolVersion
                                          ? investment.poolVersion
                                          : 1
                                      )
                                    : RedirectToFarmerProfile(investment.guid)
                                }
                              >
                                {isWithdrawRequested ? "PENDING" : "WITHDRAW"}
                              </WithDrawButton>
                            </div>
                          </CustomTableData>
                        </>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </CustomTable>
          </TableResponsive>
          <DonAccordion
            investments={filteredInvestMents}
            poolAddresses={poolAddresses}
            refresh={refresh}
            donPrice={donPrice}
            onWithDrawClick={handleOpenWithDraw}
          />
        </>
      );
    }
  };

  const renderOldInvestments = () => {
    if (!loading && filteredOldInvestMents.length > 0) {
      return (
        <>
          <h3 className="mt-4 mb-3">Deprecated Pools</h3>
          <TableResponsive className="d-none d-lg-block">
            <CustomTable style={{ borderRadius: "5px 5px 0px 0px;" }}>
              <TableHead>
                <TableRow isHoverOnRow={false}>
                  <CustomTableHeading className="py-4">#</CustomTableHeading>
                  <EmptyTableHeading></EmptyTableHeading>
                  <CustomTableHeading>FARMER NAME</CustomTableHeading>
                  <CustomTableHeading>INVESTED AMOUNT</CustomTableHeading>
                  <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>

                  <CustomTableHeading style={{ textAlign: "center" }}>
                    ACTION
                  </CustomTableHeading>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOldInvestMents.map((investment, index) => {
                  let poolAddressFinal = poolAddresses.find((item: any) => {
                    return investment.name === item.name;
                  });
                  let initialInvestmentinUSD =
                    poolAddressFinal?.initialInvestmentinUSD || "0";
                  const isWithdrawRequested =
                    poolAddressFinal?.isWithdrawRequest;
                  return (
                    <TableRow key={investment.guid}>
                      <CustomTableData style={{ color: "#9B9B9B" }}>
                        {index + 1}
                      </CustomTableData>
                      <CustomTableData>
                        <StyledImage
                          src={fixUrl(investment?.farmerImage?.url)}
                        />
                      </CustomTableData>
                      <CustomTableData
                        cursor="pointer"
                        onClick={RedirectToFarmerProfile(investment.guid)}
                        style={{ fontWeight: 500 }}
                      >
                        {investment.name}
                      </CustomTableData>

                      <CustomTableData>
                        {isInUsd && !!poolAddressFinal ? (
                          `$${formatNum(initialInvestmentinUSD)}`
                        ) : (
                          <MyInitialInvestment
                            chainId={network}
                            poolAddress={investment.poolAddress}
                          />
                        )}
                      </CustomTableData>
                      <CustomTableData className="bold">
                        <TotalProfitLoss
                          refresh={refresh}
                          chainId={network}
                          poolAddress={investment.poolAddress}
                        />
                      </CustomTableData>

                      <CustomTableData>
                        <div className="d-flex justify-content-center">
                          <WithDrawButton
                            onClick={
                              !isWithdrawRequested
                                ? handleOpenWithDraw(
                                    investment.name,
                                    investment.poolAddress,
                                    investment.poolVersion
                                      ? investment.poolVersion
                                      : 1
                                  )
                                : RedirectToFarmerProfile(investment.guid)
                            }
                          >
                            {isWithdrawRequested ? "PENDING" : "WITHDRAW"}
                          </WithDrawButton>
                        </div>
                      </CustomTableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          </TableResponsive>
          <DonAccordion
            investments={filteredOldInvestMents}
            poolAddresses={poolAddresses}
            refresh={refresh}
            donPrice={donPrice}
            onWithDrawClick={handleOpenWithDraw}
          />
        </>
      );
    }
  };

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
                  <div className="row align-items-center justify-content-between mb-5 flex-wrap">
                    <div className="col-12 col-md-8 col-lg-9 mb-1">
                      <TotalInvestedAmount>
                        {loading ? "-" : `$${investedAmount}`}
                      </TotalInvestedAmount>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3 d-flex px-2">
                      <NetworkButton
                        varaint="outlined"
                        className="mr-1"
                        active={strategyNetworkFilter === BINANCE_CHAIN_ID}
                        onClick={() =>
                          setStrategyNetworkFilter(BINANCE_CHAIN_ID)
                        }
                      >
                        BSC
                      </NetworkButton>
                      <NetworkButton
                        varaint="outlined"
                        className="ml-1"
                        active={strategyNetworkFilter === POLYGON_CHAIN_ID}
                        onClick={() =>
                          setStrategyNetworkFilter(POLYGON_CHAIN_ID)
                        }
                      >
                        Polygon
                      </NetworkButton>
                      <NetworkButton
                        varaint="outlined"
                        className="ml-1"
                        active={strategyNetworkFilter === AVAX_CHAIN_ID}
                        onClick={() => setStrategyNetworkFilter(AVAX_CHAIN_ID)}
                      >
                        AVAX
                      </NetworkButton>
                    </div>
                  </div>
                  {chainId === BINANCE_CHAIN_ID && <StakingInfo />}
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
              {renderSwitch()}
              {renderNewInvestments()}
              {renderOldInvestments()}
              {renderNoInvestmentsFound()}
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
