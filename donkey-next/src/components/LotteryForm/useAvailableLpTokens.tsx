
import { useEffect, useState } from "react";
import { getLPTokenContract } from "helpers";
import { useRefresh } from "./useRefresh";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";

export const useAvailableLpTokens = () => {

  const { web3, connected, chainId } = useWeb3Context();
  const {dependsOn} = useRefresh();
  const [availableLpToken, setAvailableLpTokens] =
    useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const lpTokenContract = await getLPTokenContract(web3, chainId === BINANCE_CHAIN_ID);
        const amount = await lpTokenContract.methods
          .balanceOf(accounts[0])
          .call();
        setAvailableLpTokens(amount);
      })();
    }
  }, [connected,dependsOn]);

  return {
    isReady: availableLpToken !== null,
    lpTokens: availableLpToken,
  };
};
