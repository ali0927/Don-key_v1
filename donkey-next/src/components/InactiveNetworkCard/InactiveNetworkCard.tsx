import { gql, useQuery } from "@apollo/client";
// import { ButtonWidget } from "components/Button";
import { useSwitchNetwork } from "hooks";
// import { LinkIcon, WalletIcon } from "icons";
import { INetwork } from "interfaces";
// import moment from "moment";
import Image from "next/image";
// import { StakingTimer } from "Pages/InvestmentsPage/StakingInfo/StakingInfo";
import { Spinner } from "react-bootstrap";
// import { useHistory } from "react-router";
import styled from "styled-components";
const Text = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
  display: inline-block;
  ${(props: { muted?: boolean; pointer?: boolean }) => {
    let styles = ``;
    if (props.pointer) {
      styles += `cursor: pointer;`;
    }
    if (props.muted) {
      styles += `color: #888`;
    }
    return styles;
  }}
`;

// const DonButtonOutlined = styled.button`
//   border-radius: 15px;
//   background-color: transparent;
//   padding: 8px 30px;
//   transition: color 0.3s linear, background-color 0.3s linear,
//     transform 0.3s ease-in;
//   ${({ color = "white" }: { color?: "black" | "white" }) => {
//     switch (color) {
//       case "white": {
//         return `
//         color: #fff;
//   border: 1px solid #fff;  
//         &:hover {
//           color: #000;
//     background-color: #fff;
//         }
//         `;
//       }
//       case "black": {
//         return `
//             color: #000;
//             border: 1px solid #000;  
//             &:hover {
//           color: #fff;
//     background-color: #000;
//         }
//         `;
//       }
//     }
//   }}
//   &:hover {
//     transform: translateY(-1px);
//   }
// `;

const DonButtonContained = styled.button`
  color: #000000;
  border: 1px solid rgb(245, 242, 144);
  border-radius: 15px;
  background-color: rgb(245, 242, 144);
  padding: 8px 30px;
  transition: background-color 0.3s linear, transform 0.3s ease-in;
  &:hover {
    background-color: rgb(245, 240, 98);
    transform: translateY(-1px);
  }
`;

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 30px 36px;
`;

const WITHDRAWALREQUESTS_QUERY = gql`
  query withdrawRequestQuery($poolAddress: String!, $walletAddress: String!) {
    withdrawRequests(
      where: { poolAddress: $poolAddress, walletAddress: $walletAddress }
    ) {
      id
      created_at
    }
    farmers(where: { poolAddress: $poolAddress }) {
      withdrawTimeFrame
    }
  }
`;

export const InactiveNetworkCard = ({
  correctNetwork,
  variant = "black",
}: {
  correctNetwork: INetwork;
  variant?: "black" | "white";
}) => {
  const { switchNetwork } = useSwitchNetwork();
  if (variant === "black") {
    return (
      <div className="text-center pt-5">
        <h5>You're connected to the wrong network</h5>
        <Text>
          Change the network on your wallet to {correctNetwork.symbol}
        </Text>
        <Text
          className="d-flex align-items-center justify-content-center"
          muted
          pointer
        >
          Click on switch to add or change network
        </Text>
        <div className="mt-5">
          {/* <DonButtonOutlined className="mr-3">
            <WalletIcon /> Disconnect
          </DonButtonOutlined> */}
          <DonButtonContained
            onClick={() => switchNetwork(correctNetwork.chainId)}
          >
            <Image
              src="/images/usericon.png"
              className="d-inline-block align-top mr-md-2"
              alt="Metamask Icon"
            />{" "}
            Switch to {correctNetwork.symbol}
          </DonButtonContained>
        </div>
      </div>
    );
  }
  return (
    <CardWrapper className="row">
      <div className="col-md-8">
        <h6>
          You’re connected to the wrong network! Change the network on your
          wallet to {correctNetwork.symbol}.
        </h6>
        <Text className="mb-0" muted pointer>
          Click on switch to add or change network
        </Text>
      </div>
      <div className="col d-flex align-items-center justify-content-center justify-content-md-end">
        {/* <DonButtonOutlined color="black" className="mr-3">
          <WalletIcon /> Disconnect
        </DonButtonOutlined> */}
        <DonButtonContained
          onClick={() => switchNetwork(correctNetwork.chainId)}
        >
          <Image
            placeholder="blur"
            src="/images/usericon.png"
            className="d-inline-block align-top mr-md-2"
            alt="ImageNotFound"
          />{" "}
          Switch to {correctNetwork.symbol}
        </DonButtonContained>
      </div>
    </CardWrapper>
  );
};

export const WithdrawRequestedCard = ({
  poolAddress,
  walletAddress,
}: {
  poolAddress: string;
  walletAddress: string;
}) => {
  const { loading, data } = useQuery(WITHDRAWALREQUESTS_QUERY, {
    variables: {
      poolAddress,
      walletAddress,
    },
  });
  // const history = useHistory();

  if (loading) {
    return (
      <div className="text-center pt-5 d-flex align-items-center justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  // const createTimer = data.withdrawRequests[0]?.created_at || Date.now();
  const timeframe = data.farmers[0]?.withdrawTimeFrame || "12";

  return (
    <div className="text-center pt-5">
      <h5>Withdraw Request</h5>
      <Text className="mt-4 mb-3">
        {" "}
        Your withdraw will be executed at minimum slippage and fees within:{" "}
        {timeframe}
        hrs
      </Text>

      <div className="mt-2">
        {/* <StakingTimer
          variant="light"
          title=""
          endMessage={
            <>
              Oops somthing went wrong, we are going to try again
              <ButtonWidget
                onClick={() => window.location.reload()}
                varaint="contained"
                width="200px"
                className="mt-3"
                height="40px"
                containedVariantColor="lightYellow"
              >
                Refresh
              </ButtonWidget>
            </>
          }
          timerEnd={moment(createTimer).add(timeframe, "hours").unix()}
        /> */}
      </div>
    </div>
  );
};
