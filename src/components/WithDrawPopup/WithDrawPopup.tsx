import { ContainedButton, OutlinedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { InvestmentInput } from "components/InvestmentInput";
import { useAxios } from "hooks/useAxios";
import * as React from "react";
import { IWithDrawPopupProps } from "./interfaces";

export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
  const { open, poolAddress } = props;

  const [ setValue] = React.useState("0");

  const [{ loading }, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );


  const handleWithDraw = async () => {
    try {
      // TODO: need to implement
      // await executeDelete({
      //   data: {
      //     poolAddress: poolAddress,
      //   },
      // });
      props.onSuccess();
    } catch (err) {
      props.onError(err);
    }
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
          Are you sure you want to withdraw all your investment ?
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
