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
  fromOverlay,
}: {
  poolAddress: string;
  refresh?: boolean;
  fromOverlay?: boolean;
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
        const digits =
          process.env.REACT_APP_ENV === "development" || fromOverlay ? 6 : 2;
        if (!isUSD) {
          setTotalProfitLoss(
            new BigNumber(amountWithdraw).minus(amountInitial).toFixed(digits)
          );
        } else {
          const tokenPrice = await getTokenPrice(
            web3,
            await getTokenAddress(web3, poolAddress)
          );
          setTotalProfitLoss(
            new BigNumber(amountWithdraw)
              .multipliedBy(tokenPrice)
              .minus(amountInitialInUsd)
              .toFixed(digits)
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, isUSD]);
  if (isUSD) {
    return <>${totalProfitLoss}</>;
  }
  return (
    <>
      {totalProfitLoss} {symbol}
    </>
  );
};
