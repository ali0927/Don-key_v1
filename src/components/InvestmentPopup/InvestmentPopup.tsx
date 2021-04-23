import { BiInfoCircle } from "react-icons/bi";
import { FaCross } from "react-icons/fa";
import { Modal, Spinner } from "react-bootstrap";
import React, { useLayoutEffect, useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { withWeb3 } from "hoc";
import { useWeb3 } from "don-components";
import { BigNumber } from "bignumber.js";
import { getBUSDTokenContract } from "helpers";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { ContainedButton, OutlinedButton } from "components/Button";
import { InvestmentInput } from "components/InvestmentInput";

const CaptionContent = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #6c757d !important;
`;

const ButtonWrapper = styled.div({
  marginRight: "10%",
  width: "40%",
});

const MyBalanceInBUSD = ({ onDone }: { onDone?: (val: string) => void }) => {
  const [state, setState] = useState({ balance: "", isReady: false });
  const web3 = useWeb3();

  const fetchBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    //@ts-ignore
    const busdtoken = await getBUSDTokenContract(web3);
    const balance = await busdtoken.methods.balanceOf(accounts[0]).call();
    setState({
      balance: new BigNumber(web3.utils.fromWei(balance, "ether")).toFixed(2),
      isReady: true,
    });
    onDone &&
      onDone(new BigNumber(web3.utils.fromWei(balance, "ether")).toFixed(2));
  };
  useLayoutEffect(() => {
    fetchBalance();
  }, []);

  if (!state.isReady) {
    return <>-</>;
  }
  return <>{state.balance}</>;
};

export const InvestmentPopup = ({
  poolAddress,
  onClose,
  onSuccess,
  onFailure,
}: {
  poolAddress: string;
  onClose: () => void;
  onSuccess?: () => void;
  onFailure?: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable, disable] = useToggle();
  const [balance, setBalance] = useState("0");
  const [{}, executePost] = useAxios(
    { method: "POST", url: "/api/v2/investments" },
    { manual: true }
  );

  const web3 = useWeb3();
  const handleInvest = async () => {
    if (isLoading) {
      return;
    }
    enable();

    const POOLJson = await import("JsonData/Pool.json");
    try {
      const pool = new web3.eth.Contract(POOLJson.abi as any, poolAddress);
      const busdtoken = await getBUSDTokenContract(web3);
      const accounts = await web3.eth.getAccounts();
      let allowance = await busdtoken.methods
        .allowance(accounts[0], poolAddress)
        .call();
      allowance = new BigNumber(web3.utils.fromWei(allowance, "ether"));
      const amount = new BigNumber(value);
      if (amount.gt(allowance)) {
        await busdtoken.methods
          .approve(poolAddress, web3.utils.toWei(amount.toString(), "ether"))
          .send({
            from: accounts[0],
            gas: "1000000",
          });
      }

      await pool.methods
        .depositLiquidity(web3.utils.toWei(value, "ether"))
        .send({
          from: accounts[0],
          gas: "1000000",
        });
      await executePost({ data: { poolAddress } });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      if (onFailure) {
        onFailure();
      }
    } finally {
      disable();
    }
  };

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner />;
    }

    return "Invest";
  };

  return (
    <DonCommonmodal
      title="Invest"
      variant="common"
      isOpen={true}
      size="xs"
      titleRightContent={
        <>Balance: {<MyBalanceInBUSD onDone={setBalance} />} BUSD</>
      }
      onClose={onClose}
    >
      <div>
        <div className="mt-4">
          <InvestmentInput value={value} setValue={setValue} max={balance} />
        </div>
        <div className="d-flex justify-content-between mt-5">
          <ButtonWrapper>
            <ContainedButton disabled={!value} onClick={handleInvest}>
              {renderButtonText()}
            </ContainedButton>
          </ButtonWrapper>

          <ButtonWrapper className="mr-0">
            <OutlinedButton onClick={onClose}>Cancel</OutlinedButton>
          </ButtonWrapper>
        </div>
      </div>
    </DonCommonmodal>
  );
};
