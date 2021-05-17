import { ContainedButton } from "components/Button";

import { SmallEllipse } from "icons/SmallEllipse";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import styled from "styled-components";
import { DonkeyLeftPanel } from "../DonkeyLeftPanel/DonkeyLeftPanel";
import { RootHeader } from "../RootHeader/RootHeader";

import { Timer } from "./Timer";

const Header = styled.div`
  width: 100%;
  min-height: 450px;
  background: #f4e41c;
  padding-top: 2rem;
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

export const HeaderSection: React.FC<{
  timerDate: string;
  closingTime: string;
}> = (props) => {
  const history = useHistory();
  const [update, setUpdated] = useState(false);
  const hasStarted = useMemo(() => {
    const difference = moment().utc().diff(moment(props.timerDate));
    return difference > 0;
  }, [update]);
  const handleTakePart = () => {
    history.push("/lottery/participate");
  };
  useEffect(() => {
    const inter = setInterval(() => {
      setUpdated((val) => !val);
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);
  return (
    <>
      <RootHeader hideBackButton />
      <Header>
        <Container>
          <div className="row">
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="w-50 position-relative">
              <DonkeyLeftPanel />
              </div>
            </div>

            <div className="col-lg-6">
              {/* <LaunchingSoon>LAUNCHED SOON</LaunchingSoon> */}
              <MainHeading>
                {hasStarted
                  ? "Whitelist lottery is now open, lottery closes in"
                  : "Whitelist lottery for Beta DAPP opens in"}
              </MainHeading>

              <div className="row d-flex justify-content-between align-items-center mt-4 mb-4">
                <Timer
                  timerDate={hasStarted ? props.closingTime : props.timerDate}
                />
              </div>

              {hasStarted && (
                <TakePartButton className="mt-5 mb-5" onClick={handleTakePart}>
                  Stake and Participate
                </TakePartButton>
              )}
            </div>
          </div>
        </Container>
      </Header>
    </>
  );
};
