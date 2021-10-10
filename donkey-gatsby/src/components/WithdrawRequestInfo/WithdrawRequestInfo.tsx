import { ButtonWidget } from "components/Button";
import { StakingTimer } from "components/StakingInfo";
import { useTimer } from "hooks";
import moment from "moment";
import { useMemo } from "react";
import styled from "styled-components";

const StyledHeading = styled.h4`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 36px;
  font-weight: 800;
`;

const Title = styled.h5`
  margin: 0;
  color: #222;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #070602;
  margin: 0;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 35px;
  text-align: center;
`;

const WithdrawColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 1px;
    height: 90%;
    background-color: #ededf2;
  }
`;

const TimerElementWrapper = styled.div`
  padding: 16px 8px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  min-width: 70px;
`;

const TimerElement = styled.div`
  font-size: 36px;
  font-weight: 400;
`;

const TimerText = styled.div`
  font-size: 12px;
`;

export const WithdrawRequestInfo = ({
  amount,
  profit,
  created_on,
  duration,
}: {
  amount: string;
  profit: string;
  created_on: string;
  duration: string;
}) => {
  console.log();

  const endTime = useMemo(() => {
    return moment(created_on).add(duration, "hours").unix();
  }, [created_on]);
  const { days, hrs, mins, secs, hasEnded } = useTimer(endTime);

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-12">
          <StyledHeading className="mb-3">Pending withdraw </StyledHeading>
          <Card>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="row">
                  <WithdrawColumn className="col-4">
                    <Title> Withdraw Amount</Title>
                    <Subtitle>{amount}</Subtitle>
                  </WithdrawColumn>
                  <WithdrawColumn className="col-4">
                    <Title> Profit </Title>
                    <Subtitle>{profit}</Subtitle>
                  </WithdrawColumn>
                  <WithdrawColumn className="col-4">
                    <Title>Date Created </Title>
                    <Subtitle>
                      {moment(created_on).format("DD/MM/yyyy")}
                    </Subtitle>
                  </WithdrawColumn>
                </div>
              </div>

              <div className="col-md-6">
              {!hasEnded ?  <div className="d-flex align-items-center justify-content-between">
                  <Title> Will be available in</Title>
                  <div>
                    <div className="d-flex align-items-center">
                      <TimerElementWrapper>
                        <TimerElement>{days}</TimerElement>
                        <TimerText>DAYS</TimerText>
                      </TimerElementWrapper>
                      <div className="px-2">:</div>
                      <TimerElementWrapper>
                        <TimerElement>{hrs}</TimerElement>
                        <TimerText>HOURS</TimerText>
                      </TimerElementWrapper>
                      <div className="px-2">:</div>
                      <TimerElementWrapper>
                        <TimerElement>{mins}</TimerElement>
                        <TimerText>MINUTES</TimerText>
                      </TimerElementWrapper>
                      <div className="px-2">:</div>
                      <TimerElementWrapper>
                        <TimerElement>{secs}</TimerElement>
                        <TimerText>SECONDS</TimerText>
                      </TimerElementWrapper>
                    </div>
                  </div>
                </div>: <>
                  Oops somthing went wrong, we are going to try again
              <ButtonWidget
                onClick={() => window.location.reload()}
                varaint="contained"
                width="200px"
                className="mt-3"
                height="40px"
                containedVariantColor="lightYellow"
              >
                Refresh
              </ButtonWidget>
                </>}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
