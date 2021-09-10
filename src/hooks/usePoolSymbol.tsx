import { useWeb3Network } from "components/Web3NetworkDetector";
import { useUSDViewBool } from "contexts/USDViewContext";
import { useWeb3 } from "don-components";
import { captureException, getTokenSymbol } from "helpers";
import { useState } from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

// const symbolCache = new Map();

export const usePoolSymbol = (poolAddress: string) => {
  const [symbol, setSymbol] = useState("-");

  const [loading, setLoading] = useState(true);
  const web3 = useWeb3();
  const { chainId } = useWeb3Network();
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
  }, [chainId]);

  return { symbol, loading };
};
