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
  toWei,
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
  const { getConnectedWeb3, address } = useWeb3Context();
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
    
      const pool = await getPoolContract(web3, poolAddress, poolVersion);
     
      showProgress("Withdraw is in Progress");
     
      if (poolVersion === 1 || poolVersion === 3) {
        await pool.methods.withdrawLiquidity().send({ from: address });
      }
      if (poolVersion === 2) {
        const minAmountOut = await calculateUserClaimableAmount(
          web3,
          poolAddress
        );
        const userLPTokens = await pool.methods.balanceOf(address).call();
        await pool.methods
          .withdrawLiquidity(
            userLPTokens,
            new BigNumber(toWei(minAmountOut))
              .multipliedBy(98)
              .dividedBy(100)
              .toFixed(0)
          )
          .send({ from: address });
      }

      await create({
        variables: { poolAddress, walletAddress: address },
      });
      const withdrawValue = await getAmount(web3, poolAddress, address);
    
      sendEvent("Withdraw", {
        user: address,
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
      const pool = await getPoolContract(web3, poolAddress, 4);
      const withdraw = isGreyWithdraw
        ? pool.methods.withdrawGreyLiquidity
        : pool.methods.withdrawLiquidity;
      await withdraw(new BigNumber(share).multipliedBy(100).toFixed(0)).send({
        from: address,
      });
      const withdrawValue = await getWithdrawAmount(web3, poolAddress, address, isGreyWithdraw,share);
      if (isGreyWithdraw) {
        
        showSuccess("Withdraw Successful");
      } else {
        await create({
          variables: {
            poolAddress,
            walletAddress: address,
          },
        });
        showSuccess("Withdraw Request Created");
      }

      
      sendEvent("Withdraw", {
        user: address,
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
