import { gql, useMutation } from "@apollo/client";
import BigNumber from "bignumber.js";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { useWeb3Context } from "don-components";
// import { useWeb3 } from "don-components";
import {
  calculateUserClaimableAmount,
  captureException,
  getAmount,
  getPoolContract,
  sendEvent,
} from "helpers";
import Web3 from "web3";
import { useStakingContract } from "./useStakingContract";

const ADD_WITHDRAW_REQUEST = gql`
  mutation allFarmerQuery($poolAddress: String!, $walletAddress: String!) {
    createWithdrawRequest(
      input: {
        data: { walletAddress: $walletAddress, poolAddress: $poolAddress }
      }
    ) {
      withdrawRequest {
        id
      }
    }
  }
`;

const getWithdrawAmount = async (web3: Web3,poolAddress: string, address: string, isGrey?: boolean, share: string = "100") => {
  const pool = await getPoolContract(web3,poolAddress, 4);
  if(isGrey){
   const result = await pool.methods.getUserGreyInvestedAmount(address).call();
   return new BigNumber(share).multipliedBy(result.amountInToken).dividedBy(100).toFixed(3);
  }
  return await getAmount(web3, poolAddress, address, 4,parseFloat(share));
}

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
      const withdrawValue = await getAmount(web3, poolAddress, accounts[0]);
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
    
      sendEvent("Withdraw", {
        user: accounts[0],
        poolAddress: poolAddress,
        amount: withdrawValue,
      })

      showSuccess("Withdraw Request Created");

      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
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
      await withdraw(new BigNumber(share).multipliedBy(100).toFixed(0)).send({
        from: accounts[0],
      });
      const withdrawValue = await getWithdrawAmount(web3, poolAddress, accounts[0], isGreyWithdraw,share);
      if (isGreyWithdraw) {
        
        showSuccess("Withdraw Successful");
      } else {
        await create({
          variables: {
            poolAddress,
            walletAddress: accounts[0],
          },
        });
        showSuccess("Withdraw Request Created");
      }

      
      sendEvent("Withdraw", {
        user: accounts[0],
        poolAddress: poolAddress,
        amount: withdrawValue,
      })
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      captureException(err, "Withdraw Failed");
      showFailure("Withdraw Failed");
      onError && onError(err);
    } finally {
      refetch();
    }
  };

  return { doWithdraw, doPartialWithdraw };
};
