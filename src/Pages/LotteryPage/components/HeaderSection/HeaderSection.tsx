import { ContainedButton } from "components/Button";

import { SmallEllipse } from "icons/SmallEllipse";
import React from "react";
import { Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import styled from "styled-components";
import { DonkeyLeftPanel } from "../DonkeyLeftPanel/DonkeyLeftPanel";
import { RootHeader } from "../RootHeader/RootHeader";

import { Timer } from "./Timer";

const Header = styled.div`
  width: 100%;
  min-height: 600px;
  background: #f4e41c;
  padding-top: 7%;
`;

// const LaunchingSoon = styled.p`
//   font-family: Roboto;
//   font-size: 15px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 18px;
//   letter-spacing: 0.585em;
//   text-align: left;
// `;

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

export const HeaderSection: React.FC<{ timerDate: string }> = (props) => {
  const history = useHistory();

  const handleTakePart = () => {
    history.push("/lottery/participate");
  };

  return (
    <>
      <RootHeader />
      <Header>
        <Container>
          <div className="row">
            <div className="col-md-6">
              <DonkeyLeftPanel />
            </div>

            <div className="col-md-6">
              {/* <LaunchingSoon>LAUNCHED SOON</LaunchingSoon> */}
              <MainHeading>Whitelist lottery for Beta users opens in</MainHeading>

              <div className="row d-flex justify-content-between align-items-center mt-4 mb-4">
                <Timer timerDate={props.timerDate} />
              </div>

              <TakePartButton className="mt-5 mb-5" onClick={handleTakePart}>
                Join the lottery
              </TakePartButton>
            </div>
          </div>
        </Container>
      </Header>
    </>
  );
};
