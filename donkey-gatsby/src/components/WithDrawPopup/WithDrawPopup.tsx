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
import styled, { css } from "styled-components";
import { Spinner } from "react-bootstrap";

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

const BoxWrapper = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 12px;
  text-align: right;
  margin-top: 5px;
`;

const BoxInput = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const BoxUsd = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #a3a3a3;
`;

const SelectedPillCss = css`
  box-shadow: 0px 2px 10px rgba(87, 16, 112, 0.08);
  border-radius: 10px;
  background: #fceb74;
  border: 1px solid #fed700;
`;

const Pill = styled.div`
  width: 70px;
  height: 36px;
  border-radius: 10px;
  color: #081e3f;
  display: flex;
  cursor: pointer;
  transition: all 0.3s linear;
  background: #f8f8f8;
  font-size: 12px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  ${(props: { selected?: boolean }) => {
    return props.selected && SelectedPillCss;
  }}
  &:hover {
    ${SelectedPillCss}
  }
`;

const defaultPercents = [10, 20, 30, 50, 100];

const WithdrawButton = styled.button`
  display: block;
  background: linear-gradient(
      94.22deg,
      rgba(255, 255, 255, 0.2) 7.77%,
      rgba(255, 255, 255, 0) 93.41%
    ),
    #fff037;
  border: 1px solid #fbe492;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  &:hover {
    background: #fff037;
  }
`;

const CancelButton = styled.button`
  display: block;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #000000;
  width: 100%;
  transition: all 0.3s linear;
  &:hover {
    color: #fff;
    background: #000;
  }
`;

const SelectableWithdrawComponent = ({
  title,
  available,
  currency,
  price,
  percent,
  setPercent,
}: {
  title: string;
  available: string;
  currency: string;
  price: string;
  percent: string;
  setPercent: (val: string) => void;
}) => {
  const amount = new BigNumber(available).multipliedBy(percent).dividedBy(100);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#A3A3A3" }}>
          Available: {available} {currency}
        </span>
      </div>
      <BoxWrapper>
        <BoxInput>
          {amount.toFixed(4)} {currency}
        </BoxInput>
        <BoxUsd>≈ ${amount.multipliedBy(price).toFixed(2)}</BoxUsd>
      </BoxWrapper>
      <div className="mt-3 mb-4 d-flex align-items-center justify-content-between">
        {defaultPercents.map((num) => {
          return (
            <Pill
              key={num}
              onClick={() => setPercent(num.toFixed())}
              selected={num === parseInt(percent)}
            >
              {num}%
            </Pill>
          );
        })}
      </div>
    </div>
  );
};

const WithdrawFooter = styled.div`
  padding-top: 15px;
  padding-bottom: 25px;
  border-top: 1px solid #ececec;
  text-align: center;
  color: #a3a3a3;
  font-size: 12px;
`;
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
        const decimals = await token.methods.decimals().call();
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
  }, []);

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

  const greyInputMarkup = (
    <SelectableWithdrawComponent
      available={greyAmount}
      price={tokenPrice}
      currency={currency}
      title={
        hasGreyAmount && hasInvestedAmount
          ? "Just invested"
          : "Choose withdraw percent"
      }
      percent={selectedgreyShare}
      setPercent={setGreyShare}
    />
  );
  const investinputMarkup = (
    <SelectableWithdrawComponent
      available={investedAmount}
      price={tokenPrice}
      currency={currency}
      title={
        hasGreyAmount && hasInvestedAmount
          ? "Previously invested"
          : "Choose withdraw percent"
      }
      percent={selectedinvestedShare}
      setPercent={setInvestedShare}
    />
  );
  const renderPopupContent = () => {
    if (hasGreyAmount && hasInvestedAmount) {
      return (
        <>
          {greyInputMarkup}
          {investinputMarkup}
        </>
      );
    }

    if (hasGreyAmount && !hasInvestedAmount) {
      return <>{greyInputMarkup}</>;
    }
    if (hasInvestedAmount && !hasGreyAmount) {
      return <>{investinputMarkup}</>;
    }
    return null;
  };

  const renderFooter = () => {
    if (!hasDons) {
      return null;
    }
    if (hasGreyAmount && !hasInvestedAmount) {
      return (
        <WithdrawFooter>Money hasn’t been invested in protocol!</WithdrawFooter>
      );
    }
    if (!hasGreyAmount && hasInvestedAmount) {
      return (
        <WithdrawFooter>The withdrawal will take up to 24 hrs</WithdrawFooter>
      );
    }
    return null;
  };
  const loader = (
    <div
      style={{ minHeight: 200 }}
      className="d-flex justify-content-center align-items-center"
    >
      <CircularProgress color="inherit" />
    </div>
  );

  const renderContent = () => {
    if (hasCheckedDons) {
      if (hasDons) {
        if (poolVersion < 4) {
          return (
            <OldWithdrawPopup
              loading={loading}
              onWithdraw={handleWithDraw}
              onClose={props.onClose}
            />
          );
        } else {
          if (isReady) {
            return (
              <>
                <div className="mt-4">
                  {renderPopupContent()}
                  <div className="d-flex align-items-center">
                    <WithdrawButton onClick={handleWithDraw} className="mr-3">
                      {" "}
                      {loading && <Spinner animation={"border"} size="sm" />}
                      {!loading && <>Withdraw</>}
                    </WithdrawButton>
                    <CancelButton onClick={props.onClose}>Cancel</CancelButton>
                  </div>
                </div>
              </>
            );
          }
        }
      } else {
        return <BuyDonContent />;
      }
    }

    return loader;
  };
  const title = (
    <div style={{ color: "#070602", marginTop: "15px" }}>Withdrawal</div>
  );

  const renderTitle = () => {
    if (hasCheckedDons && hasDons) {
      if (poolVersion < 4) {
        return title;
      } else {
        if (isReady) {
          return title;
        }
      }
    }
    return "";
  };
  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title={renderTitle()}
        variant="common"
        size="xs"
        onClose={props.onClose}
        contentStyle={poolVersion === 4 ? { padding: "1rem" } : {}}
        footer={renderFooter()}
      >
        {renderContent()}
      </DonCommonmodal>
    </>
  );
};
