/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { useWeb3Context } from "don-components";
import { BigNumber } from "bignumber.js";
import {
  getTokenAddress,
  captureException,
  getBUSDTokenContract,
  getPoolContract,
  getPoolToken,
  getReferralCode,
  getReferralSystemContract,
  getTokenPrice,
  getUserReferralCode,
  isValidReferralCode,
  toWei,
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
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@material-ui/core";
import { theme } from "theme";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Downarrow from "components/Icons/Downarrow";

const ButtonWrapper = styled.div({
  width: "100%",
});
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .widget {
    margin-left: 0.5rem;
  }
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    .widget {
      margin-top: 0.5rem;
      margin-left: 0rem;
    }
  }
  .Buttonwidget {
    height: 49px;
    font-size: 14px;
    @media only screen and (max-width: 600px) {
      height: 40px;
      font-size: 12px;
    }
  }
`;
const MyBalancemobile = styled.div`
  margin-top: 41px;
  margin-bottom: -2.25rem;
  font-size: 14px;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 12px;
    margin-top: 35px;
  }
`;
const Calculatermodel = styled.div`
  display: flex;
  direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const Messagetimeframe = styled.div`
  color: #a3a3a3;
  font-weight: 500;
  font-size: 12px;
  margin-top: 16px;
  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
const HrMessage = styled.hr`
  margin: 0;
  width: 100%;
  position: absolute;
  width: 100%;
  right: 0;
`;
const themeM = createTheme({
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
  const { getConnectedWeb3 } = useWeb3Context();
  

  const fetchBalance = async () => {
    try {
      const web3 = getConnectedWeb3();
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      const acceptedToken =
        poolVersion === 1
          ? await getBUSDTokenContract(web3)
          : await getPoolToken(web3, poolAddress);
      const balance = await acceptedToken.methods.balanceOf(accounts[0]).call();
      const decimals = await acceptedToken.methods.decimals().call();
      const balanceBN = new BigNumber(balance).dividedBy(10 ** decimals);
      setState({
        balance: balanceBN.toFixed(2),
        isReady: true,
      });
      onDone && onDone(balanceBN.toString());
    } catch (err) {
      captureException(err, "fetchBalance");
    }
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

const FARMER_WITHDRAW_FRAME = gql`
  query farmersWithdrawFrame($poolAddress: String!) {
    farmers(where: { poolAddress: $poolAddress }) {
      withdrawTimeFrame
    }
  }
`;


export const InvestmentPopup = ({
  poolAddress,
  poolVersion,
  gasLimit,
  onClose,
  onSuccess,
  apy,
}: {
  poolAddress: string;
  apy: string;
  poolVersion: number;
  gasLimit?: string;
  onSuccess?: () => void;
  onClose: () => void;
}) => {
  const [tokenPrice, setTokenPrice] = useState("-");
  const [value, setValue] = useState("");
  const [isLoading, enable] = useToggle();
  const [balance, setBalance] = useState("0");
  const [slippage, setSlippage] = useState("5");
  const [imageUrl, setImageUrl] = useState(null);
  const [{}, executePost] = useAxios(
    { method: "POST", url: "/api/v2/investments" },
    { manual: true }
  );
  const { getConnectedWeb3 } = useWeb3Context();
  const { loading, data } = useQuery(FARMER_WITHDRAW_FRAME, {
    variables: { poolAddress },
  });

  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();
  const { refetch, holdingDons } = useStakingContract();
  const [referralCode, setReferralCode] = useState("");
  const [_, setChecking] = useState(false);

  const [applied, setApplied] = useState(false);
  const web3 = getConnectedWeb3();
  const checkIfCodeisApplicable = async (code: string) => {
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
  const [fetch, { data: tokenData, loading: loadingToken }] = useLazyQuery(gql`
    query shortLinks($tokenAddress: String!) {
      tokens(where: { tokenAddress: $tokenAddress }) {
        image {
          url
        }
      }
    }
  `);
  const handleImage = () => {
    if (loadingToken) return;
    if (tokenData && tokenData.tokens) {
      setImageUrl(tokenData.tokens[0].image.url);
    }
  };
console.log(imageUrl);
  const fetchTokenInfo = async () => {
    const price = await getTokenPrice(web3, poolAddress);
    setTokenPrice(price);
    const tokenAddress = await getTokenAddress(web3, poolAddress);
    fetch({ variables: { tokenAddress } });
  };
  const applyCode = async (code: string) => {
    try {
      setChecking(true);
      const isApplicable = await checkIfCodeisApplicable(code);
      if (isApplicable) {
        setReferralCode(code.toUpperCase());
        setApplied(true);
      }
    } catch (e) {
      captureException(e, "Apply Code");
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

  const timeframe = !loading ? data.farmers[0]?.withdrawTimeFrame || "12" : "-";

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
      const decimals = await acceptedToken.methods.decimals().call();
      const tokenPrice = await getTokenPrice(web3, poolAddress);
      allowance = new BigNumber(allowance);
      const amount = new BigNumber(toWei(value, decimals));
      const inputAmount = amount.toFixed(0);
      onClose();
      showProgress("Transaction is in Progress");

      if (amount.gt(allowance)) {
        await acceptedToken.methods.approve(poolAddress, inputAmount).send({
          from: accounts[0],
        });
      }

      if (!poolVersion || poolVersion === 1) {
        await pool.methods.depositLiquidity(inputAmount).send({
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
          await pool.methods
            .depositLiquidityWithCode(inputAmount, referralCode.toLowerCase())
            .send({
              from: accounts[0],
              gas: gasLimit,
            });
        } else {
          await pool.methods.depositLiquidity(inputAmount).send({
            from: accounts[0],
            gas: gasLimit,
          });
        }
      }
      if (poolVersion === 4) {
        await pool.methods.depositLiquidity(inputAmount).send({
          from: accounts[0],
          gas: gasLimit,
        });
      }

      try {
        await executePost({
          data: { poolAddress, walletAddress: accounts[0] },
        });
      } catch (e) {
        captureException(e, "Failed to post poolAddress");
      }

      onSuccess && onSuccess();

      showSuccess("Money invested into Pool Successfully");
    } catch (err) {
      captureException(err, "handleInvest");
      showFailure("Transaction failed.");
    } finally {
      refetch();
    }
  };
  const { symbol } = usePoolSymbol(poolAddress, web3);

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner />;
    }

    return "Invest";
  };

  const [hasCheckedDons, setHasChecked] = useState(false);

  useEffectOnTabFocus(() => {
    (async () => {
      setHasChecked(false);
      try {
        await refetch();
      } catch (e) {
        captureException(e, "InvestmentPopup useEffecOnTabFocus");
      } finally {
        setHasChecked(true);
      }
    })();
  }, []);
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);
  useEffect(() => {
    fetchTokenInfo();
    handleImage();
  }, [tokenData]);

  const renderContent = () => {
    if (hasCheckedDons) {
      if (hasDons) {
        return (
          <>
            <div>
              <div>
                <InvestmentInput
                  value={value}
                  disabled={isLoading}
                  currencySymbol={symbol}
                  setValue={setValue}
                  max={balance}
                  tokenPrice={tokenPrice}
                  imageUrl={imageUrl}
                />
                
                {poolVersion < 3 && (
                  <ThemeProvider theme={themeM}>
                    <p className="mb-2 mt-4">Slippage Tolerance</p>
                    <div className="d-flex align-items-center mb-4">
                      {["5", "10", "15"].map((item) => {
                        return (
                          <Chip
                            size="medium"
                            className="mr-3"
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
              <ButtonWrap>
                <ButtonWrapper>
                  <ButtonWidget
                    className="Buttonwidget"
                    varaint="contained"
                    containedVariantColor="lightYellow"
                    width="100%"
                    disabled={!(value <= balance && value!="0" && value!="") || isLoading}
                    onClick={handleInvest}
                  >
                    {renderButtonText()}
                  </ButtonWidget>
                </ButtonWrapper>

                <ButtonWrapper className="widget">
                  <ButtonWidget
                    className="Buttonwidget"
                    varaint="outlined"
                    width="100%"
                    onClick={onClose}
                  >
                    Cancel
                  </ButtonWidget>
                </ButtonWrapper>
              </ButtonWrap>
            </div>
            <Calculatermodel className=" mt-4">
              <p>APY {apy}</p>
              <p className="d-none">
                Calculator &ensp;
                <Downarrow />
              </p>
            </Calculatermodel>
            <HrMessage />
            <Messagetimeframe className="d-flex text-center">
              Withdraws are executed up to {timeframe} hours upon request in
              order to minimize swap fees, price impact and slippage within the
              different pools.
            </Messagetimeframe>
          </>
        );
      } else {
        return <BuyDonContent />;
      }
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
    <>
      <DonCommonmodal
        title={hasDons ? "Investment" : ""}
        variant="common"
        isOpen={true}
        size="xs"
        rounded
        onClose={onClose}
      >
        <MyBalancemobile>
          {hasDons ? (
            <>
              Balance:{" "}
              {
                <MyBalanceInBUSD
                  onDone={setBalance}
                  poolAddress={poolAddress}
                  poolVersion={poolVersion}
                />
              }{" "}
              {symbol}(~ $
              {new BigNumber(balance || 0)
                .multipliedBy(tokenPrice)
                .toFixed(2)}
              )
              
            </>
          ) : undefined}
        </MyBalancemobile>

        {renderContent()}
      </DonCommonmodal>
    </>
  );
};
