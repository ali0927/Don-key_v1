import { ButtonWidget, ContainedButton } from "components/Button";
import { DonCommonmodal } from "components/DonModal";

import { AddIcon, BEP20, EmailIcon, ERCIcon } from "icons";
import { useState } from "react";
import { Label, InputSmall, Caption } from "./LotteryForm";
import { captureException, getLPTokenContract, getStakingContract, toWei } from "helpers";
import { Spinner } from "react-bootstrap";
import { useRefresh } from "./useRefresh";
import { api } from "don-utils";
import { useTransactionNotification } from "./useTransactionNotification";
import BigNumber from "bignumber.js";
import { BINANCE_CHAIN_ID, ETHEREUM_CHAIN_ID, ETHEREUM_RPC, useWeb3Context } from "don-components";
export interface ILotteryParticipate {
  amount: string;
  email: string;
}

export const LotteryPopupForm = ({
  isOpen,
  availableAmount,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  availableAmount: string | null;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [state, setState] = useState<ILotteryParticipate>({
    amount: availableAmount || "",
    email: "",
  });
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();

  const [invalidAmount, setInvalidAmount] = useState(false);
  const { refresh } = useRefresh();
  const { chainId, getConnectedWeb3, connected} = useWeb3Context();
  const handleChange =
    (name: keyof ILotteryParticipate) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let amount = e.target.value;
      if (amount.length === 0) {
        setState({ ...state, amount: "" });
        setInvalidAmount(true);
      }
      setInvalidAmount(false);
      setState({
        ...state,
        [name]: amount,
      });
    };

  const [loading, setLoading] = useState(false);

  const handleStake = async () => {
    const web3 = getConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    setLoading(true);
    try {
      const stakingContract = await getStakingContract(web3, chainId === BINANCE_CHAIN_ID);
      const lpTokenContract = await getLPTokenContract(web3, chainId === BINANCE_CHAIN_ID);
      showProgress("Approve LP Token for Spend");
      let allowance = await lpTokenContract.methods
        .allowance(accounts[0], stakingContract.options.address)
        .call();

      if (new BigNumber(toWei(state.amount)).gt(allowance)) {
        await lpTokenContract.methods
          .approve(stakingContract.options.address, toWei(state.amount))
          .send({ from: accounts[0] });
      }
      showProgress("Stake LP Token on Don-key");
      await stakingContract.methods
        .stake(toWei(state.amount))
        .send({ from: accounts[0] });
      showSuccess("LP Tokens Staked");
      refresh();
      onSuccess();
    } catch (e) {
      captureException(e, "handleStake")
      showFailure("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (state.amount.length > 0) {
      await handleStake();
    } else {
      if (parseFloat(state.amount) <= 0 || state.amount.length === 0) {
        setInvalidAmount(true);
      }
    }
  };

  return (
    <>
      <DonCommonmodal
        variant="v1"
        size="xs"
        isOpen={isOpen}
        title={"Stake LP Tokens" }
        icon={<AddIcon />}
        onClose={onClose}
      >
        <div className="row mt-5 mb-4">
          {chainId === ETHEREUM_CHAIN_ID && (
            <div className="col-md-12">
              <div className="d-flex">
                <ERCIcon />
                <Label className="ml-2">ERC20</Label>
              </div>
              <InputSmall
                type="number"
                disabled={loading}
                value={state.amount}
                required
                style={
                  invalidAmount
                    ? { border: "2px solid red" }
                    : { border: "2px solid gray" }
                }
                onChange={handleChange("amount")}
                placeholder="USDT/DON LP Tokens"
              />
              {invalidAmount && (
                <p style={{ color: "red" }}>Please input a valid amount</p>
              )}
            </div>
          )}

          {chainId === BINANCE_CHAIN_ID && (
            <div className="col-md-12 mb-3">
              <div className="d-flex">
                <BEP20 />
                <div>
                  <Label className="ml-2">BEP20</Label>
                </div>
              </div>
              <InputSmall
                type="number"
                value={state.amount}
                required
                disabled={loading}
                style={
                  invalidAmount
                    ? { border: "2px solid red" }
                    : { border: "2px solid gray" }
                }
                onChange={handleChange("amount")}
                placeholder="WBNB/DON Lp Tokens"
              />
              {invalidAmount && (
                <p style={{ color: "red" }}>Please input a valid amount</p>
              )}
            </div>
          )}
        </div>

        <ButtonWidget
          varaint="contained"
          height="40px"
          containedVariantColor="lightYellow"
          className="mt-2"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Stake"}
        </ButtonWidget>
      </DonCommonmodal>
    </>
  );
};
