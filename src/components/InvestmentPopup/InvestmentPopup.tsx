/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { useWeb3 } from "don-components";
import { BigNumber } from "bignumber.js";
import {
  getBUSDTokenContract,
  getPoolContract,
  getPoolToken,
  getReferralCode,
  getReferralSystemContract,
  getTokenPrice,
  getUserAddressFromCode,
  getUserReferralCode,
  isValidReferralCode,
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
import { api } from "don-utils";
import { useStakingContract } from "hooks";
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

const ReferralInput = styled.input`
  box-shadow: none !important;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  outline: 0px !important;
  /* padding-left: 10px; */
  padding: 5px 10px;
  margin-right: 20px;
  :focus-visible {
    outline: 0px !important;
  }
`;

const initialState: { msg: string; type: "success" | "error" } = {
  msg: "",
  type: "success",
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
  const { refetch } = useStakingContract();
  const [referralCode, setReferralCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [msg, setMsg] =
    useState<{ msg: string; type: "success" | "error" }>(initialState);
  const [applied, setApplied] = useState(false);
  const checkIfCodeisApplicable = async (code: string, showMsg = false) => {
    const userCode = await getUserReferralCode(web3);

    if (userCode === code.toLowerCase()) {
      if (showMsg) {
        setMsg({ type: "error", msg: "You cannot use your own referral code" });
      }
      return false;
    }
    const referralSystem = await getReferralSystemContract(web3);
    const accounts = await web3.eth.getAccounts();
    const hasReferred = await referralSystem.methods
      .hasReferred(accounts[0])
      .call();
    if (hasReferred) {
      if (showMsg) {
        setMsg({ type: "error", msg: "Referral Code can only be used once." });
      }
      return false;
    }
    const isValidCode = await isValidReferralCode(web3, code.toLowerCase());
    if (!isValidCode) {
      if (showMsg) {
        setMsg({ type: "error", msg: "Enter a Valid Referral Code" });
      }
      return false;
    }

    return true;
  };

  const applyCode = async (code: string, showMsg = false) => {
    try {
      setChecking(true);
      const isApplicable = await checkIfCodeisApplicable(code, showMsg);
      if (isApplicable) {
        setReferralCode(code.toUpperCase());
        setApplied(true);
        setMsg(initialState);
      }
    } finally {
      setChecking(false);
    }
  };
  useEffect(() => {
    if (poolVersion === 3) {
      const code = getReferralCode();

      if (code) {
        applyCode(code);
      }
    }
  }, []);
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
      allowance = new BigNumber(allowance);
      const amount = new BigNumber(web3.utils.toWei(value, "ether"));
      const inputAmount = amount.toFixed(0);
      onClose();
      showProgress("Transaction is in Progress");
     
      if (amount.gt(allowance)) {
        await acceptedToken.methods
          .approve(poolAddress,inputAmount)
          .send({
            from: accounts[0],
          });
      }
     
      if (!poolVersion || poolVersion === 1) {
        await pool.methods
          .depositLiquidity(inputAmount)
          .send({
            from: accounts[0],
          });
      }
      if (poolVersion === 2) {
  
        await pool.methods
          .depositLiquidity(
            inputAmount,
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
      if (poolVersion === 3) {
        if (referralCode && applied) {
          const tx = await pool.methods
            .depositLiquidityWithCode(
              inputAmount,
              referralCode.toLowerCase()
            )
            .send({
              from: accounts[0],
              gas: gasLimit,
            });

          const referred_address = await getUserAddressFromCode(
            web3,
            referralCode.toLowerCase()
          );
          await api.post("/api/v2/referrer", {
            code: referralCode.toLowerCase(),
            txHash: tx.transactionHash,
            pool_address: poolAddress,
            referred_address,
          });
        } else {
          await pool.methods.depositLiquidity(inputAmount).send({
            from: accounts[0],
            gas: gasLimit,
          });
        }
      }
      if(poolVersion === 4){
        await pool.methods.depositLiquidity(inputAmount).send({
          from: accounts[0],
          gas: gasLimit,
        });
      }

      await executePost({ data: { poolAddress } });

      onSuccess && onSuccess();

      showSuccess("Money invested into Pool Successfully");
    } catch (err) {
      showFailure("Transaction failed.");
    } finally {
      refetch();
    }
  };
  const { symbol } = usePoolSymbol(poolAddress);

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner />;
    }

    return "Invest";
  };

  const renderApplyButton = () => {
    if (applied) {
      return "Remove";
    }
    if (checking) {
      return <DonKeySpinner />;
    }
    return "Apply";
  };
  const handleApplyClick = () => {
    if (applied) {
      setApplied(false);
      setReferralCode("");
    } else {
      applyCode(referralCode, true);
    }
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

          {poolVersion === 3 && (
            <div className="d-flex mt-3 align-items-center justify-content-between">
              <ReferralInput
                value={referralCode}
                placeholder="Enter Referral Code"
                disabled={applied || checking}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              />
              <ButtonWidget
                varaint="outlined"
                fontSize="14px"
                height="30px"
                width="119px"
                onClick={handleApplyClick}
              >
                {renderApplyButton()}
              </ButtonWidget>
            </div>
          )}
          {msg.msg && <p className="mb-1 mt-3 text-danger">{msg.msg}</p>}
          {applied && <p className="mb-1 mt-3 text-success">Applied</p>}
          <ThemeProvider theme={themeM}>
            <p className="mb-1 mt-3">Slippage Tolerance</p>
            <div className="d-flex align-items-center">
              {["5", "10", "15"].map((item) => {
                return (
                  <Chip
                    size="medium"
                    className="mr-2"
                    label={`${new BigNumber(item).dividedBy(10).toFixed(2)}%`}
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
          code", this is due to high slippage. Please try a different amount. Or
          Change Min Slippage
        </small>
      </p>
    </DonCommonmodal>
  );
};
