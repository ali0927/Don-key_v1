import { ContainedButton } from "components/Button";
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import styled from "styled-components";
import { LotteryPopupForm } from "./LotteryPopupForm";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import BigNumber from "bignumber.js";
import { useAvailableLpTokens } from "./useAvailableLpTokens";
import { useStakedLPTokens } from "./useStakedLPTokens";
import { useTotalStakedLpTokens } from "./useTotalStakedLpTokens";
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
  const [isUserInLottery, setIsUserInLottery] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { isReady, network, isEthereum } = useNetwork();

  const web3 = useWeb3();
  const { lpTokens } = useAvailableLpTokens();
  const { lpTokens: stakedTokens } = useStakedLPTokens();
  const { lpTokens: totalStaked } = useTotalStakedLpTokens();

  const tokenSymbol = isEthereum ? "USDT/DON LP Tokens" : "WBNB/DON LP Tokens";

  const availableTokensinEther = lpTokens ? web3.utils.fromWei(lpTokens) : "-";

  const stakedTokensInEther = stakedTokens
    ? web3.utils.fromWei(stakedTokens)
    : "-";
  const totalStakedInEther = totalStaked
    ? web3.utils.fromWei(totalStaked)
    : "-";

  useEffect(() => {
    if (stakedTokens) {
      if (new BigNumber(stakedTokens).gt(0)) {
        setIsUserInLottery(true);
      }
    }
  }, [stakedTokens]);

  return (
    <>
      <div className="row py-5">
        <div className="col-md-6">
          <WhiteCard className="h-100 d-flex flex-column justify-content-between">
            <div>
              <h3>User </h3>
              <div className="mb-2">
                - <span className="font-weight-bold">Network</span> :{" "}
                {isReady ? network : "-"} <BsQuestionCircle />
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
                - <span className="font-weight-bold">APY</span> : 112%
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              {!isUserInLottery ? (
                <StackeButton
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Participate
                </StackeButton>
              ) : (
                <StackeButton
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Stake
                </StackeButton>
              )}
              {isUserInLottery && (
                <StackeButton
                  onClick={() => setIsPopupOpen(true)}
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
              <RewardsAmount disabled={!isUserInLottery}>
                0.00000 DON
              </RewardsAmount>
            </div>
            <div className="mb-2 d-flex flex-column align-items-center ">
              <ContainedButton
                disabled={!isUserInLottery}
                style={{ maxWidth: 200 }}
              >
                Harvest
              </ContainedButton>
            </div>
          </WhiteCard>
        </div>
        {isPopupOpen && (
          <LotteryPopupForm
            isOpen={isPopupOpen}
            isRegistered={isUserInLottery}
            onClose={() => setIsPopupOpen(false)}
            onSuccess={() => {
              setIsUserInLottery(true);
              setIsPopupOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};
