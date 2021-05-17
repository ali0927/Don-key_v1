import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { getStakingContract } from "helpers";
import { useRefresh } from "./useRefresh";

export const useTotalStakedLpTokens = () => {
  const web3 = useWeb3();
  const { isReady, isBSC } = useNetwork();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);
  const {dependsOn} = useRefresh();
  useEffect(() => {
    if (isReady) {
      (async () => {
        const stakingContract = await getStakingContract(web3, isBSC);
        const amount = await stakingContract.methods.totalSupply().call();
        setstakedLpTokens(amount);
      })();
    }
  }, [isReady, dependsOn]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};