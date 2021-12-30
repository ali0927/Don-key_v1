import React from "react";
import styled from "styled-components";
import { theme } from "theme";

import { breakPoints } from "breakponts";
import yieldFarming from "../images/yieldfarming.svg";
import farmingonDonkey from "../images/farmingondonkey.svg";
import stakingonDonkey from "../images/stakingondonkey.svg";
import RewardsIcon from "../images/rewards.svg";
import security from "../images/security.svg";
import statistics from "../images/statistics.svg";
import { StaticImage } from "gatsby-plugin-image";
import { Statistics } from "../Statistics";
import { FaqContentRow } from "../FaqContentRow";
import { FAQItem } from "../FaqItem";
const Root = styled.div`
  background-color: #fff037;
  min-height: 428px;
  padding-top: 3rem;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;

  @media (max-width: 600px) {
    padding-top: 2rem;
    min-height: 100px;

    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 60px;
      border-radius: 50%;
      bottom: -20px;
      z-index: 0;
      background-color: ${theme.palette.background.yellow};
      ${theme.mediaQueries.md.up} {
        display: block;
      }
    }
  }
  svg {
    transform: translate3d(0px, 0px, 0px) scale(1.1) !important;
  }
  @media (min-width: 760px) {
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 110px;
      border-radius: 50%;
      bottom: -40px;
      z-index: 0;
      background-color: ${theme.palette.background.yellow};
      ${theme.mediaQueries.md.up} {
        display: block;
      }
    }
  }
`;

const Heading = styled.h1`
  font-size: 50px;
  font-weight: 800;
  text-align: left;
  color: #222222;
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  word-break: break-word;
  margin-bottom: 3rem;
  @media only screen and (min-width: ${breakPoints.md}) {
    margin-bottom: 5rem;
  }
`;

export type CustomPopupType = "none" | "cycle" | "stakeRewards";

const YieldFarmingQuestions = [
  {
    num: 1,
    ques: "What is Yield farming?",
    ans: "Yield farming is the act of effectively allocating capital across the decentralized financial ecosystem. Skilled farmers constantly monitor and research strategies that best chase rewards and minimize risk.",
    splitLength: 130,
  },
  {
    num: 2,
    ques: "Is Yield Farming Risky?",
    ans: "Yield Farming risks vary across different strategies, which Don-key reports according to key metrics such as potential for impermanent loss and platform security.",
    splitLength: 130,
  },
  {
    num: 3,
    ques: "What is Impermanent Loss?",
    ans: "Impermanent Loss is a logistical side effect of liquidity provided to Dex’s like Uniswap, which adjusts the ratios of base pair assets in a pool to maintain equal value. This need to maintain equal value between trading pairs, means that price volatility between the tokens erodes their collective value in proportion to the volatility. Some strategies are more exposed than others, with the “low risk” strategies offering relative or complete safety from Impermanent loss. ",
    splitLength: 130,
  },
  {
    num: 4,
    ques: "What is Copy-Farming?",
    ans: "Through Don-key’s copy-farming, the everyday investor can participate in yield farming’s unmatched profitability. Simply deposit in Don-key’s different farmers’s pools to enjoy risk-assessed, high APY strategies in an expanding selection of crypto currencies.",
    splitLength: 130,
  },
];

const FarmingQues = [
  {
    ques: "What are the requirements to use the Don-key platform?",
    ans: "100 $DON held in your wallet is the only requirement to use the DAPP.",

    num: 1,
  },
  {
    ques: "Do I farm with the DON token?",
    ans: "No, you farm with whatever token you want to earn APY on; while staking can be done in $DON - find out how to do so in the staking section below",

    num: 2,
  },
  {
    ques: "Why is my portfolio negative upon investment?",
    ans: "Some strategies involve protocols which incur an entrance fee or swap-in fee. These fees are deducted in the first cycle after the funds are invested, which could result in a negative starting balance. See the fee section in each strategy for the detailed breakdown of the fee structure.",

    num: 3,
  },
  {
    ques: "How does Don-key deposit and withdrawal cycles work?",
    ans: (
      <>
        To maintain the most efficient liquidity pools, Don-key concentrates
        deposits/withdrawals to coincide harmoniously with the daily farming
        cycles. For Example:
        <StaticImage src="../images/cycles.png" alt="Cycles" quality={100} />
      </>
    ),

    num: 4,
  },
  {
    ques: "Does Don-key auto compound my investment?",
    ans: "Yes. Don-key auto compounds the pools on average twice a day in order to optimize the return while minimizing slippage, fees and price impact.",

    num: 5,
  },
  {
    ques: "How are profits paid?",
    ans: "Base APY is paid in the underlying farm token while accelerated rewards APY is paid out in $DON.",

    num: 6,
  },
  {
    ques: "How does Don-key collect fees?",
    ans: "At the time of withdrawal, Don-key only claims a performance fee on profits generated for the user - distributing 10% equally between platform maintenance and farmer rewards",

    num: 4,
  },
];

const StakingQues = [
  {
    ques: "Does Don-key offer staking?",
    ans: "Yes, but staking is only offered to users who copy-farm on the platform and is given as a percentage of funds deposited to farm.",

    num: 1,
  },
  {
    ques: "What are the staking rewards?",
    ans: (
      <>
        Rewards are determined by 5 DON tiers, outlined below. The higher your
        tier, the more additional APY in DON you can earn, up to an extra 100%
        APY!
        <div className="mt-3">
          <StaticImage
            src="../images/rewards-table.png"
            alt="Staking on Donkey"
            loading="eager"
            quality={100}
          />
        </div>
      </>
    ),

    num: 2,
  },
  {
    ques: "How are DON staking rewards calculated?",
    ans: "YDepending on your tier, the percent DON APY you accumulate is pegged to the dollar, so that within a year the quantity of rewards mirrors the percent promised by your tier. This means that while the dollar value of your DON always increases, the qunaitity of DON fluctuates according to price.",

    num: 3,
  },
  {
    ques: "Why did my staking rewards disappear?",
    ans: "Whenever you join or increase your investment in a BSC based pool, DON rewards are automatically harvested, so that the new APY takes into account the added deposit quantity.",

    num: 4,
  },
  {
    ques: "What strategies are DON staking rewards available for?",
    ans: "At the moment only BSC strategies offer DON staking rewards but the team is working on launching the token for MATIC, AVAX, and SOL as quickly as possible so that extra rewards can be offered on these chains as well.",

    num: 5,
  },
  {
    ques: "Are DON staking rewards limited to the extra APY?",
    ans: "In the short term, yes, but soon Don-key will radically expand rewards to include other platform utilities such as exclusive access to VIP farms, reduced commission, access to leverage and even tier based NFT minting. ",

    num: 6,
  },
  {
    ques: "What is Don-key’s unstaking policy?",
    ans: "Copy-farming deposits and profits are claimable within a max period of 24 hours in order to streamline investment cycles, while DON staking deposits have a 14 day cool off period after unstaking",

    num: 7,
  },
];

const SecuirtyQues = [
  {
    num: 1,
    ques: "What is Don-key’s Approach to security?",
    ans: "Don-key’s approach to security protocol is multifaceted and designed to assess risks from as many angles as possible. The most important layers include regular audits, institutional asset custody, and strategy insurance options.",
  },
  {
    num: 2,
    ques: "Who audits Don-key?",
    ans: "All strategy pool contracts are audited by Certik, who ensure that smart contracts are secured and legitimate in their integrity.",
  },
  {
    num: 3,
    ques: "What is institutional custody?",
    ans: "Don-key uses Fireblocks, known to be the leader in digital asset security, to secure funds in a third-party hardware vault. They protect liquidity from cyber attacks, collusion, and human error through the best-in-class cryptography paired with hardware isolation.",
  },
  {
    num: 4,
    ques: "How does Don-key offer insurance?",
    ans: "Through teaming up with Bright Union, Don-key offers leading decentralized insurance solutions for specific pools. Marked by the Bright Union logo, these strategies are insured from platform hacks of all underlying farming platforms.The insurance is not for any hacks on Don-key itself which are mitigated by the custodian of Fireblocks and pool contract audits.",
  },
];

const ReferralQues = [
  {
    num: 1,
    ques: "How do referral rewards work?",
    ans: "Don-key’s referral system is specific to individual copy-farm pools on BSC, and allows community members to refer only to strategies that they are invested in with a minimum of $250.",
  },
  {
    num: 2,
    ques: "How much can investors earn from referral rewards?",
    ans: (
      <>
        <span>
          Like staking rewards, referral rewards are dependent upon investor
          tier and are as follows:
        </span>
        <div>
          <StaticImage
            src="../images/refferal-table.png"
            alt="Cycles"
            quality={100}
          />
        </div>
      </>
    ),
  },
  {
    num: 3,
    ques: "How many strategies can investors refer?",
    ans: "While users can only refer one strategy to each affiliate, they can refer strategies to as many people as they like, thereby accruing dozens of additional sources of passive income.",
  },
];

const StyledFaq = styled.div`
  background-color: #fff;
  border-radius: 20px;
  position: relative;
  z-index: 10;
`;

const FAQContainer = styled.div`
  position: relative;
  top: -40px;
  ${theme.mediaQueries.sm.up} {
    top: -200px;
  }
`;

export const MainSection: React.FC = () => {
  return (
    <>
      <Root className="position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-0 ">
              <Heading>FAQ</Heading>
              <Paragraph className="mt-2 mt-sm-4 w-md-50">
                Find answers to all most common questions our clients are faced
                with in this section
              </Paragraph>
            </div>
          </div>
        </div>
      </Root>
      <div className="container">
        <div className="row">
          <FAQContainer className="col-12">
            <div className="d-flex pb-5 justify-content-start">
              <div className="position-relative w-100">
                <StyledFaq>
                  <div className="row">
                    <div className="col-12">
                      <FAQItem img={yieldFarming} title="Yield Farming">
                        {YieldFarmingQuestions.map((item) => {
                          return (
                            <FaqContentRow
                              key={item.num}
                              title={`${item.num}. ${item.ques}`}
                              content={item.ans}
                            />
                          );
                        })}
                      </FAQItem>
                      <FAQItem img={farmingonDonkey} title="Farming on Don-key">
                        {FarmingQues.map((item) => {
                          return (
                            <FaqContentRow
                              key={item.num}
                              title={`${item.num}. ${item.ques}`}
                              content={item.ans}
                            />
                          );
                        })}
                      </FAQItem>
                      <FAQItem img={stakingonDonkey} title="Staking on Don-key">
                        {StakingQues.map((item) => {
                          return (
                            <FaqContentRow
                              key={item.num}
                              title={`${item.num}. ${item.ques}`}
                              content={item.ans}
                            />
                          );
                        })}
                      </FAQItem>

                      <FAQItem
                        img={RewardsIcon}
                        title="Referral Rewards on Don-key"
                      >
                        {ReferralQues.map((item) => {
                          return (
                            <FaqContentRow
                              key={item.num}
                              title={`${item.num}. ${item.ques}`}
                              content={item.ans}
                            />
                          );
                        })}
                      </FAQItem>

                      <FAQItem
                        img={security}
                        title="Security on Don-key"
                      >
                        {SecuirtyQues.map((item) => {
                          return (
                            <FaqContentRow
                              key={item.num}
                              title={`${item.num}. ${item.ques}`}
                              content={item.ans}
                            />
                          );
                        })}
                      </FAQItem>
                      {/* <FAQItem img={statistics} title="Statistics">
                       <Statistics />
                      </FAQItem> */}
                    </div>
                  </div>
                </StyledFaq>
              </div>
            </div>
          </FAQContainer>
        </div>
      </div>
    </>
  );
};
