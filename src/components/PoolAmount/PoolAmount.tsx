import BigNumber from "bignumber.js";
import { useWeb3 } from "don-components";
import { getBUSDTokenContract, getPoolContract } from "helpers";
import { useLayoutEffect, useState } from "react";


export const PoolAmount = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState("");

  const web3 = useWeb3();

  const getPoolValue = async () => {
    try {
      const contract = await getPoolContract(web3, poolAddress)
      const amount =  await contract.methods.getTotalliquidity().call();
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