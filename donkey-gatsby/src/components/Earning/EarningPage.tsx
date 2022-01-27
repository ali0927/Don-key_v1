import React, { useState } from "react";
import { NavBar } from "../Navbar";
import { Footer } from "../Footer";
import { EarningCard } from "./EarningCard";
import styled from "styled-components";
import DataEarning from "./DataEarning";
import {
  getDonPriceWeb3,
  getPriceFromPriceFeed,
  getPromotionalPoolContract,
  getRewardToken,
  toEther,
} from "helpers";
import { BINANCE_CHAIN_ID, getWeb3 } from "don-components";
import moment from "moment";
import BigNumber from "bignumber.js";
import { useIsomorphicEffect } from "hooks";
import { HeaderSection } from "./HeaderSection";

const EarningSection = styled.div`
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;
export const BackImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 320px;
  z-index: -1;
`;
export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
export const Title = styled.label`
  font-size: xx-large;
  font-weight: bold;
  margin: 10px 0;
`;

const EarningBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0;
`;

const calculateRoi = (data: {
  rewardPerBlock: any;
  tokenPrice: any;
  endBlock: any;
  currentBlock: any;
  total_don: any;
  donPrice: any;
}) => {
  const TotalRewards = new BigNumber(data.endBlock)
    .minus(data.currentBlock)
    .multipliedBy(toEther(data.rewardPerBlock));

  return TotalRewards.multipliedBy(data.tokenPrice)
    .dividedBy(
      new BigNumber(data.total_don).eq(0)
        ? "10"
        : new BigNumber(data.total_don).multipliedBy(data.donPrice)
    )
    .multipliedBy(100)
    .toFixed(2);
};

const EarningCardWrapper = ({
  item: {
    comingSoon,
    logo,
    contractAddress,
    tokenAddress,
    tokenChain,
    id,
    priceFeed,
    priceFeedChain,
  },
}: {
  item: typeof DataEarning[0];
}) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    name: "",
    earn: "",
    currentBlock: 0,
    rewardPerBlock: 0,
    total_don: "0",
    endBlock: 0,
    donPrice: "0.3",
    tokenPrice: "0",
    expiryDate: 0,
  });

  const updateTotalDonAndCurrentBlock = async () => {
    const web3 = getWeb3(BINANCE_CHAIN_ID);
    const PromotionalPool = await getPromotionalPoolContract(
      web3,
      contractAddress
    );

    const stakedDon = await PromotionalPool.methods.totalStakedAmount().call();
    let currentBlock = await web3.eth.getBlockNumber();
    const startBlock = await PromotionalPool.methods.startBlock().call();
    if (new BigNumber(startBlock).gt(currentBlock)) {
      currentBlock = startBlock;
    }
    const donPrice = await getDonPriceWeb3(web3);
    setData((old) => ({
      ...old,
      currentBlock,
      donPrice,
      total_don: toEther(stakedDon),
    }));
  };

  const fetchPoolInfo = async () => {
    setLoading(true);
    try {
      const web3 = getWeb3(BINANCE_CHAIN_ID);
      const PromotionalPool = await getPromotionalPoolContract(
        web3,
        contractAddress
      );
      const Reward = await getRewardToken(web3, contractAddress, tokenChain);

      const endBlock = await PromotionalPool.methods.bonusEndBlock().call();
      const rewardPerBlock = await PromotionalPool.methods
        .rewardPerBlock()
        .call();
      await updateTotalDonAndCurrentBlock();
      let currentBlock = await web3.eth.getBlockNumber();
      const startBlock = await PromotionalPool.methods.startBlock().call();
      if (new BigNumber(startBlock).gt(currentBlock)) {
        currentBlock = startBlock;
      }
      const tokenPrice = toEther(
        await getPriceFromPriceFeed(
          getWeb3(priceFeedChain),
          priceFeed,
          tokenAddress
        )
      );

      setData((old) => ({
        ...old,
        name: Reward.name,
        earn: Reward.symbol,
        rewardPerBlock,
        endBlock,
        tokenPrice: tokenPrice,
        expiryDate: moment()
          .add(
            moment.duration(
              new BigNumber(endBlock)
                .minus(currentBlock)
                .multipliedBy(3)
                .toNumber(),
              "seconds"
            )
          )
          .unix(),
      }));
    } catch (e) {
      console.error("Failed To Load Contract Info");
    } finally {
      setLoading(false);
    }
  };

  useIsomorphicEffect(() => {
    fetchPoolInfo();
    const timer = setInterval(() => {
      updateTotalDonAndCurrentBlock();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <EarningCard
      loading={loading}
      data={{
        earn: data.earn,
        expiryDate: data.expiryDate,
        name: data.name,
        roi: calculateRoi(data),
      }}
      comingSoon={comingSoon}
      id={id}
      logo={logo}
    />
  );
};

export const EarningPage = () => {
  return (
    <div style={{ background: "#F5F5F5" }}>
      <NavBar />
      <EarningSection>
        <HeaderSection />
        <div className="container">
        <EarningBox className="row">
          
          {DataEarning.map((item) => {
            return (
              <div key={item.id} className="col-sm-12 col-md-4 ">
                <EarningCardWrapper item={item} />
              </div>
            );
          })}
        </EarningBox>
        </div>
       
      </EarningSection>
      <Footer />
    </div>
  );
};
