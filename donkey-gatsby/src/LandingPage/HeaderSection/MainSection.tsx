import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useAxios } from "hooks/useAxios";
import { uniswapClient } from "apolloClient";
import { convertToInternationalCurrencySystem } from "helpers";
import BigNumber from "bignumber.js";
import { HeroImage } from "../HeroImage";
import { navigate } from "gatsby-link";
import { theme } from "theme";
import { breakPoints } from "breakponts";
import { Skeleton } from "@material-ui/lab";
import { RocketLaunchIcon } from "icons";
import { ButtonWidget } from "components/Button";
const Root = styled.div`
  background-color: #fff037;
  min-height: 500px;
  padding-top: 20px;

  svg {
    transform: translate3d(0px, 0px, 0px) scale(1.1) !important;
  }
  position: relative;

  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 150px;
    border-radius: 50%;
    bottom: -75px;
    display: none;
    z-index: 0;
    background-color: ${theme.palette.background.yellow};
    ${theme.mediaQueries.md.up} {
      display: block;
    }
  }
`;

const Heading = styled.h1`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 40px;
  font-weight: 800;
  text-align: left;
  color: #222222;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 50px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  word-break: break-word;
  width: 80%;
  @media only screen and (min-width: ${breakPoints.md}) {
    width: 100%;
  }
`;

const FooterHeading = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

const FooterSubHeading = styled.h1`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-top: 13px;
`;

const FooterRow = styled.div`
  width: 100%;
`;

const Col = styled.div``;

const GrayBorder = styled.hr`
  position: absolute;
  width: 50%;
  border-top: 1.8px dashed#000D09;
  top: 2px;
  margin: 0px;
  margin-left: 15px;
`;

const DarkBorder = styled.div`
  width: 29px;
  height: 5px;
  background: #000;
`;

const ETH_PRICE = gql`
  query bundle {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

const LaunchButton = styled.button`
  background: #222222;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12);
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 500;
  border: 0;
  font-size: 16px;
  border-radius: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
  :hover {
    box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
      4px 4px 18px rgba(0, 0, 0, 0.5);
  }
`;

const StakeButton = styled(ButtonWidget)`
  border: 2px solid #222222;
  font-weight: 600;
`;

const Rocket = styled(RocketLaunchIcon)`
  position: absolute;
  left: 6%;
  bottom: 5%;
`;

// const LunchRocketRoot = styled.div`
//   position: absolute;
//   width: 27%;
//   bottom: 9px;
//   left: 0;
// `;

export const MainSection: React.FC = () => {
  const { data: ethPriceInfo, loading } = useQuery(ETH_PRICE, {
    client: uniswapClient,
  });

  const [{ data: coingecko }] = useAxios({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/don-key",
  });

  const circulatingSupply = coingecko
    ? coingecko.market_data.circulating_supply
    : 0;

  const volume24hrs = coingecko
    ? convertToInternationalCurrencySystem(
        new BigNumber(coingecko.tickers[0].converted_volume.usd).toNumber()
      ).toString()
    : 0;

  const derivedETH = coingecko ? coingecko.market_data.current_price.eth : 0;
  const ethPriceInUSD = ethPriceInfo && ethPriceInfo.bundle.ethPrice;
  const finalDerivedEth = (
    parseFloat(derivedETH) * parseFloat(ethPriceInUSD)
  ).toFixed(2);
  // const totalLiquidity = data && data.token.totalLiquidity;

  const marketCap = convertToInternationalCurrencySystem(
    new BigNumber(parseFloat(finalDerivedEth) * circulatingSupply).toNumber()
  ).toString();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleTakePart = () => {
    navigate("/stake");
  };

  return (
    <>
      <Root className="position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-lg-5">
              <Heading>Beta DAPP is now live and open for the public</Heading>
              <Paragraph className="mt-4 w-md-50">
                Explore and follow strategies built by real farmers
              </Paragraph>
              <div className="d-flex flex-wrap">
                <LaunchButton
                  className="mt-3 mt-lg-5 mr-3 position-relative d-flex justify-content-end"
                  style={{ width: 221, height: 55 }}
                  onClick={handleDashboard}
                >
                  <Rocket />
                  LAUNCH APP
                </LaunchButton>

                <StakeButton
                  varaint="outlined"
                  className="mt-3 mt-lg-5"
                  width="178px"
                  height="55px"
                  onClick={handleTakePart}
                >
                  STAKE LP DON
                </StakeButton>
              </div>
            </div>

            <div className="col-lg-5 mb-5 d-flex justify-content-center justify-content-lg-end">
              <HeroImage />
            </div>
          </div>

          <div className="d-flex pb-3 pb-md-5 justify-content-start">
            <FooterRow className="row position-relative">
              <GrayBorder className="d-none d-md-block" />
              <Col className="col-md-3 mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading className="mt-4">DON price</FooterHeading>
                <FooterSubHeading>
                  {loading ? (
                    <Skeleton width={100} variant="text" />
                  ) : (
                    `$${finalDerivedEth}`
                  )}
                </FooterSubHeading>
              </Col>
              <Col className="col-md-3 mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading className="mt-4">24-hour volume</FooterHeading>
                <FooterSubHeading>
                  {loading ? (
                    <Skeleton variant="text" width={100} />
                  ) : (
                    `$${volume24hrs}`
                  )}
                </FooterSubHeading>
              </Col>
              <Col className="col-md-3 mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading className="mt-4">Market Cap</FooterHeading>
                <FooterSubHeading>
                  {loading ? (
                    <Skeleton variant="text" width={100} />
                  ) : (
                    `$${marketCap}`
                  )}
                </FooterSubHeading>
              </Col>
            </FooterRow>
          </div>
        </div>
      </Root>
    </>
  );
};
