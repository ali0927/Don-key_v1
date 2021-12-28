import * as React from "react";
import { Collapse, useMediaQuery } from "@material-ui/core";
import { theme } from "theme";
import StakingArrow from "icons/stakingArrow";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DownArrow from "icons/downArrow";
import { useState } from "react";
import {
  captureException,
  formatNum,
  getLPTokenContract,
  getStakeContract,
  toEther,
  toWei,
} from "helpers";
import BigNumber from "bignumber.js";
import { Spinner } from "react-bootstrap";
import clsx from "clsx";
import { useToggle } from "don-hooks";
import {
  BINANCE_CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  getWeb3,
  useWeb3Context,
} from "don-components";
import { InitialState } from "components/StackingLPTokens/InitialState";
import { fetchStakingInfo } from "components/StackingLPTokens/helpers";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { useRefresh } from "components/LotteryForm";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { Paper, Card, ImageWrapper, Button } from "./StakePage";
import { IStaking } from "components/StackingLPTokens/interfaces";
import { StakeLpNewPopup } from "./StakeLPNew";
import { StakeType } from "interfaces";
import styled from "styled-components";
import TierAccess from "../../images/tier.png";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import WalletPopup from "components/WalletPopup/WalletPopup";
import donkeybsc from "../../images/donkeybsc.svg";
import donkeyeth from "../../images/donkeyeth.svg";

const PancakeSwapLink =
  "https://pancakeswap.finance/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255";
const UniswapLink =
  "https://app.uniswap.org/#/add/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0x217ddEad61a42369A266F1Fb754EB5d3EBadc88a";

const StyledImage = styled.img`
  position: absolute;
  top: -25px;
  right: -20px;
  max-width: 100px;
  transform: rotate(10deg);
  z-index: 200;
`;

const StyledStakingArrow = styled(StakingArrow)`
  //position: absolute;
  margin-top: 4px;
  bottom: -24px;
  right: 0;
  left: 10px;
  top: 50%;
  transform: ${({ isOpen }: { isOpen?: boolean }) =>
    `translateX(-50%) ${!isOpen ? `rotate(180deg)` : ``}`};
  ${theme.mediaQueries.xl.up} {
    right: 0;
    bottom: 10px;
    display: none;
    top: auto;
    left: initial;
    transform: ${({ isOpen }: { isOpen?: boolean }) =>
      `translateY(-50%) ${!isOpen ? `rotate(180deg)` : ``}`};
  }
`;

const LpStakingUI = ({
  buyLink,
  staking,
  img,
  peggedDon,
  title,
  network,
  type,
}: {
  buyLink: string;
  peggedDon?: string;
  staking: IStaking;
  img: React.ReactElement;
  title: string;
  type: StakeType;
  network: number;
}) => {
  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);
  const [isOpenStaking, setIsOpenStaking] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [openHarvestMob, setOpenHarvestMob] = useState(false);
  const [openStackMob, setOpenStackMob] = useState(false);
  const [HLoading, enableHLoading, disableHLoading] = useToggle();
  const [disableButtons, setDisableButtons] = React.useState(false);
  const { connected, getConnectedWeb3, chainId, switchNetwork } =
    useWeb3Context();
  const { refetch } = useStakingContract();
  const { refresh } = useRefresh();
  const [isOpen, setIsOpen] = useState(false);
  const finalTvl =
    staking.tvl !== "-"
      ? new BigNumber(staking.tvl).toNumber().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })
      : "-";
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();
  const hasStakedAmount = new BigNumber(Number(staking.stakedLp)).gt(0);
  const doHarvest = async () => {
    enableHLoading();
    try {
      // await harvest();
      const web3 = getConnectedWeb3();

      setDisableButtons(true);
      try {
        showProgress("Harvesting Rewards");
        const accounts = await web3.eth.getAccounts();
        const contract = await getStakeContract(web3, type);
        await contract.methods.getReward().send({ from: accounts[0] });
        showSuccess("Rewards Harvested");
      } catch (e) {
        captureException(e, "LotteryForm:handleHarvest");
        showFailure("Transaction Failed");
      } finally {
        refresh();
        setDisableButtons(false);
      }
    } finally {
      disableHLoading();
    }
  };
  const handleUnstake = async () => {
    const web3 = getConnectedWeb3();

    setDisableButtons(true);
    try {
      // showProgress("Unstaking Amount and Harvesting Rewards");
      const accounts = await web3.eth.getAccounts();
      const contract = await getStakeContract(web3, type);
      await contract.methods.exit().send({ from: accounts[0] });
      await refetch();
      showSuccess("Transaction Successfull");
    } catch (e) {
      captureException(e, "handleUnstake");
      showFailure("Transaction Failed");
    } finally {
      refresh();
      setDisableButtons(false);
    }
  };
  const handleStake = async () => {
    const web3 = getConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    // setLoading(true);
    try {
      const stakingContract = await getStakeContract(
        web3,
        type === "binance" ? "binancenew" : "ethereumnew"
      );
      const lpTokenContract = await getLPTokenContract(web3, type === "binance" || type === "binancenew");

      //   console.log(stakingContract.options.address, accounts[0], lpTokenContract.options.address);
      let allowance = await lpTokenContract.methods
        .allowance(accounts[0], stakingContract.options.address)
        .call();

      const stakeAmount = await lpTokenContract.methods
        .balanceOf(accounts[0])
        .call();

      if (new BigNumber(stakeAmount).gt(allowance)) {
        showProgress("Approve LP Token for Spend");
        await lpTokenContract.methods
          .approve(stakingContract.options.address, stakeAmount)
          .send({ from: accounts[0] });
      }
      showProgress("Stake LP Token on Don-key");
      await stakingContract.methods
        .stake(stakeAmount)
        .send({ from: accounts[0] });
      await refetch();
      showSuccess("LP Tokens Staked");
    } catch (e) {
      captureException(e, "handleStake");
      showFailure("Transaction Failed");
    }
  };

  const handleMigrate = async () => {
    showProgress("Unstaking Previous LP Tokens");
    await handleUnstake();
    refresh();
    showSuccess("Successfully Unstaked Lp");
    await handleStake();
    refresh();
  };

  const renderButtons = (isMobile = false) => {
    const isShown = (!isMobile && isDesktop) || (isMobile && !isDesktop);
    if (!isShown) {
      return null;
    }
    if (!connected) {
      return (
        <>
          <Button
            bgColor="transparent"
            border=" 0.5px solid #000000"
            className={clsx("py-3")}
            // disabled={isInCoolOffPeriod}
            onClick={() => setIsOpen(true)}
          >
            Connect Wallet
          </Button>
          {isOpen && (
            <WalletPopup
              onClose={() => setIsOpen(false)}
              onDone={() => setIsOpen(false)}
            />
          )}
        </>
      );
    }
    if (network !== chainId) {
      return (
        <>
          <Button
            bgColor="#000000"
            color="#ffffff"
            border=" 0.5px solid #000000"
            className="py-2 py-lg-3"
            onClick={() => switchNetwork(network)}
          >
            Switch Network
          </Button>
        </>
      );
    }
    if (isDesktop) {
      return (
        <>
          <Button
            bgColor="transparent"
            border=" 0.5px solid #000000"
            className="py-1 mr-4"
            maxWidth="132px"
            disabled={disableButtons || !staking.isStaked}
            onClick={handleUnstake}
          >
            Unstake LP
          </Button>
          {type === "binance" || type === "ethereum" ? (
            <Button
              bgColor="#000000"
              color="#ffffff"
              className="py-3"
              disabled={!staking.isStaked}
              onClick={handleMigrate}
            >
              Migrate
            </Button>
          ) : (
            <Button
              bgColor="#000000"
              color="#ffffff"
              className="py-3"
              onClick={() => setIsPopupOpen(true)}
            >
              Stake LP
            </Button>
          )}
        </>
      );
    } else {
      return (
        <>
          <Button
            bgColor="transparent"
            border=" 0.5px solid #000000"
            className="py-1"
            maxWidth="80px"
            fontSize="10px"
            disabled={disableButtons || !staking.isStaked}
            onClick={handleUnstake}
          >
            Unstake
          </Button>
          {type === "binance" ? (
            <Button
              bgColor="linear-gradient(0deg, #000000, #000000), #B4B4B4;"
              className="py-1"
              color="#ffffff"
              maxWidth="94px"
              disabled={!staking.isStaked}
              onClick={handleMigrate}
            >
              Migrate
            </Button>
          ) : (
            <Button
              bgColor="linear-gradient(0deg, #000000, #000000), #B4B4B4;"
              className="py-1"
              color="#ffffff"
              maxWidth="94px"
              onClick={() => setIsPopupOpen(true)}
            >
              Stake
            </Button>
          )}
        </>
      );
    }
  };

  const stakeButtons = (isMobile = false) => (
    <div
      className={
        "w-100 m-1 px-2 px-sm-auto d-flex mt-md-0 justify-content-between justify-content-sm-around justify-content-lg-center align-items-center pr-md-big "
      }
    >
      {renderButtons(isMobile)}
    </div>
  );

  const harvestButton = (isMobile = false) => {
    const isShown = (!isMobile && isDesktop) || (isMobile && !isDesktop);
    if (!isShown) {
      return null;
    }

    return (
      <Button
        onClick={doHarvest}
        bgColor=" linear-gradient(0deg, #FFF037, #FFF037), #B4B4B4"
        className="py-3"
        disabled={new BigNumber(staking.rewards).isEqualTo(0)}
      >
        {HLoading ? <Spinner animation="border" size="sm" /> : "Harvest"}
      </Button>
    );
  };

  const renderPeggedDon = () => {
    const markup = (
      <div className="col-5 m-1 m-lg-0 col-lg-auto px-lg-0 pt-3 order-5 order-lg-4">
        <div
          className="mb-4 mb-lg-0"
          style={{
            visibility: peggedDon === "" ? "hidden" : "initial",
          }}
        >
          <p>
            Pegged $DON{" "}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  The amount of DON in your LP at the time of staking
                </Tooltip>
              )}
            >
              <span>
                <AiOutlineQuestionCircle />
              </span>
            </OverlayTrigger>
          </p>
          <h2>{peggedDon ? new BigNumber(peggedDon).toFixed(2) : "-"}</h2>
        </div>
      </div>
    );
    if (isDesktop) {
      return markup;
    } else {
      if (peggedDon !== "") {
        return markup;
      }
    }
    return null;
  };
  const availableLpTooltip = (props: string) => (
    <Tooltip id="button-tooltip" {...props}>
      {props === "-" ? "-" : formatNum(props, 11)}{" "}
    </Tooltip>
  );
  const stakedLpTooltip = (props: string) => (
    <Tooltip id="button-tooltip" {...props}>
      {props === "-" ? "-" : new BigNumber(props).toFixed(10)}
    </Tooltip>
  );
  return (
    <>
      {isPopupOpen && (
        <StakeLpNewPopup
          availableLp={staking.availableLp || "0"}
          open={isPopupOpen}
          type={type}
          onClose={() => {
            setIsPopupOpen(false);
          }}
        />
      )}{" "}
      <Paper
        bgColor={isDesktop ? "#FDFAFA" : "#ffffff"}
        maxWidth="1180px"
        borderRadius={0}
        classname="p-0 p-lg-3 px-lg-2 mt-4 mt-lg-2"
      >
        <Card className="row justify-content-center justify-content-lg-between ">
          {type === "binancenew" && (
            <StyledImage src={TierAccess} alt="Tier Access" />
          )}
          <div className="col-5 py-2 col-lg-3 m-1 ml-0 m-lg-0 mt-lg-2 divider order-1 pr-lg-0">
            <div className="d-flex flex-column flex-lg-row justify-content-between justify-content-lg-start align-items-center align-items-lg-stretch">
              <div className="mr-2 d-flex flex-column align-items-center justify-content-center">
                <ImageWrapper>{img}</ImageWrapper>
                <h6
                  style={{
                    lineHeight: 1.3,
                    ...(isDesktop ? { maxHeight: 20 } : {}),
                  }}
                  className="text-center mb-0"
                >
                  {title}
                </h6>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <p className="rewards">Rewards Available</p>
                <h1 className="money w-100 text-center text-lg-left mb-0 ">
                  {staking.rewards === "-"
                    ? "-"
                    : new BigNumber(staking.rewards).toFixed(2)}{" "}
                  $DON
                </h1>
                <DownArrow
                  className={
                    openHarvestMob ? "d-lg-none mt-2" : "d-lg-none rotate mt-2"
                  }
                  onClick={() => setOpenHarvestMob(!openHarvestMob)}
                />
              </div>
            </div>
          </div>
          {openHarvestMob && (
            <div
              className={
                isDesktop ? "d-none" : "col-11 order-3 m-1 py-1 d-flex "
              }
            >
              <Button
                onClick={doHarvest}
                bgColor=" linear-gradient(0deg, #FFF037, #FFF037), #B4B4B4"
                className="py-1 mx-1"
                maxWidth="95px"
                disabled={
                  (connected && chainId !== network && !hasStakedAmount) ||
                  disableButtons
                }
              >
                {HLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Harvest"
                )}
              </Button>
            </div>
          )}
          <div className="col-5 m-1 m-lg-0 available-col col-lg-2 pt-3 order-12 order-lg-2 px-lg-0">
            <p>Available LP Token</p>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 250 }}
              overlay={availableLpTooltip(staking.availableLp)}
            >
              <h2 className={isDesktop ? "lptoken" : ""}>
                {staking.availableLp === "-"
                  ? "-"
                  : formatNum(staking.availableLp, 3)}{" "}
                LP
              </h2>
            </OverlayTrigger>
            <Button
              onClick={() => {
                window.open(buyLink, "_blank");
              }}
              bgColor="#F4E41C"
              maxWidth="55px"
              fontSize="9px"
            >
              Get More
            </Button>
          </div>
          <div className="col-5 m-1  m-lg-0 col-lg-1 px-lg-0 pt-3 order-2 order-lg-3">
            <p>APY</p>
            <h2>{staking.apy}%</h2>
          </div>

          {renderPeggedDon()}

          <div className="col-5 m-1 m-lg-0 col-lg-auto pt-3 order-3 order-lg-5">
            <p>STAKED LP</p>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 250 }}
              overlay={stakedLpTooltip(staking.stakedLp)}
            >
              <h2 className="mb-4 mb-lg-0">
                {staking.stakedLp === "-"
                  ? "-"
                  : new BigNumber(staking.stakedLp).toFixed(4)}
              </h2>
            </OverlayTrigger>
          </div>
          <div className="col-5 m-1 m-lg-0 col-lg-3 pt-3 position-relative order-4 order-lg-6 pl-lg-3">
            <div className="mr-lg-5">
              <p>TVL</p>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="tvl position-relative">{finalTvl}</h1>
                <StyledStakingArrow
                  isOpen={isOpenStaking}
                  className={clsx("cursor-pointer d-none d-lg-block")}
                  // style={{ right: "20px", bottom: "10px" }}
                  onClick={() => {
                    setIsOpenStaking((old) => !old);
                    setOpenStackMob((old) => !old);
                  }}
                  aria-controls="collapse-content"
                />
              </div>
              <div className="d-flex justify-content-center">
                <StakingArrow
                  className={
                    isOpenStaking
                      ? "d-block d-lg-none cursor-pointer mt-2"
                      : "d-block d-lg-none cursor-pointer rotate"
                  }
                  // style={{ bottom: "5px", left: "44%" }}
                  onClick={() => {
                    setIsOpenStaking((old) => !old);
                    setOpenStackMob((old) => !old);
                  }}
                  aria-controls="collapse-content"
                />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 10, right: 5 }}></div>
          </div>
          <div className="col-11 order-4 m-1 mx-sm-2 p-0 g-0 d-lg-none">
            {openStackMob && stakeButtons(true)}
          </div>
        </Card>
      </Paper>
      <Collapse in={isOpenStaking}>
        <div id="collapse-content">
          <Paper
            bgColor="#FDFAFA"
            maxWidth="1160px"
            borderRadius={0}
            classname={
              isDesktop
                ? "p-4 mt-1 d-flex justify-content-center align-items-center"
                : "d-none"
            }
          >
            <Card className="row w-100 g-0">
              <div className="col-4 divider">
                <div className="w-100 d-flex justify-content-center">
                  {harvestButton()}
                </div>
              </div>
              <div className="col-8 d-flex justify-content-end">
                {stakeButtons()}
              </div>{" "}
            </Card>
          </Paper>
        </div>
      </Collapse>
    </>
  );
};

export const LPStaking = ({ type }: { type: StakeType }) => {
  const [staking, setStaking] = React.useState(InitialState);

  const { connected, address } = useWeb3Context();
  const { dependsOn } = useRefresh();
  const [peggedDon, setPeggedDon] = useState("");
  const fetchInfo = async () => {
    try {
      const [EthData] = await Promise.all([
        fetchStakingInfo({
          connected,
          type,
          web3: getWeb3(
            type === "ethereum" || type === "ethereumnew"
              ? ETHEREUM_CHAIN_ID
              : BINANCE_CHAIN_ID
          ),
          address,
        }),
      ]);
      if (type === "binancenew") {
        const contract = await getStakeContract(
          getWeb3(BINANCE_CHAIN_ID),
          "binancenew"
        );

        const info = await contract.methods.userInfo(address).call();
        setPeggedDon(toEther(info.donEquivalent));
      }
      setStaking(EthData);
    } catch (e) {
      console.log(e, "Fetch LP Staking");
    }
  };

  useEffectOnTabFocus(() => {
    if (address) {
      fetchInfo();
    }
  }, [connected, dependsOn, address]);
  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);
  const map = {
    ethereum: {
      title: "Ethereum Mainnet",
      staking,
      network: ETHEREUM_CHAIN_ID,
      buyLink: UniswapLink,
      img: (
        <img
          src={donkeyeth}
          alt="donkey"
          width={isDesktop ? 39 : 20}
          height={isDesktop ? 50 : 27.13}
        />
      ),
    },
    binance: {
      staking,
      network: BINANCE_CHAIN_ID,
      title: "Binance Mainnet",
      buyLink: PancakeSwapLink,
      img: (
        <img
          src={donkeybsc}
          alt="donkey"
          width={isDesktop ? 39 : 20}
          height={isDesktop ? 50 : 27.13}
        />
      ),
    },
    binancenew: {
      staking,
      network: BINANCE_CHAIN_ID,
      title: "Binance Mainnet New",
      buyLink: PancakeSwapLink,
      img: (
        <img
          src={donkeybsc}
          alt="donkey"
          width={isDesktop ? 39 : 20}
          height={isDesktop ? 50 : 27.13}
        />
      ),
    },
    ethereumnew: {
      staking,
      network: ETHEREUM_CHAIN_ID,
      title: "Ethereum Mainnet New",
      buyLink: UniswapLink,
      img: (
        <img
          src={donkeyeth}
          alt="donkey"
          width={isDesktop ? 39 : 20}
          height={isDesktop ? 50 : 27.13}
        />
      ),
    },
  };

  const props = map[type];

  return <LpStakingUI {...props} type={type} peggedDon={peggedDon} />;
};
