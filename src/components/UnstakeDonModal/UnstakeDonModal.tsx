import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { InvestmentInput } from "components/InvestmentInput";
import { getBSCDon, getERCContract, toEther, toWei } from "helpers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { useStakingContract } from "hooks";
import { Spinner } from "react-bootstrap";

const StyledH2 = styled.h2`
  font-family: Roboto;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #070602;
`;

const Info = styled.p`
  color: #222222;
  margin-bottom: 0;
`;

export const UnstakeDonModal = ({
  open,
  onClose,
  leave,
}: {
  open: boolean;
  leave?: boolean;
  onClose: () => void;
}) => {
  const { unstake, stakedDon, refetch } = useStakingContract();

  const web3 = useWeb3();

  const [btnLoading, setBtnLoading] = useState(false);

  const unstakeDon = async () => {
    setBtnLoading(true);
    try {
      await refetch();
      await unstake(leave || false);
    } finally {
      setBtnLoading(false);
      onClose();
    }
  };

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

        <p className="font-weight-bold mt-4">Notification</p>
        <Info> The DON tokens will be locked for 2 weeks after unstaking.</Info>
        <Info className="mb-5">
          Are you sure uou want to unstake your DON{" "}
          {leave && "and leave the platform"}?
        </Info>

        <div className="d-flex align-items-center">
          <ButtonWidget
            varaint="contained"
            onClick={unstakeDon}
            className="py-2 rounded-0 font-weight-bold"
            containedVariantColor="lightYellow"
          >
            {btnLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Unstake DON " + (leave ? "and Leave": "")
            )}
          </ButtonWidget>
        </div>
      </div>
    </DonCommonmodal>
  );
};
