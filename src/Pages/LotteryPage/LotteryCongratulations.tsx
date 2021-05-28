import {
  ContainedButton,
} from "components/Button";
import { Footer } from "components/Footer";
import { DonKeyLabel, LaptopRocketIcon } from "icons";
import { CloseIcon } from "icons/CloseIcon";
import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { RootHeader } from "./components/RootHeader/RootHeader";

const Root = styled.div`
  width: 100%;
  min-height: 652px;
  background: #f4e41c;
`;

const LeftSection = styled.div`
  height: 618px;
  background: #fff;
`;

const RightSection = styled.div`
  height: 618px;
  background: #070602;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: gray;
  opacity: 0.5;
`;

const RocketIconWrapper = styled.div`
  display: flex;
  margin-top: 10%;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const CongratulationsLabel = styled.p`
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
`;
const Content = styled.p`
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: #fff;
`;

const DiscoverButton = styled(ContainedButton)`
  height: 49px;
  max-width: 226px;
  padding: 15px, 34px, 15px, 34px;
`;

const LearnButton = styled(ContainedButton)`
  width: 109px;
  height: 49px;
  background: #070602;
  color: #fff;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover {
    background: #070602;
  }
`;

const CloseIconWrraper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;
const FooterWrraper = styled.div`
   margin-top:-3%;
`;

export const LotteryCongratulations: React.FC = () => {
  return (
    <>
      <Overlay />
      <RootHeader />

      <Root>
        <Container>
          <div className="row">
            <LeftSection className="col-md-6">
              <DonKeyLabel className="m-4" />
              <RocketIconWrapper>
                <LaptopRocketIcon />
              </RocketIconWrapper>
            </LeftSection>

            <RightSection className="col-md-6 position-relative d-flex align-items-center">
              <CloseIconWrraper className="d-flex justify-content-end m-4">
                <CloseIcon stroke="#fff" />
              </CloseIconWrraper>
          
                <div className="p-5">
                  <CongratulationsLabel>Congratulations</CongratulationsLabel>
                  <Content className="mt-4">
                    Don-key's team has assembled some of the best farmers out
                    there to be a part of our Beta version and we are welcoming
                    600 farming enthusiasts to follow them and gain some yield.
                    you can chose from different farming styles and risk
                    appetite.
                  </Content>
                  <Content>
                    Get 3X accelerated airdrop for early liquidity providers
                  </Content>

                  <div className="d-flex mt-5">
                    <DiscoverButton>Discover best farmers</DiscoverButton>
                    <LearnButton className="ml-3">Learn</LearnButton>
                  </div>
                </div>
           
            </RightSection>
          </div>
        </Container>
      </Root>
      <FooterWrraper>
      <Footer />
      </FooterWrraper>
    </>
  );
};
