import { useWeb3Context } from "don-components";
import { captureException, getPoolContract } from "helpers";
import { useEffect, useState } from "react";

export const useIsInvested = (poolAddress: string) => {
  const [isReady, setIsReady] = useState(false);
  const [isInvested, setisInvested] = useState(false);

  const { getConnectedWeb3, address } = useWeb3Context();

  const getIsInvested = async () => {
    try {
      const web3 = getConnectedWeb3();
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
    getIsInvested();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isReady, isInvested, getIsInvested };
};
