import { gql, useMutation } from "@apollo/client";
import BigNumber from "bignumber.js";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { useWeb3Context } from "don-components";
// import { useWeb3 } from "don-components";
import {
  calculateInitialInvestment,
  calculateUserClaimableAmount,
  captureException,
  getAmount,
  getPoolContract,
  getPoolToken,
  toEther,
} from "helpers";
import { useStakingContract } from "./useStakingContract";

const ADD_WITHDRAW_REQUEST = gql`
  mutation allFarmerQuery(
    $poolAddress: String!
    $walletAddress: String!
    $profit: String
    $lpTokens: String
    $amountInToken: String
  ) {
    createWithdrawRequest(
      input: {
        data: {
          walletAddress: $walletAddress
          poolAddress: $poolAddress
          profit: $profit
          lpTokens: $lpTokens
          amountInToken: $amountInToken
        }
      }
    ) {
      withdrawRequest {
        id
      }
    }
  }
`;

export const useWithdraw = () => {
  const [create] = useMutation(ADD_WITHDRAW_REQUEST);
  const { showFailure, showProgress, showSuccess } =
    useTransactionNotification();
  const { refetch } = useStakingContract();
  const { getConnectedWeb3 } = useWeb3Context();
  const doWithdraw = async (
    poolAddress: string,
    poolVersion: number,
    onStart?: () => void,
    onSuccess?: () => void,
    onError?: (arg: any) => void
  ) => {
    try {
      onStart && onStart();
      const web3 = getConnectedWeb3();
      const accounts = await web3.eth.getAccounts();

      const pool = await getPoolContract(web3, poolAddress, poolVersion);
      const minAmountOut = await calculateUserClaimableAmount(
        web3,
        poolAddress
      );
      showProgress("Withdraw is in Progress");
      if (poolVersion === 1 || poolVersion === 3) {
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

      await create({
        variables: { poolAddress, walletAddress: accounts[0] },
      });

      showSuccess("Withdraw Request Created");

      onSuccess && onSuccess();
    } catch (err) {
      captureException(err, "Withdraw Failed");
      showFailure("Withdraw Failed");
      onError && onError(err);
    } finally {
      refetch();
    }
  };

  const doPartialWithdraw = async (
    poolAddress: string,
    share: string,
    isGreyWithdraw: boolean = false,
    onStart?: () => void,
    onSuccess?: () => void,
    onError?: (arg: any) => void
  ) => {
    try {
      onStart && onStart();
      const web3 = getConnectedWeb3();
      const accounts = await web3.eth.getAccounts();
      const pool = await getPoolContract(web3, poolAddress, 4);
      const withdraw = isGreyWithdraw
        ? pool.methods.withdrawGreyLiquidity
        : pool.methods.withdrawLiquidity;
      await withdraw(new BigNumber(share).multipliedBy(100).toFixed()).send({
        from: accounts[0],
      });

      if (isGreyWithdraw) {
        showSuccess("Withdraw Successful");
      } else {
        const withdrawAmount = await getAmount(
          web3,
          poolAddress,
          accounts[0],
          4,
          new BigNumber(share).toNumber()
        );
        const tokens = await pool.methods.balanceOf(accounts[0]).call();
        const token = await getPoolToken(web3, poolAddress);
        const decimals = await token.methods.decimals().call();
        const investAmount =  await calculateInitialInvestment(
          web3,
          poolAddress,
          accounts[0]
        );
        const profit = new BigNumber(withdrawAmount).minus(investAmount).toFixed(6);
  
        await create({
          variables: {
            poolAddress,
            walletAddress: accounts[0],
            amountInToken: withdrawAmount,
            lpTokens: new BigNumber(toEther(tokens, decimals))
              .multipliedBy(share)
              .dividedBy(100),
            profit: profit
          },
        });
        showSuccess("Withdraw Request Created");
      }
      onSuccess && onSuccess();
    } catch (err) {
      captureException(err, "Withdraw Failed");
      showFailure("Withdraw Failed");
      onError && onError(err);
    } finally {
      refetch();
    }
  };

  return { doWithdraw, doPartialWithdraw };
};
