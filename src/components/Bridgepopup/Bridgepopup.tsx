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
  getDONBSCbridgeContract,
  DONETHbridge,
  getETHDon,
  getBSCDon
} from "helpers";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import {
  Chip,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import { theme } from "theme";
import { api } from "don-utils";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
const ButtonWrapper = styled.div({
  marginRight: "10%",
  width: "40%",
});

const themeM = createMuiTheme({
  palette: {
    primary: { main: theme.palette.background.yellow },
  },
});

const MyBalanceInDON = ({
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
      let acceptedToken;
      let balance;
      if(await web3.eth.getChainId()==1){
      acceptedToken =await getETHDon(web3);
      };
      if(await web3.eth.getChainId()==56){
        acceptedToken =await getBSCDon(web3);
        };
      if(acceptedToken){
       balance = await acceptedToken.methods.balanceOf(accounts[0]).call();
      }else{
        balance=0;
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
  const { refetch, holdingDons } = useStakingContract();
  const [referralCode, setReferralCode] = useState("");
  const [checking, setChecking] = useState(false);

  const [applied, setApplied] = useState(false);
  const checkIfCodeisApplicable = async (code: string, showMsg = false) => {
    const userCode = await getUserReferralCode(web3);

    if (userCode === code.toLowerCase()) {
      return false;
    }
    const referralSystem = await getReferralSystemContract(web3);
    const accounts = await web3.eth.getAccounts();
    const hasReferred = await referralSystem.methods
      .hasReferred(accounts[0])
      .call();
    if (hasReferred) {
      return false;
    }
    const isValidCode = await isValidReferralCode(web3, code.toLowerCase());
    if (!isValidCode) {
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

  const handleSwap = async () => {
    if (isLoading) {
      return;
    }
    enable();

    try {
      const accounts = await web3.eth.getAccounts();
      if(await web3.eth.getChainId()==1){
        let acceptedToken =await getETHDon(web3);
        await acceptedToken.methods.transfer(DONETHbridge,web3.utils.toWei(value)).send({from:accounts[0]});
        
        };
        if(await web3.eth.getChainId()==56){
          let acceptedToken =await getBSCDon(web3);
          let BSCbridge=await getDONBSCbridgeContract(web3);
          await BSCbridge.methods.Swapout(web3.utils.toWei(value),accounts[0]).send({from:accounts[0]});
          };

      onSuccess && onSuccess();

      showSuccess("DON swapped Successfully");
    } catch (err) {
      console.log(err)
      showFailure("Transaction failed.");
    } finally {
      refetch();
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

  useEffectOnTabFocus(() => {
    (async () => {
      setHasChecked(false);
      try {
        await refetch();
      } catch (e) {
      } finally {
        setHasChecked(true);
      }
    })();
  }, []);
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);

  const renderContent = () => {
    if (hasCheckedDons) {
      if (true) {
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
                {poolVersion < 3 && (
                  <ThemeProvider theme={themeM}>
                    <p className="mb-1 mt-3">Slippage Tolerance</p>
                    <div className="d-flex align-items-center">
                      {["5", "10", "15"].map((item) => {
                        return (
                          <Chip
                            size="medium"
                            className="mr-2"
                            label={`${new BigNumber(item)
                              .dividedBy(10)
                              .toFixed(2)}%`}
                            onClick={() => setSlippage(item)}
                            variant={slippage === item ? "default" : "outlined"}
                            color="primary"
                          />
                        );
                      })}
                    </div>
                  </ThemeProvider>
                )}
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
            <p className="mt-4">
            </p>
          </>
        );
      } else {
        return <BuyDonContent />;
      }
    } else {
      return <div style={{minHeight: 200}} className="d-flex justify-content-center align-items-center">
        <CircularProgress color="inherit" />
      </div>
    }
  };

  return (
    <DonCommonmodal
      title={hasDons ? "Invest" : ""}
      variant="common"
      isOpen={true}
      size="xs"
      rounded
      titleRightContent={
        true ? (
          <>
            Balance:{" "}
            {
              <MyBalanceInDON
                onDone={setBalance}
                poolAddress={poolAddress}
                poolVersion={poolVersion}
              />
            }{" "}
            {symbol}
          </>
        ) : undefined
      }
      onClose={onClose}
    >
      {renderContent()}
    </DonCommonmodal>
  );
};
