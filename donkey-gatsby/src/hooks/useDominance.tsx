/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useQuery } from "@apollo/client";
import BigNumber from "bignumber.js";
import { getWeb3 } from "don-components";
import { getPoolValueInUSD } from "helpers";
import { useEffect, useState } from "react";

const ALL_FARMER_QUERY = gql`
  query allFarmerQuery($chainId: Int!) {
    farmers(
      where: {
        status_in: ["active"]
        network: { chainId: $chainId }
      }
    ) {
      name
      description
      farmerImage {
        url
      }
      guid
      twitter
      telegram
      poolAddress
      poolVersion
      network {
        name
        chainId
        symbol
      }
    }
  }
`;

export const useDominance = (farmerPoolAddress: string, chainId: number) => {
  const web3 = getWeb3(chainId);
  const { data } = useQuery(ALL_FARMER_QUERY, {
    variables: {
      chainId,
    },
  });
  const [dominance, setDominance] = useState("-");
 

  useEffect(() => {
    if (data) {
      const apiCall = async () => {
        let allPoolValues = new BigNumber(0);
        for (let farmer of data.farmers) {
          const poolValue = await getPoolValueInUSD(web3, farmer.poolAddress);
          allPoolValues = allPoolValues.plus(poolValue);
        }
        const currentPoolValue = await getPoolValueInUSD(
          web3,
          farmerPoolAddress
        );
        if(allPoolValues.isEqualTo(0)){
          return setDominance("0");
        }

        const dominanceValue = new BigNumber(currentPoolValue)
          .dividedBy(allPoolValues)
          .multipliedBy(100);

        setDominance(dominanceValue.toFixed(2));
      };
      apiCall();
    }
  }, [data, farmerPoolAddress]);

  return { dominance };
};
