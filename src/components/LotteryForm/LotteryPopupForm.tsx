import { ContainedButton } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { useWeb3 } from "don-components";
import { AddIcon, BEP20, EmailIcon, ERCIcon } from "icons";
import { useState } from "react";
import { Label, InputSmall, Input, Caption } from "./LotteryForm";
import {
  getLPTokenContract,
  getStakingContract,
  StakingEthAddress,
} from "helpers";
import { Form, InputGroup, Col, Spinner } from "react-bootstrap";
import { useRefresh } from "./useRefresh";
import { api } from "don-utils";
import { useNotification } from "components/Notification";
import { useTransactionNotification } from "./useTransactionNotification";
export interface ILotteryParticipate {
  amount: string;
  email: string;
}

export const LotteryPopupForm = ({
  isRegistered,
  isOpen,
  availableAmount,
  onClose,
  onSuccess,
}: {
  isRegistered: boolean;
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

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const { refresh } = useRefresh();
  const web3 = useWeb3();
  const { isBSC, isEthereum } = useNetwork();
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
    const accounts = await web3.eth.getAccounts();
    setLoading(true);
    try {
      const stakingContract = await getStakingContract(web3, isBSC);
      const lpTokenContract = await getLPTokenContract(web3, isBSC);
      showProgress("Approve LP Token for Spend");
      if (!isRegistered) {
        await api.post(`/api/v2/lottery`, {
          wallet_address: accounts[0],
          email: state.email,
        });
      }
      await lpTokenContract.methods
        .approve(
          stakingContract.options.address,
          web3.utils.toWei(state.amount)
        )
        .send({ from: accounts[0] });
      showProgress("Stake LP Token on Don-key");
      await stakingContract.methods
        .stake(web3.utils.toWei(state.amount))
        .send({ from: accounts[0] });
      showSuccess("LP Tokens Staked");
      refresh();
      onSuccess();
    } catch (e) {
      showFailure("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const condition = isRegistered ? isRegistered : state.email.length > 0;
    if (state.amount.length > 0 && condition) {
      await handleStake();
    } else {
      if (state.email.length === 0) {
        setInvalidEmail(true);
      }
      if (parseFloat(state.amount) <= 0 || state.amount.length === 0) {
        setInvalidAmount(true);
      }
    }
  };

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const handleEmailChange = (e: any) => {
    let email = e.target.value;
    if (email.length === 0) {
      setState({ ...state, email: "" });
    }
    setInvalidEmail(false);
    if (emailRegex.test(email)) {
      setState({ ...state, email: email });
      setInvalidEmail(false);
    }
  };

  return (
    <>
      <DonCommonmodal
        variant="v1"
        size="xs"
        isOpen={isOpen}
        title={isRegistered ? "Stake money" : "Register to win Lottery"}
        icon={<AddIcon />}
        onClose={onClose}
      >
        <div className="row mt-5 mb-4">
          {isEthereum && (
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
                onChange={handleChange("amount")}
                placeholder="USDT/DON LP Tokens"
              />
              {invalidAmount && (
                <p style={{ color: "red" }}>Please input a valid amount</p>
              )}
            </div>
          )}

          {isBSC && (
            <div className="col-md-12">
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
                onChange={handleChange("amount")}
                placeholder="WBNB/DON Lp Tokens"
              />
              {invalidAmount && (
                <p style={{ color: "red" }}>Please input a valid amount</p>
              )}
            </div>
          )}
        </div>
        {!isRegistered && (
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex">
                <EmailIcon />
                <div>
                  <Label className="ml-2">Email address</Label>
                </div>
              </div>
              <Input
                type="email"
                required
                disabled={loading}
                placeholder="donboss@gmail.com"
                onChange={(e) => handleEmailChange(e)}
              />
              {invalidEmail && (
                <p style={{ color: "red" }}>Please input a valid email</p>
              )}
              <Caption className="mt-2">
                Enter your mail to get the lottery result Don-key
              </Caption>
            </div>
          </div>
        )}
        <ContainedButton disabled={loading} onClick={handleSubmit}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : isRegistered ? (
            "Stake"
          ) : (
            "Participate"
          )}
        </ContainedButton>
      </DonCommonmodal>
    </>
  );
};
