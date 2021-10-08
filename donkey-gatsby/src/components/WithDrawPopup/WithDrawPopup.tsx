/**eslint-disable no-empty-pattern */
import { CircularProgress } from "@material-ui/core";
import { ButtonWidget } from "components/Button";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { useWithdraw } from "hooks/useWithdraw";
import * as React from "react";
import { IWithDrawPopupProps } from "./interfaces";
import { captureException } from "helpers";
import BigNumber from "bignumber.js";

const OldWithdrawPopup = ({
  onWithdraw,
  onClose,
  loading,
}: {
  loading?: boolean;
  onWithdraw: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <div className="mt-3">
        Are you sure you want to withdraw all your holdings ?
      </div>
      <div className="d-flex mt-5">
        <ButtonWidget
          varaint="contained"
          containedVariantColor="lightYellow"
          className="mr-3"
          height="40px"
          disabled={loading}
          onClick={onWithdraw}
        >
          {loading && <DonKeySpinner />}
          {!loading && <>Withdraw</>}
        </ButtonWidget>
        <ButtonWidget varaint="outlined" height="40px" onClick={onClose}>
          Cancel
        </ButtonWidget>
      </div>
    </>
  );
};

const ImmediateWithdraw = ({
  loading,
  onWithdraw,
  onClose,
}: {
  loading?: boolean;
  onWithdraw: () => void;
  onClose: () => void;
}) => {
  return;
};

export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
  const { open, poolAddress, poolVersion } = props;

  const [loading, setLoading] = React.useState(false);
  const { holdingDons, refetch } = useStakingContract();
  const { doWithdraw, doPartialWithdraw } = useWithdraw();
  const [hasCheckedDons, setHasChecked] = React.useState(false);

  useEffectOnTabFocus(() => {
    if (poolVersion === 3) {
      (async () => {
        setHasChecked(false);
        try {
          await refetch();
        } catch (e) {
          captureException(e, "WithdrawPopup:useEffectOnTabFocus ");
        } finally {
          setHasChecked(true);
        }
      })();
    }
  }, []);
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);

  const [greyShare, setGreyShare] = React.useState("0");
  const [investedShare, setInvestedShare] = React.useState("0");
  const [hasGreyAmount, setHasGreyAmount] = React.useState(false);
  const [hasInvestedAmount, setHasInvestedAmount] = React.useState(false);

  const handleWithDraw = async () => {
    if (poolVersion === 4) {
      if (new BigNumber(greyShare).gt(0)) {
        doPartialWithdraw(
          poolAddress,
          greyShare,
          true,
          () => {
            setLoading(true);
            setTimeout(() => props.onClose(), 1000);
          },
          props.onSuccess,
          props.onError
        );
      }
      if (new BigNumber(investedShare).gt(0)) {
        doPartialWithdraw(
          poolAddress,
          investedShare,
          false,
          () => {
            setLoading(true);
            setTimeout(() => props.onClose(), 1000);
          },
          props.onSuccess,
          props.onError
        );
      }
    } else {
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
    }
  };

  const renderPopupContent = () => {
    return <ImmediateWithdraw />;
  };

  const renderContent = () => {
    if (poolVersion < 3) {
      return (
        <OldWithdrawPopup
          loading={loading}
          onWithdraw={handleWithDraw}
          onClose={props.onClose}
        />
      );
    }
    if (hasCheckedDons) {
      if (hasDons) {
        return renderPopupContent();
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
