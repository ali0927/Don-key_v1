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
import {
  captureException,
  getAmount,
  getPoolContract,
  getPoolToken,
  getTokenPrice,
  getTokenSymbol,
  toEther,
} from "helpers";
import BigNumber from "bignumber.js";
import { useWeb3Context } from "don-components";

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

const SelectableWithdrawComponent = ({title, available, currency, price, value, onChange}: {
  title: string;
  available: string;
  currency: string;
  price: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  return <div>
    <div >
      <span>{title}</span>
      <span>Available: {available} {price}</span>
    </div>
  </div>;
};

export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
  const { open, poolAddress, poolVersion } = props;

  const [loading, setLoading] = React.useState(false);
  const { holdingDons, refetch } = useStakingContract();
  const { doWithdraw, doPartialWithdraw } = useWithdraw();
  const [hasCheckedDons, setHasChecked] = React.useState(false);

  const { getConnectedWeb3 } = useWeb3Context();

  const [greyAmount, setGreyAmount] = React.useState("0");
  const [investedAmount, setInvestedAmount] = React.useState("0");
  const [selectedgreyShare, setGreyShare] = React.useState("0");
  const [currency, setCurrency] = React.useState("-");
  const [tokenPrice, setTokenPrice] = React.useState("-");
  const [selectedinvestedShare, setInvestedShare] = React.useState("0");
  const [isReady, setIsReady] = React.useState(false);
  const fetchAllInfo = async () => {
    const web3 = getConnectedWeb3();
    if (poolVersion === 4) {
      try {
        const tokenPrice = await getTokenPrice(web3, poolAddress);
        const pool = await getPoolContract(web3, poolAddress, poolVersion);
        const accounts = await web3.eth.getAccounts();
        const result = await pool.methods
          .getUserGreyInvestedAmount(accounts[0])
          .call();
        const token = await getPoolToken(web3, poolAddress);
        const currency = await getTokenSymbol(web3, poolAddress);
        const decimals = token.methods.decimals().call();
        const greyAmount = toEther(result.amountInToken, decimals);

        const finalAmount = await getAmount(
          web3,
          poolAddress,
          accounts[0],
          poolVersion
        );

        const investedAmount = new BigNumber(finalAmount)
          .minus(greyAmount)
          .toFixed(8);

        setGreyAmount(greyAmount);
        setInvestedAmount(investedAmount);
        setTokenPrice(tokenPrice);
        setCurrency(currency);
        setIsReady(true);
      } catch (e) {}
    }
  };

  React.useEffect(() => {
    fetchAllInfo();
  }, [])

  useEffectOnTabFocus(() => {
    if (poolVersion > 2) {
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

  const hasGreyAmount = new BigNumber(greyAmount).gt(0);
  const hasInvestedAmount = new BigNumber(investedAmount).gt(0);

  const handleWithDraw = async () => {
    if (poolVersion === 4) {
      if (new BigNumber(selectedgreyShare).gt(0)) {
        doPartialWithdraw(
          poolAddress,
          selectedgreyShare,
          true,
          () => {
            setLoading(true);
            setTimeout(() => props.onClose(), 1000);
          },
          props.onSuccess,
          props.onError
        );
      }
      if (new BigNumber(selectedinvestedShare).gt(0)) {
        doPartialWithdraw(
          poolAddress,
          selectedinvestedShare,
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
    if (hasGreyAmount && !hasInvestedAmount) {
      return (
        <div>
          <SelectableWithdrawComponent
            available={greyAmount}
            price={tokenPrice}
            currency={currency}
            title="Choose withdraw percent"
            value={selectedgreyShare}
            onChange={setGreyShare}
          />
        </div>
      );
    }
  };

  const renderContent = () => {
    return renderPopupContent();
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
        // return renderPopupContent();
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
