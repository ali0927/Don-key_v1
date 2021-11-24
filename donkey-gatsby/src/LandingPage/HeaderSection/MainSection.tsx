import React, { useState } from "react";
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
import { SlideShow } from "./SlideShow";
import { graphql, useStaticQuery } from "gatsby";
import { getTVL, getUsersCount } from "./helpers";
import { RocketLaunchIcon } from "icons";
import { ButtonWidget } from "components/Button";
import { LaunchButton } from "components/LaunchButton";
import { MainSectionTimer } from "./MainSectionTimer";
import { Text } from "components/Text";

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
  font-weight: 900;
  text-align: left;
  color: #222222;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 49px;
  }
`;

const FooterRow = styled.div`
  width: 100%;
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 60%;
  }
`;

const ETH_PRICE = gql`
  query bundle {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

const StakeButton = styled(ButtonWidget)`
  border: 2px solid #222222;
  font-weight: 600;
  width: 221px;
  @media only screen and (min-width: ${breakPoints.md}) {
    width: 178px;
  }
`;

export const Rocket = styled(RocketLaunchIcon)`
  position: absolute;
  left: 6%;
  bottom: 5%;
`;

export const useFarmersList = () => {
  const Strategies = useStaticQuery(
    graphql`
      query StrapiFarmers {
        allStrapiFarmers(filter: { status: { in: ["active"] } }) {
          totalCount
          nodes {
            poolAddress
            network {
              chainId
            }
            name
            graphUrl
          }
        }
      }
    `
  );
  return {
    list: Strategies.allStrapiFarmers.nodes as ({poolAddress: string; network: {chainId: number}; name: string; graphUrl: string}[]),
    count:Strategies.allStrapiFarmers.totalCount as number
  }
}

export const useDonInfo = () => {
  const { data: ethPriceInfo, loading } = useQuery(ETH_PRICE, {
    client: uniswapClient,
  });
  
 
  
  const [{ data: coingecko }] = useAxios({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/don-key",
  });

  const [usersCount, setUsersCount] = React.useState(0);
  const [totalTVL, setTotalTVL] = React.useState("0");
  const [usersLoading, setUsersLoading] = React.useState(false);
  const [tvlLoading, setTVLLoading] = React.useState(false);

  const {list, count} = useFarmersList();
  const updateUsersCount = async () => {
    setUsersLoading(true);

    const totalUserCount = await getUsersCount(
      list
    );
    setUsersCount(totalUserCount);
    setUsersLoading(false);
    localStorage.setItem("don-key-users-count", totalUserCount.toString());
  };

  const circulatingSupply = coingecko
    ? coingecko.market_data.circulating_supply
    : 0;

  const volume24hrs = coingecko
    ? convertToInternationalCurrencySystem(
        new BigNumber(
          coingecko.tickers.reduce(
            (prev: any, item: any) => new BigNumber(item.volume).plus(prev),
            0
          )
        ).toNumber()
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

  const updateTVL = async () => {
    setTVLLoading(true);
    const totalTVL = await getTVL(list);
    setTotalTVL(totalTVL);
    setTVLLoading(false);
    localStorage.setItem("don-key-tvl", totalTVL);
  };

  React.useEffect(() => {
    (async () => {
      const dateOfSaved = localStorage.getItem("dateOfSaved");
      const usersCount = localStorage.getItem("don-key-users-count");
      const tvl = localStorage.getItem("don-key-tvl");
      if (dateOfSaved && usersCount && tvl) {
        const newDate = new Date().getTime();
        const existingDate = new Date(dateOfSaved).getTime();
        const diff = newDate - existingDate;
        const diffMins = Math.round(diff / 60000);
        if (diffMins > 10) {
          updateUsersCount();
          updateTVL();
        } else {
          setUsersCount(Number(usersCount));
          setTotalTVL(tvl);
        }
      } else {
        updateUsersCount();
        updateTVL();
        localStorage.setItem("dateOfSaved", new Date().toString());
      }
    })();
  }, []);

  return {
    donPrice: finalDerivedEth,
    isDonPriceLoading: loading,
    volume24hrs,
    marketCap,
    totalTVL,
    tvlLoading,
    usersCount,
    usersLoading,
    strategyCount: count,
  };
};

export const MainSection: React.FC = () => {
  const handleTakePart = () => {
    navigate("/stake");
  };

  const {
    donPrice,
    isDonPriceLoading,
    volume24hrs,
    marketCap,
    totalTVL,
    tvlLoading,
    usersCount,
    usersLoading,
    strategyCount,
  } = useDonInfo();

  return (
    <>
      <Root className="position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-lg-5">
              <Heading>Referral is live!</Heading>
              <Text fontSize={18} className="mt-4" style={{ maxWidth: 320 }}>
                Follow real farmers and share with real friends
              </Text>
              <div className="d-flex flex-wrap">
                <LaunchButton className="mt-3 mr-3 " />

                <StakeButton
                  varaint="outlined"
                  className="mt-3 "
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

          <div className=" pb-3 pb-md-5 ">
            <FooterRow className="position-relative">
              <SlideShow
                slides={[
                  {
                    label: "DON price",
                    value: donPrice,
                    isLoading: isDonPriceLoading,
                    symbol: "$",
                  },
                  {
                    label: "24-hour volume",
                    value: volume24hrs.toString(),
                    isLoading: isDonPriceLoading,
                    symbol: "$",
                  },
                  {
                    label: "Market Cap",
                    value: marketCap,
                    isLoading: isDonPriceLoading,
                    symbol: "$",
                  },

                  {
                    label: "TVL",
                    value: totalTVL,
                    isLoading: tvlLoading,
                    symbol: "$",
                  },
                  {
                    label: "Users",
                    value: usersCount.toString(),
                    isLoading: usersLoading,
                    symbol: "",
                  },
                  {
                    label: "Strategies",
                    value: strategyCount.toString(),
                    isLoading: isDonPriceLoading,
                    symbol: "",
                  },
                ]}
              />

              {/* <Slide label="TVL" isLoading={loading} value={marketCap} />
              <Slide label="Users" isLoading={loading} value={marketCap} />

              <Slide label="Strategies" isLoading={loading} value={marketCap} /> */}
            </FooterRow>
          </div>

          <div></div>
        </div>
      </Root>
    </>
  );
};
