import { NetworksMap } from "components/NetworkProvider/NetworkProvider";
import { useWeb3Network } from "components/Web3NetworkDetector";
import { useSwitchNetwork } from "hooks";
import { LinkIcon, WalletIcon } from "icons";
import { INetwork } from "interfaces";
import styled from "styled-components";
const Text = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
  ${(props: { muted?: boolean;pointer?: boolean }) => {
    let styles = ``;
    if(props.pointer){
      styles += `cursor: pointer;`;
    }
    if(props.muted){
      styles += `color: #888`;
    }
    return styles;
  }}

`;

const DonButtonOutlined = styled.button`
  color: #fff;
  border: 1px solid #fff;
  border-radius: 15px;
  background-color: transparent;
  padding: 8px 30px;
  transition: color 0.3s linear, background-color 0.3s linear, transform 0.3s ease-in;

  &:hover {
    color: #000;
    background-color: #fff;
    transform: translateY(-1px);
  }
`;

const DonButtonContained = styled.button`
  color: #000000;
  border: 1px solid rgb(245, 242, 144);
  border-radius: 15px;
  background-color: rgb(245, 242, 144);
  padding: 8px 30px;
  transition: background-color 0.3s linear,  transform 0.3s ease-in;
  &:hover {
    background-color: rgb(245, 240, 98);
    transform: translateY(-1px);
  }
`;

export const InactiveNetworkCard = ({
  correctNetwork,
}: {
  correctNetwork: INetwork;
}) => {
  const { switchNetwork } = useSwitchNetwork();
  return (
    <div className="text-center pt-5">
      <h5>You're connected to the wrong network!.</h5>
      <Text>Change the network on your wallet to {correctNetwork.symbol}</Text>
      <Text className="d-flex align-items-center justify-content-center" muted pointer>
        Read our guide for setting up Metamask{" "}
        <LinkIcon style={{ marginTop: -2 }} className="ml-2" />
      </Text>
      <div className="mt-5">
        <DonButtonOutlined className="mr-3">
          <WalletIcon /> Disconnect
        </DonButtonOutlined>
        <DonButtonContained
          onClick={() => switchNetwork(correctNetwork.chainId)}
        >
          <img
            src="/assets/images/usericon.png"
            className="d-inline-block align-top mr-md-2"
            alt="ImageNotFound"
          />{" "}
          Switch to {correctNetwork.symbol}
        </DonButtonContained>
      </div>
    </div>
  );
};
