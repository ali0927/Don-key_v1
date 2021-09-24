/* eslint-disable react-hooks/exhaustive-deps */

import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import { calculateAPY } from "helpers";
import { useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";

export const useApy = () => {
  const [apyPercent, setApyPercent] = useState<string | null>(null);
  const { connected, getConnectedWeb3, chainId } = useWeb3Context();
  const { dependsOn } = useRefresh();

  useEffect(() => {
    if (connected) {
      (async () => {
        const web3 = getConnectedWeb3();
        const apy = await calculateAPY(web3, chainId === BINANCE_CHAIN_ID);

        setApyPercent(apy.toFixed(0));
      })();
    }
  }, [dependsOn, connected]);

  return {
    isReady: apyPercent !== null,
    apyPercent,
  };
};
