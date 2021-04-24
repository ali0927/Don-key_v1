import BigNumber from "bignumber.js";
import { useWeb3 } from "don-components";
import {  getInvestedAmount } from "helpers";
import { useEffect, useState } from "react";


export const useInvestedAmount = (poolAddress:string) => {
  const [isReady, setIsReady] = useState(false)
  const [investedAmmount, setinvestedAmmount] = useState("-");
 
  const web3 = useWeb3()

  const getPoolValue = async () => {
    
   
    try {
      const num = await getInvestedAmount(web3, poolAddress);
      setinvestedAmmount(num.toFixed(2));
    }catch(e){
      setinvestedAmmount("0")
    }finally {
      setIsReady(true);
    }
  }
 
  useEffect(() => {
    getPoolValue()
  }, [])
  return {investedAmmount, isReady};
}