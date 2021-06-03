import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { useWeb3 } from "don-components";
import { getPoolContract } from "helpers";
import { useAxios } from "./useAxios";

export const useWithdraw = () => {
  const [{}, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );
  const { showFailure, showProgress, showSuccess } =
    useTransactionNotification();
  const web3 = useWeb3();
  const doWithdraw = async (
    poolAddress: string,
    poolVersion: number,
    onStart?: () => void,
    onSuccess?: () => void,
    onError?: (arg: any) => void
  ) => {
    try {
      onStart && onStart();
      const accounts = await web3.eth.getAccounts();

      const pool = await getPoolContract(web3, poolAddress, poolVersion);

      showProgress("Withdrawal is in Progress");
      if (poolVersion === 1) {
        await pool.methods.withdrawLiquidity().send({ from: accounts[0] });
      }
      if (poolVersion === 2) {
        const userLPTokens = await pool.methods.balanceOf(accounts[0]).call();
        await pool.methods
          .withdrawLiquidity(userLPTokens, 0)
          .send({ from: accounts[0] });
      }

      await executeDelete({
        data: {
          poolAddress: poolAddress,
        },
      });

      showSuccess("Withdrawal Successfull");

      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      showFailure("Withdrawal Failed");
      onError && onError(err);
    }
  };

  return { doWithdraw };
};