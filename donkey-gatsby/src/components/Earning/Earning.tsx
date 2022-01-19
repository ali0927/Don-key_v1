import React, { useState, useEffect } from "react";
import { NavBar } from "../Navbar";
import { Footer } from "../Footer";
import styled from "styled-components";
import {
  getPendingReward,
  getStakedAmount,
  stakeDon,
  getRewardToken,
  toEther,
  captureException,
  formatNum,
} from "helpers";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import DataEarning from "./DataEarning";
import YellowBack from "./images/yellow_background.png";
import DONKey from "./images/donkey-icon.png";
import BigNumber from "bignumber.js";
import WalletPopup from "components/WalletPopup/WalletPopup";
import { Spinner } from "react-bootstrap";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { StakeDonNew } from "./StakeDonNew";
import { UnStakeDonNew } from "./UnstakeDonNew";
import { theme } from "theme";
import { HeaderSection } from "./HeaderSection";

const EarningSection = styled.div`
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;
const BackImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 320px;
  z-index: -1;
`;
const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Title = styled.label`
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 0;
`;
const Subtitle = styled.label<{ align?: string }>`
  font-size: large;
  font-weight: bold;
  margin-bottom: 0;
  text-align: ${(props) => (props.align ? props.align : "center")};
`;
const EarningBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0px 0px 15px #00000040;
  width: 100%;
  background-color: white;
  border-radius: 16px;
  /* border: 1px solid gray; */
  margin 20px 0px;
  padding: 20px;
  overflow:hidden;
  min-height: 400px;


`;
const EarningLogo = styled.img<{ size?: number }>`
  margin: 10px auto;
  width: ${(props) => (props.size ? props.size : "60")}px;
  height: ${(props) => (props.size ? props.size : "60")}px;
`;
const EarningToken = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const EarningBtn = styled.button<{ disabled?: boolean }>`
  margin: 20px 30px;
  padding: 10px;
  font-size: medium;
  font-weight: bold;
  border: 1px solid #c7bb25;
  box-sizing: border-box;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
  background: ${(props) => (props.disabled ? "ghostwhite" : "#FFF037")};
  &:hover {
    ${(props) => {
      if (!props.disabled) {
        return `background-color: #F5F290;
          color: #000000;
          box-shadow: 0px 0px 20px rgb(0 0 0 / 15%);`;
      }
    }}
  }
`;

const StyledFooter = styled.div`
  background-color: #f7f5f5;
  padding: 30px 100px;
  color: #574600;
  font-size: 14px;
  text-align: left;
  border-radius: 0 0 10px 10px;
  ${theme.mediaQueries.md.down} {
    background-color: #fff;
    padding: 0px;
  }
`;

const StyledHeader = styled.div`
  background-color: #f7f5f5;
  width: 120%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 10px 10px 0 0;
  margin-top: -20px;
  ${theme.mediaQueries.md.up} {
    width: 100%;
    margin-top: 0;
  }
  /* margin: -20px -20px -20px 0; */
`;

const StyledCenter = styled.div`
  width: 100%;
  margin: 20px 10px;
  display: flex;
  justify-content: space-around;
  background-color: #f7f5f5;
`;

export const Earning = ({ id }: { id: string }) => {
  const { getConnectedWeb3, connected, address, chainId, switchNetwork } =
    useWeb3Context();

  const poolObj = DataEarning.find((item) => item.id === id)!;

  const [loading, setLoading] = useState(true);
  const [showConnectWalletPopup, setShowConnectWalletPopup] = useState(false);
  const [showStakedPopup, setShowStakePopup] = useState(false);
  const [showUnStakePopup, setShowUnStakePopup] = useState(false);
  const [poolInfo, setPoolInfo] = useState({
    pendingRewards: "0",
    stakedAmount: "0",
    name: "",
    symbol: "",
  });

  const [isHarvesting, setIsHarvesting] = useState(false);
  const { showFailure, showProgress, showSuccess } =
    useTransactionNotification();

  const fetchPendingAndStakedAmount = async () => {
    const web3 = getWeb3(BINANCE_CHAIN_ID);
    const pendingReward = await getPendingReward(
      web3,
      poolObj.contractAddress,
      address
    );
    const stakedDon = await getStakedAmount(
      web3,
      poolObj.contractAddress,
      address
    );
    const { name, symbol, decimals } = await getRewardToken(
      web3,
      poolObj.contractAddress
    );

    setPoolInfo({
      pendingRewards: toEther(pendingReward, decimals),
      stakedAmount: toEther(stakedDon),
      name,
      symbol,
    });
  };

  const fetchInfo = async () => {
    setLoading(true);
    try {
      await fetchPendingAndStakedAmount();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && address) {
      fetchInfo();
      const interval = setInterval(() => {
        fetchPendingAndStakedAmount();
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [connected, address]);

  const harvest = async () => {
    setIsHarvesting(true);
    try {
      showProgress("Harvesting Rewards");

      await stakeDon(getConnectedWeb3(), poolObj.contractAddress, "0", address);
      showSuccess("Rewards Harvested");
    } catch (e) {
      captureException(e, "Error in Harvest");
      showFailure("Harvesting Failed");
    } finally {
      setIsHarvesting(false);
    }
  };

  const renderBoxMarkup = () => {
    if (!connected) {
      return (
        <div>
          <EarningBtn
            onClick={() => {
              setShowConnectWalletPopup(true);
            }}
          >
            {"Connect Wallet"}
          </EarningBtn>
        </div>
      );
    }

    if (connected && loading) {
      return <Spinner animation="border" />;
    }
    if (connected && !loading) {
      return (
        <>
          <StyledHeader>
            <div className="d-flex align-items-center justify-content-center">
              <EarningLogo src={poolObj.logo} size={50} alt="Reward Token" />
              <EarningLogo
                src={DONKey}
                style={{ marginLeft: -30 }}
                size={58}
                alt="Staking Token Token"
              />
            </div>

            <Title>{`DON to ${poolInfo.name}`}</Title>
            <Subtitle>Deposit DON Tokens and earn {poolInfo.symbol}</Subtitle>
          </StyledHeader>

          <StyledCenter className="row">
            <div className="col-sm-12 col-md-6 col-xl-4">
              <EarningToken>
                <div
                  className="d-flex align-items-end justify-content-center"
                  style={{ height: 80 }}
                >
                  <EarningLogo
                    src={poolObj.logo}
                    size={50}
                    alt="Reward Token"
                  />
                </div>
                <Title>{formatNum(poolInfo.pendingRewards)}</Title>
                <Subtitle>{poolInfo.symbol} Earned</Subtitle>
                {chainId === BINANCE_CHAIN_ID && (
                  <EarningBtn
                    disabled={
                      isHarvesting ||
                      new BigNumber(poolInfo.pendingRewards).eq(0)
                    }
                    onClick={harvest}
                  >
                    {isHarvesting ? "Harvesting" : "Harvest"}
                  </EarningBtn>
                )}
              </EarningToken>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
              <EarningToken>
                <div
                  className="d-flex align-items-end justify-content-center"
                  style={{ height: 80 }}
                >
                  <EarningLogo
                    src={DONKey}
                    size={60}
                    alt="Staking Token Token"
                  />
                </div>
                <Title>{formatNum(poolInfo.stakedAmount)}</Title>
                <Subtitle>DON Tokens Staked</Subtitle>
                {chainId === BINANCE_CHAIN_ID ? (
                  <>
                    {" "}
                    <EarningBtn
                      onClick={() => {
                        setShowStakePopup(true);
                      }}
                    >
                      Stake DON
                    </EarningBtn>
                    {new BigNumber(poolInfo.stakedAmount).gt(0) && (
                      <EarningBtn
                        onClick={() => {
                          setShowUnStakePopup(true);
                        }}
                      >
                        Unstake DON
                      </EarningBtn>
                    )}
                  </>
                ) : (
                  <EarningBtn
                    onClick={() => {
                      switchNetwork(BINANCE_CHAIN_ID);
                    }}
                  >
                    Switch to BSC
                  </EarningBtn>
                )}
              </EarningToken>
            </div>
          </StyledCenter>
          <StyledFooter>{poolObj.tokenInfo}</StyledFooter>
        </>
      );
    }
  };

  return (
    <div style={{ background: "#F5F5F5" }}>
      <NavBar />

      <EarningSection>
        <HeaderSection />
        <div className="container">
          <div className="row">
            <div className="col-12">
              {showConnectWalletPopup && (
                <WalletPopup onClose={() => setShowConnectWalletPopup(false)} />
              )}
              <EarningBox>{renderBoxMarkup()}</EarningBox>
              <p
                style={{
                  marginBottom: 100,
                  color: "#574600",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                * Max cap for staking is 500 $DON. Tier 3 and above have
                unlimited $DON cap
              </p>
              {showStakedPopup && (
                <StakeDonNew
                  stakedAmount={poolInfo.stakedAmount}
                  poolAddress={poolObj.contractAddress}
                  onClose={() => setShowStakePopup(false)}
                  open
                  onDone={async () => {
                    await fetchPendingAndStakedAmount();
                    setShowStakePopup(false);
                  }}
                />
              )}
              {showUnStakePopup && (
                <UnStakeDonNew
                  poolAddress={poolObj.contractAddress}
                  onClose={() => setShowUnStakePopup(false)}
                  open
                  onDone={async () => {
                    await fetchPendingAndStakedAmount();
                    setShowUnStakePopup(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </EarningSection>
      <Footer />
    </div>
  );
};
