import { ButtonWidget } from "components/Button";
import React from "react";
import styled from "styled-components";
import MainImage from "./images/Main.png";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useAxios } from "hooks/useAxios";
import { uniswapClient } from "apolloClient";
import { convertToInternationalCurrencySystem } from "helpers";
import BigNumber from "bignumber.js";
import { HeroImage } from "../HeroImage";
import Image from "next/image";
import { useRouter } from "next/router";
const Root = styled.div`
  background-color: #fff037;
  min-height: 500px;
  padding-top: 59px;
  svg {
    transform: translate3d(0px, 0px, 0px) scale(1.1) !important;
  }
`;

const Rounded = styled.div`
    position: absolute;
    bottom: 6.9%;
    height: 100%;
    width: 100%;
`;

const Heading = styled.h1`
  font-family: "ObjectSans-Bold";
  font-size: 50px;
  font-weight: 800;
  text-align: left;
  color: #222222;
`;

const Paragraph = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
`;

const FooterHeading = styled.div`
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

const FooterSubHeading = styled.h1`
  font-family: ObjectSans-Bold;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-top: 13px;
`;

const Button = styled(ButtonWidget)`
  background: linear-gradient(146.14deg, #0b0e12 50%, #35424b 100%);
  font-size: 14px;
  transition: all 0.5s;
  :hover {
    box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
      4px 4px 18px rgba(0, 0, 0, 0.5);
  }
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

// const TOKEN_DATA = gql`
//   query tokens($tokenAddress: Bytes!) {
//     token(id: $tokenAddress) {
//       name
//       symbol
//       decimals
//       derivedETH
//       tradeVolumeUSD
//       totalLiquidity
//     }
//   }
// `;

export const MainSection: React.FC = () => {
  const { data: ethPriceInfo } = useQuery(ETH_PRICE, { client: uniswapClient });
  const history = useRouter();

  const [{ data: coingecko }] = useAxios({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/don-key",
  });

  // const { data } = useQuery(TOKEN_DATA, {
  //   client: uniswapClient,
  //   variables: {
  //     tokenAddress: "0x217ddead61a42369a266f1fb754eb5d3ebadc88a",
  //   },
  // });
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

  const handleTakePart = () => {
    history.push("/lottery/participate");
  };

  return (
    <>
      <Root className="position-relative">
         <Rounded>
          <Image src={MainImage} alt="bg"  />
        </Rounded>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5">
              <Heading>Beta DAPP is now live and open for the public</Heading>
              <Paragraph className="mt-4 w-50">
                Explore and follow strategies built by real farmers
              </Paragraph>
              <Button
                className="mt-5"
                varaint="contained"
                containedVariantColor="black"
                width="30%"
                height="50px"
                onClick={handleTakePart}
              >
                Stake LP token
              </Button>
            </div>

            <div className="col-lg-5 mb-5 d-flex justify-content-center justify-content-lg-end">
              <HeroImage />
            </div>
          </div>

          <div className="d-flex mt-4 pb-5 justify-content-start">
            <FooterRow className="row position-relative">
              <GrayBorder className="d-none d-md-block" />
              <Col className="col-md-3 mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading className="mt-4">DON price</FooterHeading>
                <FooterSubHeading>${finalDerivedEth}</FooterSubHeading>
              </Col>
              <Col className="col-md-3 mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading className="mt-4">24-hour volume</FooterHeading>
                <FooterSubHeading>${volume24hrs}</FooterSubHeading>
              </Col>
              <Col className="col-md-3 mb-4 position-relative d-flex flex-column align-items-start">
                <DarkBorder />
                <FooterHeading className="mt-4">Market Cap</FooterHeading>
                <FooterSubHeading>${marketCap}</FooterSubHeading>
              </Col>
            </FooterRow>
          </div>
        </div>
    
     
    
    
      </Root>
    </>
  );
};
