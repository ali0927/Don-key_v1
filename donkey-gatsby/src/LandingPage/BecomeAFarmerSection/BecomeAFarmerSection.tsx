import * as React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Heading3 } from "../components";
import line from "./images/line.png";
import { theme } from "theme";
import { breakPoints } from "breakponts";

const CardBanner = styled.div`
  position: relative;
  z-index: 9;
  background: #f5f5f5;
  .card {
    /* background: #f5f5f5;
    border-radius: 5px; */
    border: none;
    padding: 0px 10px;
    margin-bottom: 20px;
    z-index: 99;
  }
  .card img {
    height: 236px;
    display: block;
    margin: 0 auto;
    @media only screen and (min-width: ${breakPoints.lg}) {
      height: 265px;
    }
  }

  .card-title {
    font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans",
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-weight: 500;
    font-size: 23px;
    line-height: 130%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #000;
    margin-top: 16px;
    @media only screen and (min-width: ${breakPoints.lg}) {
      font-size: 24px;
      justify-content: center;
      margin-top: 30px;
    }
  }
  .card-text {
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    text-align: left;
    @media only screen and (min-width: ${breakPoints.lg}) {
      font-size: 16px;
      text-align: center;
    }
  }
  .card-subtitle {
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $paracolorBlack;
  }
`;

const CardFooter = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  ${theme.mediaQueries.lg.up} {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .card {
    background: #f5f5f5;
  }
`;

const Icons = styled.div`
  height: 265px;
  display: grid;
  place-items: center;
  margin-bottom: 75px !important;
`;

const LinesRoot = styled.div`
  position: absolute;
  bottom: 33%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;

  img {
    width: 73%;
  }
`;

const DarkLine = styled.div`
  height: 5px;
  width: 29px;
  background: #000;
`;

export const BecomeAFarmerSection: React.FC = () => {
  return (
    <>
      <CardBanner>
        <CardFooter>
          <Container>
            <Heading3 className="mb-0 mb-md-5 px-4 text-md-center">
              Become a <br className="d-md-none" /> Don-key farmer
            </Heading3>
            <Row className="pt-5 position-relative">
              <Col lg={4}>
                <Card className="h-100">
                  <Card.Body>
                    <Icons>
                      <StaticImage
                        src="../build-strategy.png"
                        alt="Build your strategy"
                      />
                    </Icons>
                    <DarkLine className="d-lg-none" />
                    <Card.Title>Build your strategy</Card.Title>
                    <Card.Text className="mt-3 mt-lg-4">
                      The most user friendly interface in the DeFi space. Create
                      complicated strategies with 0 code.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="h-100">
                  <Card.Body>
                    <Icons>
                      <StaticImage
                        src="../get-liquidity.png"
                        alt="Get liquidity"
                      />
                    </Icons>
                    <DarkLine className="d-lg-none"  />
                    <Card.Title>Get liquidity</Card.Title>
                    <Card.Text className="mt-3 mt-lg-4">
                      Climb up the leader board and get more liquidity in your
                      pool
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="h-100">
                  <Card.Body>
                    <Icons>
                      <StaticImage
                        src="../boost-yield.png"
                        alt="Boost your yield"
                      />
                    </Icons>
                    <DarkLine className="d-lg-none"  />

                    <Card.Title>Boost your yield</Card.Title>
                    <Card.Text className="mt-3 mt-lg-4">
                      Make commission on your yields and get extra bonuses based
                      on your ranks and performance
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <LinesRoot className="d-none d-lg-flex">
                <img src={line} alt="Lines" />
              </LinesRoot>
            </Row>
          </Container>
        </CardFooter>
      </CardBanner>
    </>
  );
};
