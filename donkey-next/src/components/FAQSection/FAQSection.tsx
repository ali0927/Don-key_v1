import { DonKeyIcon } from "icons";
import styled from "styled-components";
import { theme } from "theme";

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
    <Body id="faq" className="d-flex justify-content-center py-5">
      <div className="container">
        <HeadingTitle className="my-5">Frequently Asked Questions</HeadingTitle>

        <FrequentRoot className="p-5">
          <DonKeyIconWrapper>
            <DonKeyIcon />
          </DonKeyIconWrapper>

          <div className="">
            <div className="mb-4">
              <Question>What do I need to use the Don-key platform?</Question>
              <Content>Only 100 DON</Content>
            </div>

            <div className="mb-4">
              <Question>Do I farm with the DON token?</Question>
              <Content>
                No, you farm with whatever token you want to earn APY on.
              </Content>
            </div>

            <div className="mb-4">
              <Question>Does Don-key offer staking?</Question>
              <Content>
                Yes, but staking is only offered to users who farm on the
                platform.
              </Content>
            </div>

            <div className="mb-4">
              <Question>What are the staking rewards?</Question>
              <Content>
                Rewards are determined by 5 DON tiers, outlined below. The
                higher your tier, the more additional APY in DON you can earn,
                up to an extra 100% APY!
              </Content>
            </div>

            <div className="mb-4">
              <Question>
                What strategies are DON staking rewards available for?
              </Question>
              <Content>
                At the moment BSC and ETH based strategies offer DON staking
                rewards but the team is working on launching the token for
                MATIC, AVAX, and SOL as quickly as possible so that extra
                rewards can be offered on these chains as well.
              </Content>
            </div>

            <div className="mb-4">
              <Question>What is Don-key’s unstaking policy?</Question>
              <Content>
                Farming deposits and rewards are instantly claimable, while DON
                deposits have a 14 day cool off period after unstaking (rewards
                are instantly claimable.)
              </Content>
            </div>

            <div>
              <Question>How does Don-key collect fees?</Question>
              <Content>
                At the time of withdrawal, Don-key only claims a percent fee on
                profits generated for the user - distributing 10% equally
                between platform maintenance and farmer rewards.
              </Content>
            </div>
          </div>
        </FrequentRoot>
      </div>
    </Body>
  );
};
