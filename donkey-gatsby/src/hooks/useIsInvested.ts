import { useWeb3Context } from "don-components";
import { captureException, getPoolContract } from "helpers";
import { useEffect, useState } from "react";
import Web3 from "web3";

export const useIsInvested = (poolAddress: string, web3Instance?: Web3) => {
  const [isReady, setIsReady] = useState(false);
  const [isInvested, setisInvested] = useState(false);

  const { getConnectedWeb3, address } = useWeb3Context();

  const getIsInvested = async () => {
    try {
      const web3 = web3Instance || getConnectedWeb3();
      const contract = await getPoolContract(web3, poolAddress, 2);

      const isInvested = await contract.methods.isInvestor(address).call();
      setisInvested(isInvested);
    } catch (e) {
      captureException(e, "useIsInvested");
      setisInvested(false);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (address) {
      getIsInvested();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return { isReady, isInvested, getIsInvested };
};
