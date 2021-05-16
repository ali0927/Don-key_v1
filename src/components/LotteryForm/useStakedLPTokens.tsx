import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { getStakingContract } from "helpers";

export const useStakedLPTokens = () => {
  const web3 = useWeb3();
  const { isReady, isBSC } = useNetwork();
  const [stakedLpTokens, setstakedLpTokens] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = await getStakingContract(web3, isBSC);
        const staked = await stakingContract.methods.stakersInfo(accounts[0]).call();
        setstakedLpTokens(staked.amount);
      })();
    }
  }, [isReady]);

  return {
    isReady: stakedLpTokens !== null,
    lpTokens: stakedLpTokens,
  };
};
