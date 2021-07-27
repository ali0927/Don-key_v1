import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import {
  calculateWithdrawAmount,
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  getTokenPrice,
  getTokenAddress,
  getAmount,
} from "helpers";
import BigNumber from "bignumber.js";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useUSDViewBool } from "contexts/USDViewContext";

export const TotalProfitLoss = ({
  poolAddress,
  refresh = false,
  fromOverlay,
  address,
}: {
  poolAddress: string;
  refresh?: boolean;
  fromOverlay?: boolean;
  address?: string;
}) => {
  const [totalProfitLoss, setTotalProfitLoss] = useState("-");
  const { symbol } = usePoolSymbol(poolAddress);
  const web3 = useWeb3();
  const { isUSD } = useUSDViewBool();
  useEffect(() => {
    (async () => {
      try {
        const accounts = address ? [address] : await web3.eth.getAccounts();
        const amountWithdraw = await getAmount(web3, poolAddress, accounts[0]);
        const amountInitial = await calculateInitialInvestment(
          web3,
          poolAddress,
          accounts[0]
        );
        const amountInitialInUsd = await calculateInitialInvestmentInUSD(
          web3,
          poolAddress,
          accounts[0]
        );
        const digits =
          process.env.REACT_APP_ENV === "development" || fromOverlay ? 6 : 2;
        if (!isUSD) {
          setTotalProfitLoss(
            new BigNumber(amountWithdraw).minus(amountInitial).toFixed(digits)
          );
          
        } else {
          const tokenAddress =  await getTokenAddress(web3, poolAddress);
          const tokenPrice = await getTokenPrice(
            web3,
           tokenAddress
          );
          console.log(poolAddress,tokenAddress,tokenPrice);

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
