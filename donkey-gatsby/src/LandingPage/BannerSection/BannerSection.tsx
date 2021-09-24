import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HeroImage } from "../HeroImage";
import styled from "styled-components";
import { LandingParagraph } from "../components";

const BannerWrapper = styled.div`
  & h1 {
    font-family: "Work Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-weight: bold;
    font-size: 90px;
    line-height: 96.5%;
    display: flex;
    align-items: center;
    /* media queries */
    @media (max-width: 767px) {
      font-size: 65px;
    }
  }
  & a,
  a:hover {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: inline-flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.03em;
    text-decoration-line: underline;
    color: $colorBlack;
  }
`;

const Title = styled.h1`
   color: #070602 ;
`;

const RightBannerWrapper= styled.div`
  overflow: hidden;
  text-align: right;
  & img {
    max-width: 100%;
    object-fit: cover;
  }
`;

export const BannerSection: React.FC = () => {
  return (
    <>
      <div className="mt-4 pb-5">
        <Container>
          <Row>
            <Col md={5}>
              <BannerWrapper className="mt-md-5 pt-md-4">
                <Title className="colorBlack">Outsmart DeFi</Title>
                <LandingParagraph className="mt-4">
                  Find your favorite farmers, follow their strategies, and boost
                  your yield
                </LandingParagraph>
                <div className="mt-5"></div>
              </BannerWrapper>
            </Col>
            <Col md={7}>
              <RightBannerWrapper>
                <HeroImage />
              </RightBannerWrapper>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
