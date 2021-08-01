import { useWeb3 } from "don-components";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
} from "helpers";
import { useEffect, useState } from "react";

export const useInitialInvestment = (
  poolAddress: string,
  refresh = false,
  address?: string
) => {
  const web3 = useWeb3();
  const [initialInvestment, setinitialInvestment] = useState("-");
  const [initialInvestmentInUSD, setinitialInvestmentinUSD] = useState("-");
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const accounts = address ? [address] : await web3.eth.getAccounts();
        const amounts = [
          calculateInitialInvestment(web3, poolAddress, accounts[0]),
          calculateInitialInvestmentInUSD(web3, poolAddress, accounts[0]),
        ];
        const results = await Promise.all(amounts);
        console.log(results, "result")
        setinitialInvestment(results[0]);
        setinitialInvestmentinUSD(results[1]);
      } catch (err) {
        // console.log(err);
      } finally {
        setIsReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return {
    isReady,
    initialInvestment,
    initialInvestmentInUSD,
  };
};
