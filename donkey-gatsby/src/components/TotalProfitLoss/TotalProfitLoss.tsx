import { getWeb3, useWeb3Context } from "don-components";
import { useEffect, useState } from "react";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  getTokenPrice,
  getAmount,
  captureException,
} from "helpers";
import BigNumber from "bignumber.js";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useUSDViewBool } from "contexts/USDViewContext";

export const TotalProfitLoss = ({
  poolAddress,
  refresh = false,
  poolVersion = 2,
  fromOverlay,
  address,
  chainId,
  variant = "default",
}: {
  poolAddress: string;
  poolVersion?: number;
  refresh?: boolean;
  fromOverlay?: boolean;
  chainId: number;
  address?: string;
  variant?: "default" | "multiline";
}) => {
  const [totalProfitLoss, setTotalProfitLoss] = useState("-");
  const web3 = getWeb3(chainId);
  const { symbol } = usePoolSymbol(poolAddress, web3);
  const { address: connectedAddress } = useWeb3Context();
  const { isUSD } = useUSDViewBool();
  useEffect(() => {
    (async () => {
      if (!address && !connectedAddress) {
        return;
      }
      try {
        const accounts = address ? [address] : [connectedAddress];
        const amountWithdraw = await getAmount(web3, poolAddress, accounts[0],poolVersion);
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
          process.env.GATSBY_APP_ENV === "development" || fromOverlay ? 6 : 2;
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
  }, [refresh, isUSD, address, connectedAddress]);
  if (isUSD) {
    return <>${totalProfitLoss}</>;
  }
  if (variant === "multiline") {
    return (
      <span className="d-flex d-md-block flex-column align-items-center">
        <span>{totalProfitLoss} </span>
        <span>{symbol}</span>
      </span>
    );
  }
  return (
    <>
      {totalProfitLoss} {symbol}
    </>
  );
};
