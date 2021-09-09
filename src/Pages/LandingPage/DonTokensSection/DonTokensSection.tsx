import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Heading3,LandingParagraph } from "../components";
import Lines from "./images/img.png"
import styled from "styled-components";
import Donkey from "./images/donkey.png"
import { breakPoints } from "breakponts";

const Root = styled.div`
    margin-top: 120px;
    margin-bottom: 120px;
`;

const Heading = styled.h1`
  font-family: Poppins;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: left;
  color: #000;
`;

const Content = styled.p`
  font-family: Poppins;
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
      <Root className="pt-5 pb-5">
        <Container>
          <Row className="mt-5 mb-5 justify-content-between">
            <Col lg={4} className="d-flex align-items-center mb-3 mb-lg-0">
              <div>
                <img
                  src={Donkey}
                  className="d-inline-block"
                  alt="ImageNotFound"
                />
              </div>
            </Col>
            <Col lg={8}>
              <div>
                <div className="d-flex">
                <LineRoot className="d-flex justify-content-lg-end mr-5 mt-2">
                     <img src={Lines} alt="Image not found"/>
                </LineRoot>
                <div className="d-flex flex-column justify-content-between">
                   <div>
                      <Heading3 className="mb-3">DON Tokens</Heading3>
                      <Content>
                         DON tokens are airdropped to all farmers based on monthly
                         trading results and take into account: ROI, Risk level, asset
                         exposure and more. the better you are , the more you get
                       </Content>
                   </div>
                   <div className="mt-5">
                       <Heading >Yield and Dividend </Heading>
                       <Content>
                           DON tokens represents the farmer’s yield based on his own
                           strategies, in addition to a proportionate monthly dividend
                           from Don-key’s total monthly yield
                      </Content>
                  </div>

                  <div>
                      <Heading  >Exchangeable</Heading>
                      <Content>
                         You can redeem your DON tokens at any time or hold on to them
                         and accumulate higher future coupons
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
