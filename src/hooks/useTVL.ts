import { useRefresh } from "components/LotteryForm/useRefresh";
import { captureException, getPoolToken, getTotalPoolValue, toEther } from "helpers";
import { useEffect, useState } from "react";
import { useWeb3 } from "don-components";
import { useWeb3Network } from "components/Web3NetworkDetector";

export const useTVL = (poolAddress: string) => {
  const [tvl, setTvl] = useState("-");
  const web3 = useWeb3();
  const { dependsOn } = useRefresh();
  const { chainId } = useWeb3Network();
  useEffect(() => {
    (async () => {
      try {
        let poolValue = await getTotalPoolValue(web3, poolAddress);
        const token = await getPoolToken(web3, poolAddress);
        const decimals = await token.methods.decimals().call();
        setTvl(toEther(poolValue, decimals));
      } catch (e) {
        captureException(e, "useTVL")
      }
    })();
  }, [poolAddress, dependsOn, chainId]);
  return { tvl };
};
