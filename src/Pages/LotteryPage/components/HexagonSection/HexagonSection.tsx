import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 770px;
  min-height: 300px;
  margin-top: -9%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HexaginWrapper = styled.div`
  position: relative;
  width: 221px;
  height: 127.59px;
  background-color: #ffffff;
  margin: 63.8px 0;
  /* box-shadow: 0px 10px 20px rgba(41, 41, 42, 0.07); */
  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 156.27px;
    height: 156.27px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 32.3647px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }

  &:before {
    top: -78.1353px;
    box-shadow: none !important;
  }

  &:after {
    bottom: -78.1353px;
  }

  /*cover up extra shadows*/
  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: 0;
    width: 221px;
    height: 127.5944px;
    z-index: 2;
    background: inherit;
  }
`;

const Heading = styled.p`
  font-family: Roboto;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  margin-bottom: 0px;
`;

const SubHeading = styled.p`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
`;

export const HexagonSection: React.FC = () => {
  const Hexagon = (heading: string, subheading: string) => {
    return (
      <>
        <HexaginWrapper>
          <span>
            <div className="d-block">
              <Heading>{heading}</Heading>
              <SubHeading>{subheading}</SubHeading>
            </div>
          </span>
        </HexaginWrapper>
      </>
    );
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Wrapper className="row">
          <div className="col-md-4 d-flex justify-content-center">{Hexagon("14+", "Users")}</div>
          <div className="col-md-4  d-flex justify-content-center">{Hexagon("$540K", "Liquidity ")}</div>
          <div className="col-md-4 d-flex justify-content-center">{Hexagon("25+", "DON")}</div>
        </Wrapper>
      </Container>
    </>
  );
};