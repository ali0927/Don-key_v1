import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="pt-5 pb-5 mb-0">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/" className="text-white d-flex align-items-center no-underline">
                <img
                  src="/assets/images/logo.png"
                  className="d-inline-block align-top by-logo"
                  alt="Logo"
                />
                <p
                  className="m-0"
                  style={{
                    fontFamily: "Avenir-Regular",
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "bolder",
                  }}
                >
                  <span style={{ letterSpacing: "2px" }}>Don</span>-key
                </p>
              </Link>

              <p className="text-white ml-5"> All Rights Reserved 2021</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
