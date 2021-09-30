import React from "react";
import styled from "styled-components";
import { theme } from "theme";


const Root = styled.div`
  background-color: #fff037;
  min-height: 500px;
  padding-top: 20px;
  @media( max-width: 740px ){
    min-height: 400px;
  }
  @media( max-width: 740px ){
    min-height: 350px;
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
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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

const FooterHeading = styled.div`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-top: 1.8rem;
  @media( max-width:990px ){
    font-size: 20px;
  }
  @media( max-width:780px ){
    font-size: 16px;
    width: 145px;
  }
  @media( max-width:580px ){
    font-size: 12px;
    width: 110px;
    margin-top: .5rem !important;
  }
`;

const FooterSubHeading = styled.div`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-top: 1.8rem;
  color: #8d8d8d;
  @media( max-width:990px ){
    font-size: 20px;
  }
  @media( max-width:780px ){
    font-size: 16px;
    width: 150px;
  }
  @media( max-width:580px ){
    font-size: 12px;
    width: 112px;
    margin-top: .8rem;
  }
`;

const FooterRow = styled.div`
  width: 100%;
  display: flex;
  @media( max-width: 768px){
    width: 700px;
    overflow: hidden;
  }
`;

const Col = styled.div`
  margin-right: 2rem;
  @media( max-width: 980px){
     margin-right: 1rem;
  }
  @media( max-width: 780px ){
    margin-right: .3rem;
  }
`;

const GrayBorder = styled.hr`
  position: absolute;
  width: 100%;
  border-top: 1.8px dashed#000D09;
  top: 2px;
  margin: 0px;
  margin-left: 15px;
`;

const DarkBorder = styled.div`
  width: 29px;
  height: 5px;
  background: #000;
`;


export const MainSection: React.FC = () => {
  return (
    <>
      <Root className="position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-sm-5">
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
              <Col className=" mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading>
                  General Questions
                </FooterHeading>
              </Col>
              <Col className=" mb-4 position-relative d-flex flex-column  align-items-start">
                <FooterSubHeading>Why buy Don-key?</FooterSubHeading>
              </Col>
              <Col className=" mb-4 position-relative d-flex flex-column   align-items-start">
                <FooterSubHeading>Section 3</FooterSubHeading>
              </Col>
              <Col className=" mb-4 position-relative d-flex flex-column  align-items-start">
                <FooterSubHeading>Section 4</FooterSubHeading>
              </Col>
            </FooterRow>
          </div>
        </div>

      </Root>
    </>
  );
};
