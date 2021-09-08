import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Heading3,LandingParagraph } from "../components";
import Lines from "./images/img.png"
import styled from "styled-components";
import Donkey from "./images/donkey.png"

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
 color: ##222222;
  text-align: left;
  margin: 0;

`;

export const DonTokenSection: React.FC = () => {
  return (
    <>
      <div className="pt-5 pb-5">
        <Container>
          <Row className="mt-5 mb-5">
            <Col md={4} className="mr-md-4 d-flex align-items-center">
              <div>
                <img
                  src={Donkey}
                  className="d-inline-block"
                  alt="ImageNotFound"
                />
              </div>
            </Col>
            <Col md={7} className="ml-md-4">
              <div>
                <Heading3 className="mb-3 mt-md-2 mt-5">DON Tokens</Heading3>
                <div className="d-flex">
                <div style={{marginRight: 50, width: "18%"}}>
                     <img style={{height: "99%"}} src={Lines} alt="Image not found"/>
                </div>
                <div>
                <Content>
                  DON tokens are airdropped to all farmers based on monthly
                  trading results and take into account: ROI, Risk level, asset
                  exposure and more. the better you are , the more you get
                </Content>
                <Heading style={{marginTop:151}}>Yield and Dividend </Heading>
                <Content>
                  DON tokens represents the farmer’s yield based on his own
                  strategies, in addition to a proportionate monthly dividend
                  from Don-key’s total monthly yield
                </Content>
                <Heading style={{marginTop:29}} >Exchangeable</Heading>
                <Content>
                  You can redeem your DON tokens at any time or hold on to them
                  and accumulate higher future coupons
                </Content>
                </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
