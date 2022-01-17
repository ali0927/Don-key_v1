import BigNumber from "bignumber.js";
import { DonCommonmodal } from "components/DonModal";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { CancelButton, WithdrawButton } from "components/WithDrawPopup";
import { SelectableWithdrawComponent } from "components/WithDrawPopup/SelectableWithdrawComponent";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import { navigate } from "gatsby";
import {
  approveDon,
  checkAllowance,
  getBSCDon,
  getDonPriceWeb3,
  stakeDon,
  toEther,
  toWei,
} from "helpers";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";

export const StakeDonNew = ({
  open,
  onClose,
  poolAddress,
  onDone,
  stakedAmount,
}: {
  open: boolean;
  stakedAmount: string;
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

  const { tier } = useStakingContract();

  const cannotStakeMoreThan500 =
    tier.tier < 3 &&
    new BigNumber(balance)
      .multipliedBy(selectedPercent)
      .dividedBy(100)
      .plus(stakedAmount)
      .gt(500);

  const isDisabled = useMemo(() => {
    const bnNumbe = new BigNumber(selectedPercent);

    if (bnNumbe.isEqualTo(0) || bnNumbe.isNaN()) {
      return true;
    }
    return false;
    // if(bnNumbe.multipliedBy(availableLp));
  }, [selectedPercent, tier]);

  const fetchDonBalance = async () => {
    const bscDon = await getBSCDon(getWeb3(BINANCE_CHAIN_ID));
    const donPrice = await getDonPriceWeb3(getWeb3(BINANCE_CHAIN_ID));
    const balance = await bscDon.methods.balanceOf(address).call();
    setDonBalance(toEther(balance));
    setDonPrice(donPrice);
  };

  useEffectOnTabFocus(() => {
    fetchDonBalance();
  }, []);

  const handleStake = async () => {
    setLoading(true);
    try {
      showProgress("Staking Don");
      const web3 = getConnectedWeb3();
      const stakingAmount = toWei(
        new BigNumber(balance)
          .multipliedBy(selectedPercent)
          .dividedBy(100)
          .toString()
      );
      if (!(await checkAllowance(web3, poolAddress, stakingAmount, address))) {
        await approveDon(web3, poolAddress, stakingAmount, address);
      }
      await stakeDon(web3, poolAddress, stakingAmount, address);
      showSuccess("Don Staked");
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
      title={"Stake Don"}
      variant="common"
      size="xs"
      onClose={onClose}
    >
      <SelectableWithdrawComponent
        available={balance}
        price={donPrice}
        currency={"DON"}
        title={"Select DON Tokens"}
        percent={selectedPercent}
        setPercent={setSelectedPercent}
      />
      {cannotStakeMoreThan500 && (
        <p className="text-danger text-center" style={{ fontSize: 12 }}>
          You need to be at least tier 3 in order to Stake more than 500 DON
        </p>
      )}
      <div className="d-flex align-items-center">
        <WithdrawButton
          varaint="contained"
          containedVariantColor="lightYellow"
          disabled={isDisabled}
          onClick={
            cannotStakeMoreThan500 ? () => navigate("/stake") : handleStake
          }
          className="mr-3"
        >
          {" "}
          {loading && <Spinner animation={"border"} size="sm" />}
          {!loading && <>{cannotStakeMoreThan500 ? "Upgrade Tier" : "Stake"}</>}
        </WithdrawButton>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </div>
    </DonCommonmodal>
  );
};
