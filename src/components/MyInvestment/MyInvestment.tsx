/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInvestedAmount } from "hooks/useInvestedAmount";
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { calculateInitialInvestment, calculateWithdrawAmount } from "helpers";
import { usePoolSymbol } from "hooks/usePoolSymbol";

export const MyInvestment = ({ poolAddress }: { poolAddress: string }) => {
  const { isReady, investedAmmount } = useInvestedAmount(poolAddress);
  const [withdrawalValue, setWithdrawalValue] = useState("-");

  const web3 = useWeb3();

  useEffect(() => {
    (async () => {
      try {
        const amount = await calculateWithdrawAmount(web3, poolAddress);
        setWithdrawalValue(amount);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return <>-</>;
  }
  return <>{parseFloat(withdrawalValue).toFixed(2)} BUSD</>;
};




export const MyInitialInvestment = ({ poolAddress }: { poolAddress: string }) => {
 
  const [initialInvestment, setinitialInvestment] = useState("-");
  const [isReady, setIsReady] = useState(false);
  const {symbol} = usePoolSymbol(poolAddress);
  const web3 = useWeb3();

  useEffect(() => {
    (async () => {
      try {
        const amount = await calculateInitialInvestment(web3, poolAddress);
        setinitialInvestment(amount);
      } catch (err) {
        // console.log(err);
      }finally {
        setIsReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return <>-</>;
  }
  return <>{parseFloat(initialInvestment).toFixed(2)} {symbol}</>;
};
