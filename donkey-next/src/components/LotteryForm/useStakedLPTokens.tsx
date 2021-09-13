/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getStakingContract } from "helpers";
import { useRefresh } from "./useRefresh";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";

export const useStakedLPTokens = () => {
 
  const { web3, connected, chainId} = useWeb3Context();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);
  const {dependsOn} = useRefresh();
  useEffect(() => {
    if (connected) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = await getStakingContract(web3, chainId === BINANCE_CHAIN_ID);
        const staked = await stakingContract.methods.balanceOf(accounts[0]).call();
        setstakedLpTokens(staked);
      })();
    }
  }, [connected,dependsOn]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};
