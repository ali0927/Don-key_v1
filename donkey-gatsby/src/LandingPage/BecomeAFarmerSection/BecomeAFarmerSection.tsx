import * as React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { StaticImage } from 'gatsby-plugin-image'
import styled from "styled-components";
import { Heading3 } from "../components";

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
    height: 265px;
    display: block;
    margin: 0 auto;
  }

  .card-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 130%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $colorBlack;
    margin-top: 30px;
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
  padding-top: 180px;
  padding-bottom: 180px;
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
`;

export const BecomeAFarmerSection: React.FC = () => {
  return (
    <>
      <CardBanner>
        <CardFooter>
          <Container>
            <Heading3 className="mb-5 text-center">
              Become a Don-key farmer
            </Heading3>
            <Row className="pt-5 position-relative">
              <Col lg={4}>
                <Card className="h-100">
                  <Card.Body>
                    <Icons>
                    <StaticImage src="../build-strategy.png" alt="Build your strategy" />
                    </Icons>
                    <Card.Title>Build your strategy</Card.Title>
                    <Card.Text className="mt-4 text-center">
                      The most user friendly interface in the DeFi space. create
                      complicated strategies with 0 code.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="h-100">
                  <Card.Body>
                    <Icons>
                    <StaticImage src="../get-liquidity.png" alt="Get liquidity" />
                    </Icons>
                    <Card.Title>Get liquidity</Card.Title>
                    <Card.Text className="mt-4 text-center">
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
                    <StaticImage src="../boost-yield.png" alt="Boost your yield" />
                    </Icons>

                    <Card.Title>Boost your yield</Card.Title>
                    <Card.Text className="mt-4 text-center">
                      Make commission on your yields and get extra bonuses based
                      on your ranks and performance
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <LinesRoot className="d-none d-lg-flex">
                {/* <img src={line} alt="Lines" /> */}
              </LinesRoot>
            </Row>
          </Container>
        </CardFooter>
      </CardBanner>
    </>
  );
};
