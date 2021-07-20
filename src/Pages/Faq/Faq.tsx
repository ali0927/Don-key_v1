import React from "react";
import { NavBar } from "../../components/Navbar/NavBar";
import styled from "styled-components";
import { theme } from "theme";
import { Footer } from "components/Footer";
import { LargeEllipse, MeadiumEllipse, DonKeyIcon } from "icons";

const Header = styled.div`
  width: 100%;
  background: ${theme.palette.background.yellow};
  padding-top: 2rem;
  position: relative;
  z-index: 10;
`;

const BGYellow = styled.div`
  background-color: ${theme.palette.background.yellow};
`;

const HeadingTitle = styled.div`
  flex: 1;
  font-family: Roboto;
  font-size: 40px;
  position: relative;
  z-index: 100;
  font-style: normal;
  font-weight: 800;
  text-align: center;
  color: ${theme.palette.text.black};
`;

const HeaderContent = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  display: flex;
  text-align: center;
  color: ${theme.palette.text.black};
`;

const Body = styled.div`
   background-color: ${theme.palette.background.yellow};
  position: relative;
`;

const FrequentRoot = styled.div`
  background: ${theme.palette.common.white};
  border-radius: 10px;
  box-shadow: rgb(0 18 80 / 10%) 0px 5px 20px;
  position: relative;
`;

const Question = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  color: #333;
`;

const Content = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-size: 16px;
  color: #333;
`;

const DonKeyIconWrapper = styled.div`
  top: -40px;
  position: absolute;
  right: -14px;
`;

const Ellipse1 = styled.div`
  left: 16%;
  top: 8%;
  position: absolute;
`;

const Ellipse2 = styled.div`
  left: 28%;
  top: 3%;
  position: absolute;
`;

const Ellipse3 = styled.div`
  left: 23%;
  top: 18%;
  position: absolute;
`;

export const FAQSection = () => {
  return (
    <Body className="d-flex justify-content-center py-5">
      <div className="container">
        <HeadingTitle className="my-5">Frequently Asked Questions</HeadingTitle>
    
        <FrequentRoot className="p-5">
          <DonKeyIconWrapper>
            <DonKeyIcon />
          </DonKeyIconWrapper>

          <div className="">
            <div className="mb-4">
              <Question>How does the Don-key protocol work?</Question>
              <Content>
                Users invest their funds into farmer designed, developer created
                yield farming strategies that are hard coded via smart
                contracts. Liquidity within each investment pool moves exactly
                as the smart contracts dictate.
              </Content>
            </div>

            <div className="mb-4">
              <Question>What does 1-click copy farming mean?</Question>
              <Content>
                Most yield farming strategies have 10 or more simultaneous and
                recurring processes (deposit swap, harvest, claim, and so forth
                - all on multiple protocols.) With Don-key users get to enjoy
                the same rewards, with the unmatched ease of just a single
                click.
              </Content>
            </div>

            <div className="mb-4">
              <Question>Who has access to my funds?</Question>
              <Content>
                Absolutely no one. Your funds can’t be touched or accessed by
                anyone but yourself. Our farmers design the strategy, and smart
                contracts execute them.
              </Content>
            </div>

            <div className="mb-4">
              <Question>
                What protections are in place to secure deposited funds?
              </Question>
              <Content>
                Decentralized and autonomous smart contracts keep your funds
                secured, and completely in your control.
              </Content>
            </div>

            <div className="mb-4">
              <Question>Are rewards Compounded?</Question>
              <Content>Yes</Content>
            </div>

            <div className="mb-4">
              <Question>How is APY per strategy calculated?</Question>
              <Content>
                APY stands for Annual Percentage Yield and is the projected rate
                of annual return after taking compounding interest into account
                - it's calculated by averaging estimated returns across a
                strategy’s included liquidity pools.
              </Content>
            </div>

            <div>
              <Question>
                How are Don-key fees implemented? Are they percentages taken on
                profit or on total deposited funds?
              </Question>
              <Content>
                We only charge a fee on profits, not your initial investment.
              </Content>
            </div>
          </div>
        </FrequentRoot>
      </div>
    </Body>
  );
};

const Faq = () => {
  return (
    <>
      <NavBar />
      <Header>
        <Ellipse1>
          <LargeEllipse />
        </Ellipse1>
        <Ellipse2>
          <LargeEllipse />
        </Ellipse2>
        <Ellipse3>
          <MeadiumEllipse />
        </Ellipse3>
      </Header>
      <BGYellow>
        <FAQSection />
      </BGYellow>
      <Footer />
    </>
  );
};

export default Faq;
