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
          <Col sm="2">
            <LogoWhite />
          </Col>
          {/* <div className="d-flex justify-content-between align-items-center"> */}
          <Col sm="8" style={{ textAlign: "center" }}>
            <div>
              <p style={{ color: "#fff" }}>
                ERC-20 Contract address:
                <a
                  href="https://etherscan.io/address/0x217ddead61a42369a266f1fb754eb5d3ebadc88a"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  0x217ddead61a42369a266f1fb754eb5d3ebadc88a
                </a>
              </p>
              <p style={{ color: "#fff" }}>
                BEP-20 Contract address:
                <a
                  href="https://bscscan.com/address/0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255
                </a>
              </p>
            </div>
          </Col>
          <Col sm="2" style={{ textAlign: "center" }}>
            <p className="text-white"> All Rights Reserved 2021</p>
          </Col>
          {/* </div> */}
        </Row>
      </Container>
    </CustomFooter>
  );
};
