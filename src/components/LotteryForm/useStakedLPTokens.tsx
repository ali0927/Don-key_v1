/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { getStakingContract } from "helpers";
import { useRefresh } from "./useRefresh";

export const useStakedLPTokens = () => {
  const web3 = useWeb3();
  const { isReady, isBSC } = useNetwork();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);
  const {dependsOn} = useRefresh();
  useEffect(() => {
    if (isReady) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = await getStakingContract(web3, isBSC);
        const staked = await stakingContract.methods.balanceOf(accounts[0]).call();
        setstakedLpTokens(staked);
      })();
    }
  }, [isReady,dependsOn]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};
