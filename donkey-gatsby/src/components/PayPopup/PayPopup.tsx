import BigNumber from "bignumber.js";
import { DonCommonmodal } from "components/DonModal";
import { BSC_TESTNET_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import { formatNum, getERCContract, toEther } from "helpers";
import { useEffectOnTabFocus, useTimer } from "hooks";
import { ILoan, IStoreState } from "interfaces";
import memoizeOne from "memoize-one";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { payLoanThunk } from "store/actions";
import { findLendedLp, selectAuction } from "store/selectors";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  background: linear-gradient(0deg, #0e0f10 0%, #272a2f 48.04%, #131415 100%);
  border-radius: 5px;
  border: 1px solid;
  width: 100%;
  height: 39px;
  &:hover {
    background: #fff037;
    color: black;
    border-color: black;
  }
  ${(props: { variant?: "white" | "black" }) => {
    return (
      props.variant === "white" &&
      css`
        background: #fff;
        border: 1px solid #000;
        color: #333;
      `
    );
  }}
`;

const StyledSpan = styled.p`
  font-size: 13px;
  color: #222;
  font-weight: 300;
  position: relative;
  text-align: center;

  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #ebebeb;
  }
  & span {
    position: relative;
    background-color: #fff;
    padding: 0 20px;
    z-index: 10;
  }
`;

const HorizontalRuleWithText = ({ text }: { text: string }) => {
  return (
    <StyledSpan>
      <span>{text}</span>
    </StyledSpan>
  );
};

const TimerCard = styled.div`
  background-color: #f7f7f7;
  flex: 1;
  color: #222;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  text-align: center;
`;
const TimerNum = styled.span`
  font-size: 16px;
  /* text-align: center; */
`;
const TimerText = styled.span`
  font-size: 9px;
`;

const Dots = styled.div`
  position: relative;
  min-width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::after,
  &::before {
    content: "";
    display: block;
    width: 3px;
    height: 3px;
    top: 0;
    left: 0;
    /* position: absolute; */
    border-radius: 50%;
    background-color: #222;
  }
  /* height: 20px; */
  &::after {
    margin-top: 10px;
    /* left: 0; */
  }
`;

const lpSelector = (lpAddress: string, auctionAddress: string) =>
  memoizeOne((state: IStoreState) =>
    findLendedLp(state.auctions.auctionInfo, lpAddress, auctionAddress)
  );

export const PayPopup = ({
  open,
  onClose,
  loan,
}: {
  loan: ILoan;
  open: boolean;
  onClose: () => void;
}) => {
  const { hrs, days, mins } = useTimer(loan.settlementTime);
  const lpToken = useSelector(lpSelector(loan.lpAddress, loan.auctionAddress));
  const auction = useSelector((state: IStoreState) =>
    selectAuction(state.auctions.auctionInfo, loan.auctionAddress)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const dispatch = useDispatch();
  const { address, getConnectedWeb3 } = useWeb3Context();

  const fetchBalance = async () => {
    if (address && auction) {
      setIsLoading(true);
      setBalance("");
      const token = await getERCContract(
        getWeb3(BSC_TESTNET_CHAIN_ID),
        auction.loanTokenAddress
      );
      const balance = await token.methods.balanceOf(address).call();
      const decimals = await token.methods.decimals().call();
      setBalance(toEther(balance, decimals));
      setIsLoading(false);
    }
  };

  useEffectOnTabFocus(() => {
    fetchBalance();
  }, [address]);

  const claimLoan = async () => {
    setIsLoading(true);
    dispatch(
      payLoanThunk({
        auctionAddress: loan.auctionAddress,
        web3: getConnectedWeb3(),
        userAddress: address,
        onDone: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      })
    );
  };
  const hasSufficientBalance = balance
    ? new BigNumber(balance).gt(loan.totalAmountTobePaid)
    : false;
  return (
    <DonCommonmodal
      className="auctionPop"
      onClose={onClose}
      variant="common"
      title={
        <>
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: "#FFF037",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-21px",
              marginBottom: "20px",
            }}
          >
            <svg
              width={24}
              height={24}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.998V21c0 1.655 4.031 3 9 3s9-1.345 9-3v-2.002C16.064 20.362 12.525 21 9 21c-3.525 0-7.064-.637-9-2.002ZM15 6c4.969 0 9-1.345 9-3s-4.031-3-9-3-9 1.345-9 3 4.031 3 9 3ZM0 14.081V16.5c0 1.655 4.031 3 9 3s9-1.345 9-3v-2.419c-1.936 1.594-5.48 2.419-9 2.419-3.52 0-7.064-.825-9-2.419Zm19.5.516C22.186 14.077 24 13.11 24 12V9.998c-1.087.77-2.686 1.294-4.5 1.618v2.98ZM9 7.5c-4.969 0-9 1.678-9 3.75S4.031 15 9 15s9-1.678 9-3.75S13.969 7.5 9 7.5Zm10.28 2.64C22.092 9.632 24 8.64 24 7.5V5.498c-1.664 1.177-4.523 1.81-7.533 1.96 1.383.67 2.4 1.57 2.813 2.681Z"
                fill="#000"
              />
            </svg>
          </div>
        </>
      }
      size="sm"
      isOpen={open}
    >
      <h2 style={{ fontWeight: 700, fontSize: 25 }} className="mb-3">
        Redeem
      </h2>
      <p style={{ marginBottom: "25px" }}>
        We hope you made money with our money.
      </p>{" "}
      <p style={{ fontWeight: 100, fontSize: 16, marginBottom: "47px" }}>
        In order to redeem your LP collateral you need to pay:
      </p>
      <div style={{ fontSize: 13 }}>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300, color: "#bbbbbb" }}>LP Value </span>
          <span style={{ fontWeight: 500, color: "#bbbbbb" }}>
            {formatNum(loan.lendedAmount)} {lpToken?.symbol}
          </span>
        </div>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>Loan </span>
          <span style={{ fontWeight: 500 }}>
            {formatNum(loan.borrowedAmount)} {lpToken?.symbol}
          </span>
        </div>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>Commission </span>
          <span style={{ fontWeight: 500 }}>
            {formatNum(loan.commission)} {lpToken?.symbol}
          </span>
        </div>
      </div>
      <hr />
      <div
        style={{ fontSize: 13 }}
        className="d-flex mb-2 align-items-center justify-content-end"
      >
        <div className="d-flex flex-column">
          <span className="mr-4" style={{ fontWeight: 300 }}>
            Total:{" "}
          </span>
        </div>
        <div className="d-flex flex-column">
          <span style={{ fontWeight: 600 }}>
            {formatNum(loan.totalAmountTobePaid)} {lpToken?.symbol}
          </span>
        </div>
      </div>
      <div
        className="d-flex my-4"
        style={{ paddingTop: "16px", paddingBottom: "18px" }}
      >
        <div className="pr-2 w-50">
          <StyledButton disabled={isLoading} onClick={claimLoan}>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : hasSufficientBalance ? (
              <>Re-Pay &amp; Unstake</>
            ) : (
              "Insufficient Balance"
            )}
          </StyledButton>
        </div>
        <div className="pl-2 w-50">
          <StyledButton variant="white" onClick={onClose}>
            Close
          </StyledButton>
        </div>
      </div>
      <HorizontalRuleWithText text="Last day to Pay" />
      <div
        className="d-flex align-items-center"
        style={{ paddingTop: "14px", paddingBottom: "26px" }}
      >
        <TimerCard>
          <TimerNum>{days}</TimerNum>
          <TimerText>DAYS</TimerText>
        </TimerCard>
        <Dots />
        <TimerCard>
          <TimerNum>{hrs}</TimerNum>
          <TimerText>HOURS</TimerText>
        </TimerCard>
        <Dots />
        <TimerCard>
          <TimerNum>{mins}</TimerNum>
          <TimerText>MINUTES</TimerText>
        </TimerCard>
      </div>
    </DonCommonmodal>
  );
};
