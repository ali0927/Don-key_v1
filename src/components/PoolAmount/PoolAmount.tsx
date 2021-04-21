import { useWeb3 } from "don-components";
import { useLayoutEffect, useState } from "react";


export const PoolAmount = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState(0);

  const web3 = useWeb3();


  // const getPoolValue = async () => {
  //   const POOLJson = await import("JsonData/Pool.json");
  //   const contract = new web3.eth.Contract(POOLJson.abi as any);
  //   const accounts = await web3.eth.getAccounts();
  //   contract.methods.g
   
  // }

  useLayoutEffect(() => {



  }, []);
  if (!isReady) {
    return <>-</>;
  }



  return <>{poolAmount} BUSD</>;
};