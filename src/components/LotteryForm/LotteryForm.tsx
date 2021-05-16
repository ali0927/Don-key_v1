import { ContainedButton } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { useWeb3 } from "don-components";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { AddIcon, BEP20, EmailIcon, ERCIcon } from "icons";
import { BlackBoxCard } from "Pages/LotteryPage/components/BlackBoxCard/BlackBoxCard";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsQuestion, BsQuestionCircle } from "react-icons/bs";
import { useHistory } from "react-router";
import styled from "styled-components";
const Label = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-align: left;
  margin-top: 5px;
`;

const Input = styled.input`
  height: 38px;
  width: 80%;
  border-radius: 5px;
  background: #ffffff;
  border-radius: 5px;
  border: 0px !important;
  padding: 5px;
  padding-left: 15px;

  &:focus {
    border: 0;
  }
`;

const InputSmall = styled.input`
  height: 38px;
  border: 0px !important;
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
`;

const StackeButton = styled(ContainedButton)`
  height: 45px;
  width: 160px;
  border-radius: 5px;
  background: #070602;
  color: #fff;
  &:hover {
    background: #070602;
  }
`;

const Caption = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #a69a03;
`;

interface ILotteryParticipate {
  erc: string;
  bep: string;
  email: string;
}

const useNetwork = () => {
  const [network, setNetwork] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const web3 = useWeb3();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      web3.eth.getChainId().then((id) => {
        if (id === 1) {
          setNetwork("Ethereum Mainnet");
        } else if (id === 56) {
          setNetwork("BSC Mainnet");
        } else {
          setNetwork("Unsupported Network");
        }
        setId(id);
        setIsReady(true);
      });
    }
  }, []);
  return {
    network,
    id,
    isReady,
  };
};

const WhiteCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const RewardsAmount = styled.div`
  font-size: 4rem;
  font-weight: 800;
  font-family: Roboto;
  ${(props: { disabled: boolean }) =>
    props.disabled && `color: #d9d9d9;`}
`;

const LotterPopupForm = ({
  id,
  isRegistered,
  isOpen,
  onClose,
  onSuccess,
}: {
  id: number | null;
  isRegistered: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [state, setState] = useState<ILotteryParticipate>({
    erc: "",
    bep: "",
    email: "",
  });
  const history = useHistory();

  const handleChange =
    (name: keyof ILotteryParticipate) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [name]: e.target.value,
      });
    };

  const handleStack = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    history.push("/lottery/participate/congratulations");
  };

  const isAmountInputsRequired = state.bep === "" && state.erc === "";

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
          {id === 1 && (
            <div className="col-md-3">
              <div className="d-flex">
                <ERCIcon />
                <Label className="ml-2">ERC20</Label>
              </div>
              <InputSmall
                type="number"
                value={state.erc}
                required={isAmountInputsRequired}
                onChange={handleChange("erc")}
                placeholder="$ DON 1500"
              />
            </div>
          )}

          {id === 56 && (
            <div className="col-md-3">
              <div className="d-flex">
                <BEP20 />
                <div>
                  <Label className="ml-2">BEP20</Label>
                </div>
              </div>
              <InputSmall
                type="number"
                value={state.bep}
                required={isAmountInputsRequired}
                onChange={handleChange("bep")}
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

export const LotteryForm = () => {
  const [isUserInLottery, setIsUserInLottery] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { id, isReady, network } = useNetwork();
  const [] = useState();
  const web3 = useWeb3();

  return (
    <>
      <div className="row py-5">
        <div className="col-md-6">
          <WhiteCard className="h-100 d-flex flex-column justify-content-between">
            <div>
              <h3>User </h3>
              <div className="mb-2">
                - <span className="font-weight-bold">Network</span> :{" "}
                {isReady ? network : "-"} <BsQuestionCircle />
              </div>
              <div className="mb-2">
                - <span className="font-weight-bold">Available LP Tokens</span>{" "}
                : 1.0000 DON <a href="#"> Get More</a>
              </div>
              <div className="mb-2">
                - <span className="font-weight-bold">Staked LP Tokens</span> :
                10.0000 DON
              </div>
              <div className="mb-2">
                -{" "}
                <span className="font-weight-bold">Total Staked LP Tokens</span>{" "}
                : 1000.0000 DON
              </div>
              <div className="mb-2">
                - <span className="font-weight-bold">APY</span> : 112%
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              {!isUserInLottery ? (
                <StackeButton
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Participate
                </StackeButton>
              ) : (
                <StackeButton
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Stake
                </StackeButton>
              )}
              {isUserInLottery && (
                <StackeButton
                  onClick={() => setIsPopupOpen(true)}
                  type="submit"
                >
                  Unstake
                </StackeButton>
              )}
            </div>
          </WhiteCard>
        </div>
        <div className="col-md-6">
          <WhiteCard className="h-100 d-flex flex-column justify-content-between">
            <h3 className="text-center">Rewards</h3>
            <div className="mb-2 d-flex flex-column align-items-center ">
              <RewardsAmount disabled={!isUserInLottery}>
                0.00000 DON
              </RewardsAmount>
            </div>
            <div className="mb-2 d-flex flex-column align-items-center ">
              <ContainedButton
                disabled={!isUserInLottery}
                style={{ maxWidth: 200 }}
              >
                Harvest
              </ContainedButton>
            </div>
          </WhiteCard>
        </div>
        {isPopupOpen && (
          <LotterPopupForm
            id={id}
            isOpen={isPopupOpen}
            isRegistered={isUserInLottery}
            onClose={() => setIsPopupOpen(false)}
            onSuccess={() => {
              setIsUserInLottery(true);
              setIsPopupOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};
