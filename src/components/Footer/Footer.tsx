import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogoWhite } from "./LogoWhite";
import styled from "styled-components";

const CustomFooter = styled.footer`
       background: #070602;
`

export const Footer = () => {
  return (
    <CustomFooter className="pt-5 pb-5 mb-0">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <LogoWhite />
              <p className="text-white ml-5"> All Rights Reserved 2021</p>
            </div>
          </Col>
        </Row>
      </Container>
    </CustomFooter>
  );
};
