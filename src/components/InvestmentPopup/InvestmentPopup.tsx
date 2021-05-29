/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { useWeb3 } from "don-components";
import { BigNumber } from "bignumber.js";
import { getBUSDTokenContract, getPoolContract } from "helpers";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import {
  ButtonWidget,
  ContainedButton,
  OutlinedButton,
} from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";
import { useSnackbar } from "notistack";
import {
  ErrorSnackbar,
  ProgressSnackbar,
  SuccessSnackbar,
} from "components/Snackbars";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";

// const CaptionContent = styled.p`
//   font-family: Roboto;
//   font-style: normal;
//   font-weight: 400;
//   color: #6c757d !important;
// `;

const ButtonWrapper = styled.div({
  marginRight: "10%",
  width: "40%",
});

const MyBalanceInBUSD = ({ onDone }: { onDone?: (val: string) => void }) => {
  const [state, setState] = useState({ balance: "", isReady: false });
  const web3 = useWeb3();

  const fetchBalance = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      const busdtoken = await getBUSDTokenContract(web3);
      const balance = await busdtoken.methods.balanceOf(accounts[0]).call();
      setState({
        balance: new BigNumber(web3.utils.fromWei(balance, "ether")).toFixed(2),
        isReady: true,
      });
      onDone && onDone(web3.utils.fromWei(balance, "ether"));
    } catch (err) {}
  };
  useLayoutEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isReady) {
    return <>-</>;
  }
  return <>{state.balance}</>;
};

export const InvestmentPopup = ({
  poolAddress,
  onClose,
  onSuccess,
}: {
  poolAddress: string;
  onSuccess?: () => void;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable] = useToggle();
  const [balance, setBalance] = useState("0");

  const [{}, executePost] = useAxios(
    { method: "POST", url: "/api/v2/investments" },
    { manual: true }
  );

  const web3 = useWeb3();
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();

  const handleInvest = async () => {
    if (isLoading) {
      return;
    }
    enable();

    try {
      const pool = await getPoolContract(web3, poolAddress);
      const busdtoken = await getBUSDTokenContract(web3);
      const accounts = await web3.eth.getAccounts();
      let allowance = await busdtoken.methods
        .allowance(accounts[0], poolAddress)
        .call();
      allowance = new BigNumber(web3.utils.fromWei(allowance, "ether"));
      const amount = new BigNumber(value);
      onClose();
      showProgress("Transaction is in Progress");
      if (amount.gt(allowance)) {
        await busdtoken.methods
          .approve(poolAddress, web3.utils.toWei(amount.toString(), "ether"))
          .send({
            from: accounts[0],
          });
      }

      await pool.methods
        .depositLiquidity(web3.utils.toWei(value, "ether"))
        .send({
          from: accounts[0],
        });

      await executePost({ data: { poolAddress } });

      onSuccess && onSuccess();

      showSuccess("Money invested into Pool Successfully");
    } catch (err) {
      showFailure("Transaction failed.");
    }
  };

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner />;
    }

    return "Invest";
  };

  return (
    <DonCommonmodal
      title="Invest"
      variant="common"
      isOpen={true}
      size="xs"
      titleRightContent={
        <>Balance: {<MyBalanceInBUSD onDone={setBalance} />} BUSD</>
      }
      onClose={onClose}
    >
      <div>
        <div className="mt-4">
          <InvestmentInput
            value={value}
            disabled={isLoading}
            setValue={setValue}
            max={balance}
          />
        </div>
        <div className="d-flex justify-content-between mt-5">
          <ButtonWrapper>
            <ButtonWidget
              varaint="contained"
              fontSize="14px"
              containedVariantColor="lightYellow"
              height="30px"
              width="119px"
              disabled={!value || isLoading}
              onClick={handleInvest}
            >
              {renderButtonText()}
            </ButtonWidget>
          </ButtonWrapper>

          <ButtonWrapper className="mr-0">
            <ButtonWidget
              varaint="outlined"
              fontSize="14px"
              height="30px"
              width="119px"
              onClick={onClose}
            >
              Cancel
            </ButtonWidget>
          </ButtonWrapper>
        </div>
      </div>
      <p className="mt-4">
        <small>If you receive: "Transaction error. Exception thrown in contract code", this is due to high slippage. Please try a different amount.</small>
      </p>
    </DonCommonmodal>
  );
};
