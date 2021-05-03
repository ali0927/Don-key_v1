import * as React from "react";
import {Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import ButtonComponent from "components/Button/Button";
import comingsoon from "images/comingsoon.svg";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import farmerCard1 from "../gabriel.svg";
import image2 from "../popeye.svg";
import image3 from "../image.svg";
import { Heading3, LandingParagraph } from "../components";
import { useHistory } from "react-router";


const CardBanner = styled.div`
  position: relative;
  z-index: 9;
`;

const CardBannerAdvantage = styled.div`
  position: relative;
  width: 100%;
  background-color: #f4e41c;
  // margin-top: -8%;
  padding: 9% 0%;
  padding-bottom: 20px;

  & .card {
    background: transparent;
    box-shadow: none;
    padding: 15px;

    /* media queries */
    @media screen and (max-width: 767px) {
      padding: 0px;
      margin-bottom: 0px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      padding: 15px 0px;
    }
  }
  & .card-title {
    font-family: "CodecPro-Bold";
    font-weight: bold;
    font-size: 22px;
    line-height: 120%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $colorBlack;

    /* media queries */
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      font-size: 20px;
    }
  }
  & .card-text {
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    display: flex;
    align-items: center;
    text-align: center;
    color: $paracolorBlack;
  }
  /* media queries */
  @media (max-width: 767px) {
    margin-top: 6%;
  }
`;
const BorderCurve = styled.div`
  border-radius: 0% 0% 200vh 200vh / 0% 0% 35vh 35vh;
  background: #fff;
  height: 50px;
  width: 100%;
  display: block;
  z-index: 9;
  position: absolute;
  top: 0;
`;




const ImageCommingSoon = styled.img`
  position: absolute;
  top: -25px;
  right: 3%;
`;



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
        strokeWidth="2"
        strokeLinecap="round"
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
          <stop stopColor="#646464" />
          <stop offset="1" stopColor="#646464" stopOpacity="0" />
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

export const CardsSection: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/strategy");
  }

  return (
    <>
      <CardBanner className="mt-5">
        <CardBannerAdvantage className="mt-0">
          <BorderCurve></BorderCurve>
          <Container>
            <Row className="mt-md-5 mb-5 mt-1">
              <Col md={6}>
                <Heading3 className="mb-3 mt-3">
                  Come discover our Don-key farmers and follow the best
                </Heading3>
                <LandingParagraph className="mt-4">
                  Discover and follow the best yield farmers with just one
                  click. Historical APY, farming philosophy, risk appetite; You
                  can see it all.
                </LandingParagraph>
                <div className="position-relative d-inline-block mt-4">
                  <ButtonComponent
                    disabled
                    variant="position-relative   colorBlack  btn-outline"
                  >
                    Discover best farmers
                  </ButtonComponent>
                  <ImageCommingSoon src={comingsoon} alt="ImageNotFound"/>
                </div>

                <div className="d-flex flex-column align-items-center align-items-sm-end pr-sm-3 pr-0">
                  <div className="col-lg-9 mt-5">
                    <PopularStrategy
                      icon={<img src={farmerCard1} alt="ImageNotFound"/>}
                      investers={568}
                      contentTitle="STRATEGY BSC only here pay min gas"
                      title="Don – next_door_neighbor "
                      content="missed the first farming craze, Binance Smart Chain is where it is happening "
                      apy="40%"
                      comingsoon
                      totalValue="$178,890"
                      onButtonClick={handleClick}
                      onCardClick={handleClick}
                    />
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="col-lg-9">
                  <div className="mt-4">
                    <PopularStrategy
                      icon={<img src={image2} alt="ImageNotFound" />}
                      contentTitle="STRATEGY The no stress only yield way"
                      title="Don - Popeye"
                      investers={5874}
                      graph={<Graph2 />}
                      content="I look for lucrative farming strategies using only stable coins and farms with over 50M TVL"
                      apy="134%"
                      comingsoon
                      totalValue="$1,354,560"
                      onButtonClick={handleClick}
                      onCardClick={handleClick}
                    />
                  </div>
                  <div className="mt-4">
                    <PopularStrategy
                      icon={<img src={image3} alt="ImageNotFound"/>}
                      contentTitle="STRATEGY all or nothing here  "
                      title="Don – Unblinding"
                      graph={<Graph3 />}
                      investers={3568}
                      comingsoon
                      content="I’ll bring you to the well of new and show you the harvest looking for crazy APY’s sometimes Rek"
                      apy="167%"
                      totalValue="$870,650"
                      onButtonClick={handleClick}
                      onCardClick={handleClick}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </CardBannerAdvantage>
      {/* Advantage */}
      </CardBanner>
    </>
  );
};
