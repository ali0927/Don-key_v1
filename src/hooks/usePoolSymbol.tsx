import { useUSDViewBool } from "contexts/USDViewContext";
import { useWeb3 } from "don-components";
import { getTokenSymbol } from "helpers";
import { useState } from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

// const symbolCache = new Map();

export const usePoolSymbol = (poolAddress: string) => {
  const [symbol, setSymbol] = useState("-");

  const [loading, setLoading] = useState(true);
  const web3 = useWeb3();
  useIsomorphicEffect(() => {
    (async () => {
      let symbol;
      try {
        // if (!symbol) {
        symbol = await getTokenSymbol(web3, poolAddress);
        //   symbolCache.set(poolAddress, symbol);
        // }
      
        setSymbol(symbol);
      } catch (e) {
        console.log(e, "Symbol Error");
        symbol = "BUSD";
        // symbolCache.set(poolAddress, symbol);
        setSymbol(symbol);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { symbol, loading };
};
