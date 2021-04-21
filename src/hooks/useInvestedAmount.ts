import BigNumber from "bignumber.js";
import { useWeb3 } from "don-components";
import { getPoolContract } from "helpers";
import { useEffect, useState } from "react";


export const useInvestedAmount = (poolAddress:string) => {
  const [isReady, setIsReady] = useState(false)
  const [investedAmmount, setinvestedAmmount] = useState("-");
 
  const web3 = useWeb3()

  const getPoolValue = async () => {
    
   
    try {
      const contract = await getPoolContract(web3,poolAddress)
      const accounts = await web3.eth.getAccounts();
      const investment = await contract.methods.getInvested(accounts[0]).call();
      const num = new BigNumber(web3.utils.fromWei(investment, "ether"));
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