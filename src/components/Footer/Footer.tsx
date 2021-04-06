import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogoWhite } from "./LogoWhite";

export const Footer = () => {
  return (
    <footer className="pt-5 pb-5 mb-0">
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
    </footer>
  );
};
