/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useWeb3 } from "don-components";
import { BigNumber } from "bignumber.js";
import {
  getDONBSCbridgeContract,
  DONETHbridge,
  getETHDon,
  getBSCDon,
  getDonPrice,
  toEther,
} from "helpers";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { CircularProgress } from "@material-ui/core";
import { useEffectOnTabFocus, useSwitchNetwork } from "hooks";
import { DonBinance, DonEthereum } from "icons";
import { useWeb3Network } from "components/Web3NetworkDetector";
import clsx from "clsx";
import { InterchangeIcon } from "icons/InterchangeIcon";

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
`;

const BridgeInput = (props: {
  icon: React.ReactElement;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <InputBox>
      <div style={{ width: 85 }}>{props.icon}</div>
      <StyledInput
        type="number"
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

export const BridgePopup = ({
  onClose,
  onSuccess,
}: {
  onSuccess?: () => void;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable] = useToggle();

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

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner />;
    }

    return "Swap";
  };
  const { chainId } = useWeb3Network();
  const { switchNetwork } = useSwitchNetwork();
  const [bridgeInfo, setBridgeInfo] = useState();

  const [input1Chain, setInput1Chain] = useState(1);
  const [input2Chain, setInput2Chain] = useState(56);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const [balance, setBalance] = useState("-");
  const web3 = useWeb3();
  const fetchbalance = async () => {
    let token = await getETHDon(web3);
    if (chainId === 1) {
      token = await getETHDon(web3);
    }
    if (chainId === 56) {
      token = await getBSCDon(web3);
    }
    const accounts = await web3.eth.getAccounts();
    const balance = await token.methods.balanceOf(accounts[0]).call();
    setBalance(toEther(balance));
  };

  const fetchBridgeInfo = async () => {

  }

  useEffect(() => {
    fetchbalance();
  }, [chainId]);
  



 


  const renderContent = () => {
    return (
      <>
        <div>
          <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between">
              <InputLabel>From</InputLabel>
              <InputMaxButton onClick={() => setInput1(balance)}>Use MAX</InputMaxButton>
            </div>
            <BridgeInput
              icon={<RenderNetworkIcon chainId={input1Chain} />}
              value={input1}
              placeholder="0.0"
              onChange={(e) => {
                setInput1(e.target.value);
              }}
            />
            <InputLabel>Balance: {new BigNumber(balance).toFixed(2)}</InputLabel>
            <div className="my-2">
              <InterchangeIcon />
            </div>
            <BridgeInput
            
              icon={<RenderNetworkIcon chainId={input2Chain} />}
              value={input2}
              placeholder="0.0"
              onChange={(e) => {
                setInput2(e.target.value);
              }}
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
  };

  return (
    <DonCommonmodal
      title={"Exchange"}
      variant="common"
      subtitle="Transfer DON from Ethereum to Binance"
      contentStyle={{ padding: 30 }}
      isOpen
      size="xs"
      rounded
      onClose={onClose}
    >
      {renderContent()}
    </DonCommonmodal>
  );
};
