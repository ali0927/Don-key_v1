import { useWeb3 } from "don-components";
import { useEffect, useState } from "react";
import { calculateWithdrawAmount, calculateInitialInvestment } from "helpers";
import BigNumber from "bignumber.js";

export const TotalProfitLoss = ({
  poolAddress,
  refresh = false,
}: {
  poolAddress: string;
  refresh?: boolean;
}) => {
  const [totalProfitLoss, setTotalProfitLoss] = useState("-");

  const web3 = useWeb3();

  useEffect(() => {
    (async () => {
      try {
        const amountWithdraw = await calculateWithdrawAmount(web3, poolAddress);

        const amountInitial = await calculateInitialInvestment(
          web3,
          poolAddress
        );

        setTotalProfitLoss(
          new BigNumber(amountWithdraw).minus(amountInitial).toFixed(2)
        );
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return <>{totalProfitLoss} BUSD</>;
};
