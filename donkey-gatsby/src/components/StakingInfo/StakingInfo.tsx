import { ButtonWidget } from "components/Button";
import { useStakingContract } from "hooks";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useToggle } from "don-hooks";
import { UnstakeDonModal } from "components/UnstakeDonModal/UnstakeDonModal";
import BigNumber from "bignumber.js";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import { SmallTimerDots } from "icons";
import { breakPoints } from "breakponts";
import { formatNum, getDonPriceWeb3 } from "helpers";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal";
import Questionmark from "components/Icons/Questionmark";
import { useTimer } from "hooks/useTimer";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "theme";
import { captureException } from "logrocket";

const StakingCard = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 0px 30px 0px;
  min-height: 146px;
  @media only screen and (max-width: ${breakPoints.lg}) {
    padding: 20px 0px 0px 0px;
    margin-bottom: 25px;
  }
`;

const StakingCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  @media only screen and (max-width: ${breakPoints.lg}) {
    width: 33% !important;
    /* margin-bottom: 23px; */
    &:last-child {
      border-right: 0px;
      width: 100% !important;
    }
  }
  :after {
    content: "";
    height: 62%;
    position: absolute;
    border: 0.1px solid #dedee0;
    top: 12;
    right: 0;
    opacity: 0.4;
  }
  &:last-child {
    :after {
      border: 0px;
    }
  }
  &.hide:after {
    display: none;
  }
`;

const StakingTitle = styled.h3`
  padding-top: 5px;
  font-size: 12px;
  color: #7e7e7e;
  text-align: center;
  font-weight: 500;
  line-height: 18px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
`;

const StakingSubtitle = styled.p`
  font-weight: 500;
  margin-bottom: 0;
  text-align: center;
  font-size: 14px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
    font-weight: 700;
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
  border-radius: 10px;
  padding: 30px 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 68%;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 100%;
    padding: 0px 0;
    border-radius: 20px;
  }
`;

const HarvestValue = styled(StakingSubtitle)`
  font-size: 15px;
  font-weight: 600;

  @media only screen and (min-width: ${breakPoints.lg}) {
    font-weight: bold;
    font-size: 23px;
  }
`;
const Rewardpaid = styled.div`
  p {
    font-size: 10px;
    font-weight: 500;

    color: #666666;

    @media only screen and (min-width: ${breakPoints.lg}) {
      p {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
`;
const Rewardtime = styled.div`
  p {
    font-size: 10px;
    font-weight: 500;

    margin-top: 0.3rem;

    color: #b3b6b5;
  }

  @media only screen and (min-width: ${breakPoints.lg}) {
    p {
      font-weight: 500;
      font-size: 12px;
      margin-top: 0.9rem;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
`;

const StyleTooltip = styled(Tooltip)`
  .tooltip-inner {
    background-color: white;
    color: black;
  }
  .arrow::before {
    border-right-color: white !important;
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
  font-weight: 400;
  color: #000000;
`;

const TimerLabel = styled.div`
  font-size: 4.25px;
  font-weight: 400;
  color: #000000;
  ${theme.mediaQueries.md.down} {
    font-size: 8px;
  }
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
  const { days, hasEnded, hrs, mins, secs } = useTimer(timerEnd);
  const isMobile = useMediaQuery(theme.mediaQueries.md.down);
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
            <TimerLabel>{isMobile ? "D" : "DAYS"}</TimerLabel>
          </TimeCard>

          <DotsWrraper>
            {" "}
            <SmallTimerDots />
          </DotsWrraper>

          <TimeCard variant={variant}>
            <TimerTime>{hrs}</TimerTime>
            <TimerLabel>{isMobile ? "H" : "HOURS"}</TimerLabel>
          </TimeCard>
          <DotsWrraper>
            {" "}
            <SmallTimerDots />
          </DotsWrraper>
          <TimeCard variant={variant}>
            <TimerTime>{mins}</TimerTime>
            <TimerLabel>{isMobile ? "M" : "MINUTES"}</TimerLabel>
          </TimeCard>
          <DotsWrraper>
            {" "}
            <SmallTimerDots />
          </DotsWrraper>
          <TimeCard variant={variant}>
            <TimerTime>{secs}</TimerTime>
            <TimerLabel>{isMobile ? "S" : "SECONDS"}</TimerLabel>
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

  useEffect(() => {
    getDonPriceWeb3()
      .then(setDonPrice)
      .catch((e) => captureException(e, { extra: { msg: "StakingInfo" } }));
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
    const renderTooltip = (props: any) => (
      <StyleTooltip id="button-tooltip" {...props}>
        <strong> {new BigNumber(pendingReward).toFixed(6)} DON </strong>
      </StyleTooltip>
    );

    if (!isInCoolOffPeriod) {
      return (
        <>
          {" "}
          <div className="row w-100 align-items-center ">
            <div className="col-6  h-100 d-flex flex-column align-items-start align-items-lg-center pt-2 ">
              <StakingTitle style={{ color: "#fff" }}>
                Rewards available
              </StakingTitle>
              <HarvestValue>
                {donPrice &&
                  `$${new BigNumber(pendingReward)
                    .multipliedBy(donPrice)
                    .toFixed(2)}`}
              </HarvestValue>
              <Rewardpaid className="d-flex align-items-baseline flex-row justify-content-between ">
                <p>
                  Rewards are paid in DON
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <span className="ml-1">
                      <Questionmark />
                    </span>
                  </OverlayTrigger>
                </p>
              </Rewardpaid>
            </div>
            <div
              className="col-6 d-flex justify-content-center align-items-center flex-column"
              // style={{ paddingTop: "1.8rem" }}
            >
              <StyledButton
                varaint="contained"
                disabled={new BigNumber(pendingReward).isEqualTo(0)}
                containedVariantColor="lightYellow"
                className="py-1 m-0"
                onClick={harvestDon}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Harvest"}
              </StyledButton>
              <Rewardtime className="text-center">
                {!new BigNumber(lastRewardTime).isEqualTo(0) && (
                  <p className="m-0 mt-2">
                    harvested{" "}
                    {moment
                      .duration(moment().diff(moment.unix(lastRewardTime)))
                      .humanize() + " ago"}
                  </p>
                )}
              </Rewardtime>
            </div>{" "}
          </div>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <div className="h-100 d-flex flex-column justify-content-center">
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
            {tier.tier > 0 ? "Upgrade Tier" : "Stake DON"}
          </StyledButton>

          <StyledButton
            varaint="outlined"
            disabled={!isStaked || isInCoolOffPeriod}
            onClick={openUnstake}
            className="py-1 px-3"
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
      <div className="row mt-0 mt-lg-3">
        <div className="col-lg-7 mb-3 mb-lg-2">
          <StakingCard className="d-flex h-100 flex-wrap justify-content-between">
            <StakingCol style={{ width: "21%" }}>
              <StakingTitle>DON Staked</StakingTitle>
              <StakingSubtitle>{formatNum(stakedDon, 2)}</StakingSubtitle>
            </StakingCol>
            <StakingCol style={{ width: "21%" }}>
              <StakingTitle>Tier</StakingTitle>
              <StakingSubtitle>{tier.tier}</StakingSubtitle>
            </StakingCol>
            <StakingCol style={{ width: "21%" }}>
              <StakingTitle>Extra APR</StakingTitle>
              <StakingSubtitle>{tier.apy} %</StakingSubtitle>
            </StakingCol>
            <StakingCol style={{ width: "36%" }}>
              {showButtonsOrTimer()}
            </StakingCol>
          </StakingCard>
        </div>
        <div className="col-lg-5 mb-0 mb-lg-2 ">
          <HarvestCard>{renderHarvestCard()}</HarvestCard>
        </div>
      </div>
    </>
  );
};
