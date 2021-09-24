import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import { ButtonWidget } from "components/Button";
import { useStakingContract } from "hooks";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useToggle } from "don-hooks";
import { UnstakeDonModal } from "components/UnstakeDonModal/UnstakeDonModal";
import BigNumber from "bignumber.js";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import { SmallTimerDots } from "icons";
import { breakPoints } from "breakponts";
import { getDonPriceWeb3 } from "helpers";
import { getWeb3 } from "don-components";

const StakingCard = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 0px 30px 0px;
  min-height: 146px;
  @media only screen and (max-width: ${breakPoints.lg}) {
    padding: 30px 0px 0px 0px;
    margin-bottom: 25px;
  }
`;

const StakingCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-right: 1px solid #ededf2;
  @media only screen and (max-width: ${breakPoints.lg}) {
    width: 33% !important;
    margin-bottom: 23px;
    &:last-child {
      border-right: 0px;
      width: 100% !important;
    }
  }
  &:last-child {
    border-right: 0px;
  }
  &.hide:after {
    display: none;
  }
`;

const StakingTitle = styled.h3`
  
  font-size: 12px;
  color: #7e7e7e;
  text-align: center;
  font-weight: 500;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 14px;
    color: #000;
  }
`;

const StakingSubtitle = styled.p`
  font-weight: 400;
  margin-bottom: 0;
  text-align: center;
  font-size: 14px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
  }
`;

export const StyledButton = styled(ButtonWidget)`
  width: 132px;
  font-size: 12px;
  border-radius: 10px !important;
  &:disabled {
    ${(props) => {
      if (
        props.varaint === "contained" &&
        props.containedVariantColor === "lightYellow"
      ) {
        return `background-color: rgba(255, 236, 92, 0.5);`;
      }
    }}
  }
  @media only screen and (max-width: ${breakPoints.lg}) {
    height: 33px;
    width: 100%;
    margin-left: 13px;
    margin-right: 13px;
  }
`;

const HarvestCard = styled.div`
  background-color: #222;
  border-radius: 20px;
  padding: 40px 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 85px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 100%;
  }
`;

const TimeCard = styled.div`
  height: 33px;
  width: 24.45px;

  border-radius: 3.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ variant = "dark" }: { variant?: "light" | "dark" }) => {
    if (variant === "dark") {
      return `background: rgba(0, 0, 0, 0.04);`;
    }
    if (variant === "light") {
      return `background: rgba(255, 255, 255, 0.44);`;
    }
  }}
`;

const TimerTime = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #000000;
`;

const TimerLabel = styled.div`
  font-size: 4.25px;
  font-style: normal;
  font-weight: 400;
  color: #000000;
`;

const TimerHeading = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-style: normal;

  text-align: center;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
    font-weight: 500;
  }
`;

const DotsWrraper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
`;

const TimmerRoot = styled.div`
  margin-left: 12px;
  transform: scale(1.1);
  @media only screen and (min-width: ${breakPoints.lg}) {
    margin-top: 12px;
    margin-left: 0px;
    transform: scale(1.4);
  }
`;

const Root = styled.div`
  @media only screen and (max-width: ${breakPoints.md}) {
    width: 42%;
  }
  @media only screen and (max-width: ${breakPoints.sm}) {
    width: 90%;
  }
`;

export const StakingTimer = ({
  timerEnd,
  endMessage = <>Cool off period is over. Claim Tokens</>,
  title = "Cool off period ends in ",
  variant = "dark",
}: {
  timerEnd: number;
  endMessage?: React.ReactElement;
  title?: string;
  variant?: "light" | "dark";
}) => {
  const [days, setDays] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const update = () => {
    const endTime = moment.unix(timerEnd);
    const duration = moment.duration(endTime.diff(moment()));
    const isEnded = endTime.isBefore(moment());
    setHasEnded(isEnded);
    if (!isEnded) {
      setHrs(duration.hours());
      setMins(duration.minutes());
      setSecs(duration.seconds());
      setDays(duration.days());
    }
  };
  useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (hasEnded) {
    return <TimerHeading>{endMessage}</TimerHeading>;
  }

  return (
    <div className="d-flex justify-content-center">
      <Root className="d-flex flex-lg-column justify-content-between align-items-center">
        <TimerHeading>{title}</TimerHeading>

        <TimmerRoot className=" d-flex justify-content-center">
          <TimeCard variant={variant}>
            <TimerTime>{days}</TimerTime>
            <TimerLabel>DAYS</TimerLabel>
          </TimeCard>

          <DotsWrraper>
            {" "}
            <SmallTimerDots />
          </DotsWrraper>

          <TimeCard variant={variant}>
            <TimerTime>{hrs}</TimerTime>
            <TimerLabel>HOURS</TimerLabel>
          </TimeCard>
          <DotsWrraper>
            {" "}
            <SmallTimerDots />
          </DotsWrraper>
          <TimeCard variant={variant}>
            <TimerTime>{mins}</TimerTime>
            <TimerLabel>MINUTES</TimerLabel>
          </TimeCard>
          <DotsWrraper>
            {" "}
            <SmallTimerDots />
          </DotsWrraper>
          <TimeCard variant={variant}>
            <TimerTime>{secs}</TimerTime>
            <TimerLabel>SECONDS</TimerLabel>
          </TimeCard>
        </TimmerRoot>
      </Root>
    </div>
  );
};

export const StakingInfo = () => {
  const {
    stakedDon,
    tier,
    pendingReward,
    isStaked,
    harvest,
    coolOffAmount,
    isInCoolOffPeriod,
    canClaimTokens,
    coolOffTime,
    claimTokens,
    lastRewardTime,
  } = useStakingContract();

  const [isStakeModalOpen, setisModalOpen] = useState(false);
  const [unstake, openUnstake, closeUnstake] = useToggle();

  const [loading, enableLoading, disableLoading] = useToggle();

  const [donPrice, setDonPrice] = useState<string | null>(null);
  const web3 = getWeb3(56);
  useEffect(() => {
    getDonPriceWeb3(web3).then(setDonPrice);
  }, []);

  const harvestDon = async () => {
    enableLoading();
    try {
      await harvest();
    } finally {
      disableLoading();
    }
  };
  const claimDons = async () => {
    enableLoading();
    try {
      await claimTokens();
    } finally {
      disableLoading();
    }
  };

  const renderHarvestCard = () => {
    if (!isInCoolOffPeriod) {
      return (
        <>
          {" "}
          <div className="row w-100 align-items-center">
            <div className="col-7 h-100 d-flex flex-column align-items-start align-items-lg-center">
              <StakingTitle style={{ color: "#fff" }}>
                DON Rewards available
              </StakingTitle>
              <StakingSubtitle>
                {new BigNumber(pendingReward).toFixed(6)} DON{" "}
                {donPrice &&
                  `($${new BigNumber(pendingReward)
                    .multipliedBy(donPrice)
                    .toFixed(2)})`}
              </StakingSubtitle>
              {!new BigNumber(lastRewardTime).isEqualTo(0) && (
                <div style={{ fontSize: 12 }}>
                  harvested{" "}
                  {moment
                    .duration(moment().diff(moment.unix(lastRewardTime)))
                    .humanize() + " ago"}
                </div>
              )}
            </div>
            <div className="col-5 d-flex justify-content-center">
              <StyledButton
                varaint="contained"
                disabled={new BigNumber(pendingReward).isEqualTo(0)}
                containedVariantColor="lightYellow"
                className="py-1 px-3 m-0"
                onClick={harvestDon}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Harvest"}
              </StyledButton>
            </div>{" "}
          </div>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <div className="h-100">
            <StakingTitle style={{ color: "#fff" }}>DON Tokens</StakingTitle>
            <StakingSubtitle>{coolOffAmount} DON</StakingSubtitle>
          </div>
          <StyledButton
            varaint="contained"
            disabled={!canClaimTokens}
            containedVariantColor="lightYellow"
            className="py-1 px-3"
            onClick={claimDons}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Claim Tokens"
            )}
          </StyledButton>
        </>
      );
    }
  };

  const showButtonsOrTimer = () => {
    if (isInCoolOffPeriod) {
      return <StakingTimer timerEnd={parseInt(coolOffTime)} />;
    } else {
      return (
        <div className="d-flex flex-lg-column justify-content-center align-items-center">
          <StyledButton
            onClick={() => setisModalOpen(true)}
            varaint="contained"
            disabled={isInCoolOffPeriod}
            className="py-1 px-3 mb-lg-3"
          >
            Stake DON
          </StyledButton>

          <StyledButton
            varaint="outlined"
            disabled={!isStaked || isInCoolOffPeriod}
            onClick={openUnstake}
            className="py-1 px-3 rounded"
          >
            Unstake DON
          </StyledButton>
        </div>
      );
    }
  };

  return (
    <>
      {isStakeModalOpen && (
        <AcceleratedAPYModal
          open={isStakeModalOpen}
          onClose={() => setisModalOpen(false)}
        />
      )}
      {unstake && <UnstakeDonModal open={unstake} onClose={closeUnstake} />}
      <div className="row mt-3 mb-4">
        <div className="col-lg-7 mb-2">
          <StakingCard className="d-flex h-100 flex-wrap justify-content-between">
            <StakingCol style={{ width: "21%" }}>
              <StakingTitle>DON Staked</StakingTitle>
              <StakingSubtitle>{stakedDon}</StakingSubtitle>
            </StakingCol>
            <StakingCol style={{ width: "21%" }}>
              <StakingTitle>Tier</StakingTitle>
              <StakingSubtitle>{tier.tier}</StakingSubtitle>
            </StakingCol>
            <StakingCol style={{ width: "21%" }}>
              <StakingTitle>Extra APY</StakingTitle>
              <StakingSubtitle>{tier.apy} %</StakingSubtitle>
            </StakingCol>
            <StakingCol style={{ width: "36%" }}>
              {showButtonsOrTimer()}
            </StakingCol>
          </StakingCard>
        </div>
        <div className="col-lg-5 mb-2">
          <HarvestCard>{renderHarvestCard()}</HarvestCard>
        </div>
      </div>
    </>
  );
};
