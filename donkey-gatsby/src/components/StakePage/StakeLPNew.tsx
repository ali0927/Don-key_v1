import BigNumber from "bignumber.js";
import { DonCommonmodal } from "components/DonModal";
import { useRefresh } from "components/LotteryForm";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { ITier } from "components/StakingContractProvider";
import { CancelButton, WithdrawButton } from "components/WithDrawPopup";
import { SelectableWithdrawComponent } from "components/WithDrawPopup/SelectableWithdrawComponent";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import {
  captureException,
  DONTokenAddressBSC,
  getERCContract,
  getLPTokenContract,
  getStakeContract,
  toWei,
} from "helpers";
import { useStakingContract } from "hooks";
import { StakeType } from "interfaces";
import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import Web3 from "web3";
import { tierImages } from "./tierImages";

const calcDonEquivalent = async (web3: Web3, lpAmount: string) => {
  const lptoken = await getLPTokenContract(web3, true);
  const donContract = await getERCContract(web3, DONTokenAddressBSC);
  const dons = await donContract.methods
    .balanceOf(lptoken.options.address)
    .call();

  const totalSupply = await lptoken.methods.totalSupply().call();
  const oneLp = new BigNumber(dons).dividedBy(totalSupply);
  // console.log((oneLp.toFixed()));
  return oneLp.multipliedBy(lpAmount);
};

const Text = styled.span`
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 500;
`;

const Text2 = styled.span`
  color: #333;
  font-weight: 500;
  font-size: 18px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
`;

export const StakeLpNewPopup = ({
  availableLp,
  open,
  onClose,
  type,
}: {
  availableLp: string;
  open: boolean;
  onClose: () => void;
  type: StakeType;
}) => {
  const [selectedPercent, setSelectedPresent] = useState<string>("0");
  const [donEquivalent, setDonEquivalent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getConnectedWeb3 } = useWeb3Context();
  const { stakedDon, getTierInfo, refetch } = useStakingContract();
  const [newTier, setNewTier] = useState<ITier | null>(null);
  const updateDonEquivalent = async () => {
    setDonEquivalent("Loading");
    const dons = await calcDonEquivalent(
      getWeb3(BINANCE_CHAIN_ID),
      new BigNumber(availableLp)
        .multipliedBy(selectedPercent)
        .dividedBy(100)
        .toFixed()
    );
    setNewTier(
      await getTierInfo(new BigNumber(dons).plus(stakedDon).toString())
    );
    setDonEquivalent(`≈ ${dons.toFixed(2)} $DON`);
  };
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();
  const { refresh } = useRefresh();
  const handleStake = async () => {
    const web3 = getConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    setLoading(true);
    try {
      const stakingContract = await getStakeContract(web3, type);
      const lpTokenContract = await getLPTokenContract(web3, true);
      showProgress("Approve LP Token for Spend");
      //   console.log(stakingContract.options.address, accounts[0], lpTokenContract.options.address);
      let allowance = await lpTokenContract.methods
        .allowance(accounts[0], stakingContract.options.address)
        .call();

      const stakeAmount = new BigNumber(availableLp)
        .multipliedBy(selectedPercent)
        .dividedBy(100)
        .toString();

      if (new BigNumber(toWei(stakeAmount)).gt(allowance)) {
        await lpTokenContract.methods
          .approve(stakingContract.options.address, toWei(stakeAmount))
          .send({ from: accounts[0] });
      }
      showProgress("Stake LP Token on Don-key");
      await stakingContract.methods
        .stake(toWei(stakeAmount))
        .send({ from: accounts[0] });
      await refetch();
      showSuccess("LP Tokens Staked");
      refresh();
      onClose();
    } catch (e) {
      captureException(e, "handleStake");
      showFailure("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = useMemo(() => {
    const bnNumbe = new BigNumber(selectedPercent);
    if (bnNumbe.isEqualTo(0)) {
      return true;
    }
    // if(bnNumbe.multipliedBy(availableLp));
  }, [selectedPercent]);

  useEffect(() => {
    if (type === "binancenew") {
      updateDonEquivalent();
    }
  }, [selectedPercent]);

  const renderTier = () => {
    if (type !== "binancenew") {
      return null;
    }
    if (donEquivalent === "Loading") {
      return (
        <div
          style={{ minHeight: 184 }}
          className="d-flex align-items-center justify-content-center"
        >
          <Spinner animation="border" />
        </div>
      );
    }
    if (newTier) {
      return (
        <div className="d-flex mb-4  flex-column align-items-center justify-content-center">
          <div className="d-flex align-items-center ">
            <Text>New Tier will be : </Text>{" "}
            
          </div>
          <ImageWrapper>
          <Text2 className="ml-1">Tier {newTier.tier}</Text2>
            <img
              className="img-fluid"
              src={tierImages.find((_, i) => i === newTier.tier)}
              alt="Upgraded Tier"
            />
          </ImageWrapper>{" "}
        </div>
      );
    }
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title={"Stake LP"}
        variant="common"
        size="xs"
        onClose={onClose}
      >
        <SelectableWithdrawComponent
          available={availableLp}
          price={""}
          currency={"LP"}
          title={"Select LP Tokens"}
          equivalent={donEquivalent}
          percent={selectedPercent}
          setPercent={setSelectedPresent}
        />
        {renderTier()}
        <div className="d-flex align-items-center">
          <WithdrawButton
            varaint="contained"
            containedVariantColor="lightYellow"
            disabled={isDisabled}
            onClick={handleStake}
            className="mr-3"
          >
            {" "}
            {loading && <Spinner animation={"border"} size="sm" />}
            {!loading && <>Stake</>}
          </WithdrawButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </div>
      </DonCommonmodal>
    </>
  );
};
