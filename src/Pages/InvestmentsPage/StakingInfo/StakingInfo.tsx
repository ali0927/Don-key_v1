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
import { getTierInfo } from "components/StakingContractProvider";

const StakingCard = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 0px 30px 0px;
  height: 146px;
`;

const StakingCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  &:nth-last-child(n + 2):after {
    content: "";
    display: block;
    width: 1px;
    height: calc(100% - 10px);
    background-color: #ededf2;
    position: absolute;
    right: 0;
    top: 50%;
    color: #ededf2;
    transform: translateY(-50%);
  }
  &.hide:after {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    width: 100% !important;
  }
`;

const StakingTitle = styled.h3`
  font-weight: 500;
  font-size: 14px;
  text-align: center;
`;

const StakingSubtitle = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 0;
  text-align: center;
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
`;

const HarvestCard = styled.div`
  background-color: #222;
  border-radius: 20px;
  padding: 40px 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const TimeCard = styled.div`
  height: 33px;
  width: 24.45px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 3.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

const DotsWrraper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
`;

const TimmerRoot = styled.div`
  margin-top: 12px;
  transform: scale(1.4);
`;

const StakingTimer = ({ timerEnd }: { timerEnd: number }) => {
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
    return <TimerHeading>Cool off period is over. Claim Tokens</TimerHeading>;
  }
  // {days}d:{hrs}h:{mins}m:{secs}s{" "}
  return (
    <div>
      <TimerHeading>Cool off period ends in </TimerHeading>
      <TimmerRoot className="d-flex justify-content-center">
        <TimeCard>
          <TimerTime>{days}</TimerTime>
          <TimerLabel>DAYS</TimerLabel>
        </TimeCard>

        <DotsWrraper>
          {" "}
          <SmallTimerDots />
        </DotsWrraper>

        <TimeCard>
          <TimerTime>{hrs}</TimerTime>
          <TimerLabel>HOURS</TimerLabel>
        </TimeCard>
        <DotsWrraper>
          {" "}
          <SmallTimerDots />
        </DotsWrraper>
        <TimeCard>
          <TimerTime>{mins}</TimerTime>
          <TimerLabel>MINUTES</TimerLabel>
        </TimeCard>
        <DotsWrraper>
          {" "}
          <SmallTimerDots />
        </DotsWrraper>
        <TimeCard>
          <TimerTime>{secs}</TimerTime>
          <TimerLabel>SECONDS</TimerLabel>
        </TimeCard>
      </TimmerRoot>
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
  } = useStakingContract();

  const [isStakeModalOpen, setisModalOpen] = useState(false);
  const [unstake, openUnstake, closeUnstake] = useToggle();

  const [loading, enableLoading, disableLoading] = useToggle();

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
          <div>
            <StakingTitle>DON Rewards available</StakingTitle>
            <StakingSubtitle>{pendingReward}</StakingSubtitle>
          </div>
          <StyledButton
            varaint="contained"
            disabled={new BigNumber(pendingReward).isEqualTo(0)}
            containedVariantColor="lightYellow"
            className="py-1 px-3"
            onClick={harvestDon}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Harvest"}
          </StyledButton>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <div>
            <StakingTitle>Don Tokens</StakingTitle>
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
        <div className="d-flex flex-column align-items-center">
          <StyledButton
            onClick={() => setisModalOpen(true)}
            varaint="contained"
            disabled={isInCoolOffPeriod}
            className="py-1 px-3 mb-3"
          >
            Stake Don
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
          <StakingCard className="d-flex flex-wrap justify-content-between">
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
