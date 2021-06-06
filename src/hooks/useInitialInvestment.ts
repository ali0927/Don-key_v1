import { useWeb3 } from "don-components";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
} from "helpers";
import { useEffect, useState } from "react";

export const useInitialInvestment = (poolAddress: string, refresh = false) => {
  const web3 = useWeb3();
  const [initialInvestment, setinitialInvestment] = useState("-");
  const [initialInvestmentInUSD, setinitialInvestmentinUSD] = useState("-");
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const amounts = [calculateInitialInvestment(web3, poolAddress),calculateInitialInvestmentInUSD(web3, poolAddress)]
        const results = await Promise.all(amounts);
    
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
    initialInvestmentInUSD
  };
};
