import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import farmerCard1 from "../gabriel.png";
import image2 from "../popeye.png";
import image3 from "../image.png";
import { Heading3 } from "../components";
import { theme } from "theme";
import { ButtonWidget } from "components/Button";
import { navigate } from "gatsby-link";
import { breakPoints } from "breakponts";
import { graphql, useStaticQuery } from "gatsby";
import { sampleSize, map, filter } from "lodash";
import { IFarmerInter, IStrategy } from "interfaces";
import { Link } from "react-router-dom";
import { fixUrl } from "helpers";
import { PoolAmount } from "components/PoolAmount";
import { InvestorCountContract } from "components/InvestorCountGraphql";

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

const CardBanner = styled.div`
  position: relative;
  z-index: 9;
`;

const Heading = styled(Heading3)`
  font-size: 29px;
  color: #070602;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 38px;
  }
`;

const StrategyDiv = styled.div`
  margin-top: 2rem;
  @media only screen and (min-width: ${breakPoints.md}) {
    margin-top: 69px;
  }
`;

const LandingParagraph = styled.p`
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #222222;

  font-style: normal;
  font-weight: 400;
  text-align: left;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 20px;
  }
`;

const CardBannerAdvantage = styled.div`
  position: relative;
  width: 100%;
  background: ${theme.palette.common.white};
  margin-top: 20px;
  margin-bottom: 10px;
  ${theme.mediaQueries.lg.up} {
    margin-top: 120px;
  }
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

const ImageIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const CardCol = styled.div`
  padding: 0;
  @media only screen and (min-width: ${breakPoints.md}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const Graph1 = () => {
  return (
    <svg
      width={251}
      height={114}
      className="mt-3"
      viewBox="0 0 251 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={0.2}
        d="M7.471 76.216l-5.143 3.857v33.429h243.643v-58.5l-3.857 2.571L238 60l-10.672 11.073-7.071-8.357-7.072-23.786-5.785-6.428L203 40.5l-2.672 10.645-10.286 28.928-4.5-3.857L178 58.5l-5.958-7.355H166.9l-10.929 33.428h-4.5L138 3l-3.243-1.355L132 4l-2 6.5-2.958 13.002-10.285 36-5.143-4.5-10.286-26.358L94.9 25.43l-6.429 3.215-12.857 26.357-7.714 5.785-6.429 19.286-3.214 1.929-3.857-5.786L44.114 38.93l-5.143-6.428-5.143 3.214-12.214 21.857-5.786 3.214-8.357 15.429z"
        fill="url(#prefix__paint0_linear)"
      />
      <circle cx={245.188} cy={56.145} r={5} fill="#000" />
      <path
        d="M245.641 56.561c-10.32.092-11.474 10.704-18.839 13.712-7.365 3.009-10.44-35.85-18.842-37.14-8.402-1.29-11.364 49.713-18.842 47.053-7.478-2.66-8.039-25.687-17.9-29.438-9.861-3.75-9.02 34.04-17.9 35.1C144.437 86.907 144.586 1 135.418 1s-10.095 58.391-19.785 57.414c-9.689-.978-9.882-33.49-20.284-33.49-10.403 0-13.672 28.87-22.819 31.545-9.145 2.675-6.849 33.171-16.25 23.717-9.4-9.454-8.159-45.41-16.957-47.054-8.8-1.644-11.707 21.381-19.29 25.282C12.448 62.314 8.816 80.3 1.354 80.3"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={124.15}
          y1={1.645}
          x2={124.15}
          y2={101.93}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#646464" />
          <stop offset={1} stopColor="#646464" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Graph2 = () => {
  return (
    <svg
      width="250"
      height="111"
      className="mt-3"
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
      className="mt-3"
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

  const farmers = useStaticQuery(
    graphql`
      query fetchFarmers {
        allStrapiFarmers(filter: { status: { in: ["active", "deprecated"] } }) {
          nodes {
            name
            description
            farmerImage {
              url
            }
            active
            twitter
            telegram
            guid
            slug
            farmerfee
            performancefee
            poolAddress
            poolVersion
            network {
              name
              chainId
              symbol
            }
            strategies {
              name
              apy
              created_at
              id
              entranceFees
              exitFees
              swapInFees
              swapOutFees
              description
              strategyImage {
                url
              }
              token {
                boostApy
              }
            }
          }
        }
      }
    `
  );

  const handleLeaderClick = (url: string) => () => {
    navigate(url);
  };

  const farmersList: IFarmerInter[] = farmers.allStrapiFarmers.nodes;

  const finalFarmersList: IFarmerInter[] = filter(farmersList, (item) => {
    if (item.strategies.length > 0 && item.farmerImage && item.active) {
      return true;
    }
    return false;
  });

  const farmersData = sampleSize(finalFarmersList, 3);

  return (
    <>
      <CardBanner className="mt-0">
        <CardBannerAdvantage>
          <Container>
            <Row className="mt-md-5 mb-3 mb-md-5 mt-1">
              <Col md={7} className="pt-3 pt-md-5">
                <Heading className="mb-3 mt-3">
                  Come discover our Don-key farmers and follow the best
                </Heading>
                <LandingParagraph className="mt-4">
                  Discover and follow the best yield farmers with just one
                  click. Historical APY, farming philosophy, risk appetite; You
                  can see it all.
                </LandingParagraph>
                <div className="position-relative d-inline-block mt-4">
                  <ButtonWidget
                    varaint="outlined"
                    width="210px"
                    height="50px"
                    onClick={() => navigate("/dashboard")}
                  >
                    Discover best farmers
                  </ButtonWidget>
                </div>

                <div className="d-flex flex-column align-items-center align-items-sm-end pr-sm-3 pr-0">
                  <CardCol className=" col-lg-8 mt-5">
                    {farmersData[0] && (
                      <PopularStrategy
                        apy={farmersData[0].strategies[0].apy + "%"}
                        isCardComingsoon={!farmersData[0].active}
                        contentTitle={farmersData[0].strategies[0].name}
                        content={farmersData[0].strategies[0].description}
                        title={farmersData[0].name}
                        icon={
                          <Image src={fixUrl(farmersData[0].farmerImage.url)} />
                        }
                        // risk={}
                        // imageRisk={}
                        onCardClick={handleLeaderClick(
                          `/dashboard/farmer/${farmersData[0].slug}`
                        )}
                        onButtonClick={handleLeaderClick(
                          `/dashboard/farmer/${farmersData[0].slug}`
                        )}
                        // showOnRight={}
                        buttonLabel="Open"
                        // imageRisk={farmersData[0].risk.image.url}
                        // extraApy={
                        //  // tokenObj.boostApy &&
                        //   //new BigNumber(item.apy).plus(100).toFixed() + "%"
                        // }

                        totalValue={
                          <>
                            {" "}
                            {/* <Link
                              to={"reirect"}
                              style={{
                                opacity: "0",
                                width: 0,
                                height: 0,
                                display: "inline-block",
                              }}
                            >
                              Invest
                            </Link> */}
                            <PoolAmount
                              chainId={farmersData[0].network.chainId}
                              poolAddress={farmersData[0].poolAddress}
                            />
                          </>
                        }
                        // onShowLessClick={onShowLess}
                        // onShowMoreClick={onShowMore}
                        showAllContent={false}
                        investers={
                          <InvestorCountContract
                            chainId={farmersData[0].network.chainId}
                            poolAddresses={[farmersData[0].poolAddress]}
                          />
                        }
                        strategyImage={
                          farmersData[0].strategies[0].strategyImage.url
                        }
                        network={{
                          chainId: farmersData[0].network.chainId,
                          networkName: farmersData[0].network.name,
                          networkSymbol: farmersData[0].network.symbol,
                        }}
                      />
                    )}
                  </CardCol>
                </div>
              </Col>

              <Col md={5} className="pt-2 pt-md-5">
                <CardCol className="col-lg-11">
                  <div className="mt-4">
                    {farmersData[1] && (
                      <PopularStrategy
                        apy={farmersData[1].strategies[0].apy + "%"}
                        isCardComingsoon={!farmersData[1].active}
                        comingsoon={!farmersData[1].active}
                        title={farmersData[1].name}
                        content={farmersData[1].strategies[0].description}
                        // risk={}
                        // imageRisk={}
                        icon={
                          <Image src={fixUrl(farmersData[1].farmerImage.url)} />
                        }
                        // risk={}
                        // imageRisk={}
                        onCardClick={handleLeaderClick(
                          `/dashboard/farmer/${farmersData[1].slug}`
                        )}
                        onButtonClick={handleLeaderClick(
                          `/dashboard/farmer/${farmersData[1].slug}`
                        )}
                        // showOnRight={}
                        buttonLabel="Open"
                        // extraApy={
                        //  // tokenObj.boostApy &&
                        //   //new BigNumber(item.apy).plus(100).toFixed() + "%"
                        // }
                        totalValue={
                          <>
                            {" "}
                            {/* <Link
                              to={"reirect"}
                              style={{
                                opacity: "0",
                                width: 0,
                                height: 0,
                                display: "inline-block",
                              }}
                            >
                              Invest
                            </Link> */}
                            <PoolAmount
                              chainId={farmersData[1].network.chainId}
                              poolAddress={farmersData[1].poolAddress}
                            />
                          </>
                        }
                        // onShowLessClick={onShowLess}
                        // onShowMoreClick={onShowMore}
                        showAllContent={false}
                        investers={
                          <InvestorCountContract
                            chainId={farmersData[1].network.chainId}
                            poolAddresses={[farmersData[1].poolAddress]}
                          />
                        }
                        strategyImage={
                          farmersData[1].strategies[0].strategyImage.url
                        }
                        network={{
                          chainId: farmersData[1].network.chainId,
                          networkName: farmersData[1].network.name,
                          networkSymbol: farmersData[1].network.symbol,
                        }}
                      />
                    )}
                  </div>
                  <StrategyDiv>
                    {farmersData[2] && (
                      <PopularStrategy
                        apy={farmersData[2].strategies[0].apy + "%"}
                        isCardComingsoon={!farmersData[2].active}
                        comingsoon={!farmersData[2].active}
                        title={farmersData[2].name}
                        contentTitle={farmersData[2].strategies[0].name}
                        content={farmersData[2].strategies[0].description}
                        // risk={}
                        // imageRisk={}
                        icon={
                          <Image src={fixUrl(farmersData[2].farmerImage.url)} />
                        }
                        // risk={}
                        // imageRisk={}
                        onCardClick={handleLeaderClick(
                          `/dashboard/farmer/${farmersData[2].slug}`
                        )}
                        onButtonClick={handleLeaderClick(
                          `/dashboard/farmer/${farmersData[2].slug}`
                        )}
                        // showOnRight={}
                        buttonLabel="Open"
                        // extraApy={
                        //  // tokenObj.boostApy &&
                        //   //new BigNumber(item.apy).plus(100).toFixed() + "%"
                        // }
                        totalValue={
                          <>
                            {" "}
                            {/* <Link
                              to={"reirect"}
                              style={{
                                opacity: "0",
                                width: 0,
                                height: 0,
                                display: "inline-block",
                              }}
                            >
                              Invest
                            </Link> */}
                            <PoolAmount
                              chainId={farmersData[2].network.chainId}
                              poolAddress={farmersData[2].poolAddress}
                            />
                          </>
                        }
                        // onShowLessClick={onShowLess}
                        // onShowMoreClick={onShowMore}
                        showAllContent={false}
                        investers={
                          <InvestorCountContract
                            chainId={farmersData[2].network.chainId}
                            poolAddresses={[farmersData[2].poolAddress]}
                          />
                        }
                        strategyImage={
                          farmersData[2].strategies[0].strategyImage.url
                        }
                        network={{
                          chainId: farmersData[2].network.chainId,
                          networkName: farmersData[2].network.name,
                          networkSymbol: farmersData[2].network.symbol,
                        }}
                      />
                    )}
                  </StrategyDiv>
                </CardCol>
              </Col>
            </Row>
          </Container>
        </CardBannerAdvantage>
        {/* Advantage */}
      </CardBanner>
    </>
  );
};
