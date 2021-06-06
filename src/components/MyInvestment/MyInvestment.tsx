/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInvestedAmount } from "hooks/useInvestedAmount";
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { calculateInitialInvestment, calculateWithdrawAmount } from "helpers";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useInitialInvestment } from "hooks/useInitialInvestment";

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

export const MyInitialInvestment = ({
  poolAddress,
}: {
  poolAddress: string;
}) => {
  const { initialInvestment, isReady } = useInitialInvestment(poolAddress);
  const { symbol } = usePoolSymbol(poolAddress);

  if (!isReady) {
    return <>-</>;
  }
  return (
    <>
      {parseFloat(initialInvestment).toFixed(2)} {symbol}{" "}
    </>
  );
};
