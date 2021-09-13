import { getWeb3 } from "don-components";
import { useEffect, useState } from "react";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  getTokenPrice,
  getTokenAddress,
  getAmount,
  captureException,
} from "helpers";
import BigNumber from "bignumber.js";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useUSDViewBool } from "contexts/USDViewContext";

export const TotalProfitLoss = ({
  poolAddress,
  refresh = false,
  fromOverlay,
  address,
  chainId,
}: {
  poolAddress: string;
  refresh?: boolean;
  fromOverlay?: boolean;
  chainId: number;
  address?: string;
}) => {
  const [totalProfitLoss, setTotalProfitLoss] = useState("-");
  const web3 = getWeb3(chainId);
  const { symbol } = usePoolSymbol(poolAddress, web3);

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
          const tokenPrice = await getTokenPrice(web3, poolAddress);

          setTotalProfitLoss(
            new BigNumber(amountWithdraw)
              .multipliedBy(tokenPrice)
              .minus(amountInitialInUsd)
              .toFixed(digits)
          );
        }
      } catch (err) {
        captureException(err, "Total Profit Loss");
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
