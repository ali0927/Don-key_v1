import React from "react";
import Navbar from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./ResourceStyle.scss";
import ButtonComponent from "../../components/Button/Button";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Banner */}
      <div className="mt-4 mb-5">
        <Container>
          <Row>
            <Col lg={{ span: 9, offset: 2 }} md={{ span: 10, offset: 1 }}>
              <div className="bannerText mt-md-5 pt-md-4">
                <h1 className="colorBlack">Resources about Cryptocurrency</h1>
                <Row>
                  <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                    <p className="mt-md-5 mt-3 mb-5 text-center">
                      Everything you ever wanted to know about cryptography and
                      more is brought to you by the cryptographic data
                      aggregator BURU
                    </p>
                  </Col>
                </Row>
              </div>

              <div className="bannerCol mb-5">
                <Row>
                  <Col lg={3} md={6} sm={6}>
                    <div className="bannercontent">
                      <img
                        src="/assets/images/resource/banner/1.png"
                        className="d-inline-block"
                        alt="Image"
                      />
                      <p> Crypto Basics </p>
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div className="bannercontent">
                      <img
                        src="/assets/images/resource/banner/2.png"
                        className="d-inline-block"
                        alt="Image"
                      />
                      <p> Protocols </p>
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div className="bannercontent">
                      <img
                        src="/assets/images/resource/banner/3.png"
                        className="d-inline-block"
                        alt="Image"
                      />
                      <p> Actions</p>
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div className="bannercontent">
                      <img
                        src="/assets/images/resource/banner/4.png"
                        className="d-inline-block"
                        alt="Image"
                      />
                      <p> Glossary </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Crypto */}
      <div className="actionsDiv bgyellowColor pt-5 pb-5">
        <Container>
          <h2 className="text-center mt-md-3 resourcehead"> Crypto Basics</h2>
          <Row>
            <Col
              lg={{ span: 8, offset: 2 }}
              md={{ span: 9, offset: 2 }}
              sm={12}
            >
              <p className="text-center resourcepara ml-lg-5 mr-lg-5 mb-5">
                All you need to know about basics of cryptocurrency in one
                place. Learn how Bitcoin, blockchain and altcoins work, how to
                actually use them, and why it matters to you
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="actionContent mt-md-4 mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Central Bank Digital Currencies - A Map of the World</h5>
                  <p>
                    Central bank digital currencies are being talked about all
                    over the world — CMC breaks down what exactly each country
                    is doing with their CBDCs.
                  </p>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="actionContent mt-md-4 mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/2.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Swap</h5>
                  <p>Swap 2 different tokens using an exchange</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Protocols */}
      <div className="actionsDiv bglightColor pt-5 pb-5">
        <Container>
          <h2 className="text-center mt-md-3 resourcehead"> Protocols</h2>
          <Row className="mb-5">
            <Col
              lg={{ span: 8, offset: 2 }}
              md={{ span: 9, offset: 2 }}
              sm={12}
            >
              <p className="text-center resourcepara ml-lg-5 mr-lg-5 mb-lg-5 mb-md-3 mb-0">
                All you need to know about basics of cryptocurrency in one
                place. Learn how Bitcoin, blockchain and altcoins work, how to
                actually use them, and why it matters to you
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>Dai (DAI)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/2.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>Сurve (СuSDT)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>Dai (DAI)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/3.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>USDT Coin (USDT)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/4.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>Compound (СSDT)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/3.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>USDT Coin (USDT)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/5.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>True USDT (TUSD)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/6.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>Yearn.finance (yFUSDT)</h5>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="protocolContent mb-3">
                <div className="protocolImg">
                  <img
                    src="/assets/images/resource/protocol/5.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="protocolMain">
                  <h5>True USDT (TUSD)</h5>
                </div>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-md-5 mb-md-5">
            <ButtonComponent variant="colorBlack btn-outline pl-5 pr-5">
              More
            </ButtonComponent>
          </div>
        </Container>
      </div>

      {/* Actions */}
      <div className="actionsDiv bgyellowColor pt-5 pb-5">
        <Container>
          <h2 className="text-center mt-md-3 resourcehead"> Actions</h2>
          <Row>
            <Col
              lg={{ span: 8, offset: 2 }}
              md={{ span: 9, offset: 2 }}
              sm={12}
            >
              <p className="text-center resourcepara ml-lg-5 mr-lg-5 mb-5">
                All you need to know about basics of cryptocurrency in one
                place. Learn how Bitcoin, blockchain and altcoins work, how to
                actually use them, and why it matters to you
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="actionContent mt-md-4 mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Deposit</h5>
                  <p>Deposit funds to a protocol and receive protocol tokens</p>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="actionContent mt-md-4 mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/2.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Swap</h5>
                  <p>Swap 2 different tokens using an exchange</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="actionContent mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/3.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Repay</h5>
                  <p>Repay funds to a loan</p>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="actionContent mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/4.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Borrow</h5>
                  <p>Create new loan </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="actionContent mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/2.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Claim</h5>
                  <p>
                    Claim tokens minted from a protocol and receive protocol
                    tokens
                  </p>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="actionContent mb-5">
                <div className="actionImg">
                  <img
                    src="/assets/images/resource/action/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>

                <div className="actionMain">
                  <h5>Code</h5>
                  <p>Swap 2 different tokens using an exchange </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/*  Join the BURU Community */}
      <div className="community pt-5 pb-5 text-center">
        <Container>
          <h4 className="mt-4 pt-3">Join the BURU Community</h4>
          <p className="mt-5">Follow us Social Media</p>
          <ul className="pl-0 mt-3 pb-3">
            <li>
              <a href="#">
                <img
                  src="/assets/images/social/medium.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="/assets/images/social/telegram.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="/assets/images/social/twitter.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="/assets/images/social/github.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </a>
            </li>
          </ul>
        </Container>
      </div>
      {/*  footer */}
      <footer className="pt-5 pb-5">
        <Container>
          <Row>
            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <img
                    src="/assets/images/footerLogo.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <p>
                  Start building your crypto <br /> investment portfolio with{" "}
                  <br /> a trusted partner
                </p>

                <p className="pt-5">2020</p>
              </div>
            </Col>

            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <h4>Company</h4>
                </div>
                <ul className="pl-0">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Legal</a>
                  </li>
                  <li>
                    <a href="#">GDPR</a>
                  </li>
                  <li>
                    <a href="#">Partners</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <h4>For users</h4>
                </div>
                <ul className="pl-0">
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                  <li>
                    <a href="#">Farmers free tier</a>
                  </li>
                  <li>
                    <a href="#">How to Withdraw</a>
                  </li>
                  <li>
                    <a href="#">How to Verify Your Account</a>
                  </li>
                  <li>
                    <a href="#">Customer Service</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <h4>Privacy and Regulation</h4>
                </div>
                <ul className="pl-0">
                  <li>
                    <a href="#"> Buru Cookie Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Regulation & License</a>
                  </li>
                  <li>
                    <a href="#">General Risk Disclosure</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
