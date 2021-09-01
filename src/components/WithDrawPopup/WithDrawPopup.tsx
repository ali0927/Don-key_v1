/**eslint-disable no-empty-pattern */
import { CircularProgress } from "@material-ui/core";
import { ButtonWidget, ContainedButton, OutlinedButton } from "components/Button";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { useWithdraw } from "hooks/useWithdraw";
import * as React from "react";
import { IWithDrawPopupProps } from "./interfaces";
import styled from "styled-components";

const CancelButton = styled(ButtonWidget)`
  :hover {
    background: #fff !important;
  }
`;

export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
  const { open, poolAddress, poolVersion } = props;

  const [loading, setLoading] = React.useState(false);
  const { holdingDons, refetch } = useStakingContract();
  const { doWithdraw } = useWithdraw();
  const [hasCheckedDons, setHasChecked] = React.useState(false);

  useEffectOnTabFocus(() => {
    if(poolVersion === 3) {
      (async () => {
        setHasChecked(false);
        try {
          await refetch();
        } catch (e) {
        } finally {
          setHasChecked(true);
        }
      })();
    }
    
  }, []);
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);
  const handleWithDraw = async () => {
    doWithdraw(
      poolAddress,
      poolVersion,
      () => {
        setLoading(true);
        setTimeout(() => props.onClose(), 1000);
      },
      props.onSuccess,
      props.onError
    );
  };
  const withdrawMarkup = (
    <>
      <div className="mt-3">
        Are you sure you want to withdraw all your holdings ?
      </div>
      <div className="d-flex mt-5">
        <ButtonWidget
          varaint="contained"
          containedVariantColor="lightYellow"
          className="mr-3"
          height="42px"
          disabled={loading}
          onClick={handleWithDraw}
        >
          {loading && <DonKeySpinner />}
          {!loading && <>Withdraw</>}
        </ButtonWidget>
        <CancelButton varaint="outlined" height="42px" onClick={() => props.onClose()}>
          Cancel
        </CancelButton>
      </div>
    </>
  );

  const renderContent = () => {
    if(poolVersion < 3){
      return withdrawMarkup;
    }
    if (hasCheckedDons) {
      if (hasDons) {
        return withdrawMarkup;
      } else {
        return <BuyDonContent />;
      }
    } else {
      return (
        <div
          style={{ minHeight: 200 }}
          className="d-flex justify-content-center align-items-center"
        >
          <CircularProgress color="inherit" />
        </div>
      );
    }
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title={hasDons ? "Withdraw" : ""}
        variant="common"
        size="xs"
        onClose={props.onClose}
      >
        {renderContent()}
      </DonCommonmodal>
    </>
  );
};
