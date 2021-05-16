import { ContainedButton } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { useNetwork } from "components/NetworkProvider/NetworkProvider";
import { useWeb3 } from "don-components";
import { AddIcon, BEP20, EmailIcon, ERCIcon } from "icons";
import { useState } from "react";
import { Label, InputSmall, Input, Caption } from "./LotteryForm";
import StakingJSON from "JsonData/Staking.json";
import { getLPTokenContract, getStakingContract } from "helpers";
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

  const web3 = useWeb3();
  const { isBSC, isEthereum } = useNetwork();
  const handleChange =
    (name: keyof ILotteryParticipate) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [name]: e.target.value,
      });
    };
  
  const handleStake = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const accounts=  await web3.eth.getAccounts();
    const stakingContract = await getStakingContract(web3,isBSC);
    const lpTokenContract = await getLPTokenContract(web3,isBSC);
    await lpTokenContract.methods.approve(state.amount).send({from: accounts[0]});
    await stakingContract.methods.stake(state.amount).send({from: accounts[0]});

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
            <div className="col-md-3">
              <div className="d-flex">
                <ERCIcon />
                <Label className="ml-2">ERC20</Label>
              </div>
              <InputSmall
                type="number"
                value={state.amount}
                required
                onChange={handleChange("amount")}
                placeholder="$ DON 1500"
              />
            </div>
          )}

          {isBSC && (
            <div className="col-md-3">
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
                placeholder="$ DON 1500"
              />
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

              <Input type="email" required placeholder="donboss@gmail.com" />
              <Caption className="mt-2">
                Enter your mail to get the lottery result Don-key
              </Caption>
            </div>
          </div>
        )}
        <ContainedButton onClick={onSuccess}>
          {isRegistered ? "Stake" : "Participate"}
        </ContainedButton>
      </DonCommonmodal>
    </>
  );
};
