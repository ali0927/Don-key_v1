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

const TotalInvestedAmount = styled.span`
  font-size: 50px;
  font-weight: 700;
`;

const StakingCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 0;
`;

const StakingCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:not(:last-child):after {
    content: "";
    display: block;
    width: 1px;
    height: calc(100% - 10px);
    background-color: #000d09;
    opacity: 0.3;
    position: absolute;
    right: 0;
    top: 50%;
    color: #000d09;
    transform: translateY(-50%);
  }
  &.hide:after {
    display: none;
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

const StyledButton = styled(ButtonWidget)`
  width: initial !important;
  font-size: 14px;
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
  border-radius: 4px;
  padding: 40px 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
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
    return (
      <div className="text-center">Cool off period is over. Claim Tokens</div>
    );
  }
  return (
    <div>
      Cool off period ends in {days}d:{hrs}h:{mins}m:{secs}s{" "}
    </div>
  );
};

export const StakingInfo = () => {
  const {
    stakedDon,
    tier,
    pendingReward,
    investedAmount,
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
            <StakingTitle>Don Rewards</StakingTitle>
            <StakingSubtitle>{pendingReward} DON</StakingSubtitle>
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
            className="py-1 px-3 mb-2"
          >
            Stake
          </StyledButton>

          <StyledButton
            varaint="outlined"
            disabled={!isStaked || isInCoolOffPeriod}
            onClick={openUnstake}
            className="py-1 px-3 rounded"
          >
            Unstake
          </StyledButton>
        </div>
      );
    }
  };

  return (
    <>
      <TotalInvestedAmount>${investedAmount}</TotalInvestedAmount>
      {isStakeModalOpen && (
        <AcceleratedAPYModal
          open={isStakeModalOpen}
          onClose={() => setisModalOpen(false)}
        />
      )}
      {unstake && <UnstakeDonModal open={unstake} onClose={closeUnstake} />}
      <div className="row mt-3 mb-4">
        <div className="col-md-8">
          <StakingCard className="row">
            <StakingCol className="col-md-3">
              <StakingTitle>DON Staked</StakingTitle>
              <StakingSubtitle>{stakedDon} DON</StakingSubtitle>
            </StakingCol>
            <StakingCol className="col-md-3">
              <StakingTitle>Tier</StakingTitle>
              <StakingSubtitle>{tier.donRequired} DON</StakingSubtitle>
            </StakingCol>
            <StakingCol className="col-md-3">
              <StakingTitle>Extra APY</StakingTitle>
              <StakingSubtitle>{tier.apy} %</StakingSubtitle>
            </StakingCol>
            <StakingCol className="col-md-3">{showButtonsOrTimer()}</StakingCol>
          </StakingCard>
        </div>
        <div className="col-md-4">
          <HarvestCard>{renderHarvestCard()}</HarvestCard>
        </div>
      </div>
    </>
  );
};
