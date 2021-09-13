import {  useWeb3Context } from "don-components";
import {  captureException, getInvestedAmount } from "helpers";
import { useEffect, useState } from "react";


export const useInvestedAmount = (poolAddress:string) => {
  const [isReady, setIsReady] = useState(false)
  const [investedAmmount, setinvestedAmmount] = useState("-");
 
  const {web3} = useWeb3Context()

  const getPoolValue = async () => {
    
   
    try {
      const num = await getInvestedAmount(web3, poolAddress);
      setinvestedAmmount(num.toFixed(2));
    }catch(e){
      captureException(e, "useInvestedAmount");
      setinvestedAmmount("0")
    }finally {
      setIsReady(true);
    }
  }
 
  useEffect(() => {
    getPoolValue()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {investedAmmount, isReady};
}