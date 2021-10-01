import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "theme";
import { CardSection } from "../CardSection/CardSection";

const Root = styled.div`
  background-color: #fff037;
  min-height: 450px;
  padding-top: 4rem;
  @media (max-width: 740px) {
    min-height: 350px;
  }
  @media (max-width: 600px) {
    padding: 0;
    min-height: 300px;
  }
  svg {
    transform: translate3d(0px, 0px, 0px) scale(1.1) !important;
  }
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 150px;
    border-radius: 50%;
    bottom: -75px;
    display: none;
    z-index: 0;
    background-color: ${theme.palette.background.yellow};
    ${theme.mediaQueries.md.up} {
      display: block;
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
`;

const FooterSubHeading = styled.div`
  font-size: 23px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  margin-top: 1.8rem;
  color: #8d8d8d;
  @media (max-width: 990px) {
    font-size: 20px;
  }
  @media (max-width: 780px) {
    font-size: 16px;
    width: 150px;
  }
  @media (max-width: 580px) {
    font-size: 14px;
    width: 115px;
    margin-top: 0.8rem;
    font-weight: 700;
    line-height: 32px;
  }
`;

const FooterRow = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    width: 700px;
    overflow: hidden;
  }
`;

const Col = styled.div`
  margin-right: 2rem;
  .active {
    color: #000;
    font-weight: 700;
  }
  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 100;
  }
  @media (max-width: 980px) {
    margin-right: 1rem;
  }
  @media (max-width: 780px) {
    margin-right: 0.3rem;
  }
`;

const GrayBorder = styled.hr`
  position: absolute;
  width: 100%;
  border-top: 1.8px dashed#000D09;
  top: 2px;
  margin: 0px;
`;

const DarkBorder = styled.div`
  width: 29px;
  height: 5px;
  background: #000;
`;

export const MainSection: React.FC = ( ) => {
  const [active, setActive] = useState(1);

  const handleClick = (value: number) => {
    setActive(value);
  };
  return (
    <>
      <Root className="position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-0 mb-sm-5">
              <Heading>FAQ</Heading>
              <Paragraph className="mt-2 mt-sm-4 w-md-50">
                Find answers to all most common questions our clients are faced
                with in this section
              </Paragraph>
            </div>
          </div>

          <div className="d-flex pb-5 justify-content-start">
            <FooterRow className="position-relative">
              <GrayBorder className="d-block" />
              <Col className="position-relative d-flex flex-column align-items-start">
                <DarkBorder className={active === 1 ? "opacity-100" : "opacity-0"}/>
                <FooterSubHeading
                  onClick={() => handleClick(1)}
                  className={active === 1 ? "active" : ""}
                >
                  General Questions
                </FooterSubHeading>
              </Col>
              <Col className="position-relative d-flex flex-column  align-items-start">
              <DarkBorder className={active === 2 ? "opacity-100" : "opacity-0"}/>
                <FooterSubHeading
                  onClick={() => handleClick(2)}
                  className={active === 2 ? "active" : ""}
                >
                  Why buy Don-key?
                </FooterSubHeading>
              </Col>
              <Col className="position-relative d-flex flex-column   align-items-start">
              <DarkBorder className={active === 3 ? "opacity-100" : "opacity-0"}/>
                <FooterSubHeading
                  onClick={() => handleClick(3)}
                  className={active === 3 ? "active" : ""}
                >
                  Section 3
                </FooterSubHeading>
              </Col>
              <Col className="position-relative d-flex flex-column  align-items-start">
              <DarkBorder className={active === 4 ? "opacity-100" : "opacity-0"}/>
                <FooterSubHeading
                  onClick={() => handleClick(4)}
                  className={active === 4 ? "active" : ""}
                >
                  Section 4
                </FooterSubHeading>
              </Col>
            </FooterRow>
          </div>
        </div>
      </Root>
      <CardSection value={active} />
    </>
  );
};
