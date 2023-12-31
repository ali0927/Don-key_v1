import React from "react";
import { breakPoints } from "breakponts";
import styled from "styled-components";
import { theme } from "theme";
import { NavBar } from "components/Navbar";
// import StackingLogo from "images/StackingLogo.png";
import { Footer } from "components/Footer";
import Rectangle from "images/Rectangle.png";
import { StakingCard } from "./StakingCard";
import WBNBImage from "images/WBNB.png";
import DonTokenImage from "images/DonToken.png";
import TetherUSDT from "images/TetherUSDT.png";
import {
  BINANCE_CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  getWeb3,
  useWeb3Context,
} from "don-components";
import { InitialState } from "./InitialState";
import { fetchStakingInfo } from "./helpers";
import { useIsomorphicEffect } from "hooks";
import { useRefresh } from "components/LotteryForm";

const Header = styled.div`
  width: 100%;
  background: ${theme.palette.background.yellow};
  position: relative;
  overflow: hidden;
`;

const Heading = styled.p`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  font-style: normal;
  color: #222222;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 42px;
  }
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
  height: 150px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 280px;
  }
`;

const StyledImage = styled.img`
  z-index: 0;
  object-fit: cover;
  object-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  background-color: #ececec;
  /* min-height: 683px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    min-height: 683px;
  } */
`;

const PancakeSwapLink =
  "https://pancakeswap.finance/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255";
const UniswapLink =
  "https://app.uniswap.org/#/add/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0x217ddEad61a42369A266F1Fb754EB5d3EBadc88a";

export const StackingLPTokens: React.FC = () => {
  const { connected, address } = useWeb3Context();

  const [ethStaking, setEthStaking] = React.useState(InitialState);
  const [bnbStaking, setBNBStaking] = React.useState(InitialState);
  const { dependsOn } = useRefresh();
  const fethInfo = async () => {
    try {
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
    } catch (e) {
      console.log(e);

    }
  };

  useIsomorphicEffect(() => {
    fethInfo();
  }, [connected, dependsOn]);

  return <h1>Hello</h1>

  return (
    <>
      <NavBar />
      <Header>
        <Container className="container">
          <div className="row h-100">
            <div className="col-lg-5 d-flex flex-column justify-content-center">
              <Heading className="my-1">Stake LP Tokens</Heading>
              <SubHeading>
                Deposit $DON LP token to gain $DON rewards and coming soon will
                gain you access to the Don-key DAPP tiers
              </SubHeading>
            </div>
            <div className="col-lg-7 d-lg-flex align-items-center justify-content-end d-none ">
              {/* <img src={StackingLogo} alt="Stacking logo not found" /> */}
            </div>
          </div>
        </Container>
      </Header>

      <Body className="position-relative pb-5">
        <StyledImage src={Rectangle} alt="Stacking logo not found" />
        <div className="container pt-5">
          <StakingCard
            buyLink={UniswapLink}
            networkData={{
              chainId: ETHEREUM_CHAIN_ID,
              networkName: "ERC20 Pool",
              ...ethStaking,
              tokenSymbol: "LP",
              buttons: [
                { label: "USDT", imageSrc: TetherUSDT },
                { label: "DON", imageSrc: DonTokenImage },
              ],
            }}
          />
          <div className="mt-3 mt-lg-5">
            <StakingCard
              buyLink={PancakeSwapLink}
              networkData={{
                chainId: BINANCE_CHAIN_ID,
                networkName: "BEP20 Pool",
                ...bnbStaking,
                tokenSymbol: "LP",
                buttons: [
                  { label: "WBNB", imageSrc: WBNBImage },
                  { label: "DON", imageSrc: DonTokenImage },
                ],
              }}
            />
          </div>
        </div>
      </Body>

      <Footer />
    </>
  );
};
