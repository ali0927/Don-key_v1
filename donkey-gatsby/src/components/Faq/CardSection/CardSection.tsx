import React from "react";
import styled from "styled-components";
import { theme } from "theme";
import { StaticImage } from "gatsby-plugin-image";

const Body = styled.div`
  z-index: 10;
  position: relative;
  @media( max-width: 1040px){
    display: flex;
    justify-content: center;
  }
`;

const Row = styled.div`
  justify-content: space-between;
  position: relative;
  top: -60px;
  margin-bottom: 0 !important;
  @media( max-width: 1040px){
    justify-content: center !important;
  }
  @media( max-width: )
`

const FrequentRoot = styled.div`
  background: ${theme.palette.common.white};
  border-radius: 10px;
  box-shadow: rgb(0 18 80 / 10%) 0px 5px 20px;
  position: relative;
  max-width: 550px;
  width: 550px;
  margin-bottom: 2rem;
  padding: 1.5rem;
  @media (max-width: 600px) {
    width: 400px;
    padding: 1rem;
  }
  @media( max-width: 420px){
    width: 340px;
    margin: 0 5px;
    margin-bottom: 2rem;
    padding: 15px;
  }
`;

const Question = styled.h3`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-style: normal;
  font-size: 23px;
  color: #000;
  font-weight: 600;
  width: 280px;
  @media (max-widht: 968px) {
    width: fit-content;
  }
  @media( max-width: 420px){
    font-size: 18px;
    width: fit-content;
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
  margin-right: 10px;
  @media( max-width: 420px){
    font-size: 12px;

    min-width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const Content = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-size: 16px;
  color: #333;
  margin-top: 0px;
  @media( max-width: 420px){
    font-size: 14px;
    width: fit-content;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  right: -10px;
  bottom: 103.5px;
  width: 580px;
  height: 300px;

  @media( max-width: 1040px) {
    position: relative;
    margin-top: 30px;
  }
  @media( max-width: 610px){
    width: 400px;
    height: 250px;
    bottom: 29.5px;
  }
  @media( max-width: 420px){
    width: 300px;
    height: 200px;
    bottom: 9.5px;
    margin-top: -70px;
  }
`;

export const CardSection = () => {
  return (
    <Body className="d-flex justify-content-center pb-0 mb-0">
      <div className="container position-relative d-flex flex-column align-items-center">
        <Row className="row d-flex flex-wrap">
          <FrequentRoot className=" d-flex">
            <QuestionNumber>01</QuestionNumber>
            <div className="">
              <div className="mb-4">
                <Question>What do I need to use the Don-key platform?</Question>
                <Content>Only 100 DON</Content>
              </div>
            </div>
          </FrequentRoot>

          <FrequentRoot className=" d-flex">
            <QuestionNumber>02</QuestionNumber>
            <div className="">
              <div className="mb-4">
                <Question>Do I farm with the DON token?</Question>
                <Content>
                  No, you farm with whatever token you want to earn APY on.
                </Content>
              </div>
            </div>
          </FrequentRoot>

          <FrequentRoot className=" d-flex">
            <QuestionNumber>03</QuestionNumber>
            <div className="">
              <div className="mb-4">
                <Question>Does Don-key offer staking?</Question>
                <Content>
                  Yes, but staking is only offered to users who farm on the
                  platform.
                </Content>
              </div>
            </div>
          </FrequentRoot>

          <FrequentRoot className=" d-flex">
            <QuestionNumber>04</QuestionNumber>
            <div className="">
              <div className="mb-4">
                <Question>What are the staking rewards?</Question>
                <Content>
                  Rewards are determined by 5 DON tiers, outlined below. The
                  higher your tier, the more additional APY in DON you can earn,
                  up to an extra 100% APY!
                </Content>
              </div>
            </div>
          </FrequentRoot>

          <FrequentRoot className=" d-flex">
            <QuestionNumber>05</QuestionNumber>
            <div className="">
              <div className="mb-4">
                <Question>How does Don-key collect fees?</Question>
                <Content>
                  At the time of withdrawal, Don-key only claims a percent fee
                  on profits generated for the user - distributing 10% equally
                  between platform maintenance and farmer rewards.
                </Content>
              </div>
            </div>
          </FrequentRoot>

          <FrequentRoot className=" d-flex">
            <QuestionNumber>06</QuestionNumber>
            <div className="">
              <div className="mb-4">
                <Question>What is Don-key’s unstaking policy?</Question>
                <Content>
                  Farming deposits and rewards are instantly claimable, while
                  DON deposits have a 14 day cool off period after unstaking
                  (rewards are instantly claimable.)
                </Content>
              </div>
            </div>
          </FrequentRoot>

          <FrequentRoot className="d-flex">
            <QuestionNumber>07</QuestionNumber>
            <div className="">
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
            </div>
          </FrequentRoot>
        </Row>
        <ImageWrapper className="">
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
