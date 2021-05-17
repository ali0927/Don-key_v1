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
import donkeySvg from "./Donkey.svg";

const Header = styled.div`
  width: 100%;
  background: #f4e41c;
  position: relative;
  overflow: hidden;
`;

const Heading = styled.p`
  font-family: "Roboto";
  font-size: 40px;
  font-style: normal;
  text-transform: uppercase;
  font-weight: 800;
  line-height: 52px;
  letter-spacing: 0em;
  text-align: left;
  position: relative;
  z-index: 1;
  padding: 6rem 0;
`;

const StyledImage = styled.img`
  position: absolute;
  right: -130px;
  bottom: -130px;
  max-width: 100%;
  z-index: 0;
  @media (max-width: 400px) {
    transform: scale(0.6);
  }
`;

export const LotteryParticipatePage: React.FC = () => {
  return (
    <Web3Provider loader={<LoadingPage />}>
      <NetworkProvider>
        <RefreshProvider>
          <NavBar />
          <Header className="py-5 ">
            <Container>
              <div className="row">
                <div className="col-md-8">
                  <Heading className="my-3">
                    Deposit DON LP token to gain $DON rewards and participate in
                    the lottery
                  </Heading>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center">
                    <StyledImage src={donkeySvg} />
                  </div>
                </div>
              </div>
            </Container>
          </Header>

          <LotteryForm />

          <Footer />
        </RefreshProvider>
      </NetworkProvider>
    </Web3Provider>
  );
};
