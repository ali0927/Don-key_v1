/* eslint-disable react-hooks/exhaustive-deps */

import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import { getStakingContract } from "helpers";
import { useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";

export const useEarnedRewards = () => {

  const { connected, web3, chainId } = useWeb3Context();
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
    if (connected) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = await getStakingContract(web3, chainId === BINANCE_CHAIN_ID);
        const rewards = await stakingContract.methods.earned(accounts[0]).call();
        setEarned(rewards);
      })();
    }
  }, [connected, dependsOn, updateRewards]);

  return {
    isReady: earned !== null,
    rewards: earned,
  };
};
