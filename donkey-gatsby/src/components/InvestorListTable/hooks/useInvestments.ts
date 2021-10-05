import React, { useState } from "react";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  getAmount,
  getPoolContract,
  captureException,
} from "helpers";
import { getWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { Modules } from "web3";
import moment from "moment";
import { IInvestment, IInvestorsAPIData } from "../interfaces/IInvestors";

export const useInvestments = (data: {
  investors: IInvestorsAPIData[];
  chainId: number;
  poolAddress: string;
  tokenPrice: string;
  pool: any;
  currentPageNumber: number;
  rowsLimit: number;
}) => {
  const {
    investors,
    chainId,
    poolAddress,
    tokenPrice,
    pool,
    currentPageNumber,
    rowsLimit,
  } = data;

  const [investmentsList, setInvestmentsList] = useState<IInvestment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const rowSize = rowsLimit;
  const start = (currentPageNumber - 1) * rowSize;
  const end = (currentPageNumber - 1) * rowSize + rowSize;

  const web3 = getWeb3(chainId);
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const finalInvestmentsList: IInvestment[] = [];
        const finalInvestors = investors.slice(start, end);
        await Promise.all(
          finalInvestors.map(async (investor: any) => {
            const address = investor.from_walletaddress;
            const isInvested = await pool.methods.isInvestor(address).call();
            if (isInvested) {
              const [
                initialInvestment,
                initialInvestmentInUSD,
                claimableAmount,
              ] = await Promise.all([
                calculateInitialInvestment(web3, poolAddress, address),
                calculateInitialInvestmentInUSD(web3, poolAddress, address),
                getAmount(web3, poolAddress, address),
              ]);
              const initiailInvestmentBN = new BigNumber(initialInvestment);
              const claimableAmountBN = new BigNumber(claimableAmount);
              const investmentInUSD = new BigNumber(initialInvestmentInUSD);
              const claimableAmountInUSD =
                claimableAmountBN.multipliedBy(tokenPrice);
              const profit = claimableAmountBN.minus(initiailInvestmentBN);
              const profitInUSD = claimableAmountInUSD.minus(investmentInUSD);

              finalInvestmentsList.push({
                address,
                claimableAmount: claimableAmount,
                claimableAmountInUSD: claimableAmountInUSD.toFixed(),
                initialInvestment: initialInvestment,
                initialInvestmentInUSD: investmentInUSD.toFixed(),
                profitLoss: profit.toFixed(),
                profitLossInUSD: profitInUSD.toFixed(),
                duration: moment
                  .duration(moment().diff(moment(investor.date_created)))
                  .humanize(),
              });
            }
          })
        );
        setInvestmentsList(finalInvestmentsList);
      } catch (e) {
        captureException(e, "InvestorListTable");
      } finally {
        setLoading(false);
      }
    })();
  }, [investors, currentPageNumber]);

  return {
    investmentsList,
    loading,
  };
};
