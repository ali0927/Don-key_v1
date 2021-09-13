
import { useEffect, useState } from "react";

import { getStakingContract } from "helpers";
import { useRefresh } from "./useRefresh";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";

export const useTotalStakedLpTokens = () => {

  const { web3, chainId, connected} = useWeb3Context();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);
  const {dependsOn} = useRefresh();
  useEffect(() => {
    if (connected) {
      (async () => {
        const stakingContract = await getStakingContract(web3, chainId === BINANCE_CHAIN_ID);
        const amount = await stakingContract.methods.totalSupply().call();
        setstakedLpTokens(amount);
      })();
    }
  }, [connected, dependsOn]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};
