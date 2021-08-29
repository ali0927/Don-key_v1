import { ButtonWidget } from "components/Button";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";



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
      <BuyDonContent />
    </DonCommonmodal>
  );
};
