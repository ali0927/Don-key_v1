import BigNumber from "bignumber.js";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { useWeb3 } from "don-components";
import { calculateUserClaimableAmount, getPoolContract } from "helpers";
import { useAxios } from "./useAxios";
import { useStakingContract } from "./useStakingContract";

export const useWithdraw = () => {
  const [{}, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );
  const { showFailure, showProgress, showSuccess } =
    useTransactionNotification();
  const { refetch } = useStakingContract();
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
      const minAmountOut = await calculateUserClaimableAmount(
        web3,
        poolAddress
      );
      showProgress("Withdraw is in Progress");
      if (poolVersion === 1 || poolVersion === 4 || poolVersion === 3) {
        await pool.methods.withdrawLiquidity().send({ from: accounts[0] });
      }
      if (poolVersion === 2) {
        const userLPTokens = await pool.methods.balanceOf(accounts[0]).call();
        await pool.methods
          .withdrawLiquidity(
            userLPTokens,
            new BigNumber(web3.utils.toWei(minAmountOut))
              .multipliedBy(98)
              .dividedBy(100)
              .toFixed(0)
          )
          .send({ from: accounts[0] });
      }
      if (poolVersion < 3) {
        await executeDelete({
          data: {
            poolAddress: poolAddress,
          },
        });
      }

      showSuccess("Withdraw Successfull");

      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      showFailure("Withdraw Failed");
      onError && onError(err);
    } finally {
      refetch();
    }
  };

  return { doWithdraw };
};
