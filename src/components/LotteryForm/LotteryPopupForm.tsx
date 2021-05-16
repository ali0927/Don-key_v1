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
import { Form, InputGroup, Col } from "react-bootstrap";
export interface ILotteryParticipate {
  amount: string;
  email: string;
}

export const LotteryPopupForm = ({
  isRegistered,
  isOpen,
  onClose,
  onSuccess,
}: {
  isRegistered: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [state, setState] = useState<ILotteryParticipate>({
    amount: "",
    email: "",
  });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);

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

  const handleStake = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const stakingContract = await getStakingContract(web3, isBSC);
    const lpTokenContract = await getLPTokenContract(web3, isBSC);
    await lpTokenContract.methods
      .approve(web3.utils.toWei(state.amount))
      .send({ from: accounts[0] });
    await stakingContract.methods
      .stake(web3.utils.toWei(state.amount))
      .send({ from: accounts[0] });
    onSuccess();
  };

  const handleSubmit = () => {
    if (state.amount.length > 0 && state.email.length > 0) {
      onSuccess();
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
        <ContainedButton onClick={() => handleSubmit()}>
          {isRegistered ? "Stake" : "Participate"}
        </ContainedButton>
      </DonCommonmodal>
    </>
  );
};
