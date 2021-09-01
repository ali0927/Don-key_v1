/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useWeb3 } from "don-components";
import { BigNumber } from "bignumber.js";
import {
  getDONBSCbridgeContract,
  DONETHbridge,
  getETHDon,
  getBSCDon,
} from "helpers";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { CircularProgress } from "@material-ui/core";
import { useEffectOnTabFocus } from "hooks";

const ButtonWrapper = styled.div({
  marginRight: "10%",
  width: "40%",
});



const MyBalanceInDON = ({ onDone }: { onDone?: (val: string) => void }) => {
  const [state, setState] = useState({ balance: "", isReady: false });
  const web3 = useWeb3();

  const fetchBalance = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      let acceptedToken;
      let balance;
      if ((await web3.eth.getChainId()) == 1) {
        acceptedToken = await getETHDon(web3);
      }
      if ((await web3.eth.getChainId()) == 56) {
        acceptedToken = await getBSCDon(web3);
      }
      if (acceptedToken) {
        balance = await acceptedToken.methods.balanceOf(accounts[0]).call();
      } else {
        balance = 0;
      }
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
  return <>{state.balance} </>;
};

export const BridgePopup = ({
  onClose,
  onSuccess,
}: {
  onSuccess?: () => void;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable] = useToggle();
  const [balance, setBalance] = useState("0");

  const web3 = useWeb3();
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();

  const handleSwap = async () => {
    if (isLoading) {
      return;
    }
    enable();

    try {
      const accounts = await web3.eth.getAccounts();
      if ((await web3.eth.getChainId()) == 1) {
        let acceptedToken = await getETHDon(web3);
        await acceptedToken.methods
          .transfer(DONETHbridge, web3.utils.toWei(value))
          .send({ from: accounts[0] });
      }
      if ((await web3.eth.getChainId()) == 56) {
        let acceptedToken = await getBSCDon(web3);
        let BSCbridge = await getDONBSCbridgeContract(web3);
        await BSCbridge.methods
          .Swapout(web3.utils.toWei(value), accounts[0])
          .send({ from: accounts[0] });
      }

      onSuccess && onSuccess();

      showSuccess("DON swapped Successfully");
    } catch (err) {
      console.log(err);
      showFailure("Transaction failed.");
    } finally {
      // refetch();
    }
  };
  const symbol = "DON";

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner />;
    }

    return "Swap";
  };

  const [hasCheckedDons, setHasChecked] = useState(false);



  const renderContent = () => {
    if (hasCheckedDons) {
      return (
        <>
          <div>
            <div className="mt-4">
              <InvestmentInput
                value={value}
                disabled={isLoading}
                currencySymbol={symbol}
                setValue={setValue}
                max={balance}
              />
            </div>
            <div className="d-flex justify-content-between mt-3">
              <ButtonWrapper>
                <ButtonWidget
                  varaint="contained"
                  fontSize="14px"
                  containedVariantColor="lightYellow"
                  height="30px"
                  width="119px"
                  disabled={!value || isLoading}
                  onClick={handleSwap}
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
          <p className="mt-4"></p>
        </>
      );
    } else {
      return (
        <div
          style={{ minHeight: 200 }}
          className="d-flex justify-content-center align-items-center"
        >
          <CircularProgress color="inherit" />
        </div>
      );
    }
  };

  return (
    <DonCommonmodal
      title={hasCheckedDons ? "Swap" : ""}
      variant="common"
      isOpen={true}
      size="xs"
      rounded
      titleRightContent={
        hasCheckedDons ? (
          <>
            Balance: {<MyBalanceInDON onDone={setBalance} />} {symbol}
          </>
        ) : undefined
      }
      onClose={onClose}
    >
      {renderContent()}
    </DonCommonmodal>
  );
};
