import BigNumber from "bignumber.js";
import { useWeb3 } from "don-components";
import { getTotalReservePoolValue, toEther } from "helpers";
import { useLayoutEffect, useState } from "react";


export const PoolReserveAmount = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState("");

  const web3 = useWeb3();

  const getPoolValue = async () => {
    try {
      const amount = await getTotalReservePoolValue(web3, poolAddress);
      const bn = new BigNumber(toEther(amount)).toFixed(2);
      setPoolAmount(bn);
    }catch(e){
      setPoolAmount("0")
    }finally{
      setIsReady(true)
    }
  }

  useLayoutEffect(() => {
    getPoolValue()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isReady) {
    return <>-</>;
  }



  return <>{poolAmount} BUSD</>;
};