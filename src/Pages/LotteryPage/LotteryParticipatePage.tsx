import React from "react";
import { Footer } from "components/Footer";
import { RootHeader } from "./components/RootHeader/RootHeader";
import styled from "styled-components";
import { DonkeyLeftPanel } from "./components/DonkeyLeftPanel/DonkeyLeftPanel";
import { Container } from "react-bootstrap";
import { BEP20, EmailIcon, ERCIcon } from "icons";
import { ContainedButton } from "components/Button";
import { useHistory } from "react-router";
import { Column } from "./components/Column/Column";
import { BlackBoxCard } from "./components/BlackBoxCard/BlackBoxCard";
interface ILotteryParticipate {
  erc: string;
  bep: string;
  email: string;
}

const Header = styled.div`
  width: 100%;
  min-height: 605px;
  background: #f4e41c;
  padding-top: 7%;
`;

const Heading = styled.p`
  font-family: Roboto;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 52px;
  letter-spacing: 0em;
  text-align: left;
`;

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


export const LotteryParticipatePage: React.FC = () => {
  const history = useHistory();

  const [state, setState] = React.useState<ILotteryParticipate>({
    erc: "",
    bep: "",
    email: "",
  });

  const handleBack = () => {
    history.push("/lottery");
  };

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
      <RootHeader onBack={handleBack} />
      <Header>
        <Container>
          <div className="row">
            <div className="col-md-6">
              <DonkeyLeftPanel />
            </div>
            <div className="col-md-6">
              <Heading>Deposit funds to participate in the lottery</Heading>

           


              <form onSubmit={handleStack}>
                <div className="row mt-5 mb-4">
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
                  <div className="col-md-2" />

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
                </div>

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
                    />
                    <Caption className="mt-2">
                      Enter your mail to get the lottery result Don-key
                    </Caption>
                  </div>
                </div>

                <BlackBoxCard/>
                <StackeButton type="submit" className="mt-5 mb-3">
                  Stake
                </StackeButton>
              </form>

            
            </div>
          </div>
        </Container>
      </Header>
      <Footer />
    </>
  );
};
