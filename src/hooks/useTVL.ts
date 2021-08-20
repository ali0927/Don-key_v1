import { useRefresh } from "components/LotteryForm/useRefresh";
import { getTotalPoolValue } from "helpers";
import { useEffect, useState } from "react";
import { useWeb3 } from "don-components";

export const useTVL = (poolAddress: string) => {
    const [tvl, setTvl] = useState("");
    const web3 = useWeb3();
    const { dependsOn } = useRefresh();
    useEffect(() => {
      (async () => {
        let poolValue = await getTotalPoolValue(web3, poolAddress);
        setTvl(web3.utils.fromWei(poolValue, "ether"));
      })();
    }, [poolAddress, dependsOn]);
    return { tvl };
  };