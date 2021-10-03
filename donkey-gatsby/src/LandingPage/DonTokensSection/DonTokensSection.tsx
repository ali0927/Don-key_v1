import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Heading3 } from "../components";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { StaticImage } from "gatsby-plugin-image";


const Root = styled.div`
  /* margin-top: 120px;
  margin-bottom: 120px; */
`;

const Heading = styled.h1`
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: left;
  color: #000;
`;

const Content = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  color: #222222;
  text-align: left;
  margin: 0;
`;

const LineRoot = styled.div`
  width: 100%;
  @media only screen and (max-width: ${breakPoints.md}) {
    width: 25%;
  }
  @media only screen and (max-width: ${breakPoints.sm}) {
    width: 100%;
  }
`;

export const DonTokenSection: React.FC = () => {
  return (
    <>
      <Root className="pt-md-5 pb-md-5">
        <Container>
          <Row className="mt-5 mb-5 justify-content-between">
            <Col lg={4} className="d-flex align-items-center justify-content-center mb-5 mb-lg-0">
              <div>
                <StaticImage
                  className="d-inline-block"
                  src="./images/donkey.png"
                  alt="ImageNotFound"
                />
              </div>
            </Col>
            <Col lg={8}>
              <div>
                <div className="d-flex">
                  <LineRoot className="d-flex justify-content-lg-end mr-5 mt-2">
                    <StaticImage className="d-none d-md-block" layout="fixed" src="./images/img.png" alt="Image not found" />
                    <StaticImage className="d-block d-md-none"  layout="fixed" src="./images/mobilebullets.png" alt="Bullets" />
                  </LineRoot>
                  <div className="d-flex flex-column justify-content-between">
                    <div className="mb-md-4">
                      <Heading3 className="mb-3">DON Token</Heading3>
                      <Content>
                        DON tokens are the full utility token for the Don-key
                        "copy farming" platform. In order to access the DAPP and
                        participate you need to hold at least 100 $DON in you
                        wallet.
                      </Content>
                    </div>
                    <div className="mt-3 mt-md-5">
                      <Heading>Tiers and benefits</Heading>
                      <Content>
                        Stake $DON and climb up the tier ladder to get more and
                        more utility from the platform. From extra APY to access
                        to VIP farmers, reduces fees and much more to come.
                      </Content>
                    </div>

                    <div>
                      <Heading>Exchangeable</Heading>
                      <Content>
                        You can redeem your $DON tokens on either Uniwsap or
                        Pancakeswap and soon CEX listing are coming
                      </Content>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Root>
    </>
  );
};
