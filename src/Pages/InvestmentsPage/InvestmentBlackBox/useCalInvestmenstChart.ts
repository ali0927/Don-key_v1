import {
  calculateInitialInvestment,
  calculateWithdrawAmount,
  getROI,
  getProfitLoss,
} from "helpers";
import { useEffect, useState } from "react";
import { IMyInvestments } from "../interfaces";

export const useCalInvestmentsChart = (
  web3: any,
  myInvestments: IMyInvestments[]
) => {
  const [investedTotal, SetInvestedTotal] = useState(0);
  const [roi, setRoi] = useState(0);
  const [initialInvestmentTotal, SetinitialInvestmentTotal] = useState(0);
  const [profitloss, setProfitLoss] = useState(0);

  useEffect(() => {
    async function apiCall() {
      let investtotal = 0;
      let initialInvestmentsTotal = 0;
      let totalProfit = 0;

      for (let investment of myInvestments) {
        const investedAmount = await calculateWithdrawAmount(
          web3,
          investment.poolAddress
        );
        const initialInvestment = await calculateInitialInvestment(
          web3,
          investment.poolAddress
        );
        // const roivalue= await getROI(web3,investment.poolAddress);
        const profitlossvalue = await getProfitLoss(
          web3,
          investment.poolAddress
        );

        //initial invest total
        initialInvestmentsTotal =
          initialInvestmentsTotal + parseFloat(initialInvestment);

        //profit

        totalProfit = totalProfit + profitlossvalue;

        //current holding
        investtotal = investtotal + parseFloat(investedAmount);
      }
      const finalROI = totalProfit / initialInvestmentsTotal;
      setProfitLoss(totalProfit);
      setRoi(finalROI);
      SetinitialInvestmentTotal(initialInvestmentsTotal);
      SetInvestedTotal(investtotal);
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    profitloss: profitloss.toFixed(2).toString(),
    investedTotal: investedTotal.toFixed(2),
    initialInvestmentTotal: Number(initialInvestmentTotal).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ),
    roi: roi.toFixed(2),
  };
};
