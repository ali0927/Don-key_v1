import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { NavBar } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Row, Col, Form, InputGroup, Tab, Tabs, Nav } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./ResourceStyle.scss";
import ButtonComponent from "../../components/Button/Button";
import ModalPopup from "../../components/ProtocolsModal/ProtocolsModal";

const ResourcePage = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [key, setKey] = React.useState("swap");

  return (
    <div>
      <NavBar />

      {/* Banner */}
      <div className="mt-4 bgImage">
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

      <div className="actionsDiv bgyellowColor pt-5 pb-5 mt-md-5">
        <Container className="mb-md-5">
          <h2 className="text-center mt-5 pt-md-5 pt-3 resourcehead">
            {" "}
            Crypto Basics
          </h2>
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
              <div className="cryptoContent mt-md-4">
                <div className="cryptoImg">
                  <img
                    src="/assets/images/resource/action/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="cryptoMain">
                  <h4>Central Bank Digital Currencies - A Map of the World</h4>
                  <p>
                    Central bank digital currencies are being talked about all
                    over the world — CMC breaks down what exactly each country
                    is doing with their CBDCs.
                  </p>
                  <span>November 23, 2020</span>
                </div>
              </div>
            </Col>

            <Col md={6} className="mt-md-0 mt-4">
              <div className="cryptoContent mt-md-4">
                <div className="cryptoImg">
                  <img
                    src="/assets/images/resource/action/2.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="cryptoMain">
                  <h4>Hot Wallets vs Cold Wallets: What’s the Difference?</h4>
                  <p>
                    The difference between hot and cold wallets, and the amount
                    of security that they offer for your crypto assets, differs
                    — find out which type of wallet is best for you.
                  </p>
                  <span>November 18, 2020</span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <div className="cryptoContent mt-md-4">
                <div className="cryptoImg">
                  <img
                    src="/assets/images/resource/action/3.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="cryptoMain">
                  <h4>Private keys: the keys to your cryptographic wallet</h4>
                  <p>
                    The difference between private keys and public keys is huge
                    — find out what "not your coins, not your coins" really
                    means.
                  </p>
                  <span>November 04, 2020</span>
                </div>
              </div>
            </Col>

            <Col md={6} className="mt-md-0 mt-4">
              <div className="cryptoContent mt-md-4">
                <div className="cryptoImg">
                  <img
                    src="/assets/images/resource/action/4.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <div className="cryptoMain">
                  <h4>5 Myths Beginners Don't Know About Bitcoin</h4>
                  <p>
                    For those just getting started in crypto, we've broken down
                    five common misconceptions about Bitcoin, the first
                    cryptocurrency.
                  </p>
                  <span>November 02, 2020</span>
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
            <ButtonComponent
              variant="colorBlack btn-outline pl-5 pr-5"
              onClick={() => setModalShow(true)}
            >
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
      <ModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        className="p-0"
      >
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col md={3} className="pr-0">
              <div className="protocolLeft">
                <h6 className="mt-3">Protocols</h6>

                <div className="mt-5 pt-5">
                  <h6 className="headbottom mb-4">Select a category</h6>

                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Favorites</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Landing Protocols</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Swap Protocols</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="four">DEX Protocols</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  {/* <ul>
                  <li>Favorites</li>
                  <li>Landing Protocols</li>
                  <li>Swap Protocols</li>
                  <li>DEX Protocols</li>
                </ul> */}
                </div>
              </div>
            </Col>

            <Col md={9} className="pl-0">
              <div className="protocolRight">
                <Form.Row>
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text className="pl-0">
                          <img src="/assets/images/search.png" alt="Image" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Search protocols"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="selectProtocol pl-4 mt-3 mb-3">
                      <h4 className="mr-4">Protocols select: </h4>

                      <div className="selectprotolContent">
                        <h6> Dai (DAI) </h6>
                        <span>
                          <img src="/assets/images/cross1.png" />
                        </span>
                      </div>

                      <div className="selectprotolContent">
                        <h6> Сurve (СuSDT) </h6>
                        <span>
                          <img src="/assets/images/cross1.png" />
                        </span>
                      </div>

                      <div className="selectprotolContent">
                        <h6> USDT Coin (USDT) </h6>
                        <span>
                          <img src="/assets/images/cross1.png" />
                        </span>
                      </div>
                    </div>
                    <div className="pl-3 pr-3 available-items">
                      <Row className="mt-4">
                        <Col lg={4} md={6}>
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                    </div>

                    <div className="text-left mt-md-5 mb-md-5">
                      <ButtonComponent
                        variant="colorBlack btn-outline ml-3 pt-2 pb-2 pl-5 pr-5"
                        onClick={() => setModalShow1(true)}
                      >
                        Use
                      </ButtonComponent>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <div className="selectProtocol pl-4 mt-3 mb-3">
                      <h4 className="mr-4">Protocols select: </h4>

                      <div className="selectprotolContent">
                        <h6> Dai (DAI) </h6>
                        <span>
                          <img src="/assets/images/cross1.png" />
                        </span>
                      </div>

                      <div className="selectprotolContent">
                        <h6> Сurve (СuSDT) </h6>
                        <span>
                          <img src="/assets/images/cross1.png" />
                        </span>
                      </div>

                      <div className="selectprotolContent">
                        <h6> USDT Coin (USDT) </h6>
                        <span>
                          <img src="/assets/images/cross1.png" />
                        </span>
                      </div>
                    </div>
                    <div className="pl-3 pr-3 available-items">
                      <Row className="mt-4">
                        <Col lg={4} md={6}>
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                          <div className="protocolContent mb-0">
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
                    </div>

                    <div className="text-left mt-md-5 mb-md-5">
                      <ButtonComponent variant="colorBlack btn-outline ml-3 pt-2 pb-2 pl-5 pr-5">
                        Use
                      </ButtonComponent>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="third">
                    <div className="selectProtocol pl-4 mt-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="four">
                    <div className="selectProtocol pl-4 mt-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Col>
          </Row>
        </Tab.Container>
      </ModalPopup>

      <ModalPopup
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        className="p-0 customWidth"
      >
        <div className="pt-5 text-center protocolModal">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h2> Aave (AAVE) </h2>
              <div className="mt-3 mb-3">
                <img src="/assets/images/resource/protocol/7.png" alt="Image" />
              </div>
              <p className="mb-5">
                Aave is an open source and non-custodial protocol enabling the
                creation of money markets.
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="pl-5 pr-5">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={k => setKey(k)}
                  className=""
                >
                  <Tab eventKey="swap" title="Swap">
                    Aave is an open source and non-custodial protocol enabling
                    the creation of money markets. Users can earn interest on
                    deposits and borrow assets.
                  </Tab>
                  <Tab eventKey="claim" title="Claim">
                    Aave is an open source and non-custodial protocol enabling
                    the creation of money markets. Users can earn interest on
                    deposits and borrow assets.
                  </Tab>
                  <Tab eventKey="repay" title="Repay">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </Tab>
                  <Tab eventKey="borrow" title="Borrow">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </Tab>
                </Tabs>

                <ButtonComponent
                  variant="colorBlack"
                  className="btnYellow pl-5 pr-5 mb-5 w-100 btnPadding"
                >
                  <span> Use action </span>
                </ButtonComponent>
              </div>
            </Col>
          </Row>
        </div>
      </ModalPopup>
    </div>
  );
};

export default ResourcePage;
