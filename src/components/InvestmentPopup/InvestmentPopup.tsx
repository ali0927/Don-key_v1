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
import { ButtonWidget, ContainedButton, OutlinedButton } from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";
import { useSnackbar } from "notistack";
import {
  ErrorSnackbar,
  ProgressSnackbar,
  SuccessSnackbar,
} from "components/Snackbars";

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
      onDone &&
        onDone(new BigNumber(web3.utils.fromWei(balance, "ether")).toFixed(2));
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
  const [hideFooter, setHideFooter] = useState(false);
  const [{}, executePost] = useAxios(
    { method: "POST", url: "/api/v2/investments" },
    { manual: true }
  );

  const web3 = useWeb3();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const handleInvest = async () => {
    if (isLoading) {
      return;
    }
    enable();

    let key1: string | number | null = null;
    try {
      setHideFooter(true);
      const pool = await getPoolContract(web3, poolAddress);
      const busdtoken = await getBUSDTokenContract(web3);
      const accounts = await web3.eth.getAccounts();
      let allowance = await busdtoken.methods
        .allowance(accounts[0], poolAddress)
        .call();
      allowance = new BigNumber(web3.utils.fromWei(allowance, "ether"));
      const amount = new BigNumber(value);
      onClose();
      key1 = enqueueSnackbar("Transaction is In Progress", {
        content: (key, msg) => <ProgressSnackbar message={msg as string} />,
        persist: true,
      });

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
      if (key1) {
        closeSnackbar(key1);
      }

      onSuccess && onSuccess();

      enqueueSnackbar("Money invested into Pool Successfully", {
        content: (key, msg) => <SuccessSnackbar message={msg as string} />,
        autoHideDuration: 5000,
        persist: false,
      });
    } catch (err) {
      if (key1) {
        closeSnackbar(key1);
      }
      enqueueSnackbar("Transaction failed.", {
        content: (key, msg) => <ErrorSnackbar message={msg as string} />,
        autoHideDuration: 5000,
        persist: false,
      });
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
              varaint="contained" fontSize="14px"  containedVariantColor="lightYellow" height="30px" width="119px" 
              disabled={!value || isLoading}
              onClick={handleInvest}
            >
              {renderButtonText()}
            </ButtonWidget>
          </ButtonWrapper>

          <ButtonWrapper className="mr-0">
             <ButtonWidget
              varaint="outlined" fontSize="14px" height="30px" width="119px"  onClick={onClose}>Cancel</ButtonWidget>
          </ButtonWrapper>
        </div>
      </div>
    </DonCommonmodal>
  );
};
