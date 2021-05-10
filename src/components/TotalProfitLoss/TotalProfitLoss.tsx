import { useInvestedAmount } from "hooks/useInvestedAmount";
import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { calculateWithdrawAmount, calculateInitialInvestment } from "helpers";

export const TotalProfitLoss = ({ poolAddress }: { poolAddress: string}) => {
  
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [amountWithdraw, setAmountWithdraw] = useState(0);
  const [amountInitial, setAmountInitial] = useState(0);
  const web3 = useWeb3();

  useEffect(() => {
    (async () => {
      try {
        const amountWithdraw = await calculateWithdrawAmount(web3, poolAddress);
        setAmountWithdraw(parseFloat(amountWithdraw));
        const amountInitial = await calculateInitialInvestment(web3, poolAddress);
        setAmountInitial(parseFloat(amountInitial));
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    setTotalProfitLoss(amountWithdraw - amountInitial)
  },[amountInitial, amountWithdraw])

  return <>{totalProfitLoss} BUSD</>;
};