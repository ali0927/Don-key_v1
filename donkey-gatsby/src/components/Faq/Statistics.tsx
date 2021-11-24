import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import { getWeb3 } from "don-components";
import { StaticImage } from "gatsby-plugin-image";
import {
  formatNum,
  getPoolContract,
  getPoolToken,
  getTokenPrice,
  getTotalPoolValue,
  toEther,
} from "helpers";
import { useIsomorphicEffect, useLocalStorageState } from "hooks";
import { useDonInfo, useFarmersList } from "LandingPage/HeaderSection";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const BorderStyled = styled.div`
  border-top: 2px solid #ebedee;
  .padding {
    padding: 0 10px;
  }
`;
const GrayBorder = styled.hr`
  position: absolute;
  width: 100%;
  border-top: 1.8px dashed#000D09;
  top: 0;
  margin: 0;
  left: 0;
`;
const DarkBorder = styled.hr`
  position: absolute;
  width: 34px;
  border-top: 4px solid #000;
  /* top: -2px; */
  left: 0;
  margin: 0;
  ${(props: { left?: number | string }) => {
    return props.left
      ? css`
          left: ${props.left};
        `
      : ``;
  }}
`;

const Col = styled.div`
  margin-right: 3rem;
  .active {
    color: #000;
    font-weight: bold;
  }
  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 100;
  }
  @media (max-width: 980px) {
    margin-right: 2rem;
  }
  @media (max-width: 780px) {
    margin-right: 1rem;
  }
`;

const Statistiline = styled.hr`
  position: absolute;
  width: 92%;
  border-top: 1.8px dashed#000D09;
  top: 2px;
  margin: 0px;
`;

// Statisticsection
const Statisticsection = styled.div`
  margin-top: 7rem;

  @media (max-width: 580px) {
    margin-top: 2rem;
  }
`;
const Statisticrow = styled.div`
  @media (max-width: 763px) {
    display: flex;
    flex-direction: column-reverse;
  }
  @media (max-width: 580px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;
const Statisticcol = styled.div``;
const Statisticcols = styled.div`
  /* @media (min-width: 990px) {
  width: 300px;
  height: 300px;
  } */
`;
const StatisticsTitle = styled.h2`
  font-weight: 800;
  font-size: 48px;
  color: #18191f;
  @media (max-width: 780px) {
    font-weight: 800;
    font-size: 46px;
    color: #18191f;
  }
`;
const StatisticsTitles = styled.h2`
  font-weight: 800;
  font-size: 24px;

  color: #070602;
`;

const StatistiIcons = styled.div`
  font-size: 23px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  margin-top: -6rem;
  color: #000;
  width: 100% !important;
  @media (max-width: 990px) {
    font-size: 20px;
  }

  @media (max-width: 580px) {
    margin-top: -4rem;
  }
`;
const Iconssubcols = styled.div`
  margin-top: 100px;
`;
const Iconssubcol = styled.div`
  margin-top: 140px;
  @media (max-width: 580px) {
    margin-top: 100px;
  }
`;
const StatisIconsSubicons = styled.div`
  margin-right: 50px;
  margin-left: -10px;
  @media (max-width: 990px) {
    margin-right: 26px;
    margin-left: -10px;
  }
  @media (max-width: 780px) {
    margin-right: 26px;
    margin-left: -10px;
  }
  @media (max-width: 580px) {
    margin-right: 16px;
    margin-left: -10px;
    width: 26px;
    height: 26px;
  }
  @media (max-width: 317px) {
    margin-right: 3px;
    width: 25%;
    height: 25px;
  }
`;
const Statisticsubrow = styled.div`
  font-weight: bold;
  margin-top: -9px;
  font-size: 28px;
  color: #18191f;

  @media (max-width: 780px) {
    font-size: 16px;
  }
  @media (max-width: 580px) {
    font-size: 16px;
    margin-top: -3px;
  }

  @media (max-width: 320px) {
    font-size: 11px;
    margin-top: -3px;
  }
`;
const Statisticsubcol = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #18191f;
  @media (max-width: 990px) {
    font-size: 10px;
  }
  @media (max-width: 780px) {
    font-size: 10px;
  }
  @media (max-width: 580px) {
    margin-right: 26px;
  }
  @media (max-width: 360px) {
    font-size: 9px;
    margin-top: -3px;
  }
`;
const DottedLine = () => {
  return (
    <div style={{ position: "relative" }}>
      <GrayBorder />
      <DarkBorder />
      <DarkBorder left={`50%`} />
    </div>
  );
};



const TotalProfit = () => {
  const {
    hasLoaded,
    state: profit,
    updateState: setProfit,
  } = useLocalStorageState<string>("TotalProfit", "");
  const [isReady, setIsReady] = useState(false);

  const { list } = useFarmersList();

  const calculateProfit = async () => {
    const promises = list.map(async (farmer, index) => {
      const web3 = getWeb3(farmer.network.chainId);
      const poolContract = await getPoolContract(web3, farmer.poolAddress, 2);
      const token = await getPoolToken(web3, farmer.poolAddress);
      const decimals = await token.methods.decimals().call();
      let [poolValue, investedAmount, tokenPrice] = await Promise.all([
        (async () => {
          const amount = await poolContract.methods
            .getinvestedAmountWithReward()
            .call();
          return amount;
        })(),
        (async () => {
          const investedAmount = await poolContract.methods
            .getTotalInvestAmount()
            .call();
          return investedAmount;
        })(),
        getTokenPrice(web3, farmer.poolAddress),
      ]);
      const tokens = toEther(poolValue, decimals);
      const investedTokens = toEther(investedAmount, decimals);
      const profit = new BigNumber(tokens)
        .minus(investedTokens)
        .multipliedBy(tokenPrice);
      console.log(`${index}. Pool: ${farmer.poolAddress} Profit: ${profit}`);
      return profit;
    });

    const result = await Promise.all(promises);
    const totalProfit = result
      .reduce((prev, next) => {
        if (next.gt(0)) {
          return prev.plus(next);
        }
        return prev;
      }, new BigNumber(0))
      .toFixed(0);
    setProfit(totalProfit);
    setIsReady(true);
  };

  useIsomorphicEffect(() => {
    if (hasLoaded && !profit) {
      calculateProfit();
    } else {
      setIsReady(hasLoaded);
    }
  }, [hasLoaded]);

  return (
    <>
      {isReady ? (
        <>${formatNum(profit)} </>
      ) : (
        <Skeleton variant="text" width={50} />
      )}
    </>
  );
};
const INVESTORS_QUERY_DATA = gql`
  query AllInvestors {
    investors(first: 1000, where: { isInvested: true }) {
      address
      isInvested
      timestamp
    }
  }
`;

const TierMembers = () => {
  const {
    hasLoaded,
    state: member,
    updateState: setMembers,
  } = useLocalStorageState<string>("TierMembers", "");
  const [isReady, setIsReady] = useState(false);
  const { list } = useFarmersList();
  const fetchTierMembers = () => {
    const addresses: string[] = [];
    const userAddressListpromises = list.forEach(async (item) => {
      const graphurl = item.graphUrl;
      const client = new ApolloClient({
        uri: graphurl,
        cache: new InMemoryCache({ resultCaching: false }),
      });
      const { data } = await client.query({ query: INVESTORS_QUERY_DATA });
      
    });
  };
  useIsomorphicEffect(() => {
    if (hasLoaded && !member) {
      fetchTierMembers();
    } else {
      setIsReady(hasLoaded);
    }
  }, [hasLoaded]);
  return (
    <>
      {isReady ? (
        <>{formatNum(member)} </>
      ) : (
        <Skeleton variant="text" width={50} />
      )}
    </>
  );
};

const DonRewardsDistribute = gql`
query {
  donClaimTotals {
    amount
  }
}
`;

const DonRewardOut = () => {
  const {
    hasLoaded,
    state: donRewards,
    updateState: setDonRewards,
  } = useLocalStorageState<string>("DonRewards", "", false);
  const [isReady, setIsReady] = useState(false);

  const fetchDonRewards = async () => {
    const client = new ApolloClient({
      uri: process.env.GATSBY_DON_STAKING_SUBGRAPH,
      cache: new InMemoryCache({ resultCaching: false }),
    });
    const client1 =  new ApolloClient({
      uri: process.env.GATSBY_LP_STAKING_ETH_SUBGRAPH,
      cache: new InMemoryCache({ resultCaching: false }),
    });
    const client2 =new ApolloClient({
      uri: process.env.GATSBY_LP_STAKING_BSC_SUBGRAPH,
      cache: new InMemoryCache({ resultCaching: false }),
    });
    const { data } = await client.query({ query: DonRewardsDistribute });
    const { data: data1} = await client1.query({ query: DonRewardsDistribute });
    const { data: data2} = await client2.query({ query: DonRewardsDistribute });
    const result = new BigNumber(toEther(data.donClaimTotals[0].amount)).plus(toEther(data1.donClaimTotals[0].amount)).plus(toEther(data2.donClaimTotals[0].amount));
    setDonRewards(result.toFixed(0));
    setIsReady(true);
  }

  useIsomorphicEffect(() => {
    if (hasLoaded && !donRewards) {
      fetchDonRewards();
    } else {
      setIsReady(hasLoaded);
    }
  }, [hasLoaded]);
  return (
    <>
      {isReady ? (
        <> {formatNum(donRewards)} $DON</>
      ) : (
        <Skeleton variant="text" width={50} />
      )}
    </>
  );
}

export const Statistics = () => {
  const {
    tvlLoading,
    totalTVL,
    usersCount,
    usersLoading,
    isDonPriceLoading,
    donPrice,
    marketCap,
  } = useDonInfo();

  return (
    <>
      <div className="row">
        <div className="offset-2"></div>
        <div className="col-md-10">
          <BorderStyled>
            <Statisticcols className="col-12 py-5 ">
              <StatisticsTitles className="d-block d-lg-none d-md-none mt-1">
                Some counts that <br />
                matters
              </StatisticsTitles>
              <div className="row padding">
                {/* ---------------------------------------------------- */}
                <Iconssubcols className="col-md-12 ">
                  <Statistiline />
                  <div className="row position-relative ">
                    <div className="col position-relative ">
                      <DarkBorder />
                      <StatistiIcons>
                        <div className=" d-flex flex-row align-items-center">
                          <StatisIconsSubicons>
                            <StaticImage
                              className="d-inline-block"
                              src="../../images/dongraphs.png"
                              alt="ImageNotFound"
                            />
                          </StatisIconsSubicons>
                          <Statisticsubrow className="d-flex flex-column align-items-start text-nowrap">
                            {tvlLoading ? (
                              <Skeleton variant="text" width={50} />
                            ) : (
                              <>${totalTVL}</>
                            )}
                            <Statisticsubcol>Total TVL</Statisticsubcol>
                          </Statisticsubrow>
                        </div>
                      </StatistiIcons>
                    </div>
                    <div className="col position-relative ">
                      <DarkBorder />
                      <StatistiIcons>
                        <div className=" d-flex flex-row align-items-center">
                          <StatisIconsSubicons>
                            <StaticImage
                              className="d-inline-block"
                              src="../../images/followerstatic.png"
                              alt="ImageNotFound"
                            />
                          </StatisIconsSubicons>
                          <Statisticsubrow className="d-flex flex-column align-items-start text-nowrap">
                            {usersLoading ? (
                              <Skeleton variant="text" width={50} />
                            ) : (
                              usersCount
                            )}
                            <Statisticsubcol>Users</Statisticsubcol>
                          </Statisticsubrow>
                        </div>
                      </StatistiIcons>
                    </div>
                  </div>
                </Iconssubcols>
                {/* -------------------------------------------------------- */}
                <Iconssubcol className="col-md-12 ">
                  <Statistiline />
                  <div className="row position-relative ">
                    <div className="col position-relative ">
                      <DarkBorder />
                      <StatistiIcons>
                        <div className=" d-flex flex-row align-items-center">
                          <StatisIconsSubicons>
                            <StaticImage
                              className="d-inline-block"
                              src="../../images/static1.png"
                              alt="ImageNotFound"
                            />
                          </StatisIconsSubicons>
                          <Statisticsubrow className="d-flex flex-column align-items-start">
                            $
                            {isDonPriceLoading ? (
                              <Skeleton variant="text" width={50} />
                            ) : (
                              donPrice
                            )}
                            <Statisticsubcol>Token Price</Statisticsubcol>
                          </Statisticsubrow>
                        </div>
                      </StatistiIcons>
                    </div>
                    <div className="col position-relative ">
                      <DarkBorder />
                      <StatistiIcons>
                        <div className=" d-flex flex-row align-items-center">
                          <StatisIconsSubicons>
                            <StaticImage
                              className="d-inline-block"
                              src="../../images/pieadmin.png"
                              alt="ImageNotFound"
                            />
                          </StatisIconsSubicons>
                          <Statisticsubrow className="d-flex flex-column align-items-start">
                            {isDonPriceLoading ? (
                              <Skeleton variant="text" width={50} />
                            ) : (
                              <> ${marketCap}</>
                            )}
                            <Statisticsubcol>Market Cap</Statisticsubcol>
                          </Statisticsubrow>
                        </div>
                      </StatistiIcons>
                    </div>
                  </div>
                </Iconssubcol>

                {/* ---------------------------------------------- Iconssubcol */}
                <Iconssubcol className="col-md-12">
                  <Statistiline />
                  <div className="row position-relative ">
                    <div className="col position-relative">
                      <DarkBorder />
                      <StatistiIcons>
                        <div className=" d-flex flex-row align-items-start">
                          <StatisIconsSubicons>
                            <StaticImage
                              className="d-inline-block"
                              src="../../images/trophy.png"
                              alt="ImageNotFound"
                            />
                          </StatisIconsSubicons>
                          <Statisticsubrow className="d-flex flex-column align-items-start ">
                            <DonRewardOut />
                            <Statisticsubcol>Don Reward Out</Statisticsubcol>
                          </Statisticsubrow>
                        </div>
                      </StatistiIcons>
                    </div>
                    <div className="col position-relative ">
                      <DarkBorder />
                      <StatistiIcons>
                        <div className=" d-flex flex-row align-items-center">
                          <StatisIconsSubicons>
                            <StaticImage
                              className="d-inline-block"
                              src="../../images/dollarProfit.png"
                              alt="ImageNotFound"
                            />
                          </StatisIconsSubicons>
                          <Statisticsubrow className="d-flex flex-column align-items-start text-nowrap">
                          <TotalProfit />
                            <Statisticsubcol>Total Profit</Statisticsubcol>
                          </Statisticsubrow>
                        </div>
                      </StatistiIcons>
                    </div>
                  </div>
                </Iconssubcol>
              </div>
            </Statisticcols>
          </BorderStyled>
        </div>
      </div>
    </>
  );
};
