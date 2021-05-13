import { ContainedButton } from "components/Button";
import {
  DonKeyLeftToRightFace,
  LargeEllipse,
  MeadiumEllipse,
  LeftArrow,
  ShareIcon,
  LeftArrowMediumSIze,
} from "icons";
import { SmallEllipse } from "icons/SmallEllipse";
import React from "react";
import { Col, Container } from "react-bootstrap";
import styled from "styled-components";
import {
  Ellipsce1,
  Ellipsce2,
  Ellipsce3,
  Ellipsce4,
  Ellipsce5,
} from "./Ellipses";
import { Timer } from "./Timer";

const Header = styled.div`
  width: 100%;
  min-height: 600px;
  background: #f4e41c;
  padding-top: 7%;
`;

const LaunchingSoon = styled.p`
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.585em;
  text-align: left;
`;

const MainHeading = styled.p`
  font-family: Roboto;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 52px;
  letter-spacing: 0em;
  text-align: left;
  text-transform: uppercase;
`;

const TakePartButton = styled(ContainedButton)`
  background: #000000;
  color: #ffffff;
  max-width: 252px;
  font-size: 16px;
  &:hover {
    background: #000000;
    color: #f3f3f3;
  }
`;

const DonkeyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const IconsWrapper = styled.div`
  width: 100%;
  min-height: 56px;
  background: #f4e41c;
`;

export const HeaderSection: React.FC<{ timerDate: string }> = (props) => {
  return (
    <>
      <IconsWrapper className="d-flex align-items-center">
        <Container className="d-flex justify-content-between mt-2">
          <LeftArrowMediumSIze />
          <ShareIcon />
        </Container>
      </IconsWrapper>
      <Header>
        <Container>
          <div className="row">
            <div className="col-md-6">
              <Ellipsce1>
                <LargeEllipse />
              </Ellipsce1>
              <Ellipsce2>
                <LargeEllipse />
              </Ellipsce2>
              <Ellipsce3>
                <MeadiumEllipse />
              </Ellipsce3>
              <Ellipsce4>
                <MeadiumEllipse />
              </Ellipsce4>

              <Ellipsce5>
                <SmallEllipse />
              </Ellipsce5>

              <DonkeyWrapper>
                <DonKeyLeftToRightFace />
              </DonkeyWrapper>
            </div>

            <div className="col-md-6">
              <LaunchingSoon>LAUNCHED SOON</LaunchingSoon>
              <MainHeading>The best tools to enter the platform</MainHeading>

              <div className="row d-flex justify-content-between align-items-center mt-4 mb-4">
                <Timer timerDate={props.timerDate} />
              </div>

              <TakePartButton className="mt-5 mb-5">
                Take part in the lottery
              </TakePartButton>
            </div>
          </div>
        </Container>
      </Header>
    </>
  );
};
