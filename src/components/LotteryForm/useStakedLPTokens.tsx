import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import Staking from "JsonData/Staking.json";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { StakingEthAddress, StakingBSCAddress } from "./LotteryForm";

export const useStakedLPTokens = () => {
  const web3 = useWeb3();
  const { isReady, isEthereum } = useNetwork();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = new web3.eth.Contract(
          Staking.abi as any,
          isEthereum ? StakingEthAddress : StakingBSCAddress
        );
        const amount = await stakingContract.methods.stakersInfo(accounts[0]).call();
        setstakedLpTokens(amount);
      })();
    }
  }, [isReady]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};
