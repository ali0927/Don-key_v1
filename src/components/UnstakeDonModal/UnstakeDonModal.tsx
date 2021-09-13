import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { useState } from "react";
import styled from "styled-components";
import { useStakingContract } from "hooks";
import { Spinner } from "react-bootstrap";

const StyledH2 = styled.h2`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #070602;
`;

const Info = styled.p`
  color: #222222;
  margin-bottom: 0;
  font-size: 15px;
  font-family: Poppins;
  font-weight: 400;
`;

export const UnstakeDonModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { unstake, coolOffDuration } = useStakingContract();

  const [btnLoading, setBtnLoading] = useState(false);

  const unstakeDon = async () => {
    setBtnLoading(true);
    try {
      await unstake();
    } finally {
      setBtnLoading(false);
      onClose();
    }
  };

  return (
    <DonCommonmodal
      isOpen={open}
      title=""
      variant="common"
      onClose={onClose}
      size="xs"
    >
      <div style={{ marginTop: -30, marginBottom: -20 }}>
        <div className="d-flex align-items-center justify-content-center">
          {/* <div style={{ width: 100 }}>
            <img
              src="/assets/images/token.png"
              className="d-inline-block img-fluid"
              alt="Don Token Logo"
            />
          </div> */}
          <StyledH2 className="mb-0">Don-key APY program</StyledH2>
        </div>

        <p className="font-weight-bold mt-4">Notification</p>
        <Info> The DON tokens will be locked for {coolOffDuration} after unstaking.</Info>
        <Info className="mb-5">
          Are you sure you want to unstake your DON{" "} ?
        </Info>

        <div className="d-flex align-items-center">
          <ButtonWidget
            varaint="contained"
            height="40px"
            onClick={unstakeDon}
            className="py-2 font-weight-bold"
            containedVariantColor="lightYellow"
          >
            {btnLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Unstake DON "
            )}
          </ButtonWidget>
        </div>
      </div>
    </DonCommonmodal>
  );
};
