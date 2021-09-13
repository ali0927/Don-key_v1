import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogoWhite from "./image/logo.svg";
import styled from "styled-components";
import Image from "next/image";

const CustomFooter = styled.footer`
  background: #070602;
`;

export const Footer = () => {
  return (
    <CustomFooter className="pt-5 pb-5 mb-0">
      <Container>
        <Row>
          <Col sm="2">
            <Image src={LogoWhite} alt="Logo not found"/>
          </Col>
          <Col sm="8" style={{ textAlign: "center" }}>
            <div>
              <p style={{ color: "#fff" }}>
                ERC-20 Contract address:
                <a
                  href="https://etherscan.io/address/0x217ddead61a42369a266f1fb754eb5d3ebadc88a"
                  target="_blank"
                  rel="noreferrer"
                  style={{wordBreak: "break-word"}}
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
                  style={{wordBreak: "break-word"}}
                  rel="noreferrer"
                >
                  {" "}
                  0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255
                </a>
              </p>
              <p style={{ color: "#fff" }}>
                This project is in beta. Use at your own risk.
              </p>
            </div>
          </Col>
          <Col sm="2" style={{ textAlign: "center" }}>
            <p className="text-white"> All Rights Reserved 2021</p>
          </Col>
        </Row>
      </Container>
    </CustomFooter>
  );
};
