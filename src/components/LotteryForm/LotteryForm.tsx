import { ContainedButton } from "components/Button";
import { useWeb3 } from "don-components";
import { useEffect, useMemo, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import styled from "styled-components";
import { LotteryPopupForm } from "./LotteryPopupForm";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import BigNumber from "bignumber.js";
import { useAvailableLpTokens } from "./useAvailableLpTokens";
import { useStakedLPTokens } from "./useStakedLPTokens";
import { useTotalStakedLpTokens } from "./useTotalStakedLpTokens";
import { getStakingContract } from "helpers";
import { useEarnedRewards } from "./useEarnedRewards";
import { useRefresh } from "./useRefresh";
import { useApy } from "./useApy";
import { api } from "don-utils";
import { useTransactionNotification } from "./useTransactionNotification";
export const Label = styled.p`
  font-family: Roboto;
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
  border: 0px !important;
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
`;

const StackeButton = styled(ContainedButton)`
  height: 45px;
  width: 160px;
  border-radius: 5px;
  background: #070602;
  color: #fff;
  &:hover {
    background: #070602;
  }
`;

export const Caption = styled.p`
  font-family: Roboto;
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
`;

const RewardsAmount = styled.div`
  font-size: 4rem;
  font-weight: 800;
  font-family: Roboto;
  ${(props: { disabled: boolean }) => props.disabled && `color: #d9d9d9;`}
`;

const PancakeSwapLink =
  "https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255&outputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
const UniswapLink =
  "https://app.uniswap.org/#/swap?inputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&use=V2";

export const LotteryForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { isReady, network, isEthereum, isBSC } = useNetwork();

  const web3 = useWeb3();
  const { lpTokens } = useAvailableLpTokens();
  const { lpTokens: stakedTokens } = useStakedLPTokens();
  const { lpTokens: totalStaked } = useTotalStakedLpTokens();
  const { rewards } = useEarnedRewards();
  const { refresh } = useRefresh();
  const {showProgress, showSuccess, showFailure} = useTransactionNotification();
  const [registeredEmail, setRegisteredEmail] = useState("");

  const tokenSymbol = isEthereum ? "USDT/DON LP Tokens" : "WBNB/DON LP Tokens";

  const availableTokensinEther = lpTokens ? web3.utils.fromWei(lpTokens) : "-";

  const stakedTokensInEther = stakedTokens
    ? parseFloat(web3.utils.fromWei(stakedTokens)).toFixed(2)
    : "-";
  const totalStakedInEther = totalStaked
    ? parseFloat(web3.utils.fromWei(totalStaked)).toFixed(2)
    : "-";

  const rewardsInEther = rewards
    ? parseFloat(web3.utils.fromWei(rewards)).toFixed(3)
    : "-";

  const [disableButtons, setDisableButtons] = useState(false);

  const handleUnstake = async () => {
    const staking = await getStakingContract(web3, isBSC);
    setDisableButtons(true);
    try {
      showProgress("Unstaking Amount and Harvesting Rewards")
      const accounts = await web3.eth.getAccounts();
      await staking.methods.exit().send({ from: accounts[0] });
      showSuccess("Transaction Successfull");
    } catch (e) {
      showFailure("Transaction Failed")
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
    const staking = await getStakingContract(web3, isBSC);
    setDisableButtons(true);
    try {
      showProgress("Harvesting Rewards")
      const accounts = await web3.eth.getAccounts();
      await staking.methods.getReward().send({ from: accounts[0] });
      showSuccess("Rewards Harvested")
    } catch (e) {
      showFailure("Transaction Failed")
    } finally {
      refresh();
      setDisableButtons(false);
    }
  };

  const { apyPercent } = useApy();

  useEffect(() => {
    (async () => {
      const accounts = await web3.eth.getAccounts();
      const res = await api.get(
        `/api/v2/lottery?wallet_address=${accounts[0]}`
      );
      setRegisteredEmail(res.data.data.email);
    })();
  }, []);

  return (
    <>
      <div className="row py-5">
        <div className="col-md-6">
          <WhiteCard className="h-100 d-flex flex-column justify-content-between">
            <div>
              <h3>User </h3>
              <div className="mb-2">
                - <span className="font-weight-bold">Network</span> :{" "}
                {isReady ? network : "-"}
              </div>
              <div className="mb-2">
                - <span className="font-weight-bold">Available LP Tokens</span>{" "}
                : {availableTokensinEther} {tokenSymbol}{" "}
                <a
                  rel="nofollow"
                  target="_blank"
                  href={isEthereum ? UniswapLink : PancakeSwapLink}
                >
                  {" "}
                  Get More
                </a>
              </div>
              <div className="mb-2">
                - <span className="font-weight-bold">Staked LP Tokens</span> :
                {stakedTokensInEther} {tokenSymbol}
              </div>
              <div className="mb-2">
                -{" "}
                <span className="font-weight-bold">Total Staked LP Tokens</span>{" "}
                : {totalStakedInEther} {tokenSymbol}
              </div>
              <div className="mb-2">
                - <span className="font-weight-bold">APY</span> :{" "}
                {apyPercent || "-"}%
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              {!hasStakedAmount ? (
                <StackeButton
                  disabled={disableButtons}
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Participate
                </StackeButton>
              ) : (
                <StackeButton
                  disabled={disableButtons}
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Stake
                </StackeButton>
              )}
              {hasStakedAmount && (
                <StackeButton
                  disabled={disableButtons}
                  onClick={handleUnstake}
                  type="submit"
                >
                  Unstake
                </StackeButton>
              )}
            </div>
          </WhiteCard>
        </div>
        <div className="col-md-6">
          <WhiteCard className="h-100 d-flex flex-column justify-content-between">
            <h3 className="text-center">Rewards</h3>
            <div className="mb-2 d-flex flex-column align-items-center ">
              <RewardsAmount disabled={!hasStakedAmount}>
                {rewardsInEther} DON
              </RewardsAmount>
            </div>
            <div className="mb-2 d-flex flex-column align-items-center ">
              <ContainedButton
                disabled={!hasStakedAmount || disableButtons}
                onClick={handleHarvest}
                style={{ maxWidth: 200 }}
              >
                Harvest
              </ContainedButton>
            </div>
          </WhiteCard>
        </div>
        {isPopupOpen && (
          <LotteryPopupForm
            availableAmount={availableTokensinEther}
            isOpen={isPopupOpen}
            isRegistered={!!registeredEmail}
            onClose={() => setIsPopupOpen(false)}
            onSuccess={() => {
              setIsPopupOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};
