import React from "react";
import { NavBar, NavBar2 } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./LandingStyle.scss";
import ButtonComponent from "../../components/Button/Button";
import boostyield from "./boost-yield.png";
import buildStrategy from "./build-strategy.png";
import getLiquidity from "./get-liquidity.png";
import { Footer } from "components/Footer/Footer";
import { HeroImage } from "./HeroImage";
import comingsoon from "images/comingsoon.svg";
import { useHistory } from "react-router";
import farmerCard1 from "./gabriel.svg";
import image2 from "./popeye.svg";
import image3 from "./image.svg";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import BuilderImage from "./Strategy.png";
import { RoundedCompletedSection } from "./RoundedCompletedSection/RoundedCompletedSection";
const StarIcon = () => {
  return (
    <svg
      width={53}
      height={50}
      viewBox="0 0 53 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.122 18.831a2.759 2.759 0 00-2.379-1.9l-15.009-1.363L28.8 1.677a2.765 2.765 0 00-5.083.002l-5.935 13.889L2.77 16.931a2.764 2.764 0 00-2.377 1.9 2.76 2.76 0 00.808 2.936l11.345 9.95L9.2 46.453a2.763 2.763 0 001.075 2.853 2.753 2.753 0 003.035.133L26.259 41.7 39.2 49.438c.947.57 2.14.518 3.037-.132a2.765 2.765 0 001.075-2.853l-3.345-14.737 11.345-9.947a2.765 2.765 0 00.81-2.938z"
        fill="#070602"
      />
    </svg>
  );
};

const Graph2 = () => {
  return (
    <svg
      width="250"
      height="111"
      viewBox="0 0 250 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M3.37707 76.0019L0.263672 76.7219V110.001H245.562V51.7622L241.679 54.3222L234.121 37.5522L230.815 37.9756L225.118 40.2018L220.487 32.948L212.848 12.0952L207.322 2.55859L204.317 2.72725L201.437 8.72095L196.32 42.3153L193.974 60.3628L192.481 68.5662L189.254 76.7219L184.804 74.9701L177.446 64.7556L171.208 60.6274L165.983 62.2681L161.292 71.4771L158.591 78.2449L154.951 81.2018L152.175 82.3267L149.989 81.2018L146.887 72.1684L143.431 54.1176L141.3 38.3199L136.936 22.4559L133.461 21.145L129.31 24.7972L124.824 38.3199L120.787 50.5543L118.911 53.8168L115.387 55.35H113.508L111.081 56.3452L106.43 68.3409L103.537 78.3272L102.068 82.8532L98.4119 84.9704L94.1123 83.9497L89.4388 79.2177L78.5373 56.3452L73.9574 53.1624L68.3095 53.8552L66.2807 53.5655L65.0386 52.3079L62.5102 48.9638L59.0437 43.9069L54.3946 38.6461L50.5886 38.003L47.992 41.0114L43.873 50.7582L39.591 54.9587L35.886 55.1782L30.252 50.228L26.2196 45.502L20.5335 39.5351L16.5087 41.5416L9.49428 62.544L3.37707 76.0019Z"
        fill="url(#paint0_linear)"
      />
      <ellipse cx="244.774" cy="52.8996" rx="4.9971" ry="4.9777" fill="black" />
      <path
        d="M245.23 53.3149C234.917 53.4064 239.882 29.6979 227.374 39.9977C220.013 42.9929 214.288 3.61235 205.891 2.3281C197.493 1.04385 196.214 79.4824 188.74 76.8347C181.267 74.187 182.049 64.7739 172.194 61.0397C162.339 57.3055 161.837 81.4149 152.961 82.4705C144.086 83.526 143.392 21.1624 134.23 21.1624C125.067 21.1624 124.982 56.1324 115.299 55.159C105.615 54.1856 108.134 85.0249 97.7369 85.0249C87.3402 85.0249 81.3614 50.5602 72.2207 53.2234C63.0801 55.8865 65.4895 49.4094 56.0941 39.9977C46.6987 30.5859 46.0528 56.7958 37.2592 55.159C28.4656 53.5222 24.1721 32.5962 16.3642 42.2049C9.2979 50.9009 8.54447 76.9488 1.08646 76.9488"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="122.913"
          y1="-1.35645"
          x2="122.913"
          y2="98.4821"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#646464" />
          <stop offset="1" stop-color="#646464" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Graph3 = () => {
  return (
    <svg
      width={250}
      height={116}
      viewBox="0 0 250 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={0.2}
        d="M3.972 82.718H.264v33.28h245.298v-58.24l-3.883 2.56-3.33-3.767-1.223 1.207-2.037-1.208-5.975-2.778-3.996 1.63-8.77 3.667-7.334-7.876-7.741-4.995-3.667 2.007-3.632 18.154-1.493 8.203-.881 6.404-2.346 1.752-4.45-1.752-4.215-11.776-3.143-7.844-5.452-6.386-3.67-2.719-2.409-3.01-2.288-5.908-4.937-17.392-6.743-22.337-3.813-2.38h-1.244l-1.445 1.416-1.637 2.648-4.881 16.784-3.425 12.502-4.796 9.763-4.33 1.297-4.315 4.28v8.4l-3.15 1.509-3.524 1.533h-1.879l-1.775-3.042-2.43-3.344-2.873-6.905-4.288-14.067-7.673-14.578L91.4 17.49l-2.813 1.023-4.22 7.417-4.348 17.392-6.062 15.835-5.647.693-2.03-.29-1.241-1.257-2.529-3.344-3.466-5.057-4.65-5.26-3.805-.644-2.597 3.009-4.119 9.746-4.282 4.2-3.705.22-5.123 1.167-3.068 6.831-4.485 7.79-6.61 4.367-6.373 1.39H3.972z"
        fill="url(#prefix__paint0_linear)"
      />
      <ellipse cx={244.774} cy={58.896} rx={4.997} ry={4.978} fill="#000" />
      <path
        d="M245.23 59.312c-10.313.091-12.55-10.392-25.058-.092-7.361 2.995-10.828-11.94-19.225-13.225-8.397-1.284-4.733 39.484-12.207 36.837-7.473-2.648-8.915-25.654-18.77-29.388-9.855-3.735-12.984-53.428-21.859-52.373-8.876 1.056-11.231 44.923-20.393 44.923-9.163 0-2.736 16.135-12.419 15.162-9.684-.974-13.504-43.346-23.9-43.346-10.397 0-10.038 38.747-19.178 41.41-9.14 2.663-6.731-3.814-16.127-13.226C46.7 36.583 46.053 62.792 37.26 61.156c-8.793-1.637-5.697 5.477-13.505 15.085-7.066 8.696-15.21 6.705-22.668 6.705"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={122.913}
          y1={4.64}
          x2={122.913}
          y2={104.478}
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
      <div className="mt-4 pb-5">
        <Container>
          <Row>
            <Col md={5}>
              <div className="bannerLeft mt-md-5 pt-md-4">
                <h1 className="colorBlack">Outsmart DeFi</h1>
                <p className="mt-4">
                  Find your favorite farmers, follow their strategies, and boost
                  your yield.
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
        <div className="advantage mt-0 bgyellowColor">
          <div className="borderCurve"></div>
          <Container>
            <Row className="mt-md-5 mb-5 mt-1">
              <Col md={6}>
                <h3 className="headsame mb-3 mt-3">
                  Come discover our Don-key farmers and follow the best
                </h3>
                <p className="parasame mt-4">
                  Discover and follow the best yield farmers with just one
                  click. Historical APY, farming philosophy, risk appetite; You
                  can see it all.
                </p>
                <div className="position-relative d-inline-block mt-4">
                  <ButtonComponent
                    disabled
                    variant="position-relative   colorBlack  btn-outline"
                  >
                    Discover best farmers
                  </ButtonComponent>
                  <img className="coming-soon" src={comingsoon} />
                </div>

                <div className="d-flex flex-column align-items-center align-items-sm-end pr-sm-3 pr-0">
                  <div className="col-md-9 mt-5">
                    <PopularStrategy
                      icon={<img src={farmerCard1} />}
                      investers={568}
                      contentTitle="STRATEGY BSC only here pay min gas"
                      title="Don – next_door_neighbor "
                      content="missed the first farming craze, Binance Smart Chain is where it is happening "
                      apy="40%"
                      comingsoon
                      totalValue="$178,890"
                    />
                  </div>
                </div>
              </Col>

              <Col md={6}>
              
                  <div className="col-md-9">
                    <div className="mt-4">
                      <PopularStrategy
                        icon={<img src={image2} />}
                        contentTitle="STRATEGY The no stress only yield way"
                        title="Don - Popeye"
                        investers={5874}
                        graph={<Graph2 />}
                        content="I look for lucrative farming strategies using only stable coins and farms with over 50M TVL"
                        apy="134%"
                        comingsoon
                        totalValue="$1,354,560"
                      />
                    </div>
                    <div className="mt-4">
                      <PopularStrategy
                        icon={<img src={image3} />}
                        contentTitle="STRATEGY all or nothing here  "
                        title="Don – Unblinding"
                        graph={<Graph3 />}
                        investers={3568}
                        comingsoon
                        content="I’ll bring you to the well of new and show you the harvest looking for crazy APY’s sometimes Rek"
                        apy="167%"
                        totalValue="$870,650"
                      />
                    </div>
                  </div>
              
              </Col>
            </Row>
          </Container>
        </div>
        <div className="farmer bggeryColor pt-5 pb-5">
          <Container>
            <h3 className="headsame mb-3 my-5 justify-content-center">
              Become a Don-key farmer
            </h3>
            <Row className="pt-5">
              <Col md={4}>
                <Card className="h-100">
                  <Card.Body>
                    <img className="advantage-img" src={buildStrategy} />
                    <Card.Title>Build your strategy</Card.Title>
                    <Card.Text className="mt-4 text-center">
                      The most user friendly interface in the DeFi space. Create
                      complicated strategies with 0 code.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="h-100">
                  <Card.Body>
                    <img className="advantage-img" src={getLiquidity} />
                    <Card.Title>Get liquidity</Card.Title>
                    <Card.Text className="mt-4 text-center">
                      Climb up the leader board and get more liquidity in your
                      pool.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100">
                  <Card.Body>
                    <img className="advantage-img" src={boostyield} />
                    <Card.Title>Boost your yield</Card.Title>
                    <Card.Text className="mt-4 text-center">
                      Make commission on your yields and get extra bonuses based
                      on your ranks and performance.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Advantage */}
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
                  secure your yield.
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
                  src={BuilderImage}
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
                  src="/assets/images/don-key-logo.svg"
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
                  exposer and more. The better you are, the more you get.
                </p>
                <h5 className="mt-4">Yield and Dividend </h5>
                <p className="parasame">
                  DON tokens represents the farmer’s yield based on his own
                  strategies, in addition to a proportionate monthly dividend
                  from Don-key’s total monthly yield.
                </p>
                <h5 className="mt-4">Exchangeable</h5>
                <p className="parasame">
                  You can redeem your DON tokens at any time or hold on to them
                  and accumulate higher future coupons.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>


       {/** RoundedCompleted Section */}

       <RoundedCompletedSection/>


      {/*  Join the Don-key Community */}
      <div className="community pt-5 pb-5 text-center">
        <Container>
          <h4 className="mt-4 pt-3">Join the Don-key Community</h4>
          <p className="mt-5">Follow us on Social Media</p>
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
