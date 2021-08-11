import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { InvestmentInput } from "components/InvestmentInput";
import React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
  font-family: Roboto;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #070602;
`;

const Info = styled.p`
  font-family: Roboto;

  font-size: 12px;
  line-height: 20px;
  /* or 125% */
  padding: 0 50px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  color: #656565;
`;


const DonInputWrapper = styled.div`
border: 1px solid #3E3E3E;
position: relative;
`
const DonInputLabel = styled.label`
position: absolute;
top: 0;
left: 0;
transform: translate(15px, -50%);
font-size: 15px;
color: #C6C6C6;
margin-bottom: 0%;
`
const DonHTMLInput = styled.input`
text-align: right;
font-size: 18px;
border: none;
&:focus {
  outline: none;
}
`

const DonInput = ({label, placeholder, value, max, showMaxButton, onChange}: {
  label: string;
  placeholder?: string;
  value: string;
  max?: string;
  showMaxButton?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <DonInputWrapper>
    <DonInputLabel>
      {label}
    </DonInputLabel>
    <DonHTMLInput placeholder={placeholder} type="text" value={value} onChange={onChange} />
  </DonInputWrapper>
};

export const AcceleratedAPYModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <DonCommonmodal
      isOpen={open}
      title=""
      PaperProps={{ style: { borderRadius: 1 } }}
      variant="common"
      onClose={onClose}
      size="xs"
    >
      <div style={{ marginTop: -30, marginBottom: -20 }}>
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ width: 100 }}>
            <img
              src="/assets/images/token.png"
              className="d-inline-block img-fluid"
              alt="Don Token Logo"
            />
          </div>
          <StyledH2 className="mb-0">Don-key APY program</StyledH2>
        </div>
        <DonInput
          label="Available DON"
          max={"1000"}
          value=""
          placeholder="Amount"
          onChange={() => {}}
        />
     

        <InvestmentInput
          currencySymbol="DON"
          max={"1000"}
          setValue={() => {}}
          value=""
        />
        <Info>The DON tokens will be locked for 2 weeks after unstaking</Info>
        <div className="d-flex align-items-center">
          <ButtonWidget
            varaint="contained"
            className="py-2 rounded-0 font-weight-bold"
            containedVariantColor="lightYellow"
          >
            Lock DON
          </ButtonWidget>
        </div>
      </div>
    </DonCommonmodal>
  );
};
