import { useRefresh } from "components/LotteryForm/useRefresh";
import { captureException, getPoolToken, getTotalPoolValue, toEther } from "helpers";
import { useEffect, useState } from "react";
import { getWeb3 } from "don-components";

export const useTVL = (poolAddress: string, chainId: number) => {
  const [tvl, setTvl] = useState("-");
  const web3 = getWeb3(chainId);
  const { dependsOn } = useRefresh();

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
  }, [poolAddress, dependsOn]);
  return { tvl };
};
