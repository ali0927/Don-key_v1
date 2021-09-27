import React from "react";
import { breakPoints } from "breakponts";
import styled from "styled-components";
import { theme } from "theme";
import { NavBar } from "components/Navbar";
import Image from "next/image";
import StackingLogo from "images/StackingLogo.png";
import { Footer } from "components/Footer";
import Rectangle from "images/Rectangle.png";
import { StakingCard } from "./StakingCard";
import {
  BINANCE_CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  getWeb3,
  useWeb3Context,
} from "don-components";
import { useAvailableLpTokens } from "components/LotteryForm/useAvailableLpTokens";
import { useStakedLPTokens } from "components/LotteryForm/useStakedLPTokens";
import { useEarnedRewards } from "components/LotteryForm/useEarnedRewards";
import { useRefresh } from "components/LotteryForm";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { calculateTVL, toEther } from "helpers";
import BigNumber from "bignumber.js";
import { useApy } from "components/LotteryForm/useApy";
import { InitialState } from "./InitialState";
import { fetchStakingInfo } from "./helpers";
import { useIsomorphicEffect } from "hooks";

const Header = styled.div`
  width: 100%;
  background: ${theme.palette.background.yellow};
  position: relative;
  overflow: hidden;
`;

const Heading = styled.p`
  font-family: ObjectSans-Bold;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  color: #222222;
`;

const SubHeading = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #222222;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
  }
`;

const Container = styled.div`
  min-height: 150px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    min-height: 480px;
  }
`;

const StyledImage = styled(Image)`
  z-index: 0;
`;

const Body = styled.div`
  background-color: #ececec;
`;



export const StackingLPTokens: React.FC = () => {
  const { connected, address } = useWeb3Context();

  const [ethStaking, setEthStaking] = React.useState(InitialState);
  const [bnbStaking, setBNBStaking] = React.useState(InitialState);

  const fethInfo = async () => {
    const [EthData, BNBData] = await Promise.all([
      fetchStakingInfo({
        connected,
        chainId: ETHEREUM_CHAIN_ID,
        web3: getWeb3(ETHEREUM_CHAIN_ID),
        address,
      }),
      fetchStakingInfo({
        connected,
        chainId: BINANCE_CHAIN_ID,
        web3: getWeb3(BINANCE_CHAIN_ID),
        address,
      }),
    ]);
    setEthStaking(EthData);
    setBNBStaking(BNBData);
  };

  useIsomorphicEffect(() => {
    fethInfo();
  }, [connected]);

  return (
    <>
      <NavBar />
      <Header>
        <Container className="container">
          <div className="row">
            <div className="col-lg-5 d-flex flex-column justify-content-center">
              <Heading className="my-3">Stake LP Tokens</Heading>
              <SubHeading>
                Deposit DON LP token to gain Don rewards And participate in The
                lottery{" "}
              </SubHeading>
            </div>
            <div className="col-lg-7 d-lg-flex align-items-center justify-content-end d-none ">
              <Image src={StackingLogo} alt="Stacking logo not found" />
            </div>
          </div>
        </Container>
      </Header>

      <Body className="position-relative" style={{ minHeight: 1000 }}>
        <StyledImage
          src={Rectangle}
          alt="Stacking logo not found"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="container pt-5">
          <StakingCard
            key={0}
            networkData={{
              chainId: ETHEREUM_CHAIN_ID,
              apy: ethStaking.apy,
              tvl: ethStaking.tvl,
              networkName:"Ethereum Pool",
              rewardsInEther: ethStaking.rewards,
              stakedLp: ethStaking.stakedLp,
            }}
          />
          <div className="mt-5 mb-5">
            <StakingCard
              key={1}

              networkData={{
                chainId: BINANCE_CHAIN_ID,
                networkName:"Binance",
                apy: bnbStaking.apy,
                tvl: bnbStaking.tvl,
                stakedLp: bnbStaking.stakedLp,
                rewardsInEther: bnbStaking.rewards,
              }}
            />
          </div>
        </div>
      </Body>

      <Footer />
    </>
  );
};
