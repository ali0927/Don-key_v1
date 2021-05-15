import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogoWhite } from "./LogoWhite";
import styled from "styled-components";

const CustomFooter = styled.footer`
  background: #070602;
`;

export const Footer = () => {
  return (
    <CustomFooter className="pt-5 pb-5 mb-0">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <LogoWhite />
              <p style={{ color: "#fff" }}>
                Contract address:
                <a href="https://etherscan.io/address/0x217ddead61a42369a266f1fb754eb5d3ebadc88a">
                  {" "}
                  0x217ddead61a42369a266f1fb754eb5d3ebadc88a
                </a>
              </p>
              <p className="text-white ml-5"> All Rights Reserved 2021</p>
            </div>
          </Col>
        </Row>
      </Container>
    </CustomFooter>
  );
};
