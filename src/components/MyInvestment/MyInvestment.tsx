/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInvestedAmount } from "hooks/useInvestedAmount";
import { getWeb3, useWeb3Context } from "don-components";
import { useEffect, useState } from "react";
import { calculateWithdrawAmount, captureException } from "helpers";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useInitialInvestment } from "hooks/useInitialInvestment";

export const MyInvestment = ({ poolAddress }: { poolAddress: string }) => {
  const { isReady } = useInvestedAmount(poolAddress);
  const [withdrawalValue, setWithdrawalValue] = useState("-");
  const { web3, connected } = useWeb3Context();

  useEffect(() => {
    (async () => {
      if (connected) {
        try {
          const amount = await calculateWithdrawAmount(web3, poolAddress);
          setWithdrawalValue(amount);
        } catch (err) {
          captureException(err, "MyInvestment");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  if (!isReady) {
    return <>-</>;
  }
  return <>{parseFloat(withdrawalValue).toFixed(2)} BUSD</>;
};

export const MyInitialInvestment = ({
  poolAddress,
  chainId,
}: {
  poolAddress: string;
  chainId: number;
}) => {
  const { initialInvestment, isReady } = useInitialInvestment(poolAddress);
  const web3 = getWeb3(chainId);
  const { symbol } = usePoolSymbol(poolAddress, web3);

  if (!isReady) {
    return <>-</>;
  }
  return (
    <>
      {parseFloat(initialInvestment).toFixed(2)} {symbol}{" "}
    </>
  );
};
