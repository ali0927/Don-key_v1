import React from "react";
import { NavBar, NavBar2 } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./LandingStyle.scss";
import ButtonComponent from "../../components/Button/Button";
import NumberFromjson from "../../JsonData/NumberFromJson";
import ListofFarmerjson from "../../JsonData/ListofFarmerJson";
import boostyield from "./boost-yield.png";
import buildStrategy from "./build-strategy.png";
import getLiquidity from "./get-liquidity.png";
import { Footer } from "components/Footer/Footer";
import { HeroImage } from "./HeroImage";
import comingsoon from "images/comingsoon.svg";
import { useHistory } from "react-router";
import { FarmerCards } from "../../components/FarmerCards/FarmerCards";
import farmerCard1 from "../../images/farmer-card-1.jpg";

const StarIcon = (props) => {
  return (
    <svg
      width={53}
      height={50}
      viewBox="0 0 53 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M52.122 18.831a2.759 2.759 0 00-2.379-1.9l-15.009-1.363L28.8 1.677a2.765 2.765 0 00-5.083.002l-5.935 13.889L2.77 16.931a2.764 2.764 0 00-2.377 1.9 2.76 2.76 0 00.808 2.936l11.345 9.95L9.2 46.453a2.763 2.763 0 001.075 2.853 2.753 2.753 0 003.035.133L26.259 41.7 39.2 49.438c.947.57 2.14.518 3.037-.132a2.765 2.765 0 001.075-2.853l-3.345-14.737 11.345-9.947a2.765 2.765 0 00.81-2.938z"
        fill="#070602"
      />
    </svg>
  );
};

const ChartIcon = () => {
  return (
    <svg
      width={196}
      height={89}
      viewBox="0 0 196 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={0.2}
        d="M6.26 59.5l-4 3v26h189.5V43l-3 2-11.5 10.5-5.5-6.5-5.5-18.5-4.5-5-5.5 14.5-8 22.5-3.5-3-10.5-19.5h-4l-8.5 26h-3.5l-9-59-4-5.5-6 17-8 28-4-3.5-8-20.5-5-2.5-5 2.5-10 20.5-6 4.5-5 15-2.5 1.5-3-4.5-8-29-4-5-4 2.5-9.5 17-4.5 2.5-6.5 12z"
        fill="url(#prefix__paint0_linear_chart)"
      />
      <circle cx={191.26} cy={44} r={4} fill="#000" />
      <path
        d="M191.502 44.214c-8.026.072-8.924 8.325-14.652 10.665-5.729 2.34-8.12-27.884-14.655-28.887-6.535-1.003-8.839 38.666-14.655 36.597-5.816-2.068-6.253-19.978-13.923-22.896-7.669-2.917-7.015 26.475-13.922 27.3C112.788 67.816 112.904 1 105.773 1c-7.13 0-7.852 45.416-15.388 44.655-7.536-.76-7.686-26.047-15.777-26.047-8.09 0-10.634 22.454-17.747 24.535-7.114 2.08-5.327 25.8-12.64 18.446-7.31-7.353-6.345-35.318-13.189-36.597-6.843-1.279-9.105 16.63-15.003 19.663-5.898 3.034-8.723 17.024-14.527 17.024"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_chart"
          x1={97.01}
          y1={1.5}
          x2={97.01}
          y2={79.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#646464" />
          <stop offset={1} stopColor="#646464" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const LandingPage = () => {
  const history = useHistory();

  return (
    <div>
      <NavBar />

      {/* Banner */}
      <div className="mt-4">
        <Container>
          <Row>
            <Col md={5}>
              <div className="bannerLeft mt-md-5 pt-md-4">
                <h1 className="colorBlack">Outsmart DeFi</h1>
                <p className="mt-4">
                  Create your DeFi strategy with a few clicks, get liquidity and
                  boost your profits.
                </p>
                <div className="mt-5"></div>
              </div>
            </Col>
            <Col md={7}>
              <div className="bannerRight">
                <HeroImage />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Cards */}
      <div className="cardsBanner mt-5">
        {/* <Container>
          <Row>
          {
            NumberFromjson.map((item,index)=>{
              if(item.id ==1){
                var imag= '/assets/images/total/1.png'
              }
              else if( item.id==2){
                var imag= '/assets/images/total/2.png'
              }
              else if(item.id == 3){
                var imag= '/assets/images/total/3.png'
              }
              else if(item.id == 4){
                var imag= '/assets/images/total/4.png'
              }
             
              return(
              <Col md={6} lg={3}>
                <Card>
                  <Card.Body className="text-center">
                    <img
                      src={imag}
                      className="d-inline-block"
                      alt="Image"
                    />
                    <Card.Title className="mb-3">
                    {item.id == 1 || item.id==2 ? "$"+`${item.number}` : item.number}
                     </Card.Title>
                    <Card.Subtitle className="mb-2">
                     {item.title}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>

           
              )
         
            })
           }
           </Row>
          
        </Container> */}

        {/* Advantage */}

        <div className="advantage bgyellowColor">
          <div className="borderCurve"></div>
          <Container>
            <h3 className="headsame mb-3 my-5 justify-content-center">
              Become a Don-key farmer
            </h3>
            <Row className="pt-5">
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <img className="advantage-img" src={buildStrategy} />
                    <Card.Title>Build your strategy</Card.Title>
                    <Card.Text className="mt-4">
                      The most user friendly interface in the DeFi space. create
                      complicated strategies with 0 code.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <img className="advantage-img" src={getLiquidity} />
                    <Card.Title>Get liquidity</Card.Title>
                    <Card.Text className="mt-4">
                      Climb up the leader board and get more liquidity in your
                      pool
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <img className="advantage-img" src={boostyield} />
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
          <Row className="mt-md-5 mb-5 mt-1">
            <Col md={6}>
              <h3 className="headsame mb-3 mt-3">
                Come discover our Don-key farmers and follow the best
              </h3>
              <p className="parasame mt-4">
                Want to join the Yield farming frenzy but don't have the
                know-how or the time to do it, discover and follow the best
                yield farmers with just one click. Historical APY, farming
                philosophy, risk apatite; You can see it all.
              </p>
              <ButtonComponent
                disabled
                className="position-relative btn  btnYellow mt-4"
              >
                <img className="coming-soon" src={comingsoon} />
                Discover best farmers
              </ButtonComponent>
              
              <FarmerCards
                  imgs={farmerCard1}
                  heading="DON - Make You Yield"
                  content="3405 FOLLOWERS"
                /> 
                
            </Col>
          
          
             
            <Col md={6}>
              <div className="mt-3 ml-lg-5 ml-md-2 ml-auto mr-auto mb-5">
              <FarmerCards
                  imgs={farmerCard1}
                  heading="DON - Make You Yield"
                  content="3405 FOLLOWERS"
                />
                <FarmerCards
                imgs={farmerCard1}
                heading="DON - Make You Yield"
                content="3405 FOLLOWERS"
              />
             
                {/* <Card
                  className="cardOdd text-center pt-5 pb-3"
                  style={{ width: "23rem" }}
                >
                  <svg
                    width={53}
                    height={50}
                    className="cardStar"
                    viewBox="0 0 53 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50.697 19.293v.001c.157.484.012 1.01-.371 1.346l-.001.001L38.98 30.59l-.672.588.198.872 3.345 14.735s0 0 0 0a1.265 1.265 0 01-.492 1.307h0c-.411.299-.954.32-1.384.062l-.004-.002-12.941-7.738-.77-.46-.77.46-12.946 7.738h0a1.253 1.253 0 01-1.387-.06 1.262 1.262 0 01-.49-1.308l3.345-14.734.197-.871-.671-.59L2.193 20.64l-.003-.002a1.26 1.26 0 01-.368-1.342 1.264 1.264 0 011.088-.87s0 0 0 0l15.01-1.363.891-.081.352-.824 5.934-13.886V2.27a1.263 1.263 0 012.326-.002v.001l5.934 13.888.352.824.892.08 15.008 1.364h.001c.506.045.931.386 1.087.868z"
                      fill="#FFCA00"
                      stroke="#070602"
                      strokeWidth={3}
                    />
                  </svg>
                  <Card.Body>
                    <span className="cardLetter">YOU</span>
                    <Card.Title>You could be here</Card.Title>

                    <ul className="p-0"></ul>

                    <ButtonComponent
                      onClick={() => history.push("/farmers")}
                      className="btnYellow mt-5 mb-4"
                    >
                      Start farming
                    </ButtonComponent>
                  </Card.Body>
                </Card> */}
              
              </div>

              
            </Col>

          </Row>
        </Container>
      </div>

      {/* Trading strategy builder */}

      <div className="trading bgyellowColor pt-5 pb-5">
        <Container>
          <Row className="mt-md-5 mb-5 mt-1">
            <Col md={7}>
              <div className="tokenRIght">
                <h3 className="headsame mb-3 mt-3">Farming strategy builder</h3>
                <p className="parasame mt-4">
                  Build your DeFi strategy with a drag and drop interface
                  allowing you to adapt fast to the dynamic world of DeFi and
                  secure your yield
                </p>
                <ButtonComponent
                  disabled
                  variant="colorBlack btn-outline position-relative"
                  className="mt-4"
                >
                  <img className="coming-soon" src={comingsoon} />
                  Build strategy
                </ButtonComponent>
              </div>
            </Col>
            <Col md={4} className="">
              <div className="tradingrightImg">
                <img
                  src="/assets/images/trading.png"
                  className="Imagetrading"
                  alt="Imagetrading"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* DON Tokens */}

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
                <h3 className="headsame mb-3 mt-md-2 mt-5">DON Tokens</h3>
                <p className="parasame">
                  DON tokens are airdropped to all farmers based on monthly
                  trading results and take into account: ROI, Risk level, asset
                  exposer and more. the better you are , the more you get
                </p>
                <h5 className="mt-4">Yield and Dividend </h5>
                <p className="parasame">
                  DON tokens represents the farmer’s yield based on his own
                  stratagies, in addition to a proportionate monthly dividend
                  from Don-key’s total monthly yield
                </p>
                <h5 className="mt-4">Exchangeable</h5>
                <p className="parasame">
                  You can redeem your DON tokens at any time or hold on to them
                  and accumulate higher future coupons
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/*  Join the Don-key Community */}
      <div className="community pt-5 pb-5 text-center">
        <Container>
          <h4 className="mt-4 pt-3">Join the Don-key Community</h4>
          <p className="mt-5">Follow us Social Media</p>
          <ul className="pl-0 mt-3 pb-3">
            <li>
              <a href="https://medium.com/@don-key.finance">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__medium)">
                    <path
                      d="M22.587 4.853l1.915-1.802v-.395h-6.634L13.14 14.231 7.76 2.656H.806v.395L3.042 5.7a.915.915 0 01.303.77v10.41c.069.374-.055.76-.323 1.032l-2.52 3.004v.39h7.145v-.395l-2.52-2.999a1.211 1.211 0 01-.347-1.033V7.875l6.272 13.435h.729l5.393-13.435v10.703c0 .282 0 .34-.188.525l-1.94 1.846v.396h9.412v-.395l-1.87-1.8a.543.543 0 01-.214-.526V5.378a.54.54 0 01.213-.525z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__medium">
                      <path
                        fill="#fff"
                        transform="translate(.502 .195)"
                        d="M0 0h24v23.607H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://t.me/don_key_finance">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__clip0__telgram)">
                    <path
                      d="M9.92 15.13l-.398 5.492c.568 0 .814-.24 1.11-.528l2.662-2.504 5.518 3.975c1.012.555 1.725.263 1.998-.916l3.622-16.693.001-.001c.321-1.472-.54-2.047-1.527-1.686l-21.29 8.017C.163 10.841.186 11.638 1.37 12l5.443 1.665 12.643-7.782c.595-.387 1.136-.173.691.215L9.92 15.129z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0__telgram">
                      <path
                        fill="#fff"
                        transform="translate(.502 .195)"
                        d="M0 0h24v23.607H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Don_key_finance">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__clip0_twitter)">
                    <path
                      d="M22.036 7.113a9.822 9.822 0 002.466-2.554v-.001c-.893.391-1.843.651-2.835.777a4.894 4.894 0 002.165-2.719 9.845 9.845 0 01-3.12 1.191 4.919 4.919 0 00-8.511 3.364c0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147a4.962 4.962 0 00-.674 2.487c0 1.704.877 3.214 2.186 4.089a4.863 4.863 0 01-2.223-.606v.054a4.943 4.943 0 003.942 4.835c-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428a9.89 9.89 0 01-6.101 2.098c-.403 0-.79-.018-1.177-.067A13.856 13.856 0 008.05 21.75c8.683 0 14.342-7.244 13.986-14.637z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0_twitter">
                      <path
                        fill="#fff"
                        transform="translate(.502)"
                        d="M0 0h24v24H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
          </ul>
        </Container>
      </div>
      {/*  footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
