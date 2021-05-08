import { useInvestedAmount } from "hooks/useInvestedAmount";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { getTotalPoolValue } from "helpers";

export const MyInvestment = ({ poolAddress, totalLPTokens, userLPTokens }: { poolAddress: string, userLPTokens?:any, totalLPTokens?: any }) => {
  
  const {isReady, investedAmmount} = useInvestedAmount(poolAddress);
  const [poolAmount, setPoolAmount] = useState(0);
  const web3 = useWeb3();

  const getPoolValue = async () => {
    try {
      const amount = await getTotalPoolValue(web3, poolAddress);
      let bn = parseInt(web3.utils.fromWei(amount, "ether"));
      setPoolAmount(bn);
    }catch(e){
      setPoolAmount(0)
    }
  }

  useEffect(()=>{
    getPoolValue()
  },[])

  const userAmount = userLPTokens * poolAmount / totalLPTokens;

  if (!isReady) {
    return <>-</>;
  }
  return <>{userAmount} BUSD</>;
};