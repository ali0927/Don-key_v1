import { useInvestedAmount } from "hooks/useInvestedAmount";
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { calculateInitialInvestment } from "helpers";

export const MyInitialInvestment = ({ poolAddress }: { poolAddress: string}) => {
  
  const {isReady, investedAmmount} = useInvestedAmount(poolAddress);
  const [withdrawalValue, setWithdrawalValue] = useState("-");
  const [poolAmount, setPoolAmount] = useState(0);
  const web3 = useWeb3();

  useEffect(() => {
    (async () => {
      try {
        const amount = await calculateInitialInvestment(web3, poolAddress);
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
  return <>{withdrawalValue} BUSD</>;
};