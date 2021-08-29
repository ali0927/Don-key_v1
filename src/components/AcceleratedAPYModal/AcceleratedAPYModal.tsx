import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { getBSCDon, toEther, toWei } from "helpers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { useStakingContract } from "hooks";
import { Spinner } from "react-bootstrap";

const StyledH2 = styled.h2`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #070602;
`;

const Info = styled.p`
  font-size: 12px;
  line-height: 20px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  color: #656565;
`;
const MaxButton = styled.span`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 12px;
  color: #0d6efd;
  &:hover,
  &:focus {
    color: #0a58ca;
  }
`;
const DonInputWrapper = styled.div`
  border: 1px solid #3e3e3e;
  position: relative;
  margin-bottom: 40px;
`;
const DonInputLabel = styled.label`
  position: absolute;
  top: 0;
  background-color: #fff;
  padding-left: 5px;
  padding-right: 5px;
  left: 0;
  transform: translate(15px, -60%);
  font-size: 12px;
  color: #c6c6c6;
  margin-bottom: 0%;
`;
const DonHTMLInput = styled.input`
  text-align: right;
  font-size: 15px;
  border: none;
  width: 100%;
  height: 100%;
  padding: 14px 1rem;
  &:focus {
    outline: none;
  }
`;

const DonInput = ({
  label,
  placeholder,
  value,
  max,
  showMaxButton,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  max?: string;
  showMaxButton?: boolean;
  onChange: (e: string) => void;
}) => {
  return (
    <DonInputWrapper>
      <DonInputLabel>{label}</DonInputLabel>
      <DonHTMLInput
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {max && (
        <MaxButton className="link-primary" onClick={() => onChange(max)}>
          Max
        </MaxButton>
      )}
    </DonInputWrapper>
  );
};



const ApyForm = styled.div`
  margin-top: 4rem;
`;

export const AcceleratedAPYModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [availableDon, setAvailableDon] = useState("");
  const [donAmount, setDonAmount] = useState("");
  const { stakedDon,  stake, getTierInfo, coolOffDuration } = useStakingContract();
  const [predictedApy, setPredictedApy] = useState("");
  const web3 = useWeb3();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const fetchAvailableDon = async () => {
    const accounts = await web3.eth.getAccounts();
    const donContract = await getBSCDon(web3);

    const userBalance = await donContract.methods.balanceOf(accounts[0]).call();
    setAvailableDon(toEther(userBalance));
  };

  useEffect(() => {
    fetchAvailableDon();
  }, []);

  const updatePredictedApy = async () => {
    setLoading(true);
    try {
      const apyObj = await getTierInfo(
        new BigNumber(donAmount).plus(stakedDon).toFixed(2)
      );
      if (apyObj) {
        setPredictedApy(apyObj.apy.toFixed());
      }
    } finally {
      setLoading(false);
    }
  };

  const stakeDon = async () => {
    setBtnLoading(true);
    try {
      await stake(toWei(donAmount));
    } finally {
      setBtnLoading(false);
      onClose()
    }
  }
  
  useEffect(() => {
    updatePredictedApy();
  }, [donAmount]);

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
        <ApyForm>
          <DonInput
            label="Available DON"
            value={new BigNumber(availableDon).toFixed(2)}
            placeholder="Amount"
            onChange={() => {}}
          />
          <DonInput
            label="Locked DON"
            value={stakedDon}
            placeholder="Amount"
            onChange={() => {}}
          />
          <DonInput
            label="Amount Of DON To Lock"
            max={availableDon}
            value={donAmount}
            placeholder="Amount"
            onChange={setDonAmount}
          />

          <p className="text-center font-weight-bold px-5">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : predictedApy !== "0" && predictedApy !== "" ? (
              <>Extra APY Will Be: {predictedApy}%</>
            ) : (
              <>Minimum 1000 DON's Required To Get Extra APY</>
            )}
          </p>

          <Info>The DON tokens will be locked for {coolOffDuration} after unstaking</Info>
          <div className="d-flex align-items-center">
            <ButtonWidget
              varaint="contained"
              onClick={stakeDon}
              className="py-2 rounded-0 font-weight-bold"
              containedVariantColor="lightYellow"
            >
              {btnLoading ? <Spinner animation="border" size="sm" /> : "Lock DON"}
            </ButtonWidget>
          </div>
        </ApyForm>
      </div>
    </DonCommonmodal>
  );
};
