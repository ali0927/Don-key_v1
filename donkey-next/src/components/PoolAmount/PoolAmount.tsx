import BigNumber from "bignumber.js";
import { getWeb3 } from "don-components";
import { getPoolToken, getTotalPoolValue, toEther } from "helpers";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useLayoutEffect, useState } from "react";

export const PoolAmount = ({
  poolAddress,
  chainId,
  refresh = false,
}: {
  poolAddress: string;
  refresh?: boolean;
  chainId: number;
}) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState("");
  
  const web3 = getWeb3(chainId);
  const { symbol } = usePoolSymbol(poolAddress, web3);
  const getPoolValue = async () => {
    try {
      const amount = await getTotalPoolValue(web3, poolAddress);
      const token = await getPoolToken(web3, poolAddress);
      const decimals = await token.methods.decimals().call();
      const bn = new BigNumber(toEther(amount, decimals)).toFixed(2);
      setPoolAmount(bn);
    } catch (e) {
      setPoolAmount("0");
    } finally {
      setIsReady(true);
    }
  };

  useLayoutEffect(() => {
    getPoolValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  if (!isReady) {
    return <>-</>;
  }

  return (
    <>
      {poolAmount} {symbol}
    </>
  );
};
