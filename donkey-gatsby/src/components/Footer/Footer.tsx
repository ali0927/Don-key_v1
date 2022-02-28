import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogoWhite from "./image/logo.svg";
import MobileLogo from "./image/mobilelogo.png";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { addDots } from "helpers";

const CustomFooter = styled.footer`
  background: #070602;
`;

const Paragraph = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #fff;
  margin: 0;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 16px;
  }
`;

export const Footer = () => {
  const mobileFooter = () => {
    return (
      <div className="d-lg-none">
        <div className="row align-items-end">
          <div className="col-4">
            <img src={MobileLogo} alt="Logo not found" />
          </div>
          <div className="col-8 d-flex justify-content-end align-items-end">
            <Paragraph className="text-white">
              {" "}
              All Rights Reserved 2022
            </Paragraph>
          </div>
        </div>
        <div className="d-flex mt-4 justify-content-center">
          <Paragraph>
            ERC-20 Contract address:
            <a
              href="https://etherscan.io/address/0x217ddead61a42369a266f1fb754eb5d3ebadc88a"
              target="_blank"
              rel="noreferrer"
              style={{ wordBreak: "break-word" }}
            >
              {" "}
              {addDots("0x217ddead61a42369a266f1fb754eb5d3ebadc88a", 23)}
            </a>
          </Paragraph>
        </div>
        <div className="d-flex mt-1  justify-content-center">
          <Paragraph>
            BEP-20 Contract address:
            <a
              href="https://bscscan.com/address/0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255"
              target="_blank"
              style={{ wordBreak: "break-word" }}
              rel="noreferrer"
            >
              {" "}
              {addDots("0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255", 23)}
            </a>
          </Paragraph>
        </div>
        <div className="d-flex mt-4 justify-content-center">
          <Paragraph>This project is in beta. Use at your own risk.</Paragraph>
        </div>
      </div>
    );
  };

  return (
    <CustomFooter className="pt-5 pb-5 mb-0">
      <Container>
        <div className="row d-none d-lg-flex">
          <div className="col-lg-2 mb-md-3">
            <img src={LogoWhite} alt="Logo not found" />
          </div>
          <div className="col-lg-8" style={{ textAlign: "center" }}>
            <div>
              <Paragraph>
                ERC-20 Contract address:
                <a
                  href="https://etherscan.io/address/0x217ddead61a42369a266f1fb754eb5d3ebadc88a"
                  target="_blank"
                  rel="noreferrer"
                  style={{ wordBreak: "break-word" }}
                >
                  {" "}
                  0x217ddead61a42369a266f1fb754eb5d3ebadc88a
                </a>
              </Paragraph>
              <Paragraph>
                BEP-20 Contract address:
                <a
                  href="https://bscscan.com/address/0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255"
                  target="_blank"
                  style={{ wordBreak: "break-word" }}
                  rel="noreferrer"
                >
                  {" "}
                  0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255
                </a>
              </Paragraph>
              <Paragraph>
                This project is in beta. Use at your own risk.
              </Paragraph>
            </div>
          </div>
          <div className="col-lg-2" style={{ textAlign: "center" }}>
            <p className="text-white"> All Rights Reserved 2022</p>
          </div>
        </div>
        {mobileFooter()}
      </Container>
    </CustomFooter>
  );
};
