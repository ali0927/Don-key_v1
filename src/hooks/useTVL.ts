import { useRefresh } from "components/LotteryForm/useRefresh";
import { getPoolToken, getTotalPoolValue, toEther } from "helpers";
import { useEffect, useState } from "react";
import { useWeb3 } from "don-components";

export const useTVL = (poolAddress: string) => {
    const [tvl, setTvl] = useState("");
    const web3 = useWeb3();
    const { dependsOn } = useRefresh();
    useEffect(() => {
      (async () => {
        let poolValue = await getTotalPoolValue(web3, poolAddress);
        const token = await getPoolToken(web3, poolAddress);
        const decimals = await token.methods.decimals().call();
        setTvl(toEther(poolValue, decimals));
      })();
    }, [poolAddress, dependsOn]);
    return { tvl };
  };