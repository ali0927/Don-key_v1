import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";

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
        <StyledP>
          In order to access Dapp you need to hold 100 DON in ERC or BEP
        </StyledP>
        <div className="d-flex align-items-center">
          <ButtonWidget
            onClick={() => {
              window.open(
                "https://app.uniswap.org/#/swap?inputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&use=V2",
                "_blank"
              );
            }}
            varaint="contained"
            className="py-2 mr-3"
            containedVariantColor="lightYellow"
          >
            Buy ERC20 Don
          </ButtonWidget>
          <ButtonWidget
          onClick={() => {
            window.open(
              "https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255",
              "_blank"
            );
          }}
            varaint="contained"
            className="py-2 mr-3"
            containedVariantColor="lightYellow"
          >
            Buy BEP 20 Don
          </ButtonWidget>
        </div>
      </div>
    </DonCommonmodal>
  );
};
