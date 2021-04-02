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
              <Link
                className="d-flex align-items-center inherit-color no-underline"
                to="/"
              >
                <p
                  className="m-0"
                  style={{
                    fontFamily: "Avenir-Bold",
                    fontWeight: "bolder",
                    color: "#fff",
                    fontSize: 24,
                  }}
                >
                  <span style={{ letterSpacing: "2px" }}>
                    D
                    <img
                      style={{
                        position: "relative",
                        width: 24,
                        top: 5,
                        marginLeft: -2,
                        marginRight: -1,
                      }}
                      src="/assets/images/logo-don.png"
                      className="d-inline-block align-top by-logo"
                      alt="Logo"
                    />
                    n
                  </span>{" "}
                  - key
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
