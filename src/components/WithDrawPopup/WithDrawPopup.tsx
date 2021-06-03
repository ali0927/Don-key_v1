/**eslint-disable no-empty-pattern */
import { ContainedButton, OutlinedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { useWithdraw } from "hooks/useWithdraw";
import * as React from "react";
import { IWithDrawPopupProps } from "./interfaces";



export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
  const { open, poolAddress, onClose, poolVersion } = props;

  const [loading, setLoading] = React.useState(false);

  const { doWithdraw } = useWithdraw();

  const handleWithDraw = async () => {
    doWithdraw(
      poolAddress,
      poolVersion,
      () => setLoading(true),
      props.onSuccess,
      props.onError
    );
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Withdraw"
        variant="common"
        size="xs"
        onClose={props.onClose}
      >
        <div className="mt-3">
          Are you sure you want to withdraw all your holdings ?
        </div>
        <div className="d-flex mt-5">
          <ContainedButton
            className="mr-3"
            disabled={loading}
            onClick={handleWithDraw}
          >
            {loading && <DonKeySpinner />}
            {!loading && <>Withdraw</>}
          </ContainedButton>
          <OutlinedButton onClick={() => props.onClose()}>
            Cancel
          </OutlinedButton>
        </div>
      </DonCommonmodal>
    </>
  );
};
