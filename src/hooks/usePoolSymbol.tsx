import { captureException, getTokenSymbol } from "helpers";
import { useState } from "react";
import Web3 from "web3";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

// const symbolCache = new Map();

export const usePoolSymbol = (poolAddress: string, web3: Web3) => {
  const [symbol, setSymbol] = useState("-");

  const [loading, setLoading] = useState(true);

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
        captureException(e, "usePoolSymbol");
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
