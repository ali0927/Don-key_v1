import { useWeb3 } from "don-components";
import { useEffect, useMemo, useState } from "react";
import ERC20 from "JsonData/BUSDToken.json";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { getLPTokenContract } from "helpers";

export const useAvailableLpTokens = () => {
  const web3 = useWeb3();
  const { isReady, isEthereum, isBSC } = useNetwork();
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
  }, [isReady]);

  return {
    isReady: availableLpToken !== null,
    lpTokens: availableLpToken,
  };
};
