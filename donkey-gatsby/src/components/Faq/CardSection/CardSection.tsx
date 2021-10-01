import React from "react";
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

export const CardSection = ({
  questions,
}: {
  questions: { ques: string; ans: string }[];
}) => {
  return (
    <Body className="d-flex justify-content-center pb-0 mb-0">
      <div className="container position-relative d-flex flex-column align-items-center">
        <Row className={"row"}>
          {questions.map((QA, index) => {
            return (
              <FrequentRoot key={index}>
                <QuestionNumber>0{index + 1}</QuestionNumber>
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

        <StaticImage
          className="d-inline-block"
          src="../../../images/donkeyImageFAQ.png"
          alt="Donkey Reading"
        />
      </div>
    </Body>
  );
};
