import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { getLPTokenContract } from "helpers";
import { useRefresh } from "./useRefresh";

export const useAvailableLpTokens = () => {
  const web3 = useWeb3();
  const { isReady,  isBSC } = useNetwork();
  const {dependsOn} = useRefresh();
  const [availableLpToken, setAvailableLpTokens] =
    useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      (async () => {
        const accounts = await web3.eth.getAccounts();
        const lpTokenContract = await getLPTokenContract(web3, isBSC);
        const amount = await lpTokenContract.methods
          .balanceOf(accounts[0])
          .call();
        setAvailableLpTokens(amount);
      })();
    }
  }, [isReady,dependsOn]);

  return {
    isReady: availableLpToken !== null,
    lpTokens: availableLpToken,
  };
};
