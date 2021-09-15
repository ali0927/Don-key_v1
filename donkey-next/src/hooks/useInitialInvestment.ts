import { useWeb3Context } from "don-components";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  captureException,
} from "helpers";
import { useEffect, useState } from "react";

export const useInitialInvestment = (
  poolAddress: string,
  refresh = false,
  address?: string
) => {
  const [initialInvestment, setinitialInvestment] = useState("-");
  const [initialInvestmentInUSD, setinitialInvestmentinUSD] = useState("-");
  const [isReady, setIsReady] = useState(false);
  const { chainId, getConnectedWeb3 } = useWeb3Context();
  useEffect(() => {
    (async () => {
      try {
        const web3 = getConnectedWeb3();
        const accounts = address ? [address] : await web3.eth.getAccounts();
        const amounts = [
          calculateInitialInvestment(web3, poolAddress, accounts[0]),
          calculateInitialInvestmentInUSD(web3, poolAddress, accounts[0]),
        ];
        const results = await Promise.all(amounts);
        setinitialInvestment(results[0]);
        setinitialInvestmentinUSD(results[1]);
      } catch (err) {
        captureException(err, "useInitialInvestment");
      } finally {
        setIsReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, chainId]);

  return {
    isReady,
    initialInvestment,
    initialInvestmentInUSD,
  };
};
