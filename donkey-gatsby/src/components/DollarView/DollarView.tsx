import { useEffect } from "react";
import { useState } from "react";
import {
  captureException,
  formatNum,
  getTokenPrice
} from "helpers";
import { getWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useUSDViewBool } from "contexts/USDViewContext";

export const DollarView = ({
  tokenAmount,
  poolAddress,
  chainId
}: {
  tokenAmount: string;
  poolAddress: string;
  chainId: number;
}) => {
  const [price, setPrice] = useState("-");
  const [isReady, setIsReady] = useState(false);
  const { isUSD } = useUSDViewBool();
  const web3 = getWeb3(chainId);
  const { symbol } = usePoolSymbol(poolAddress, web3);
  useEffect(() => {
    (async () => {
      try {

        setPrice(await getTokenPrice(web3,poolAddress));
        setIsReady(true);
      }catch(e){
        captureException(e, "Dollar View");
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
      {formatNum(tokenAmount)} {symbol.toUpperCase()}
    </>
  );
};
