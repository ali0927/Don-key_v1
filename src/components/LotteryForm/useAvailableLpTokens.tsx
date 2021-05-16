import { useWeb3 } from "don-components";
import { useEffect, useMemo, useState } from "react";
import ERC20 from "JsonData/BUSDToken.json";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { USDTDONLP, WBNBDONLP } from "./LotteryForm";

export const useAvailableLpTokens = () => {
  const web3 = useWeb3();
  const { isReady, isEthereum } = useNetwork();
  const [availableLpToken, setAvailableLpTokens] = useState<string | null>(null);

  const lpTokenContract = useMemo(() => {
    if (isReady) {
      return new web3.eth.Contract(
        ERC20 as any,
        isEthereum ? USDTDONLP : WBNBDONLP
      );
    }
    return null;
  }, [isReady, isEthereum]);

  useEffect(() => {
    if (lpTokenContract) {
      (async () => {
        const accounts = await web3.eth.getAccounts();

        const amount = await lpTokenContract.methods
          .balanceOf(accounts[0])
          .call();
        setAvailableLpTokens(amount);
      })();
    }
  }, [lpTokenContract]);

  return {
    isReady: availableLpToken !== null,
    lpTokens: availableLpToken,
  };
};
