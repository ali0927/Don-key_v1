import { useInvestedAmount } from "hooks/useInvestedAmount";
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { calculateWithdrawAmount } from "helpers";

export const MyInvestment = ({ poolAddress }: { poolAddress: string }) => {
  const { isReady, investedAmmount } = useInvestedAmount(poolAddress);
  const [withdrawalValue, setWithdrawalValue] = useState("-");
  const [poolAmount, setPoolAmount] = useState(0);
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
