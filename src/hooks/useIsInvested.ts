import { useWeb3 } from "don-components";
import { getPoolContract } from "helpers";
import { useEffect, useState } from "react";

export const useIsInvested = (poolAddress: string) => {
  const [isReady, setIsReady] = useState(false);
  const [isInvested, setisInvested] = useState(false);

  const web3 = useWeb3();

  const getIsInvested = async () => {
    try {
      const contract = await getPoolContract(web3, poolAddress);
      const accounts = await web3.eth.getAccounts();
      const isInvested = await contract.methods.isInvestor(accounts[0]).call();
      setisInvested(isInvested);
    } catch (e) {
      setisInvested(false);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    getIsInvested();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isReady, isInvested, getIsInvested };
};
