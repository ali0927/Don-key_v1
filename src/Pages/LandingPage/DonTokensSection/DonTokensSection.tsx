import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Heading3,LandingParagraph } from "../components";

export const DonTokenSection: React.FC = () => {
  return (
    <>
      <div className="pt-5 pb-5">
        <Container>
          <Row className="mt-5 mb-5">
            <Col md={4} className="mr-md-4">
              <div>
                <img
                  src="/assets/images/token.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </div>
            </Col>
            <Col md={7} className="ml-md-4">
              <div>
                <Heading3 className="mb-3 mt-md-2 mt-5">DON Tokens</Heading3>
                <LandingParagraph>
                  DON tokens are airdropped to all farmers based on monthly
                  trading results and take into account: ROI, Risk level, asset
                  exposer and more. the better you are , the more you get
                </LandingParagraph>
                <h5 className="mt-4">Yield and Dividend </h5>
                <LandingParagraph>
                  DON tokens represents the farmer’s yield based on his own
                  stratagies, in addition to a proportionate monthly dividend
                  from Don-key’s total monthly yield
                </LandingParagraph>
                <h5 className="mt-4">Exchangeable</h5>
                <LandingParagraph>
                  You can redeem your DON tokens at any time or hold on to them
                  and accumulate higher future coupons
                </LandingParagraph>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
