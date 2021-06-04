import { useWeb3 } from "don-components";
import { getPoolToken } from "helpers";
import { useState } from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

// const symbolCache = new Map();

export const usePoolSymbol = (poolAddress: string) => {
  const [symbol, setSymbol] = useState("-");
  const [tokenAddress, setTokenAddress] = useState("-");
  const [loading, setLoading] = useState(true);
  const web3 = useWeb3();
  useIsomorphicEffect(() => {
    (async () => {
      let symbol;
      try {
        // if (!symbol) {
          const token = await getPoolToken(web3, poolAddress);
          symbol = await token.methods.symbol().call();
        //   symbolCache.set(poolAddress, symbol);
        // }

        setSymbol(symbol);
        setTokenAddress(token.options.address);
      } catch (e) {
        symbol = "BUSD";
        // symbolCache.set(poolAddress, symbol);
        setSymbol(symbol);
        setTokenAddress("0xe9e7cea3dedca5984780bafc599bd69add087d56")
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { symbol, loading, tokenAddress };
};
