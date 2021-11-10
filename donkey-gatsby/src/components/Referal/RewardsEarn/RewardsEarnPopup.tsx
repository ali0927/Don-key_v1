import React from "react";
import { DonCommonmodal } from "components/DonModal";
import { IRewardsEarnPopupProps } from "./interfaces";
import { Rewards } from "./Rewards";

export const RewardsEarnMobilePopup: React.FC<IRewardsEarnPopupProps> = (
  props
) => {
  const { open } = props;

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Comission info"
        onClose={props.onClose}
        variant="common"
        size="sm"
      >
        <Rewards
          openPopup={() => {
            props.onClose();
            props.openApyPopup();
          }}
        />
      </DonCommonmodal>
    </>
  );
};
