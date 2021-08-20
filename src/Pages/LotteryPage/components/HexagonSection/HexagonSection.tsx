/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@apollo/client";
import BigNumber from "bignumber.js";
import gql from "graphql-tag";
import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { convertToInternationalCurrencySystem } from "./helpers/convertToInternationalCurrency";
import { useAxios } from "hooks/useAxios";
import { uniswapClient } from "apolloClient";

const Wrapper = styled.div`
  max-width: 90%;
  min-height: 300px;
  margin-top: -9%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HexaginWrapper = styled.div`
  position: relative;
  width: 221px;
  height: 127.59px;
  background-color: #ffffff;
  margin: 63.8px 0;
  /* box-shadow: 0px 10px 20px rgba(41, 41, 42, 0.07); */
  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 156.27px;
    height: 156.27px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 32.3647px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }

  &:before {
    top: -78.1353px;
    box-shadow: none !important;
  }

  &:after {
    bottom: -78.1353px;
  }

  /*cover up extra shadows*/
  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: 0;
    width: 221px;
    height: 127.5944px;
    z-index: 2;
    background: inherit;
  }
`;

const Heading = styled.p`
  font-family: Roboto;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  margin-bottom: 0px;
`;

const SubHeading = styled.p`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
`;

const ETH_PRICE = gql`
  query bundle {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

const TOKEN_DATA = gql`
  query tokens($tokenAddress: Bytes!) {
    token(id: $tokenAddress) {
      name
      symbol
      decimals
      derivedETH
      tradeVolumeUSD
      totalLiquidity
    }
  }
`;

export const HexagonSection: React.FC = () => {
  const { data: ethPriceInfo } = useQuery(ETH_PRICE, { client: uniswapClient });

  const [{ data: coingecko }] = useAxios({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/don-key",
  });

  const { data } = useQuery(TOKEN_DATA, {
    client: uniswapClient,
    variables: {
      tokenAddress: "0x217ddead61a42369a266f1fb754eb5d3ebadc88a",
    },
  });
  const circulatingSupply = coingecko
    ? coingecko.market_data.circulating_supply
    : 0;

  const volume24hrs = coingecko
    ? convertToInternationalCurrencySystem(
        new BigNumber(coingecko.tickers[0].converted_volume.usd).toNumber()
      ).toString()
    : 0;

  const derivedETH = data && data.token.derivedETH;
  const ethPriceInUSD = ethPriceInfo && ethPriceInfo.bundle.ethPrice;
  const finalDerivedEth = (
    parseFloat(derivedETH) * parseFloat(ethPriceInUSD)
  ).toFixed(2);
  const totalLiquidity = data && data.token.totalLiquidity;

  const marketCap = convertToInternationalCurrencySystem(
    new BigNumber(parseFloat(finalDerivedEth) * circulatingSupply).toNumber()
  ).toString();

  const Hexagon = (heading: string, subheading: string) => {
    return (
      <>
        <HexaginWrapper>
          <span>
            <div className="d-block">
              <Heading>{heading}</Heading>
              <SubHeading>{subheading}</SubHeading>
            </div>
          </span>
        </HexaginWrapper>
      </>
    );
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Wrapper className="row">
          <div className="col-lg-4 col-md-6 mb-2 d-flex justify-content-center">
            {Hexagon("$" + finalDerivedEth, "$DON price")}
          </div>

          <div className="col-lg-4 col-md-6  mb-2 d-flex justify-content-center">
            {Hexagon("$" + volume24hrs, "24-hour volume")}
          </div>
          <div className="col-lg-4 col-md-6 mb-2 d-flex justify-content-center">
            {Hexagon("$" + marketCap, "Market Cap")}
          </div>
        </Wrapper>
      </Container>
    </>
  );
};
