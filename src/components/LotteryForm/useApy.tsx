import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { useWeb3 } from "don-components";
import { calculateAPY } from "helpers";
import { useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";

export const useApy = () => {
  const [apyPercent, setApyPercent] = useState<string | null>(null);
  const { isBSC, isReady } = useNetwork();
  const { dependsOn } = useRefresh();
  const web3 = useWeb3();
  useEffect(() => {
    if (isReady) {
      (async () => {
        const apy = await calculateAPY(web3, isBSC);

        setApyPercent(apy.toFixed(0));
      })();
    }
  }, [dependsOn, isReady]);

  return {
    isReady: apyPercent !== null,
    apyPercent,
  };
};
