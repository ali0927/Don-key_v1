/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3 } from "don-components";
import { getPoolValueInUSD } from "helpers";
import { useAxios } from "hooks/useAxios";
import { useEffect, useState } from "react";

export const useDominance = (farmerPoolAddress: string) => {
  const [{ data }] = useAxios("/api/v2/farmer");
  const [dominance, setDominance] = useState("0");
  const web3 = useWeb3();

  useEffect(() => {
    if (data) {
      const apiCall = async () => {
        let farmersTotalPoolValue = 0;
        for (let farmer of data.data) {
          const poolValue = await getPoolValueInUSD(web3, farmer.poolAddress);
          farmersTotalPoolValue = farmersTotalPoolValue + parseFloat(poolValue);
        }
        const farmerPoolValue = await getPoolValueInUSD(
          web3,
          farmerPoolAddress
        );
        const dominanceValue =
          parseFloat(farmerPoolValue) / farmersTotalPoolValue;
        setDominance((dominanceValue * 100).toFixed(2));
      };
      apiCall();
    }
  }, [data, farmerPoolAddress]);

  return { dominance };
};
