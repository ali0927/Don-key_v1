import React from "react";
import Navbar from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./LandingStyle.scss";
import ButtonComponent from "../../components/Button/Button";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Banner */}
      <div className="mt-4">
        <Container>
          <Row>
            <Col md={5}>
              <div className="bannerLeft mt-md-5 pt-md-4">
                <h1 className="colorBlack">
                  {" "}
                  Come <br />
                  and trade
                </h1>
                <p className="mt-4">
                  Start farming from Buru is crop automation that allows you to
                  publicly share your crop yield farming strategy
                </p>
                <div className="mt-5">
                  <ButtonComponent
                    className="btnYellow"
                    buttonText="Start farming"
                  />

                  <a href="#" className="pl-4">
                    How it works
                  </a>
                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className="bannerRight">
                <img
                  src="/assets/images/trade.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Cards */}

      <div className="cardsBanner mt-5 pt-5">
        <Container>
          <Row>
            <Col md={6} lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <img
                    src="/assets/images/total/1.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                  <Card.Title className="mb-3">$5 400 00</Card.Title>
                  <Card.Subtitle className="mb-2">
                    Total amount yield
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <img
                    src="/assets/images/total/2.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                  <Card.Title className="mb-3">$10 405 20</Card.Title>
                  <Card.Subtitle className="mb-2">
                    Total liq. amount
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <img
                    src="/assets/images/total/3.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                  <Card.Title className="mb-3">50+</Card.Title>
                  <Card.Subtitle className="mb-2">Total Farmers</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <img
                    src="/assets/images/total/4.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                  <Card.Title className="mb-3">12 490</Card.Title>
                  <Card.Subtitle className="mb-2">
                    Total tokens giving out
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Advantage */}
        <div className="borderCurve"></div>
        <div className="advantage bgyellowColor">
          <Container>
            <h3 className="headsame mb-3 mt-5 justify-content-center">
              Advantages
            </h3>
            <h5 className="headbelowSame mt-4">of farming with BURU </h5>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Build your strategy</Card.Title>
                    <Card.Text className="mt-4">
                      User friendly drag and drop strategy builder to implement
                      the best from your wits
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Get liquidity</Card.Title>
                    <Card.Text className="mt-4">
                      Сlimb up the rank ladder and get up to 1M USD budget for
                      your trading portfolio
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Boost your yield</Card.Title>
                    <Card.Text className="mt-4">
                      Make commission on your yields and get extra bonuses based
                      on your ranks and performance
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Farmers Team */}
      <div className="farmer bggeryColor pt-5 pb-5">
        <Container>
          <Row className="mt-5 mb-5">
            <Col md={6}>
              <h3 className="headsame mb-3 mt-3">
                Join the best <br /> Be part of farmers team
              </h3>
              <p className="parasame mt-4">
                With Buru, you can become part of a farming team and compete for
                the title of the best farmer, which will give you the
                opportunity to attract investments of up to USD 1 million to
                your trading portfolio. Be the first in the ranking of farmers!
              </p>
              <ButtonComponent
                className="btnYellow mt-4"
                buttonText=" Discover best farmers"
              />

              <div className="cardTeam mt-5">
                <Card
                  className="ml-auto mr-auto ml-md-auto mr-md-0 cardEven text-center pt-5 pb-3"
                  style={{ width: "23rem" }}
                >
                  <img
                    src="/assets/images/starblack.png"
                    className="d-inline-block cardStar"
                    alt="Image"
                  />
                  <Card.Body>
                    <span className="cardLetter">SA</span>
                    <Card.Title>Saly</Card.Title>

                    <ul className="p-0">
                      <li>110,400 allocation </li>
                      <li>190,300 next level </li>
                    </ul>

                    <img
                      src="/assets/images/graphic.png"
                      className="d-inline-block mt-4"
                      alt="Image"
                    />

                    <Row className="mt-4">
                      <Col md={6}>
                        <p className="cardPara">
                          <span className="pr-2"> +81% </span> APY
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="cardPara1">strategies 16</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card
                  className="ml-auto mr-auto ml-md-auto mr-md-0 cardEven text-center pt-5 pb-3"
                  style={{ width: "23rem" }}
                >
                  <img
                    src="/assets/images/starblack.png"
                    className="d-inline-block cardStar"
                    alt="Image"
                  />
                  <Card.Body>
                    <span className="cardLetter">RA</span>
                    <Card.Title>Ramp</Card.Title>
                    <ul className="p-0">
                      <li>101,300 allocation </li>
                      <li>187,300 next level </li>
                    </ul>

                    <img
                      src="/assets/images/graphic.png"
                      className="d-inline-block mt-4"
                      alt="Image"
                    />

                    <Row className="mt-4">
                      <Col md={6}>
                        <p className="cardPara">
                          <span className="pr-2"> +77% </span> APY
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="cardPara1">strategies 13</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col md={6}>
              <div className="cardTeam mt-3 ml-lg-5 ml-md-2 ml-auto mr-auto mb-5">
                <Card
                  className="cardEven text-center pt-5 pb-3"
                  style={{ width: "23rem" }}
                >
                  <img
                    src="/assets/images/starblack.png"
                    className="d-inline-block cardStar"
                    alt="Image"
                  />
                  <Card.Body>
                    <span className="cardLetter">DJ</span>
                    <Card.Title>Djony</Card.Title>

                    <ul className="p-0">
                      <li>120,500 allocation </li>
                      <li>200,000 next level </li>
                    </ul>

                    <img
                      src="/assets/images/graphic.png"
                      className="d-inline-block mt-4"
                      alt="Image"
                    />

                    <Row className="mt-4">
                      <Col md={6}>
                        <p className="cardPara">
                          <span className="pr-2"> +82% </span> APY
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="cardPara1">strategies 18</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card
                  className="cardEven text-center pt-5 pb-3"
                  style={{ width: "23rem" }}
                >
                  <img
                    src="/assets/images/starblack.png"
                    className="d-inline-block cardStar"
                    alt="Image"
                  />
                  <Card.Body>
                    <span className="cardLetter">JA</span>
                    <Card.Title>Jack</Card.Title>

                    <ul className="p-0">
                      <li>107,200 allocation </li>
                      <li>186,000 next level </li>
                    </ul>

                    <img
                      src="/assets/images/graphic.png"
                      className="d-inline-block mt-4"
                      alt="Image"
                    />

                    <Row className="mt-4">
                      <Col md={6}>
                        <p className="cardPara">
                          <span className="pr-2"> +78% </span> APY
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="cardPara1">strategies 14</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card
                  className="cardOdd text-center pt-5 pb-3"
                  style={{ width: "23rem" }}
                >
                  <img
                    src="/assets/images/staryellow.png"
                    className="d-inline-block cardStar"
                    alt="Image"
                  />
                  <Card.Body>
                    <span className="cardLetter">YOU</span>
                    <Card.Title>You could be here</Card.Title>

                    <ul className="p-0">
                      <li>120,500 allocation </li>
                      <li>200,000 next level </li>
                    </ul>

                    <ButtonComponent
                      className="btnYellow mt-5 mb-4"
                      buttonText="Start farming"
                    />
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Trading strategy builder */}

      <div className="trading bgyellowColor pt-5 pb-5">
        <Container>
          <Row className="mt-5 mb-5">
            <Col md={7}>
              <div className="tokenRIght">
                <h3 className="headsame mb-3 mt-3">Trading strategy builder</h3>
                <p className="parasame mt-4">
                  With the ability to create trading strategies, you can find
                  statistically valid ones based on a testable alpha / market
                  dominance. Become the best farmer with BURU.
                </p>
                <ButtonComponent
                  variant="colorBlack btn-outline"
                  className="mt-4"
                  buttonText=" Build strategy"
                />
              </div>
            </Col>
            <Col md={4} className="">
              <div className="tradingrightImg">
                <img
                  src="/assets/images/trading.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* BURU Tokens */}

      <div className="toekns pt-5 pb-5">
        <Container>
          <Row className="mt-5 mb-5">
            <Col md={4} className="mr-md-4">
              <div className="toeknImg">
                <img
                  src="/assets/images/token.png"
                  className="d-inline-block"
                  alt="Image"
                />
              </div>
            </Col>
            <Col md={7} className="ml-md-4">
              <div className="tokenRIght">
                <h3 className="headsame mb-3 mt-md-2 mt-5">BURU Tokens</h3>
                <p className="parasame">
                  A token is a unit of accounting for assets in BURU, analogous
                  to shares on the stock exchange. Tokens are accounted for
                  using blockchain technology, and access to them is carried out
                  using a program using a digital signature.
                </p>
                <h5 className="mt-4">Сurrency in BURU</h5>
                <p className="parasame">
                  Play the role of currency in the BURU system - they can be
                  used to purchase the services and services of the project.
                </p>
                <h5 className="mt-4">Bounty</h5>
                <p className="parasame">
                  They act as a reward for attracting investors by advertising a
                  project.
                </p>
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
                  {" "}
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
