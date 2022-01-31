/* eslint-disable react-hooks/exhaustive-deps */

import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { USDViewProvider } from "contexts/USDViewContext";
import { FANTOM_CHAIN_ID, SwitchRow, BSC_TESTNET_CHAIN_ID } from "don-components";
import { useNotification } from "components/Notification";
import moment from "moment";
import { navigate } from "gatsby-link";
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
import { StakingInfo } from "components/StakingInfo";
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
import { AiOutlineInfoCircle, AiFillCaretDown } from "react-icons/ai";
import { TickIcon } from "icons";
import clsx from "clsx";
import { ClickAwayListener } from "@material-ui/core";

export const Heading = styled.div`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 500;
  font-size: 20x;
  color: #000000;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 42px;
  }
`;

export const SubHeading = styled(Heading)`
  font-size: 18px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
  }
`;

const HeadingTitle = styled.div`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
  svg {
    margin-top: -2px;
  }
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

const ALL_FARMER_QUERY = gql`
  query allFarmerQuery {
    farmers(where: { status_in: ["active", "deprecated"] }) {
      name
      description
      farmerImage {
        url
      }
      slug
      guid
      twitter
      telegram
      poolAddress
      poolVersion
      oldPoolAddress
      oldPoolVersion
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
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 50px;
  font-weight: 700;
  @media only screen and (max-width: ${breakPoints.sm}) {
    font-size: 30px;
  }
`;

const DropdownBtn = styled.div`
  border: 2px solid #222222;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  ${(props: { active?: boolean }) =>
    props.active &&
    `
      background: #000;
      color:#fff;
    `}
  .icon {
    font-size: 20px;
    margin-left: 10px;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  top: 60px;
  right: 0;
  background: #000000;
  padding: 24px 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  z-index: 50;
  color: white;
  border-radius: 24px;
  h4 {
    padding-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .selected {
    background: #201f1f;
  }
  @media (max-width: 568px) {
    position: fixed;
    z-index: 1;
    top: auto;
    left: 0;
    right: 0;
    bottom: -16px;
    min-height: 34vh;
    border-radius: 24px 24px 0 0;
    overflow-x: hidden;
    transition: 0.5s;
  }
`;

const DropDownItem = styled.li`
  padding: 10px 32px;
  padding-right: 54px;
  cursor: pointer;
  display: flex;
  .tick-icon {
    display: none;
  }
  &:hover {
    background: #201f1f;
  }

  @media (max-width: 568px) {
    &:hover {
      .tick-icon {
        display: block;
      }
    }
  }
`;

const Overlay = styled.div`
  @media (max-width: 568px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 40;
  }
`;

const NetworkNameChainIdMap = {
  "Polygon": POLYGON_CHAIN_ID,
  "AVAX": AVAX_CHAIN_ID,
  "BSC": BINANCE_CHAIN_ID,
  "Fantom": FANTOM_CHAIN_ID,
  "BSC Testnet": BSC_TESTNET_CHAIN_ID
}

type ExtraInfo = {
  guid: string;
  name: string;
  poolAddress: string;
  isOutdated?: boolean;
  initialInvestmentinUSD: string;
  isWithdrawRequest: boolean;
}[];

export const InvestmentsPage = () => {
  const [poolAddresses, setPoolAddresses] = useState<ExtraInfo>([]);
  const [myInvestments, setMyInvestments] = useState<IFarmerInter[]>([]);

  const [initialCheck, setInitialCheck] = useState(true);
  const [isInUsd, setIsInUsd] = useState(true);
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
  const { data } = useQuery(ALL_FARMER_QUERY);
  const { showNotification } = useNotification();

  const [refresh, setRefresh] = useState(false);
  const [networkName, setNetworkName] = useState<keyof typeof NetworkNameChainIdMap>("BSC");
  const [show, setShow] = useState(false);

  const handleNameChange = (value: keyof typeof NetworkNameChainIdMap) => {
    const num = NetworkNameChainIdMap[value];
    setStrategyNetworkFilter(num);
    setNetworkName(value);
    setShow(false);
  };

  useEffect(() => {
    setStrategyNetworkFilter(network);
    // @ts-ignore
    Object.keys(NetworkNameChainIdMap).map((key: keyof typeof NetworkNameChainIdMap) => {
      if (network === NetworkNameChainIdMap[key]) {
        setNetworkName(key);
      }
    })
  }, [network]);
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
        const responses = (data.farmers as IFarmerInter[])
          .filter((item) => item.network.chainId === parseInt(network as any))
          .map(async (invest) => {
            try {
              const contract = await getPoolContract(
                web3,
                invest.poolAddress,
                invest.poolVersion
              );
              const hasOldPool =
                !!invest.oldPoolAddress && invest.oldPoolAddress.length > 4;
              let investedInOld = false;
              let isMigrated = false;
              const isInvested = await contract.methods
                .isInvestor(address)
                .call();
              if (hasOldPool) {
                const oldContract = await getPoolContract(
                  web3,
                  invest.oldPoolAddress,
                  invest.oldPoolVersion
                );
                investedInOld = await oldContract.methods
                  .isInvestor(address)
                  .call();
                isMigrated = investedInOld && isInvested;
              }
              let poolAddress = invest.poolAddress;
              if (!isMigrated && hasOldPool) {
                poolAddress = invest.oldPoolAddress;
              }

              if (isInvested || investedInOld) {
                const amounts = [
                  calculateInitialInvestmentInUSD(web3, poolAddress, address),
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
                  guid: invest.guid,
                  name: invest.name,
                  poolAddress: invest.poolAddress,
                  isOutdated: !isMigrated && hasOldPool,
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
          });

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
    navigate("/dashboard");
  };

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    navigate("/dashboard/farmer/" + poolAddress);
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
        <SwitchRow
          className="mb-4"
          heading="farmers list"
          subHeading={"Show in USD"}
          checked={isInUsd}
          onSwitchChange={handleToggle}
        />
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
                  Switch network to view these investments
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
                You’re not following any farmers on {networkName}
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

  const donrewardsInfo = (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id="button-tooltip" {...props}>
          DON rewards are pegged to USD value, Therefore the USD value will
          always go up, but the DON quantity can vary based on the current
          price.
        </Tooltip>
      )}
    >
      <AiOutlineInfoCircle className="ml-1" />
    </OverlayTrigger>
  );
  const lastcycleInfo = (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id="button-tooltip" {...props}>
          Don-key auto compounds the pool's funds in cycles to optimize the swap
          and minimize fees, slippage and price impact. A typical day will have
          2 cycles.
        </Tooltip>
      )}
    >
      <AiOutlineInfoCircle className="ml-1" />
    </OverlayTrigger>
  );
  const totalProfitInfo = (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id="button-tooltip" {...props}>
          {isInUsd
            ? "Profit is equal current price of native token * claimable native token - price of native token at the time of investment * invested native token"
            : "The amount of profit or loss in native token "}
        </Tooltip>
      )}
    >
      <AiOutlineInfoCircle className="ml-1" />
    </OverlayTrigger>
  );

  const investedAmountInfo = (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id="button-tooltip" {...props}>
          {isInUsd
            ? "The amount of investment in USD value on the day of investment "
            : "The amount of native token you invested in total"}
        </Tooltip>
      )}
    >
      <AiOutlineInfoCircle className="ml-1" />
    </OverlayTrigger>
  );
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
                  <CustomTableHeading>
                    INVESTED AMOUNT
                    {investedAmountInfo}
                  </CustomTableHeading>
                  <CustomTableHeading>
                    TOTAL PROFIT
                    {totalProfitInfo}
                  </CustomTableHeading>
                  <CustomTableHeading>
                    LAST CYCLE
                    {lastcycleInfo}
                  </CustomTableHeading>
                  {BINANCE_CHAIN_ID === network && tier.tier > 0 && (
                    <CustomTableHeading>
                      DON REWARDS
                      {donrewardsInfo}
                    </CustomTableHeading>
                  )}
                  <CustomTableHeading style={{ textAlign: "center" }}>
                    ACTION
                  </CustomTableHeading>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvestMents.map((investment, index) => {
                  let poolAddressFinal = poolAddresses.find((item) => {
                    return investment.guid === item.guid;
                  });
                  let initialInvestmentinUSD =
                    poolAddressFinal?.initialInvestmentinUSD || "0";
                  const isWithdrawRequested =
                    poolAddressFinal?.isWithdrawRequest;

                  const handleAction = async () => {
                    if (isWithdrawRequested || poolAddressFinal?.isOutdated) {
                      RedirectToFarmerProfile(investment.slug)();
                    } else {
                      handleOpenWithDraw(
                        investment.name,
                        investment.poolAddress,
                        investment.poolVersion ? investment.poolVersion : 1
                      )();
                    }
                  };
                  const getActionMessage = () => {
                    if (poolAddressFinal?.isOutdated) {
                      return "MIGRATE";
                    }
                    if (isWithdrawRequested) {
                      return "PENDING";
                    }
                    return "WITHDRAW";
                  };
                  return (
                    <>
                      <TableRow key={investment.guid}>
                        <CustomTableData style={{ color: "#9B9B9B" }}>
                          {index + 1}
                        </CustomTableData>
                        <CustomTableData
                          cursor="pointer"
                          onClick={RedirectToFarmerProfile(investment.slug)}
                        >
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
                        <CustomTableData className="bold">
                          <TotalProfitLoss
                            chainId={network}
                            refresh={refresh}
                            poolAddress={investment.poolAddress}
                            poolVersion={investment.poolVersion}
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
                                  if (!dons.isNaN()) {
                                    return donPrice.isReady
                                      ? `$${dons
                                        .multipliedBy(donPrice.price)
                                        .toFixed(2)}`
                                      : "-";
                                  }
                                  return "$ 0";
                                } else {
                                  if (dons.isNaN()) {
                                    return "0 DON";
                                  }
                                  return `${dons.toFixed(2)} DON`;
                                }
                              })()}
                            </CustomTableData>
                          )}
                        </>
                        <>
                          <CustomTableData>
                            <div className="d-flex justify-content-center">
                              <WithDrawButton onClick={handleAction}>
                                {getActionMessage()}
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
            accordionId="new-investments"
            investments={filteredInvestMents}
            poolAddresses={poolAddresses}
            refresh={refresh}
            donPrice={donPrice}
            investedAmountInfo={investedAmountInfo}
            profitInfo={totalProfitInfo}
            lastCycleInfo={lastcycleInfo}
            donRewardInfo={donrewardsInfo}
            showLastCycle
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
                  <CustomTableHeading>
                    INVESTED AMOUNT
                    {investedAmountInfo}
                  </CustomTableHeading>
                  <CustomTableHeading>
                    TOTAL PROFIT
                    {totalProfitInfo}
                  </CustomTableHeading>

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
            accordionId="old-investments"
            investments={filteredOldInvestMents}
            poolAddresses={poolAddresses}
            refresh={refresh}
            profitInfo={totalProfitInfo}
            investedAmountInfo={investedAmountInfo}
            donPrice={donPrice}
            onWithDrawClick={handleOpenWithDraw}
          />
        </>
      );
    }
  };
  const DropDownMenu = () => {
    return (
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Overlay
          onClick={() => {
            setShow(false);
          }}
        >
          <DropDown>
            <div id="collapseExample" className="collapse" >
              <h5 className="d-sm-none text-center">Network</h5>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: networkName === "Polygon" }
                )}
                onClick={() => {
                  handleNameChange("Polygon");
                }}
              >
                <div>Polygon</div> <TickIcon className="tick-icon" />
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: networkName === "AVAX" }
                )}
                onClick={() => {
                  handleNameChange("AVAX");
                }}
              >
                <div>AVAX</div> <TickIcon className="tick-icon" />
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: networkName === "BSC" }
                )}
                onClick={() => {
                  handleNameChange("BSC");
                }}
              >
                <div>BSC</div> <TickIcon className="tick-icon" />
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: networkName === "Fantom" }
                )}
                onClick={() => {
                  handleNameChange("Fantom");
                }}
              >
                <div>Fantom</div> <TickIcon className="tick-icon" />
              </DropDownItem>
            </div >
          </DropDown>
        </Overlay>
      </ClickAwayListener >
    );
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
          <Head className="navbanHead rounded-0 pt-2 pt-lg-5 pb-3">
            <Container>
              <Row>
                <Col lg={12}>
                  <HeadingTitle className="mb-0 mb-lg-3">
                    My Investments
                  </HeadingTitle>
                  <div className="row align-items-center justify-content-between mb-4 mb-lg-5 flex-wrap">
                    <div className="col-12 col-md-8 col-lg-9 mb-1 mb-lg-0">
                      <TotalInvestedAmount>
                        {loading ? "-" : `$${investedAmount}`}
                      </TotalInvestedAmount>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-end mt-2 mt-lg-0 positioin-static position-sm-relative">
                      <DropdownBtn active={show} onClick={() => setShow(!show)} aria-controls="collapseExample" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false"  >
                        {networkName}
                        <AiFillCaretDown className="icon" />
                      </DropdownBtn>
                      {show && <DropDownMenu />}
                      {/* <NetworkButton
                        height="40px"
                        width="103px"
                        varaint="outlined"
                        className="ml-1 mr-1"
                        active={strategyNetworkFilter === POLYGON_CHAIN_ID}
                        onClick={() =>
                          setStrategyNetworkFilter(POLYGON_CHAIN_ID)
                        }
                      >
                        Polygon
                      </NetworkButton>
                      <NetworkButton
                        varaint="outlined"
                        height="40px"
                        width="87px"
                        className="ml-1"
                        active={strategyNetworkFilter === AVAX_CHAIN_ID}
                        onClick={() => setStrategyNetworkFilter(AVAX_CHAIN_ID)}
                      >
                        AVAX
                      </NetworkButton> */}
                    </div>
                  </div>
                  {chainId === BSC_TESTNET_CHAIN_ID && <StakingInfo />}
                </Col>
              </Row>
            </Container>
          </Head>
        </Section>
        <GridBackground className="py-4 py-lg-5">
          <div className="mt-0 mt-lg-5 mb-5 tablebgHead">
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
            onError={handleCloseWithDraw}
            onClose={handleCloseWithDraw}
          />
        )}
      </div>
    </USDViewProvider>
  );
};
