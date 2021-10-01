import React, { useEffect } from "react";
import styled from "styled-components";
import { theme } from "theme";
import { StaticImage } from "gatsby-plugin-image";

const Body = styled.div`
  z-index: 10;
  position: relative;
  @media (max-width: 1040px) {
    display: flex;
    justify-content: center;
  }
`;

const Row = styled.div`
  justify-content: space-between;
  position: relative;
  top: -60px;
  margin-bottom: 0px !important;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1040px) {
    justify-content: center !important;
    margin-bottom: 0px !important;
  }
`;

const FrequentRoot = styled.div`
  background: ${theme.palette.common.white};
  border-radius: 10px;
  box-shadow: rgb(0 18 80 / 10%) 0px 5px 20px;
  position: relative;
  max-width: 550px;
  width: 550px;
  margin-bottom: 2rem;
  padding: 1.5rem;
  display: flex;

  @media (max-width: 1040px) {
    br {
      display: none;
    }
  }

  @media (max-width: 600px) {
    width: 400px;
    padding: 1rem;
  }
  @media (max-width: 420px) {
    width: 340px;
    margin: 0 5px;
    margin-bottom: 2rem;
    padding: 15px;
  }
`;

const Question = styled.h3`
  font-style: normal;
  font-size: 23px;
  color: #000;
  font-weight: 600;
  line-height: 34.5px;
  width: 290px;
  @media (max-width: 1040px) {
    width: fit-content;
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

const QuestionNumber = styled.p`
  width: 50px;
  min-width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  font-size: 14px;
  color: #000;
  background-color: #fff037;
  border-radius: 10px;
  margin-right: 20px;

  @media (max-width: 420px) {
    font-size: 12px;
    min-width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const Content = styled.p`
  font-style: normal;
  font-size: 16px;
  color: #333;
  margin-top: 0px;
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  right: -10px;
  bottom: 103.5px;
  width: 580px;
  height: 300px;

  @media (max-width: 1040px) {
    position: relative;
    margin-top: 30px;
  }
  @media (max-width: 610px) {
    width: 400px;
    height: 250px;
    bottom: 29.5px;
    margin-top: -95px;
  }
  @media (max-width: 420px) {
    width: 300px;
    height: 200px;
    bottom: 9.5px;
    margin-top: -110px;
  }
`;

const faqquestions = {
  sections: [
    {
      title: "General Questions",
      faq: [
        {
          ques: "What do I need to use the Don-key platform?",
          ans: "Only 100 don",
        },
        {
          ques: "Do I farm with the DON token?",
          ans: "No, you farm with whatever token you want to earn APY on.",
        },
        {
          ques: "Does Don-Key offer staking?",
          ans: "Yes, but staking is only offered to users who farm on the platform.",
        },
        {
          ques: "What are the staking rewards?",
          ans: "Rewards are determined by 5 DON tiers, outlined below. The higher your tier, the more additional APY in DON you can earn,up to an extra 100% APY!",
        },
        {
          ques: "What is Don-Key's unstaking policy?",
          ans: "Farming deposits and rewards are instantly claimable, while DON deposits have a 14 day cool off period after unstaking (rewards are instantly claimable.)",
        },
        {
          ques: "How does Don-key collect fees?",
          ans: "At the time of withdrawal, Don-key only claims a percent fee on profits generated for the user - distributing 10% equally between platform maintenance and farmer rewards.",
        },
        {
          ques: " What strategies are DON staking reward available for?",
          ans: "At the moment BSC and ETH based strategies offer DON stakingrewards but the team is working on launching the token for MATIC, AVAX, and SOL as quickly as possible so that extra rewards can be offered on these chains as well.",
        },
      ],
    },
    {
      title: "Section",
      faq: [
        {
          ques: "This is a sample Question",
          ans: "This is a sample answer",
        },
        {
          ques: "This is a sample Question",
          ans: "This is a sample answer",
        },
        {
          ques: "This is a sample Question",
          ans: "This is a sample answer",
        },
        {
          ques: "This is a sample Question",
          ans: "This is a sample answer",
        },
        {
          ques: "This is a sample Question",
          ans: "This is a sample answer This is a sample answer This is a sample answer This is a sample answer This is a sample answer This is a sample answer This is a sample answer.This is a sample answer.This is a sample answer.",
        },
      ],
    },
  ],
};

export const CardSection = (props: { value: number }) => {
  useEffect(() => {
    console.log("#####", props.value);
  }, [props.value]);
  return (
    <Body className="d-flex justify-content-center pb-0 mb-0">
      <div className="container position-relative d-flex flex-column align-items-center">
        <Row className={props.value === 1 ? "row" : "d-none"}>
          {faqquestions.sections[0].faq.map((QA, index) => {
            return (
              <FrequentRoot key={index}>
                <QuestionNumber>0{index+1}</QuestionNumber>
                <div className="">
                  <div className="mb-4">
                    <Question>{QA.ques}</Question>
                    <Content>{QA.ans}</Content>
                  </div>
                </div>
              </FrequentRoot>
            );
          })}
        </Row>
        <Row className={(props.value !== 1 && props.value!== undefined) ? "row" : "d-none"}>
          {faqquestions.sections[1].faq.map((QA, index) => {
            return (
              <FrequentRoot key={index}>
                <QuestionNumber>0{index+1}</QuestionNumber>
                <div className="">
                  <div className="mb-4">
                    <Question>{QA.ques}</Question>
                    <Content>{QA.ans}</Content>
                  </div>
                </div>
              </FrequentRoot>
            );
          })}
        </Row>

        <ImageWrapper className={( props.value!== undefined) ? "" : "d-none"}>
          <StaticImage
            className="d-inline-block"
            src="../../../images/donkeyImageFAQ.png"
            alt="ImageNotFound"
          />
        </ImageWrapper>
      </div>
    </Body>
  );
};
