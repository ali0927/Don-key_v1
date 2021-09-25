import { StaticImage } from 'gatsby-plugin-image'
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import comingsoon from "images/comingsoon.svg";
import { theme } from "theme";
import { ButtonWidget } from "components/Button";

const Root = styled.div`
  background:${theme.palette.background.yellow};
  overflow: hidden;
  padding: 200px 0;
  @media screen and (max-width: 978px) {
    padding: 0px;
  }
`;

const Title = styled.h3`
  font-family: "Work Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: bold;
  font-size: 2.80rem;
  color: #070602;
`;

const Paragraph = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 132%;
  display: flex;
  align-items: center;
  color: #222222;
`;

const ImageCommingSoon = styled.div`
  position: absolute;
  top: -25px;
  right: 3%;
`;

const TradingImageRoot = styled.div`
  position: relative;
  @media screen and (max-width: 500px) {
    overflow: hidden;
    margin-top: 50px;

    & img {
      max-width: 100%;
    }
  }
`;

const TradingImage = styled.div`
  top: -65px;
  min-width: 1000px;
  position: absolute;
  @media screen and (max-width: 800px) {
    position: relative;
    top: 0;
    margin-top: 50px;
    min-width: initial;
  }
`;

const StyledButtonWidget = styled(ButtonWidget)`
border: 1px solid rgba(7, 6, 2, 0.56) !important;
color: rgba(7, 6, 2, 0.56) !important;
border-radius: 4px;
`

export const StrategyBuilderSection: React.FC = () => {
  return (
    <>
      <Root className="px-auto" >
        <Container >
          <Row className="my-5">
            <Col lg={7}>
              <div>
                <Title className="mb-3 mt-3">Farming strategy builder</Title>
                <Paragraph className="mt-4 col-lg-9 p-0">
                  Build your DeFi strategy with a drag and drop interface
                  allowing you to adapt fast to the dynamic world of DeFi and
                  secure your yield
                </Paragraph>
                <StyledButtonWidget
                  varaint="outlined"
                  height="50px"
                  width="152px"
                  disabled
                  className="position-relative mt-4"
                >
                  <ImageCommingSoon >
                    <img src={comingsoon} alt="comming soon icon" />
                  </ImageCommingSoon>
                  Build strategy
                </StyledButtonWidget>
              </div>
            </Col>
            <Col lg={4}>
              <TradingImageRoot>
                <TradingImage>
                <StaticImage src="../Strategy.png" alt="strategy cover" />
                </TradingImage>
              </TradingImageRoot>
            </Col>
          </Row>
        </Container>
      </Root>
    </>
  );
};
