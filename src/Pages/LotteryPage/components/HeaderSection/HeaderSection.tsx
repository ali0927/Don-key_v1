/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonWidget } from "components/Button";

import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import styled from "styled-components";
import { DonkeyLeftPanel } from "../DonkeyLeftPanel/DonkeyLeftPanel";
import { RootHeader } from "../RootHeader/RootHeader";
import { theme } from "../../../../theme";
import { Timer } from "./Timer";

const Header = styled.div`
  width: 100%;
  min-height: 450px;
  background: ${theme.palette.background.yellow};
  padding-top: 2rem;
`;

const MainHeading = styled.p`
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 52px;
  letter-spacing: 0em;
  text-align: left;
  text-transform: uppercase;
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
  const hasEnded = useMemo(() => {
    const difference = moment().utc().diff(moment(props.closingTime));
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
            <div className="col-lg-5 d-flex justify-content-center">
              <div className="w-50 position-relative">
                <DonkeyLeftPanel />
              </div>
            </div>

            <div className="col-lg-7">
              {/* <LaunchingSoon>LAUNCHED SOON</LaunchingSoon> */}
              <MainHeading>
                {hasEnded
                  ? "Don-key’s intuitive interface and one-click copy farming makes yield farming so easy, even a Donkey can do it."
                  : "Launching the public DAPP in"}
              </MainHeading>

              <div className="row d-flex justify-content-between align-items-center mt-4 mb-4">
                {!hasEnded && (
                  <Timer
                    timerDate={hasStarted ? props.closingTime : props.timerDate}
                  />
                )}
              </div>
              <MainHeading className="mb-0">
                Stake LP to earn Don Rewards
              </MainHeading>
              <ButtonWidget
                varaint="contained"
                height="50px"
                width="200px"
                className="mt-5 mb-5"
                onClick={handleTakePart}
              >
                Stake
              </ButtonWidget>
            </div>
          </div>
        </Container>
      </Header>
    </>
  );
};
