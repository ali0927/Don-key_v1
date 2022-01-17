import BigNumber from "bignumber.js";
import { DonCommonmodal } from "components/DonModal";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { CancelButton, WithdrawButton } from "components/WithDrawPopup";
import { SelectableWithdrawComponent } from "components/WithDrawPopup/SelectableWithdrawComponent";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import {
  getDonPriceWeb3,
  getStakedAmount,
  toEther,
  toWei,
  withdrawDon,
} from "helpers";
import { useEffectOnTabFocus } from "hooks";
import { useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";

export const UnStakeDonNew = ({
  open,
  onClose,
  poolAddress,
  onDone
}: {
  open: boolean;
  onClose: () => void;
  poolAddress: string;
  onDone: () => void;
}) => {
  const [balance, setDonBalance] = useState("0");
  const [donPrice, setDonPrice] = useState("0");
  const [loading, setLoading] = useState(false);
  const [selectedPercent, setSelectedPercent] = useState("0");
  const { getConnectedWeb3, address } = useWeb3Context();
  const { showProgress, showFailure, showSuccess } =
    useTransactionNotification();
  const isDisabled = useMemo(() => {
    const bnNumbe = new BigNumber(selectedPercent);
    if (bnNumbe.isEqualTo(0)) {
      return true;
    }
    // if(bnNumbe.multipliedBy(availableLp));
  }, [selectedPercent]);

  const fetchDonBalance = async () => {
    const bscDon = await getStakedAmount(getWeb3(BINANCE_CHAIN_ID), poolAddress, address)
    const donPrice = await getDonPriceWeb3(getWeb3(BINANCE_CHAIN_ID));

    setDonBalance(toEther(bscDon));
    setDonPrice(donPrice);
  };

  useEffectOnTabFocus(() => {
    fetchDonBalance();
  }, []);

  const handleUnStake = async () => {
    setLoading(true);
    try {
      showProgress("UnStaking Don");
      const web3 = getConnectedWeb3();
      const stakingAmount = toWei(
        new BigNumber(balance)
          .multipliedBy(selectedPercent)
          .dividedBy(100)
          .toString()
      );
      
      await withdrawDon(web3, poolAddress, stakingAmount, address);
      showSuccess("UnStaked Don");
      onDone();
    
    } catch (e) {
      showFailure("Failed to Stake Don");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DonCommonmodal
      isOpen={open}
      title={"UnStake Don"}
      variant="common"
      size="xs"
      onClose={onClose}
    >
      <SelectableWithdrawComponent
        available={balance}
        price={donPrice}
        currency={"DON"}
        title={"Select Don Tokens"}
        percent={selectedPercent}
        setPercent={setSelectedPercent}
      />

      <div className="d-flex align-items-center">
        <WithdrawButton
          varaint="contained"
          containedVariantColor="lightYellow"
          disabled={isDisabled}
          onClick={handleUnStake}
          className="mr-3"
        >
          {" "}
          {loading && <Spinner animation={"border"} size="sm" />}
          {!loading && <>Unstake</>}
        </WithdrawButton>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </div>
    </DonCommonmodal>
  );
};
