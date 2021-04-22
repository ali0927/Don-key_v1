import BigNumber from "bignumber.js";
import { useWeb3 } from "don-components";
import { getBUSDTokenContract } from "helpers";
import { useLayoutEffect, useState } from "react";


export const PoolAmount = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState("");

  const web3 = useWeb3();

  const getPoolValue = async () => {
    try {
      const contract = await getBUSDTokenContract(web3)
      const amount =  await contract.methods.balanceOf(poolAddress).call();
      const bn = new BigNumber(web3.utils.fromWei(amount, "ether")).toFixed(2);
      setPoolAmount(bn);
    }catch(e){
      setPoolAmount("0")
    }finally{
      setIsReady(true)
    }
  }

  useLayoutEffect(() => {
    getPoolValue()
  }, []);
  if (!isReady) {
    return <>-</>;
  }



  return <>{poolAmount} BUSD</>;
};