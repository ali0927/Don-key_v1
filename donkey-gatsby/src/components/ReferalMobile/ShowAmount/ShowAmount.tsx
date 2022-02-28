import { useUSDViewBool } from "contexts/USDViewContext";
import { getWeb3, useWeb3Context } from "don-components";
import {
  captureException,
  formatNum,
  getDonPrice,
  getTokenPrice,
} from "helpers";
import BigNumber from "bignumber.js";
import React from "react";

export const ShowAmount: React.FC<{
  poolAddress: string;
  amount: string;
  poolSymbol: string;
  isDon?: boolean;
}> = (props) => {
  const { poolAddress, amount, poolSymbol, isDon = false } = props;

  const [usdAmount, setUsdAmount] = React.useState("$ -");

  const { chainId } = useWeb3Context();
  const { isUSD } = useUSDViewBool();

  React.useEffect(() => {
    (async () => {
      if (isUSD) {
        try {
          const web3 = getWeb3(chainId);
          let tokenPrice = "";
          if (isDon) {
            tokenPrice = await getDonPrice();
          } else {
            tokenPrice = await getTokenPrice(web3, poolAddress);
          }
          const valueInUSD = new BigNumber(amount);
          const amountInUSD = valueInUSD.multipliedBy(tokenPrice);
          setUsdAmount("$" + `${formatNum(amountInUSD.toFixed())}`);
        } catch (e) {
          captureException(e, "Referal page");
        }
      }
    })();
  }, [isUSD, poolAddress, amount, isDon]);

  return <>{isUSD ? usdAmount : `${formatNum(amount)} ${poolSymbol}`}</>;
};
