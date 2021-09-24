/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { BigNumber } from "bignumber.js";
import {
  getDONBSCbridgeContract,
  DONETHbridge,
  getETHDon,
  getUserDons,
  toWei,
  captureException,
} from "helpers";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { CircularProgress, makeStyles, Tooltip } from "@material-ui/core";
import { useDidUpdate, useSwitchNetwork } from "hooks";
import { BinanceIcon, DonBinance, DonEthereum, EthereumIcon } from "icons";

import clsx from "clsx";
import { InterchangeIcon } from "icons/InterchangeIcon";
import axios from "axios";
import Lottie from "react-lottie";
import ethtoBsc from "./ethtobsc.json";
import bsctoEth from "./bsctoeth.json";
import BgImage from "images/success-bg.png";
import { waitFor } from "don-utils";
import { DonTokenIcon } from "icons/DonTokenIcon";
import { useWeb3Context } from "don-components";

const Heading = styled.div`
    
   font-size: 23px;
   font-style: normal;
   font-weight: 600;
   text-align: center;
   color: #070602;
`;

const Root = styled.div`
   svg {
    transform: translate3d(0px, 7px, 0px) !important;
   }
`;

const IconRoot = styled.div`
   height: 252px;
`;

const Caption = styled.div`
   
   font-size: 14px;
   font-style: normal;
   font-weight: 600;
   color:#A3A3A3;
   text-align: center;
`;

export const Transfer = (props: { chainId: number }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: { 1: ethtoBsc, 56: bsctoEth }[props.chainId],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Root className="">
       <IconRoot>
           <Lottie
               width={400}
               style={{ maxWidth: "100%", pointerEvents: "none" }}
                isClickToPauseDisabled
                options={defaultOptions}
           />
      </IconRoot>
       <div className="mb-4">
         <Heading>We’re Transfering Tokens!</Heading>
         <Caption className="mt-1">It may take up to 5 minutes...</Caption>
       </div>
    </Root>
  );
};

// const ButtonWrapper = styled.div({
//   marginRight: "10%",
//   width: "40%",
// });


const InputBox = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  display: flex;
  align-items: stretch;
  padding: 15px;
`;

const StyledInput = styled.input`
  font-size: 25px;
  color: #070602;
  border: none;
  background: transparent;
  text-align: right;
  font-weight: 700;
  &:focus-visible {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
  &:disabled {
    color: #a8a8a8;
  }
`;

const BridgeInput = (props: {
  icon: React.ReactElement;
  value: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <InputBox>
      <div style={{ width: 85 }}>{props.icon}</div>
      <StyledInput
        type="number"
        disabled={props.disabled}
        className={clsx("w-100", props.className)}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </InputBox>
  );
};

const InputLabel = styled.span`
  font-weight: 600;
  color: #a3a3a3;
  font-size: 14px;
`;

const InputMaxButton = styled.span`
  color: #fac200;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const RenderNetworkIcon = ({ chainId = 1 }) => {
  if (chainId === 1) {
    return <DonEthereum />;
  }
  if (chainId === 56) {
    return <DonBinance />;
  }
  return <DonEthereum />;
};

const ExampleObject = {
  srcChainID: "1",
  destChainID: "56",
  logoUrl:
    "https://assets.coingecko.com/coins/images/15482/small/donkey_logo.jpg",
  name: "Donkey",
  symbol: "DON",
  PairID: "DONv4",
  SrcToken: {
    ID: "ERC20",
    Name: "DONERC20",
    Symbol: "DON",
    Decimals: 18,
    Description: "ERC20 DON",
    DepositAddress: "0x533e3c0e6b48010873B947bddC4721b1bDFF9648",
    DcrmAddress: "0x533e3c0e6b48010873B947bddC4721b1bDFF9648",
    ContractAddress: "0x217ddead61a42369a266f1fb754eb5d3ebadc88a",
    MaximumSwap: 7700000,
    MinimumSwap: 31,
    BigValueThreshold: 1600000,
    SwapFeeRate: 0,
    MaximumSwapFee: 0,
    MinimumSwapFee: 0,
    PlusGasPricePercentage: 10,
    DisableSwap: false,
    IsDelegateContract: false,
    BaseFeePercent: 0,
  },
  DestToken: {
    ID: "DON",
    Name: "Donkey",
    Symbol: "DON",
    Decimals: 18,
    Description: "cross chain bridge DON with DON",
    DcrmAddress: "0x533e3c0e6b48010873B947bddC4721b1bDFF9648",
    ContractAddress: "0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255",
    MaximumSwap: 7700000,
    MinimumSwap: 310,
    BigValueThreshold: 1600000,
    SwapFeeRate: 0.001,
    MaximumSwapFee: 1600,
    MinimumSwapFee: 31,
    PlusGasPricePercentage: 1,
    DisableSwap: false,
    IsDelegateContract: false,
    BaseFeePercent: 0,
  },
};

const Button = styled.button`
  padding: 12px 70px;
  background: linear-gradient(
      94.22deg,
      rgba(255, 196, 6, 0.2) 7.77%,
      rgba(255, 255, 255, 0) 93.41%
    ),
    #f4e41c;
  border: 1px solid rgba(255, 196, 6, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #222222;
  &:disabled {
    box-shadow: initial;
    opacity: 0.5;
  }
`;

const DarkButton = styled.button`
  background: linear-gradient(
      94.22deg,
      rgba(255, 255, 255, 0.2) 7.77%,
      rgba(255, 255, 255, 0) 93.41%
    ),
    #000000;
  border: 1px solid #262626;
  box-sizing: border-box;
  padding: 12px 24px;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  &:disabled {
    box-shadow: initial;
    opacity: 0.5;
  }
`;

const InfoIcon = () => {
  return (
    <svg
      width={13}
      height={16}
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={6.5} cy={6.5} r={6} stroke="#A8A8A8" />
      <path
        d="M6.915 10.219h-.903V4.936h.903v5.283zm-.977-6.685c0-.146.044-.27.132-.37.091-.102.225-.152.4-.152.176 0 .31.05.401.151.091.101.137.225.137.371a.516.516 0 01-.137.366c-.091.098-.225.147-.4.147-.176 0-.31-.049-.4-.147a.527.527 0 01-.133-.366z"
        fill="#A8A8A8"
      />
    </svg>
  );
};

const ViewLimits = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #a8a8a8;
  display: inline;
  opacity: 0.9;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 10,
  },
}));

const InfoLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: #fff;
  ${(props: { dark?: boolean }) => props.dark && `color: #A8A8A8;`}
`;




const SupportedChainIds = [1,56];

export const BridgePopup = ({
  onClose,
  onSuccess,
}: {
  onSuccess?: () => void;
  onClose: () => void;
}) => {
  const { showFailure } = useTransactionNotification();

  const renderButtonText = () => {
    if (input1Chain === chainId) {
      return (
        <Button className="my-2" disabled={!isValid} onClick={handleSwap}>
          {" "}
          Transfer
        </Button>
      );
    } else {
      if (input1Chain === 1) {
        return (
          <DarkButton
            className="my-2"
            onClick={() => switchNetwork(input1Chain)}
          >
            Switch to Ethereum <EthereumIcon className="ml-1" />
          </DarkButton>
        );
      } else {
        return (
          <DarkButton
            className="my-2"
            onClick={() => switchNetwork(input1Chain)}
          >
            Switch to Binance <BinanceIcon className="ml-1" />
          </DarkButton>
        );
      }
    }
  };
  const { chainId, getConnectedWeb3 } = useWeb3Context();
  const { switchNetwork } = useSwitchNetwork();

  const [input1Chain, setInput1Chain] = useState(SupportedChainIds.indexOf(chainId || 1) > -1 ? chainId || 1 : 1);
  const [input2Chain, setInput2Chain] = useState(
    chainId ? (chainId === 1 ? 56 : 1) : 56
  );
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const [balance, setBalance] = useState<null | { [x: number]: string }>(null);



  const [bridgeInfo, setBridgeInfo] = useState<null | typeof ExampleObject>(
    null
  );

  const [step, setStep] = useState<
    "transferring" | "transfersuccess" | "initial"
  >("initial");
  const web3 = getConnectedWeb3();
  const handleSwap = async () => {
    if (step === "transferring") {
      return;
    }

    setStep("transferring");
    try {
      const accounts = await web3.eth.getAccounts();
      if (input1Chain == 1) {
        let acceptedToken = await getETHDon(web3);
        await acceptedToken.methods
          .transfer(DONETHbridge, toWei(input1))
          .send({ from: accounts[0] });
      }
      if (input1Chain == 56) {
        let BSCbridge = await getDONBSCbridgeContract(web3);
        await BSCbridge.methods
          .Swapout(toWei(input1), accounts[0])
          .send({ from: accounts[0] });
      }
      const isTransferred = await checkDonsAreTransferred(
        balance![1],
        balance![56]
      );
      if (isTransferred) {
        onSuccess && onSuccess();
        setStep("transfersuccess");
      }
    } catch (err) {
      captureException(err, "Bridge Transfer Failed");
      showFailure("Transaction failed.");
      setStep("initial");
    } finally {
      // refetch();
    }
  };

  const fetchDons = async () => {
    const dons = await getUserDons(web3, [1, 56]);
    setBalance({ 1: dons[0].balance, 56: dons[1].balance });
  };

  const checkDonsAreTransferred = async (don1: string, don2: string) => {
    let result = false;
    while (true) {
      const dons = await getUserDons(web3, [1, 56]);
      await waitFor(4000);
      if (dons[0].balance !== don1 && don2 !== dons[1].balance) {
        result = true;
        break;
      }
    }
    return result;
  };

  const fetchBridgeInfo = async () => {
    const resp = await axios.get(
      "https://bridgeapi.anyswap.exchange/v2/serverInfo/56"
    );

    setBridgeInfo(resp.data["donv4"]);
  };

  const interChange = () => {
    setInput1Chain(input2Chain);
    setInput2Chain(input1Chain);
  };
  useDidUpdate(() => {
    handleChange(input1);
  }, [input1Chain, input2Chain]);

  useEffect(() => {
    fetchBridgeInfo();
    fetchDons();
  }, []);

  const classes = useStylesBootstrap();

  const srcToken =
    bridgeInfo !== null
      ? input1Chain === 1
        ? bridgeInfo.SrcToken
        : bridgeInfo.DestToken
      : null;
  const renderToolTip = () => {
    if (!srcToken) {
      return <>...</>;
    }

    // const destToken = input2Chain === 56 ? bridgeInfo.DestToken : bridgeInfo.SrcToken;
    return (
      <div className="p-4">
        <div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <InfoLabel dark>Max Swap Amount</InfoLabel>
            <InfoLabel className="ml-5">{srcToken.MaximumSwap} DON</InfoLabel>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <InfoLabel dark>Min Swap Amount</InfoLabel>
            <InfoLabel className="ml-5">{srcToken.MinimumSwap} DON</InfoLabel>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <InfoLabel dark> Swap Fee</InfoLabel>
            <InfoLabel className="ml-5">
              {new BigNumber(srcToken.SwapFeeRate).multipliedBy(100).toFixed(2)}
              %
            </InfoLabel>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <InfoLabel dark>Max Fee Amount</InfoLabel>
            <InfoLabel className="ml-5">
              {srcToken.MaximumSwapFee} DON
            </InfoLabel>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <InfoLabel dark>Min Fee Amount</InfoLabel>
            <InfoLabel className="ml-5">
              {srcToken.MinimumSwapFee} DON
            </InfoLabel>
          </div>

          <p className="text-center mt-3 mb-0">
            Deposits &gt; 1,300,000 DON could take up to 12 Hours
          </p>
        </div>
      </div>
    );
  };

  const handleChange = (inputval: string) => {
    setInput1(inputval);
    if (srcToken) {
      const feeRate = srcToken.SwapFeeRate;
      const inputBN = new BigNumber(inputval);
      let fee = inputBN.multipliedBy(feeRate);
      if (fee.gte(srcToken.MaximumSwapFee)) {
        fee = new BigNumber(srcToken.MaximumSwapFee);
      } else if (fee.lte(srcToken.MinimumSwapFee)) {
        fee = new BigNumber(srcToken.MinimumSwapFee);
      }
      const calcAmount = new BigNumber(inputval).minus(fee);
      if (calcAmount.lte(0) || inputBN.lt(srcToken.MinimumSwap)) {
        setInput2("");
      } else {
        setInput2(calcAmount.toFixed());
      }
    }
  };

  const isValid = useMemo(() => {
    if (!balance) {
      return false;
    }
    if (!srcToken) {
      return false;
    }
    const feeRate = srcToken.SwapFeeRate;
    const inputBN = new BigNumber(input1);
    if (!!!input1) {
      return false;
    }
    if (inputBN.gt(balance[input1Chain!])) {
      return false;
    }
    let fee = inputBN.multipliedBy(feeRate);
    if (fee.gte(srcToken.MaximumSwapFee)) {
      fee = new BigNumber(srcToken.MaximumSwapFee);
    } else if (fee.lte(srcToken.MinimumSwapFee)) {
      fee = new BigNumber(srcToken.MinimumSwapFee);
    }
    const calcAmount = new BigNumber(input1).minus(fee);
    if (calcAmount.lte(0) || inputBN.lt(srcToken.MinimumSwap)) {
      return false;
    }
    return true;
  }, [srcToken, input1, balance, chainId]);

  const renderContent = () => {
    if (!bridgeInfo) {
      return (
        <div className="d-flex justify-content-center align-items-center py-5 my-5">
          <CircularProgress color="inherit" />
        </div>
      );
    }
    if (step === "transferring") {
      return <Transfer chainId={input1Chain} />;
    }
    if (step === "transfersuccess") {
      return (
        <>
          <img
            src={BgImage}
            style={{
              position: "absolute",
              zIndex: 0,
              top: 0,
              left: 0,
              right: 0,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 80,

              textAlign: "center",
            }}
          >
            <DonTokenIcon style={{ marginBottom: 40 }} />
            <h4>Your Transfer is Complete!</h4>
            <p>
              Transferred {input1} DON{" "}
              {input1Chain === 1 ? <EthereumIcon /> : <BinanceIcon />} to{" "}
              {input2} DON{" "}
              {input2Chain !== 56 ? <EthereumIcon /> : <BinanceIcon />}
            </p>
          </div>
        </>
      );
    }
    return (
      <>
        <div>
          <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between">
              <InputLabel>From</InputLabel>
              <InputMaxButton onClick={() => handleChange(balance![input1Chain!])}>
                Use MAX
              </InputMaxButton>
            </div>
            <BridgeInput
              icon={<RenderNetworkIcon chainId={input1Chain} />}
              value={input1}
              placeholder="0.0"
              onChange={(e) => handleChange(e.target.value)}
            />
            <InputLabel>
              Balance:{" "}
              {balance !== null
                ? new BigNumber(balance[input1Chain!]).toFixed(2)
                : "-"}
            </InputLabel>
            <div className="my-2 d-flex justify-content-center mb-4">
              <InterchangeIcon
                style={{ cursor: "pointer" }}
                onClick={interChange}
              />
            </div>
            <BridgeInput
              icon={<RenderNetworkIcon chainId={input2Chain} />}
              value={input2}
              disabled
              placeholder="0.0"
              onChange={(_) => {}}
            />
          </div>

          <ViewLimits className="my-2">
            <Tooltip
              title={renderToolTip()}
              placement="left"
              arrow
              classes={classes}
              interactive
            >
              <span>
                <InfoIcon />
                <span className="ml-1">View Limits</span>
              </span>
            </Tooltip>
          </ViewLimits>

          <div className="d-flex justify-content-center mt-3">
            {renderButtonText()}
          </div>
        </div>
      </>
    );
  };

  return (
    <DonCommonmodal
      title={step === "initial" ? "Exchange" : ""}
      variant="common"
      subtitle={step === "initial" ? "Powered by Anyswap Network" : ""}
      contentStyle={{ padding: 30 }}
      isOpen
      size="xs"
      rounded
      disableBackdropClick
      onClose={onClose}
    >
      {renderContent()}
    </DonCommonmodal>
  );
};
