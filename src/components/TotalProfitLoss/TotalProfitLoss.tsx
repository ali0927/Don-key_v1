import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import {
  calculateWithdrawAmount,
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  getTokenPrice,
  getTokenAddress,
} from "helpers";
import BigNumber from "bignumber.js";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useUSDViewBool } from "contexts/USDViewContext";

export const TotalProfitLoss = ({
  poolAddress,
  refresh = false,
}: {
  poolAddress: string;
  refresh?: boolean;
}) => {
  const [totalProfitLoss, setTotalProfitLoss] = useState("-");
  const { symbol } = usePoolSymbol(poolAddress);
  const web3 = useWeb3();
  const { isUSD } = useUSDViewBool();
  useEffect(() => {
    (async () => {
      try {
        const amountWithdraw = await calculateWithdrawAmount(web3, poolAddress);

        const amountInitial = await calculateInitialInvestment(
          web3,
          poolAddress
        );
        const amountInitialInUsd = await calculateInitialInvestmentInUSD(
          web3,
          poolAddress
        );
        if (!isUSD) {
          setTotalProfitLoss(
            new BigNumber(amountWithdraw).minus(amountInitial).toFixed(2)
          );
        } else {
          const tokenPrice = await getTokenPrice(
            await getTokenAddress(web3, poolAddress)
          );
          setTotalProfitLoss(
            new BigNumber(amountWithdraw)
              .multipliedBy(tokenPrice)
              .minus(amountInitialInUsd)
              .toFixed(2)
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, isUSD]);
  if(isUSD){
    return <>${totalProfitLoss}</>
  }
  return (
    <>
      {totalProfitLoss} {symbol}
    </>
  );
};
