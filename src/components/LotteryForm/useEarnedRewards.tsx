import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { useWeb3 } from "don-components";
import { getStakingContract } from "helpers";
import { useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";

export const useEarnedRewards = () => {
  const web3 = useWeb3();
  const { isReady, isBSC } = useNetwork();
  const [earned, setEarned] = useState<string | null>(null);
  const {dependsOn} = useRefresh();
  const [updateRewards, setUpdateRewards] = useState(0);

  const update = () => setUpdateRewards(old => old +1);

  useEffect(() => {
    const inter = setInterval(() => {
      update()
    }, 2000)
    return () => {
      clearInterval(inter);
    }
  }, [])
  useEffect(() => {
    if (isReady) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = await getStakingContract(web3, isBSC);
        const rewards = await stakingContract.methods.earned(accounts[0]).call();
        setEarned(rewards);
      })();
    }
  }, [isReady, dependsOn, updateRewards]);

  return {
    isReady: earned !== null,
    rewards: earned,
  };
};
