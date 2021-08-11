import BigNumber from "bignumber.js";
import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { getBSCDon } from "helpers";
import { useStakingContract } from "hooks";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import { useWeb3 } from "don-components";

const StyledP = styled.p`
  font-family: Roboto;
  font-weight: bold;
  font-size: 24px;
  /* or 146% */

  text-align: center;

  /* Headlines */

  color: #070602;
`;

export const DonStakingModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { stakingContract, stakingAddress, stake } = useStakingContract();

  const [loading, setLoading] = useState(false);

  const web3 = useWeb3();

  const stakeDon = async () => {
    const amount = web3.utils.toWei("100");
    setLoading(true);
    try {
      await stake(amount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DonCommonmodal
      isOpen={open}
      title=""
      PaperProps={{ style: { backgroundColor: "#F5F5F5", borderRadius: 1 } }}
      variant="common"
      onClose={onClose}
      size="xs"
    >
      <div style={{ marginTop: -30 }}>
        <div className="d-flex justify-content-center">
          <div style={{ width: 100 }}>
            <img
              src="/assets/images/token.png"
              className="d-inline-block"
              alt="Don Token Logo"
            />
          </div>
        </div>
        <StyledP>In order to acess Dapp you have to stake 100 DON</StyledP>
        <div className="d-flex align-items-center">
          <ButtonWidget
            onClick={stakeDon}
            varaint="contained"
            className="py-2 mr-3"
            containedVariantColor="lightYellow"
          >
           {loading ? <Spinner animation="border" />: "Stake 100 DON"}
          </ButtonWidget>
          <ButtonWidget
            onClick={onClose}
            varaint="outlined"
            className="py-2 ml-3 rounded"
          >
            Cancel
          </ButtonWidget>
        </div>
      </div>
    </DonCommonmodal>
  );
};
