/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { useWeb3 } from "don-components";
import { BigNumber } from "bignumber.js";
import {
  getBUSDTokenContract,
  getPoolContract,
  getPoolToken,
  getTokenPrice,
} from "helpers";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { Chip, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { theme } from "theme";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoIcon } from "icons/InfoIcon";
const ButtonWrapper = styled.div({
  marginRight: "10%",
  width: "40%",
});

const themeM = createMuiTheme({
  palette: {
    primary: { main: theme.palette.background.yellow },
  },
});

const MyBalanceInBUSD = ({
  onDone,
  poolAddress,
  poolVersion,
}: {
  onDone?: (val: string) => void;
  poolAddress: string;
  poolVersion: number;
}) => {
  const [state, setState] = useState({ balance: "", isReady: false });
  const web3 = useWeb3();

  const fetchBalance = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      const acceptedToken =
        poolVersion === 1
          ? await getBUSDTokenContract(web3)
          : await getPoolToken(web3, poolAddress);
      const balance = await acceptedToken.methods.balanceOf(accounts[0]).call();
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

export const InvestmentPopup = ({
  poolAddress,
  poolVersion,
  gasLimit,
  onClose,
  onSuccess,
}: {
  poolAddress: string;
  poolVersion: number;
  gasLimit?: string;
  onSuccess?: () => void;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable] = useToggle();
  const [balance, setBalance] = useState("0");
  const [slippage, setSlippage] = useState("5");
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
      const pool = await getPoolContract(web3, poolAddress, poolVersion);
      const acceptedToken =
        poolVersion === 1 || !poolVersion
          ? await getBUSDTokenContract(web3)
          : await getPoolToken(web3, poolAddress);
      const accounts = await web3.eth.getAccounts();
      let allowance = await acceptedToken.methods
        .allowance(accounts[0], poolAddress)
        .call();
      const tokenPrice = await getTokenPrice(
        web3,
        acceptedToken.options.address
      );
      allowance = new BigNumber(web3.utils.fromWei(allowance, "ether"));
      const amount = new BigNumber(value);
      onClose();
      showProgress("Transaction is in Progress");
      if (amount.gt(allowance)) {
        await acceptedToken.methods
          .approve(poolAddress, web3.utils.toWei(amount.toString(), "ether"))
          .send({
            from: accounts[0],
          });
      }
      if (!poolVersion || poolVersion === 1) {
        await pool.methods
          .depositLiquidity(web3.utils.toWei(value, "ether"))
          .send({
            from: accounts[0],
          });
      }
      if (poolVersion === 2) {
        const amount = new BigNumber(web3.utils.toWei(value, "ether"));
        await pool.methods
          .depositLiquidity(
            amount.toFixed(0),
            amount.multipliedBy(tokenPrice).toFixed(0),
            amount
              .multipliedBy(new BigNumber(1000).minus(slippage))
              .dividedBy(1000)
              .toFixed(0)
          )
          .send({
            from: accounts[0],
            gas: gasLimit,
          });
      }

      await executePost({ data: { poolAddress } });

      onSuccess && onSuccess();

      showSuccess("Money invested into Pool Successfully");
    } catch (err) {
      showFailure("Transaction failed.");
    }
  };
  const { symbol } = usePoolSymbol(poolAddress);

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
        <>
          Balance:{" "}
          {
            <MyBalanceInBUSD
              onDone={setBalance}
              poolAddress={poolAddress}
              poolVersion={poolVersion}
            />
          }{" "}
          {symbol}
        </>
      }
      onClose={onClose}
    >
      <div>
        <div className="mt-4">
          <InvestmentInput
            value={value}
            disabled={isLoading}
            currencySymbol={symbol}
            setValue={setValue}
            max={balance}
          />
          <ThemeProvider theme={themeM}>
            <p className="mb-1 mt-3">Slippage Tolerance</p>
            <div className="d-flex align-items-center">
              {["5", "10", "15"].map((item) => {
                return (
                  <Chip
                    size="medium"
                    className="mr-2"
                    label={new BigNumber(item).dividedBy(10).toFixed(2)}
                    onClick={() => setSlippage(item)}
                    variant={slippage === item ? "default" : "outlined"}
                    color="primary"
                  />
                );
              })}
            </div>
          </ThemeProvider>
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
        <small>
          If you receive: "Transaction error. Exception thrown in contract
          code", this is due to high slippage. Please try a different amount.
          Or Change Min Slippage
        </small>
      </p>
    </DonCommonmodal>
  );
};
