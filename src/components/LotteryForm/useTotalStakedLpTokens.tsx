import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import Staking from "JsonData/Staking.json";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { getStakingContract } from "helpers";

export const useTotalStakedLpTokens = () => {
  const web3 = useWeb3();
  const { isReady, isBSC } = useNetwork();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      (async () => {
        const stakingContract = await getStakingContract(web3, isBSC);
        const amount = await stakingContract.methods.totalFundsStaked().call();
        setstakedLpTokens(amount);
      })();
    }
  }, [isReady]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};
