import * as React from "react";
import { Collapse, useMediaQuery } from "@material-ui/core";
import { theme } from "theme";
import StakingArrow from "icons/stakingArrow";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DownArrow from "icons/downArrow";
import { useIsomorphicEffect, useStakingContract } from "hooks";
import { useState } from "react";
import { formatNum, toEther } from "helpers";
import BigNumber from "bignumber.js";
import { Spinner } from "react-bootstrap";
import clsx from "clsx";
import { useToggle } from "don-hooks";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal";
import { UnstakeDonModal } from "components/UnstakeDonModal/UnstakeDonModal";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import { Paper, Card, Button } from "./StakePage";
import { StakingTimer } from "components/StakingInfo";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import WalletPopup from "components/WalletPopup/WalletPopup";
import styled from "styled-components";
import { breakPoints } from "breakponts";

const RewardsHeading = styled.h1`
  font-weight: 800;
  font-size: 16px;
  line-height: 26px;
  color: #fac200;
  max-width: 218px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 30px;
    line-height: 70px;
  }
`;

const DonStakingTVL = ({ donPrice }: { donPrice: string | null }) => {
  const [isReady, setIsReady] = useState(false);
  const [tvl, setTvl] = useState("");
  const { stakingContract } = useStakingContract();
  const fetchTVL = async () => {
    if (donPrice) {
      const stakedTokens = toEther(
        await stakingContract.methods.getStakedTokenAmount().call()
      );
      setTvl(
        formatNum(new BigNumber(stakedTokens).multipliedBy(donPrice).toFixed(0))
      );
      setIsReady(true);
    }
  };

  useIsomorphicEffect(() => {
    fetchTVL();
  }, [donPrice]);

  if (!isReady) {
    return <>-</>;
  }
  return <>${tvl}</>;
};

export const DonStaking = ({ donPrice }: { donPrice: string | null }) => {
  const [isOpenStaking, setIsOpenStaking] = useState(false);
  const [openHarvestMob, setOpenHarvestMob] = useState(false);
  const [openStackMob, setOpenStackMob] = useState(false);
  const [HLoading, enableHLoading, disableHLoading] = useToggle();
  const [isStakeModalOpen, setisModalOpen] = useState(false);
  const [unstake, openUnstake, closeUnstake] = useToggle();
  const { chainId, connected, switchNetwork } = useWeb3Context();
  const [isOpen, setIsOpen] = useState(false);

  donPrice = donPrice
    ? new BigNumber(donPrice).gt("0.3")
      ? donPrice
      : "0.3"
    : "0";

  const {
    pendingReward,
    tier,
    harvest,
    isInCoolOffPeriod,
    isStaked,
    coolOffAmount,
    coolOffTime,
    stakedDon,
    claimTokens,
    canClaimTokens,
  } = useStakingContract();

  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);

  const openStakingModal = () => {
    setisModalOpen(true);
  };

  const doHarvest = async () => {
    enableHLoading();
    try {
      await harvest();
    } finally {
      disableHLoading();
    }
  };

  const renderButtons = () => {
    if (!connected) {
      return (
        <div>
          <Button
            bgColor="transparent"
            border=" 0.5px solid #000000"
            className="py-3"
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
        </div>
      );
    }
    if (chainId !== BINANCE_CHAIN_ID) {
      return (
        <div>
          <Button
            bgColor="transparent"
            border=" 0.5px solid #000000"
            className="py-3"
            onClick={() => switchNetwork(BINANCE_CHAIN_ID)}
          >
            Switch Network
          </Button>
        </div>
      );
    }
    if (isInCoolOffPeriod) {
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="mr-3">
            {" "}
            <StakingTimer
              title={isDesktop ? undefined : ""}
              timerEnd={parseInt(coolOffTime)}
            />
          </div>
          <Button
            bgColor="transparent"
            border=" 0.5px solid #000000"
            className="py-md-3 ml-2  py-2"
            disabled={!canClaimTokens}
            onClick={claimTokens}
          >
            Claim
          </Button>
        </div>
      );
    }
    return (
      <div className="w-100 d-flex pr-md-big justify-content-between justify-content-lg-end align-items-center">
        <Button
          bgColor="transparent"
          border=" 0.5px solid #000000"
          className="py-1 py-lg-2 mr-2 mr-lg-5"
          maxWidth={isDesktop ? "132px" : "80px"}
          onClick={openUnstake}
          fontSize={isDesktop ? "12px" : "10px"}
          disabled={!isStaked || isInCoolOffPeriod}
        >
          Unstake Don
        </Button>
        <Button
          bgColor="#000000"
          border=" 0.5px solid #000000"
          className="py-1 py-lg-3 ml-1"
          maxWidth={isDesktop ? "188px" : "94px"}
          color="#ffffff"
          disabled={isInCoolOffPeriod}
          onClick={openStakingModal}
        >
          Stake
        </Button>
      </div>
    );
  };
  // console.log(isInCoolOffPeriod, "Cool Off period");

  return (
    <>
      {isStakeModalOpen && (
        <AcceleratedAPYModal
          open={isStakeModalOpen}
          onClose={() => setisModalOpen(false)}
        />
      )}
      {unstake && <UnstakeDonModal open={unstake} onClose={closeUnstake} />}
      <Paper
        bgColor={isDesktop ? "#FDFAFA" : "#ffffff"}
        maxWidth="1124px"
        borderRadius={0}
        classname="p-0 p-lg-3 mt-2"
      >
        <Card className="row justify-content-center">
          <div className="d-flex col-5 col-lg-5 m-1 m-lg-0 pt-3 m-lg-0 divider">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="d-flex flex-column-reverse flex-lg-row text-center">
                {isInCoolOffPeriod
                  ? "Claim Amount"
                  : "Rewards Available in DON Tokens "}

                {!isInCoolOffPeriod && (
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                      <Tooltip id="button-tooltip" {...props}>
                        {pendingReward} $DON
                      </Tooltip>
                    )}
                  >
                    <span>
                      <AiOutlineQuestionCircle />
                    </span>
                  </OverlayTrigger>
                )}
              </p>
              <RewardsHeading
                className={clsx("w-100 text-center ", {
                  "text-lg-left": !isInCoolOffPeriod,
                })}
              >
                {isInCoolOffPeriod
                  ? `${formatNum(coolOffAmount, 3)} $DON`
                  : donPrice &&
                    `$${formatNum(
                      new BigNumber(donPrice)
                        .multipliedBy(pendingReward)
                        .toFixed()
                    )}`}
              </RewardsHeading>
              {!isInCoolOffPeriod && (
                <DownArrow
                  className={openHarvestMob ? "d-lg-none rotate" : "d-lg-none"}
                  onClick={() => setOpenHarvestMob(!openHarvestMob)}
                />
              )}
            </div>
          </div>
          <div className="col-5 m-1 m-lg-0 col-lg-2 pt-3">
            <p>EXTRA APR</p>
            <h2 className="mb-3 mb-lg-0">{tier.apy}%</h2>
          </div>
          {!isInCoolOffPeriod && openHarvestMob && (
            <div
              className={
                isDesktop
                  ? "d-none"
                  : "w-100 ml-4 py-1 d-flex align-items-center"
              }
            >
              <Button
                onClick={doHarvest}
                bgColor=" linear-gradient(0deg, #FFF037, #FFF037), #B4B4B4"
                className="py-1"
                disabled={
                  chainId !== BINANCE_CHAIN_ID ||
                  new BigNumber(pendingReward).isEqualTo(0)
                }
                maxWidth="95px"
              >
                {HLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Harvest"
                )}
              </Button>
            </div>
          )}
          <div className="col-5 m-1 m-lg-0 col-lg-2 pt-3 pr-0">
            <p>DON STAKED</p>
            <h2 className="mt-1 mb-3 m-lg-0">
              {new BigNumber(stakedDon).toFixed(0)}
            </h2>
          </div>
          <div className="col-5 m-1 m-lg-0 col-lg-3 pt-3">
            <p>TVL</p>
            <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-center justify-content-lg-start">
              <h1 className="tvl">
                <DonStakingTVL donPrice={donPrice} />
              </h1>
              <DownArrow
                className={openStackMob ? "d-lg-none" : "d-lg-none rotate"}
                onClick={() => setOpenStackMob(!openStackMob)}
              />
              <StakingArrow
                className={clsx("d-none d-lg-block cursor-pointer", {
                  icon: !isOpenStaking,
                })}
                style={{ marginLeft: 15, marginTop: 15 }}
                onClick={() => setIsOpenStaking((old) => !old)}
                aria-controls="collapse-content"
              />
            </div>
          </div>
          {/* <div className="col-1 d-none d-lg-flex pb-4 align-items-end justify-content-end">
            <StakingArrow
              className={clsx("cursor-pointer", { icon: !isOpenStaking })}
              onClick={() => setIsOpenStaking((old) => !old)}
            />
          </div> */}
          {openStackMob && (
            <div
              className={
                isDesktop
                  ? "d-none"
                  : "w-100 mx-4 py-1 d-flex justify-content-between justify-content-sm-around"
              }
            >
              {renderButtons()}
            </div>
          )}
        </Card>
      </Paper>
      <Collapse in={isOpenStaking}>
        <div id="collapse-content">
          <Paper
            bgColor="#FDFAFA"
            maxWidth="1124px"
            borderRadius={0}
            classname={
              isDesktop
                ? "p-4 mt-1 d-flex justify-content-center align-items-center"
                : "d-none"
            }
          >
            <Card className="row w-100 g-0">
              <div className="col-4 divider d-flex align-items-center">
                <div className="w-100 d-flex justify-content-center">
                  <Button
                    onClick={doHarvest}
                    bgColor=" linear-gradient(0deg, #FFF037, #FFF037), #B4B4B4"
                    className="py-3"
                    disabled={
                      chainId !== BINANCE_CHAIN_ID ||
                      new BigNumber(pendingReward).isEqualTo(0)
                    }
                  >
                    {HLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Harvest"
                    )}
                  </Button>
                </div>
              </div>
              <div className="col-8">{renderButtons()}</div>
            </Card>
          </Paper>
        </div>
      </Collapse>
    </>
  );
};
