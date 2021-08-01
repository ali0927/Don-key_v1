import { useEffect } from "react";
import { useState } from "react";
import {
  getTokenAddress,
  getTokenPrice
} from "helpers";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useUSDViewBool } from "contexts/USDViewContext";
import { formatNum } from "./DetailTable";

export const DollarView = ({
  tokenAmount,
  poolAddress,
}: {
  tokenAmount: string;
  poolAddress: string;
}) => {
  const [price, setPrice] = useState("-");
  const [isReady, setIsReady] = useState(false);
  const { isUSD } = useUSDViewBool();
  const web3 = useWeb3();
  const { symbol } = usePoolSymbol(poolAddress);
  useEffect(() => {
    (async () => {
      try {
        setPrice(await getTokenPrice(web3,await getTokenAddress(web3, poolAddress)));
        setIsReady(true);
      }catch(e){
        console.log("error", e);
      } finally {
      }
    })();
  }, [tokenAmount, poolAddress, isUSD]);

  if (!isReady) {
    return <>-</>;
  }
  if (isUSD) {
    return (
      <>
        ${formatNum(new BigNumber(tokenAmount).multipliedBy(price).toString())}
      </>
    );
  }
  return (
    <>
      {formatNum(tokenAmount)} {symbol}
    </>
  );
};
