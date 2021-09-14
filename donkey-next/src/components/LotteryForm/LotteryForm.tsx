/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonWidget, ContainedButton } from "components/Button";
import { BINANCE_CHAIN_ID, ETHEREUM_CHAIN_ID, useWeb3Context } from "don-components";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { LotteryPopupForm } from "./LotteryPopupForm";
import BigNumber from "bignumber.js";
import { useAvailableLpTokens } from "./useAvailableLpTokens";
import { useStakedLPTokens } from "./useStakedLPTokens";
import { calculateTVL, captureException, getStakingContract, toEther } from "helpers";
import { useEarnedRewards } from "./useEarnedRewards";
import { useRefresh } from "./useRefresh";
import { useApy } from "./useApy";
import { useTransactionNotification } from "./useTransactionNotification";
export const Label = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-align: left;
  margin-top: 5px;
`;

export const Input = styled.input`
  height: 38px;
  width: 80%;
  border-radius: 5px;
  background: #ffffff;
  border-radius: 5px;
  border: 0px !important;
  padding: 5px;
  padding-left: 15px;

  &:focus {
    border: 0;
  }
`;

export const InputSmall = styled.input`
  height: 38px;
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
  border-radius: 10px;
  width: 100%;
  :focus {
    outline: 0px;
  }
`;

const StakeButton = styled(ContainedButton)`
  border-radius: 5px;
  background: #070602;
  color: #fff;
  padding: 10px 30px;

  &:hover {
    background: #2e2e2e;
  }
  &:disabled {
    background: #2e2e2e;
  }
`;

const UnstakeButton = styled(ContainedButton)`
  border-radius: 5px;
  background: #fff;
  color: #070602;
  padding: 10px 30px;
  border: 1px solid #070602;
  &:hover {
    background: #d9d9d9;
  }
  &:disabled {
    background: #d9d9d9;
  }
`;
export const Caption = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #a69a03;
`;

const WhiteCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.12),
    0px 10px 32px -4px rgba(24, 39, 75, 0.1);
  border-radius: 10px;
`;

const RewardsAmount = styled.div`
  font-weight: 500;
  font-size: 50px;
  ${(props: { disabled: boolean }) => props.disabled && `color: #d9d9d9;`}
`;

const RewardsTitle = styled.h3`
  font-weight: 800;
  font-size: 16px;
`;

const CardItem = styled.div`
  padding: 1rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: break-word;
  &:not(:last-child) {
    border-right: 0.5px solid rgb(0 13 9 / 24%);
  }
`;
const ItemHeading = styled.h5`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
`;

const ItemInfo = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

export const StyledButton = styled(ButtonWidget)`
  // width: 132px;
  font-size: 12px;
  border-radius: 10px !important;
  &:disabled {
    ${(props) => {
      if (
        props.varaint === "contained" &&
        props.containedVariantColor === "lightYellow"
      ) {
        return `background-color: rgba(255, 236, 92, 0.5);`;
      }
    }}
  }
`;

const PancakeSwapLink =
  "https://exchange.pancakeswap.finance/#/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255";
const UniswapLink =
  "https://app.uniswap.org/#/add/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0x217ddEad61a42369A266F1Fb754EB5d3EBadc88a";

const useTVL = () => {
  const [tvl, setTVL] = useState<string | null>(null);
  const { web3 ,chainId } = useWeb3Context();
 
  const { dependsOn } = useRefresh();
  useEffect(() => {
    if (web3) {
      (async () => {
        const tvl = await calculateTVL(web3, chainId === BINANCE_CHAIN_ID);
        setTVL(tvl);
      })();
    }
  }, [web3, dependsOn]);

  return { tvl };
};

export const LotteryForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { web3, connected, chainId} = useWeb3Context();
  const { lpTokens } = useAvailableLpTokens();
  const { lpTokens: stakedTokens } = useStakedLPTokens();
  const { rewards } = useEarnedRewards();
  const { refresh } = useRefresh();
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();

  const { tvl } = useTVL();
  const tokenSymbol = chainId === ETHEREUM_CHAIN_ID ? "USDT/DON LP Tokens" : "WBNB/DON LP Tokens";

  const availableTokensinEther = lpTokens
    ? parseFloat(toEther(lpTokens)).toFixed(5)
    : "-";

  const stakedTokensInEther = stakedTokens
    ? parseFloat(toEther(stakedTokens)).toFixed(5)
    : "-";

  const rewardsInEther = rewards
    ? parseFloat(toEther(rewards)).toFixed(3)
    : "-";

  const [disableButtons, setDisableButtons] = useState(false);

  const handleUnstake = async () => {
    const staking = await getStakingContract(web3, chainId === BINANCE_CHAIN_ID);
    setDisableButtons(true);
    try {
      showProgress("Unstaking Amount and Harvesting Rewards");
      const accounts = await web3.eth.getAccounts();
      await staking.methods.exit().send({ from: accounts[0] });
      showSuccess("Transaction Successfull");
    } catch (e) {
      captureException(e, "handleUnstake");
      showFailure("Transaction Failed");
    } finally {
      refresh();
      setDisableButtons(false);
    }
  };

  const hasStakedAmount = useMemo(() => {
    if (stakedTokens) {
      return new BigNumber(stakedTokens).gt(0);
    }
    return false;
  }, [stakedTokens]);

  const handleHarvest = async () => {
    const staking = await getStakingContract(web3, chainId === BINANCE_CHAIN_ID);
    setDisableButtons(true);
    try {
      showProgress("Harvesting Rewards");
      const accounts = await web3.eth.getAccounts();
      await staking.methods.getReward().send({ from: accounts[0] });
      showSuccess("Rewards Harvested");
    } catch (e) {
      captureException(e, "LotteryForm:handleHarvest");
      showFailure("Transaction Failed");
    } finally {
      refresh();
      setDisableButtons(false);
    }
  };

  const { apyPercent } = useApy();

  return (
    <section style={{ backgroundColor: "#F4F4F4" }}>
      <div className="container" style={{ maxWidth: 1250 }}>
        <div className="row py-5">
          <div className="col-md-9">
            <WhiteCard className="h-100 d-flex flex-column justify-content-around">
              <div className="row">
                <CardItem className="col-2">
                  <ItemHeading className="font-weight-bold">
                    Network
                  </ItemHeading>
                  <ItemInfo> {connected ? chainId : "-"}</ItemInfo>
                </CardItem>
                <CardItem className="col-2">
                  <ItemHeading className="font-weight-bold">
                    Available LP Tokens
                  </ItemHeading>
                  <ItemInfo>
                    {availableTokensinEther} {tokenSymbol}
                  </ItemInfo>
                  <a
                    rel="noreferrer nofollow"
                    target="_blank"
                    href={chainId === ETHEREUM_CHAIN_ID ? UniswapLink : PancakeSwapLink}
                  >
                    Get More
                  </a>
                </CardItem>
                <CardItem className="col-3">
                  <ItemHeading className="font-weight-bold">
                    Staked LP Tokens
                  </ItemHeading>
                  <ItemInfo>
                    {" "}
                    {stakedTokensInEther} {tokenSymbol}
                  </ItemInfo>
                </CardItem>
                <CardItem className="col-3">
                  <ItemHeading className="font-weight-bold">TVL</ItemHeading>
                  <ItemInfo>
                    {" "}
                    {tvl
                      ? new BigNumber(tvl).toNumber().toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "-"}
                  </ItemInfo>
                </CardItem>

                <CardItem className="col-2">
                  <ItemHeading className="font-weight-bold">APY</ItemHeading>
                  <ItemInfo> {apyPercent}%</ItemInfo>
                </CardItem>
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex">
                  <StakeButton
                    className="mr-3 mt-2"
                    disabled={disableButtons}
                    onClick={() => setIsPopupOpen(true)}
                    type="submit"
                  >
                    Stake
                  </StakeButton>

                  {hasStakedAmount && (
                    <UnstakeButton
                      disabled={disableButtons}
                      onClick={handleUnstake}
                      type="submit"
                    >
                      Unstake
                    </UnstakeButton>
                  )}
                </div>
              </div>
            </WhiteCard>
          </div>
          <div className="col-md-3 mt-3 mt-md-0">
            <WhiteCard className="h-100 d-flex flex-column justify-content-between">
              <RewardsTitle className="text-center">Rewards</RewardsTitle>
              <div className="mb-2 d-flex flex-column py-4 align-items-center ">
                <RewardsAmount disabled={!hasStakedAmount}>
                  {rewardsInEther}
                </RewardsAmount>
              </div>
              <div className="mb-2 d-flex flex-column align-items-center ">
                <StyledButton
                  varaint="contained"
                  containedVariantColor="lightYellow"
                  height="41px"
                  disabled={!hasStakedAmount || disableButtons}
                  onClick={handleHarvest}
                  style={{ maxWidth: 200 }}
                >
                  Harvest
                </StyledButton>
              </div>
            </WhiteCard>
          </div>
          {isPopupOpen && (
            <LotteryPopupForm
              availableAmount={lpTokens ? toEther(lpTokens) : "0"}
              isOpen={isPopupOpen}
              onClose={() => {
                setIsPopupOpen(false);
              }}
              onSuccess={() => {
                setIsPopupOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};