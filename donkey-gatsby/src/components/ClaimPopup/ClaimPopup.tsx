import { DonCommonmodal } from "components/DonModal";
import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  background: linear-gradient(0deg, #0e0f10 0%, #272a2f 48.04%, #131415 100%);
  border-radius: 5px;
  border: 1px solid black;
  width: 100%;
  height: 39px;
  &:hover {
    background:#FFF037;
    color:black;
    border-color:black;
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

export const ClaimPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
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
              marginBottom: '20px'
            }}
          >
            <svg
              width={25}
              height={22}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.563 20.313a1.56 1.56 0 0 0 1.562 1.562h7.813v-7.813H1.562v6.25Zm12.5 1.562h7.812a1.56 1.56 0 0 0 1.563-1.563v-6.25h-9.375v7.813ZM23.437 6.25h-2.055c.303-.59.493-1.245.493-1.953A4.303 4.303 0 0 0 17.578 0c-2.031 0-3.345 1.04-5.03 3.335C10.865 1.04 9.552 0 7.52 0a4.303 4.303 0 0 0-4.297 4.297c0 .708.185 1.362.493 1.953H1.562A1.56 1.56 0 0 0 0 7.813v3.906c0 .43.352.781.781.781H24.22c.43 0 .781-.352.781-.781V7.813a1.56 1.56 0 0 0-1.563-1.563Zm-15.922 0a1.953 1.953 0 1 1 0-3.906c.971 0 1.69.16 4.204 3.906H7.515Zm10.063 0h-4.204c2.51-3.735 3.208-3.906 4.204-3.906a1.953 1.953 0 1 1 0 3.906Z"
                fill="#000"
              />
            </svg>
          </div>
        </>
      }
      size="sm"
      isOpen={open}
    >
      <h3 className="mb-3" style={{fontWeight: 600,
fontSize: '25px',
paddingBottom: '7px'}}>It’s a win!</h3>
      <p style={{marginBottom: '23px'}}>Congratulations. Your bid from 24/02/2021 has been won.</p>{" "}
      <p style={{fontWeight: 100, marginBottom: '48px'}}>You can now claim your loan. Click here to see the loan details</p>
      <div className="d-flex my-4">
        <div className="pr-2 w-50">
          <StyledButton>CLAIM</StyledButton>
        </div>
        <div className="pl-2 w-50">
          <StyledButton variant="white">Later</StyledButton>
        </div>
      </div>
    </DonCommonmodal>
  );
};
