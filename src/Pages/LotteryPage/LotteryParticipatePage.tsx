import React from "react";
import { Footer } from "components/Footer";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { DonKeyLeftToRightFace } from "icons";
import { NavBar } from "components/Navbar";
import { Web3Provider } from "don-components";
import { LotteryForm } from "components/LotteryForm/LotteryForm";
import { LoadingPage } from "Pages/LoadingPage";
import { NetworkProvider } from "components/NetworkProvider/NetworkProvider";
import { RefreshProvider } from "components/LotteryForm/useRefresh";

const Header = styled.div`
  width: 100%;
  min-height: 605px;
  background: #f4e41c;
`;

const Heading = styled.p`
  font-family: Roboto;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 52px;
  letter-spacing: 0em;
  text-align: left;
`;

export const LotteryParticipatePage: React.FC = () => {
  return (
    <Web3Provider loader={<LoadingPage />}>
      <NetworkProvider>
        <RefreshProvider>
          <NavBar />
          <Header className="py-5">
            <Container>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex align-items-center justify-content-center">
                    <div style={{ width: 100, position: "relative" }}>
                      <DonKeyLeftToRightFace />
                    </div>
                  </div>

                  <Heading className="text-center my-3">
                    Deposit DON LP token to gain $DON rewards and participate in
                    the lottery
                  </Heading>
                  <LotteryForm />
                </div>
              </div>
            </Container>
          </Header>
          <Footer />
        </RefreshProvider>
      </NetworkProvider>
    </Web3Provider>
  );
};
