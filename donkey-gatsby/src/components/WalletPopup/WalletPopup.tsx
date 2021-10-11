import { DonCommonmodal } from "components/DonModal/DonCommonModal";
import styled from "styled-components";
import { MetamaskIcon, WalletConnectNewIcon } from "icons";
import { useWeb3Context } from "don-components";
import React from "react";

const Main = styled.div`
  font-size: 16px;
  font-weight: bold;
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

const Button = styled.div`
  background: none;
  border: 1px solid #ececec;
  display: flex;
  padding: 15px 5px;
  justify-content: between;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background: #e5e5e5;
  }
  p {
    margin: 0;
  }
  img {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 320px) {
    padding: 10px 4px;
  }
`;
const Btn = styled.div`
  background: #f4e41c;
  border-radius: 8px;
  padding: 15px 40px;
  cursor: pointer;
  @media (max-width: 380px) {
    padding: 15px 10px;
  }
`;
const ConnectButton = ({
  icon,
  onClick,
  title,
}: {
  icon?: React.ReactElement;

  onClick?: () => void;
  title?: string;
}) => {
  return (
    <Button className="row w-100 align-items-center g-0" onClick={onClick}>
      <p className="col">{title}</p>
      <div className="col d-flex justify-content-end">{icon}</div>
    </Button>
  );
};

const WalletPopup = ({ onClose }: { onClose: () => void }) => {
  const { connectDapp } = useWeb3Context();

  const connectWallet = (wallet: string) => {
    if (wallet === "injected") connectDapp("injected");
    else connectDapp("walletconnect");
    onClose();
  };

  return (
    <DonCommonmodal
      title={"Connect Wallet"}
      variant="common"
      subtitle={" "}
      contentStyle={{ padding: 30 }}
      isOpen
      size="xs"
      rounded
      disableBackdropClick
      onClose={onClose}
    >
      <Main className="">
        <div className="mt-4 d-flex flex-column align-items-center justify-content-center">
          <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <ConnectButton
              onClick={() => connectWallet("injected")}
              icon={<MetamaskIcon />}
              title="Metamask"
            />
            <ConnectButton
              onClick={() => connectWallet("wallet")}
              icon={<WalletConnectNewIcon />}
              title="WalletConnect"
            />
          </div>
          <p>Haven't got a crypto wallet yet?</p>
          <Btn>Learn How to Create</Btn>
        </div>
      </Main>
    </DonCommonmodal>
  );
};

export default WalletPopup;
