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
  padding: 12px 6px;
  justify-content: between;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  min-height: 60px;
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
  @media( max-width: 500px ){
    padding: 12px 6px;
  }
  @media (max-width: 320px) {
    padding: 10px 4px;
  }
`;

// const Btn = styled.div`
//   background: #f4e41c;
//   border-radius: 8px;
//   padding: 15px 40px;
//   cursor: pointer;
//   @media (max-width: 380px) {
//     padding: 15px 10px;
//   }
// `;

const Subtitle = styled.div`
  font-size: 14px;
  color: #A2A2A2;
  font-weight: 500;
  @media( max-width: 470px ){
    display: none;
  }

`

const WalletPopup = ({ onClose }: { onClose: () => void }) => {
  const { connectDapp } = useWeb3Context();

  const connectWallet = (wallet: string) => {
    if (wallet === "injected") connectDapp("injected");
    else connectDapp("walletconnect");
    onClose();
  };

  return (
    <DonCommonmodal
      title={"Select a Wallet"}
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
          <div className="container-fluid p-0 d-flex flex-column align-items-center my-5">
            <Button
              className="row w-100 align-items-center justify-content-between g-0"
              onClick={() => connectWallet("injected")}
            >
              <p className="col-8">Metamask</p>
              <div className="col-4 d-flex justify-content-end">
                <MetamaskIcon />
              </div>
            </Button>
            <Button
              className="row w-100 align-items-center justify-content-between g-0 mt-2"
              onClick={() => connectWallet("wallet")}
            >
              <div className="col-8 g-0">
                <p>WalletConnect</p>
                <Subtitle>Supports most Wallets</Subtitle>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <WalletConnectNewIcon />
              </div>
            </Button>
          </div>
           {/* <p>Haven't got a crypto wallet yet?</p>
          <Btn>Learn How to Create</Btn>  */}
        </div>
      </Main>
    </DonCommonmodal>
  );
};

export default WalletPopup;
