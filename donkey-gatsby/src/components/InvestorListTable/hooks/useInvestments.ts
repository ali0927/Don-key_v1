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
import { orderBy } from "lodash";

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

  const [investmentsList, setInvestmentsList] = useState<
    (IInvestment & { date_created: string })[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const rowSize = rowsLimit;
  const start = (currentPageNumber - 1) * rowSize;
  const end = (currentPageNumber - 1) * rowSize + rowSize;
  // const { isUSD } = useUSDViewBool();

  const web3 = getWeb3(chainId);
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const finalInvestmentsList: (IInvestment & { date_created: string })[] =
          [];
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

              console.log(investor.date_created);

              finalInvestmentsList.push({
                address,
                claimableAmount: claimableAmount,
                claimableAmountInUSD: claimableAmountInUSD.toFixed(),
                initialInvestment: initialInvestment,
                initialInvestmentInUSD: investmentInUSD.toFixed(),
                profitLoss: profit.toFixed(),
                profitLossInUSD: profitInUSD.toFixed(),
                date_created: investor.date_created,
                duration: moment
                  .duration(moment().diff(moment(investor.date_created)))
                  .humanize(),
              });
            }
          })
        );
        setInvestmentsList(
          orderBy(finalInvestmentsList, ["date_created"], ["desc"])
        );
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