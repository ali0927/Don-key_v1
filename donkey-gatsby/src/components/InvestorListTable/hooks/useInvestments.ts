import React, { useMemo, useState } from "react";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  getAmount,
  captureException,
} from "helpers";
import { getCachedWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import moment from "moment";
import { IInvestment, IInvestorsFromGraph } from "../interfaces/IInvestors";
import { orderBy } from "lodash";

export const useInvestments = (data: {
  investors: IInvestorsFromGraph[];
  chainId: number;
  poolAddress: string;
  tokenPrice: string;
  pool: any;
  currentPageNumber: number;
  rowsLimit: number;
  poolVersion: number;
}) => {
  const {
    investors,
    chainId,
    poolAddress,
    tokenPrice,
    pool,
    currentPageNumber,
    rowsLimit,
    poolVersion,
  } = data;

  const [investmentsList, setInvestmentsList] = useState<
    (IInvestment & { date_created: string })[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const rowSize = rowsLimit;
  const start = (currentPageNumber - 1) * rowSize;
  const end = (currentPageNumber - 1) * rowSize + rowSize;
  // const { isUSD } = useUSDViewBool();

  const orderedInvestors = useMemo(() => {
    return orderBy(investors, ["timestamp"], ["desc"]);
  }, [investors]);

  const web3 = getCachedWeb3(chainId);
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const finalInvestors = orderedInvestors.slice(start, end);

        const finalList = await Promise.all(
          finalInvestors.map(async (investor) => {
            const address = investor.address;
            const isInvested = await pool.methods.isInvestor(address).call();
            if (isInvested) {
              try {
                const [
                  initialInvestment,
                  initialInvestmentInUSD,
                  claimableAmount,
                ] = await Promise.all([
                  calculateInitialInvestment(web3, poolAddress, address),
                  calculateInitialInvestmentInUSD(web3, poolAddress, address),
                  getAmount(web3, poolAddress, address, poolVersion),
                ]);
                const initiailInvestmentBN = new BigNumber(initialInvestment);
                const claimableAmountBN = new BigNumber(claimableAmount);
                const investmentInUSD = new BigNumber(initialInvestmentInUSD);
                const claimableAmountInUSD =
                  claimableAmountBN.multipliedBy(tokenPrice);
                const profit = claimableAmountBN.minus(initiailInvestmentBN);
                const profitInUSD = claimableAmountInUSD.minus(investmentInUSD);
                const investmentObj = {
                  address,
                  claimableAmount: claimableAmount,
                  claimableAmountInUSD: claimableAmountInUSD.toFixed(),
                  initialInvestment: initialInvestment,
                  initialInvestmentInUSD: investmentInUSD.toFixed(),
                  profitLoss: profit.toFixed(),
                  profitLossInUSD: profitInUSD.toFixed(),
                  date_created: investor.timestamp,
                  duration: moment
                    .unix(parseInt(investor.timestamp))
                    .format("DD-MM-YYYY"),
                };
                return investmentObj;
              } catch (e) {
                console.log(e);
                return null;
              }
            } else {
              // console.log(investor);
            }
          })
        );

        setInvestmentsList(finalList.filter((item) => !!item) as any[]);
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
