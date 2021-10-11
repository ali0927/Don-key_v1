import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import { Heading3 } from "../components";
import { theme } from "theme";
import { ButtonWidget } from "components/Button";
import { navigate } from "gatsby-link";
import { breakPoints } from "breakponts";
import { graphql, useStaticQuery } from "gatsby";
import { sampleSize, filter } from "lodash";
import BigNumber from "bignumber.js";
import { fixUrl } from "helpers";
import { PoolAmount } from "components/PoolAmount";
import { InvestorCountContract } from "components/InvestorCountGraphql";
import { INetwork, IStrategy } from "./interfaces";
import clsx from "clsx";

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

const fadein = keyframes`
  0% { opacity: 0; }
    100% { opacity: 1; }`;

const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }`;

const AnimationDiv = styled.div`
  .fadeIn {
    animation-name: ${fadein};
    animation-duration: 4s;
    animation-fill-mode: linear forwards;
  }
  .fadeOut {
    animation-name: ${fadeOut};
    animation-duration: 4s;
    animation-fill-mode: linear forwards;
  }
`;

export const CardsSection: React.FC = () => {
  const StrategiesData = useStaticQuery(
    graphql`
      query MyQuery {
        allStrapiNetworks {
          nodes {
            chainId
            id
            slug
            name
            symbol
            strapiId
          }
        }
        allStrapiStrategies {
          nodes {
            apy
            name
            description
            slug
            network
            strategyImage {
              url
            }
            farmer {
              name
              farmerImage {
                url
              }
              slug
              poolAddress
            }
            token {
              boostApy
            }
            risk {
              Title
              image {
                url
              }
            }
          }
        }
      }
    `
  );

  const [farmersFinalList, setFarmersFinalList] = React.useState<IStrategy[]>(
    []
  );
  const [farmersData, setFarmersData] = React.useState<IStrategy[]>([]);
  const [isFadeIn, setIsFadeIn] = React.useState(false);

  const strategies: IStrategy[] = StrategiesData.allStrapiStrategies.nodes;
  const networks: INetwork[] = StrategiesData.allStrapiNetworks.nodes;

  React.useEffect(() => {
    console.log("strategies--------",strategies)
    const finalFarmersList = filter(strategies, (item) => {
      if (item.farmer.farmerImage && item.network && item.strategyImage) {
        return true;
      }
      return false;
    });
    setFarmersData(sampleSize(finalFarmersList, 3));
    setFarmersFinalList(finalFarmersList);
    setIsFadeIn(true);
  }, [strategies.length]);

  React.useEffect(() => {
    const currentInerval = setInterval(() => {
      setIsFadeIn(false);
      setTimeout(() => {
        setFarmersData(sampleSize(farmersFinalList, 3));
        setIsFadeIn(true);
      }, 3000);
    }, 10000);

    return () => {
      clearInterval(currentInerval);
    };
  }, [farmersFinalList.length]);

  console.log("TESTING DATA--------",farmersData)

  const network0 = farmersData[0]
    ? networks.find((x) => x.strapiId === farmersData[0].network)
    : null;
  const network1 = farmersData[1]
    ? networks.find((x) => x.strapiId === farmersData[1].network)
    : null;
  const network2 = farmersData[2]
    ? networks.find((x) => x.strapiId === farmersData[2].network)
    : null;

  const handleLeaderClick = (url: string) => () => {
    navigate(url);
  };

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
                    {farmersData[0] && network0 && (
                      <AnimationDiv>
                        <div
                          className={clsx({
                            fadeIn: isFadeIn,
                            fadeOut: !isFadeIn,
                          })}
                        >
                          <PopularStrategy
                            apy={farmersData[0].apy + "%"}
                            contentTitle={farmersData[0].name}
                            content={farmersData[0].description}
                            title={farmersData[0].farmer.name}
                            icon={
                              <Image
                                src={fixUrl(
                                  farmersData[0].farmer.farmerImage.url
                                )}
                              />
                            }
                            risk={farmersData[0].risk.Title.toLowerCase()}
                            imageRisk={farmersData[0].risk.image.url}
                            onCardClick={handleLeaderClick(
                              `/dashboard/farmer/${farmersData[0].farmer.slug}`
                            )}
                            onButtonClick={handleLeaderClick(
                              `/dashboard/farmer/${farmersData[0].farmer.slug}`
                            )}
                            buttonLabel="Open"
                            extraApy={
                              farmersData[0].token.boostApy &&
                              new BigNumber(farmersData[0].apy)
                                .plus(100)
                                .toFixed() + "%"
                            }
                            totalValue={
                              <>
                                <PoolAmount
                                  chainId={network0.chainId}
                                  poolAddress={
                                    farmersData[0].farmer.poolAddress
                                  }
                                />
                              </>
                            }
                            showAllContent={false}
                            investers={
                              <InvestorCountContract
                                chainId={network0.chainId}
                                poolAddresses={[
                                  farmersData[0].farmer.poolAddress,
                                ]}
                              />
                            }
                            strategyImage={farmersData[0].strategyImage.url}
                            network={{
                              chainId: network0.chainId,
                              networkName: network0.name,
                              networkSymbol: network0.symbol,
                            }}
                          />
                        </div>
                      </AnimationDiv>
                    )}
                  </CardCol>
                </div>
              </Col>

              <Col md={5} className="pt-2 pt-md-5">
                <CardCol className="col-lg-11">
                  <div className="mt-4">
                    {farmersData[1] && network1 && (
                      <AnimationDiv>
                        <div
                          className={clsx({
                            fadeIn: isFadeIn,
                            fadeOut: !isFadeIn,
                          })}
                        >
                          <PopularStrategy
                            apy={farmersData[1].apy + "%"}
                            contentTitle={farmersData[1].name}
                            content={farmersData[1].description}
                            title={farmersData[1].farmer.name}
                            icon={
                              <Image
                                src={fixUrl(
                                  farmersData[1].farmer.farmerImage.url
                                )}
                              />
                            }
                            risk={farmersData[1].risk.Title.toLowerCase()}
                            imageRisk={farmersData[1].risk.image.url}
                            buttonLabel="Open"
                            extraApy={
                              farmersData[1].token.boostApy &&
                              new BigNumber(farmersData[1].apy)
                                .plus(100)
                                .toFixed() + "%"
                            }
                            onCardClick={handleLeaderClick(
                              `/dashboard/farmer/${farmersData[1].farmer.slug}`
                            )}
                            onButtonClick={handleLeaderClick(
                              `/dashboard/farmer/${farmersData[1].farmer.slug}`
                            )}
                            totalValue={
                              <>
                                <PoolAmount
                                  chainId={network1.chainId}
                                  poolAddress={
                                    farmersData[1].farmer.poolAddress
                                  }
                                />
                              </>
                            }
                            showAllContent={false}
                            investers={
                              <InvestorCountContract
                                chainId={network1.chainId}
                                poolAddresses={[
                                  farmersData[1].farmer.poolAddress,
                                ]}
                              />
                            }
                            strategyImage={farmersData[1].strategyImage.url}
                            network={{
                              chainId: network1.chainId,
                              networkName: network1.name,
                              networkSymbol: network1.symbol,
                            }}
                          />
                        </div>
                      </AnimationDiv>
                    )}
                  </div>
                  <StrategyDiv>
                    {farmersData[2] && network2 && (
                      <AnimationDiv>
                        <div
                          className={clsx({
                            fadeIn: isFadeIn,
                            fadeOut: !isFadeIn,
                          })}
                        >
                          <PopularStrategy
                            apy={farmersData[2].apy + "%"}
                            contentTitle={farmersData[2].name}
                            content={farmersData[2].description}
                            title={farmersData[2].farmer.name}
                            icon={
                              <Image
                                src={fixUrl(
                                  farmersData[2].farmer.farmerImage.url
                                )}
                              />
                            }
                            risk={farmersData[2].risk.Title.toLowerCase()}
                            imageRisk={farmersData[2].risk.image.url}
                            onCardClick={handleLeaderClick(
                              `/dashboard/farmer/${farmersData[2].farmer.slug}`
                            )}
                            onButtonClick={handleLeaderClick(
                              `/dashboard/farmer/${farmersData[2].farmer.slug}`
                            )}
                            buttonLabel="Open"
                            extraApy={
                              farmersData[2].token.boostApy &&
                              new BigNumber(farmersData[2].apy)
                                .plus(100)
                                .toFixed() + "%"
                            }
                            totalValue={
                              <>
                                <PoolAmount
                                  chainId={network2.chainId}
                                  poolAddress={
                                    farmersData[2].farmer.poolAddress
                                  }
                                />
                              </>
                            }
                            showAllContent={false}
                            investers={
                              <InvestorCountContract
                                chainId={network2.chainId}
                                poolAddresses={[
                                  farmersData[2].farmer.poolAddress,
                                ]}
                              />
                            }
                            strategyImage={farmersData[2].strategyImage.url}
                            network={{
                              chainId: network2.chainId,
                              networkName: network2.name,
                              networkSymbol: network2.symbol,
                            }}
                          />
                        </div>
                      </AnimationDiv>
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
