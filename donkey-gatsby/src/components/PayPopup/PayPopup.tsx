import { DonCommonmodal } from "components/DonModal";
import { useTimer } from "hooks";
import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  background: linear-gradient(0deg, #0e0f10 0%, #272a2f 48.04%, #131415 100%);
  border-radius: 5px;
  border: 0px;
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

export const PayPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { hrs, days, mins } = useTimer("2022-01-29T07:00:00", true);
  return (
    <DonCommonmodal
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
      <p>We hope you made money with our money.</p>{" "}
      <p style={{ fontWeight: 100, fontSize: 16 }}>
        In order to redeem your LP collateral you need to pay:
      </p>
      <div style={{ fontSize: 13 }}>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>LP Value </span>
          <span style={{ fontWeight: 500 }}>250 BUSD</span>
        </div>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>Loan </span>
          <span style={{ fontWeight: 500 }}>175 BUSD</span>
        </div>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>Commission </span>
          <span style={{ fontWeight: 500 }}>20 BUSD</span>
        </div>
      </div>
      <hr />
      <div
        style={{ fontSize: 13 }}
        className="d-flex mb-2 align-items-center justify-content-end"
      >
        <span className="mr-4" style={{ fontWeight: 300 }}>
          Total:{" "}
        </span>
        <span style={{ fontWeight: 500 }}>195 BUSD</span>
      </div>
      <div className="d-flex my-4">
        <div className="pr-2 w-50">
          <StyledButton>Pay</StyledButton>
        </div>
        <div className="pl-2 w-50">
          <StyledButton variant="white">Unstake LP</StyledButton>
        </div>
      </div>
      <HorizontalRuleWithText text="Last day to Pay" />
      <div className="d-flex align-items-center">
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
