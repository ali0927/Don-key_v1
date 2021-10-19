//eslint-disable
import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Switch, withStyles } from "@material-ui/core";
import {
  getPoolContract,
  getPoolToken,
  getTokenPrice,
  getTotalPoolValue,
  toEther,
} from "helpers";
import { getWeb3, useWeb3Context, NetworkConfigs } from "don-components";
import { LinkIcon } from "icons";
import BigNumber from "bignumber.js";
import { useUSDViewBool } from "contexts/USDViewContext";
import { useRefresh } from "components/LotteryForm/useRefresh";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { IFarmerInter } from "interfaces";
import { InvestBlackCard } from "components/InvestBlackCard";
import {
  ConnectToMetamaskCard,
  InactiveNetworkCard,
} from "components/InactiveNetworkCard";
import { InvestorCountContract } from "components/InvestorCountGraphql";
import { Spinner } from "react-bootstrap";
import { DollarView } from "components/DollarView";
import { BoostButton } from "components/BoostButton";
import { breakPoints } from "../../breakponts";
import Statistics from "./Statistics.svg";
import followers from "./Followers.svg";
import dominance from "./Cup.svg";

export const CardWrapper = styled.div`
  min-height: 280px;
  background: ${(props: { color: "black" | "white" }) =>
    props.color === "black" ? "#171717" : "#ffffff"};
  border-radius: 20px;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 40px;
  color: ${(props: { color: "black" | "white" }) =>
    props.color !== "black" ? "#171717" : "#ffffff"};
  box-shadow: 4.01577px 8.05442px 118px rgba(0, 0, 0, 0.05),
    2.60281px 5.22045px 69.1065px rgba(0, 0, 0, 0.037963),
    1.54681px 3.10244px 37.5852px rgba(0, 0, 0, 0.0303704),
    0.803153px 1.61088px 19.175px rgba(0, 0, 0, 0.025),
    0.327211px 0.656286px 9.61481px rgba(0, 0, 0, 0.0196296),
    0.0743661px 0.149156px 4.64352px rgba(0, 0, 0, 0.012037);
  @media only screen and (max-width: ${breakPoints.md}) {
    border-radius: 10px;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const BlackCardWrapper = styled(CardWrapper)`
  box-shadow: 0px 4px 10px rgb(0 0 0 / 35%);
`;

export const CardInnerInfo = styled.div`
  min-height: 109px;
`;

export const CardLabel = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
  width: 100%;
  text-decoration: underline;
  margin-bottom: 0;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 12px;
  }
`;

const TotalPoolValueLabel = styled(CardLabel)`
  font-weight: 600;
`;

const CardPoolAddress = styled.p`
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  color: #000000;
  margin-bottom: 23px;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 24px;
  }
`;

export const CardValue = styled.p`
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 24px;
  }
`;

const FirstCardRow = styled.div``;

export const Columns = styled.div`
  border-right: 1px solid #b4b4b4;
  height: 70px;
  margin: 5px -5px;
  :last-child {
    border-right: none;
  }
  @media only screen and (max-width: ${breakPoints.md}) {
    height: auto;
  }
`;

const ColumnsTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 10px;
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7e7e7e;
  }
`;

const ColumnsTitleColored = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: any }) => props.color};
`;

export const ColumnsSubTitle = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  word-break: break-word;
  margin-bottom: 0;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#070602" : "#fff"};
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 14px;
    margin-bottom: -10px;
    padding-top: 15px;
  }
`;

const ColumnsSubTitleColored = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
  color: ${(props: { color: string }) => props.color};
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 14px;
    margin-bottom: -10px;
    padding-top: 15px;
    color: #070602;
  }
`;

export const ColumnsTitle1 = styled(ColumnsTitleColored)`
  font-size: 13px;
  font-family: Poppins;
  font-weight: 500;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 10px;
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* color: #7e7e7e; */
    height: 40px;
  }
`;

const Col = styled.div`
  width: 100%;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 49%;
  }
`;

const BoostApyBox = styled.div`
  padding: 16px 20px;
  border-radius: 10px;
  color: #fff;
  background: #171717;
  font-size: 16px;
  margin-top: -10px;
  box-shadow: 0px 4px 10px rgb(0 0 0 / 35%);
`;

const YellowSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: "#fff",
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#F8C400",
        borderColor: "#F8C400",
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid #fff`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#F8C400",
  },
  checked: {},
}))(Switch);

const TokenSwitchLabels = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #808080;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 12px;
  }
`;

const IconWrapper = styled.div`
  transform: scale(1);
`;

export const DetailTable = ({
  poolAddress,
  apy,
  poolVersion,
  network,
  boostApy,
  tvl,
  oldPoolAddress,
  oldPoolVersion,
  isWrapped,
}: {
  poolAddress: string;
  oldPoolAddress: string;
  oldPoolVersion: number;
  apy: string;
  network: IFarmerInter["network"];
  boostApy: boolean;
  poolVersion: number;
  tvl: string;
  gasLimit?: string;
  isWrapped: boolean;
}) => {
  const [totalPoolValue, setTotalPoolValue] = useState("0");
  const [totalPoolValueInUSD, setTotalPoolValueInUsd] = useState("0");

  const web3 = getWeb3(network.chainId);
  const {
    chainId: currentNetwork,
    getConnectedWeb3,
    connected,
    address,
  } = useWeb3Context();

  const [isWithdrawRequested, setWithdrawRequested] = useState<boolean | null>(
    null
  );

  const { toggle } = useUSDViewBool();
  const handleToggle = () => {
    toggle();
  };

  const { dependsOn } = useRefresh();

  const { symbol } = usePoolSymbol(poolAddress, web3);

  const isActiveNetwork = network?.chainId === currentNetwork;
  const connectedWeb3 = getConnectedWeb3();
  useEffect(() => {
    (async () => {
      if (poolVersion > 2 && isActiveNetwork && connected) {
        const pool = await getPoolContract(
          connectedWeb3,
          poolAddress,
          poolVersion
        );
        const accounts = await connectedWeb3.eth.getAccounts();
        const isRequested = await pool.methods
          .isWithdrawalRequested(accounts[0])
          .call();
        setWithdrawRequested(isRequested);
      } else {
        setWithdrawRequested(false);
      }
    })();
  }, [dependsOn, currentNetwork, connected, address]);

  useEffect(() => {
    (async () => {
      let [poolValue, tokenPrice] = await Promise.all([
        getTotalPoolValue(web3, poolAddress),
        getTokenPrice(web3, poolAddress),
      ]);
      const token = await getPoolToken(web3, poolAddress);

      const decimals = await token.methods.decimals().call();
      const tokens = toEther(poolValue, decimals);
      setTotalPoolValue(tokens);
      setTotalPoolValueInUsd(
        new BigNumber(tokens).multipliedBy(tokenPrice).toFixed(2)
      );
    })();
  }, [dependsOn, currentNetwork, address]);

  const getFirstCardcolumns = (
    label: string,
    value: string | number | React.ReactNode,
    color: "black" | "white",
    icon: React.ReactNode
  ) => {
    return (
      <Columns className="col-md-4 col-4 d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-between">
          <ColumnsTitle
            className="d-flex align-items-center justify-content-center w-100"
            color={color}
          >
            <>
              <span>{icon}</span>
              <span>{label}</span>
            </>
          </ColumnsTitle>
          <ColumnsSubTitleColored color={"#808080"}>
            {value}
          </ColumnsSubTitleColored>
        </div>
      </Columns>
    );
  };

  const renderCardData = () => {
    if (isWithdrawRequested === null) {
      return (
        <div className="text-center h-100 pt-5 d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </div>
      );
    }

    if (connected) {
      if (isActiveNetwork) {
        return (
          <InvestBlackCard
            poolAddress={poolAddress}
            poolVersion={poolVersion}
            network={network}
            oldPoolAddress={oldPoolAddress}
            oldPoolVersion={oldPoolVersion}
            isWithdrawRequested={isWithdrawRequested}
            boostApy={boostApy}
            isWrapped={isWrapped}
            apy={apy}
          />
        );
      } else {
        return <InactiveNetworkCard correctNetwork={network} />;
      }
    } else {
      return <ConnectToMetamaskCard network={network} />;
    }
  };

  return (
    <>
      <Col
        className="mb-1 mb-lg-5 p-3 p-md-0 p-lg-0"
        style={{ marginRight: 17 }}
      >
        <CardWrapper color="white">
          <div style={{ marginTop: 30 }}>
            <CardInnerInfo className="d-flex justify-content-center mb-2">
              <div className="d-flex flex-column align-items-center">
                <div
                  className="d-flex align-items-baseline"
                  style={{ marginBottom: 18 }}
                >
                  <TotalPoolValueLabel color="black">
                    Total Pool Value
                  </TotalPoolValueLabel>
                  <a
                    href={
                      `${
                        NetworkConfigs.find(
                          (item) => item.chainId === network.chainId
                        )?.scan
                      }/address/` + poolAddress
                    }
                    target="_blank"
                    className="ml-2"
                  >
                    <LinkIcon />
                  </a>
                </div>
                <CardPoolAddress>
                  <DollarView
                    chainId={network.chainId}
                    poolAddress={poolAddress}
                    tokenAmount={totalPoolValue}
                  />
                </CardPoolAddress>

                <TokenSwitchLabels className="d-flex align-items-center">
                  {symbol.toUpperCase()}
                  <YellowSwitch
                    className="mx-2"
                    value={true}
                    onChange={handleToggle}
                  />{" "}
                  USD
                </TokenSwitchLabels>
              </div>
            </CardInnerInfo>
          </div>
          <FirstCardRow className="row mt-3 flex-nowrap">
            {getFirstCardcolumns(
              "APY",
              apy,
              "black",
              <IconWrapper className="mr-md-2">
                <img
                  src={Statistics}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </IconWrapper>
            )}
            {getFirstCardcolumns(
              "Followers",
              <InvestorCountContract
                chainId={network.chainId}
                refresh={dependsOn % 2 === 0}
                poolAddresses={[poolAddress]}
              />,
              "black",
              <IconWrapper className="mr-md-2">
                <img
                  src={followers}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </IconWrapper>
            )}
            {getFirstCardcolumns(
              "Dominance",
              new BigNumber(totalPoolValueInUSD)
                .dividedBy(tvl)
                .multipliedBy(100)
                .toFixed(2) + " %",
              "black",
              <IconWrapper className="mr-md-2">
                <img
                  src={dominance}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </IconWrapper>
            )}
          </FirstCardRow>
        </CardWrapper>
      </Col>
      <Col className="mb-1 mb-lg-5 p-3 p-md-0 p-lg-0" style={{ marginLeft: 0 }}>
        <BlackCardWrapper className="position-relative" color="black">
          {renderCardData()}
        </BlackCardWrapper>
      </Col>
      <Col className="mb-1 mb-lg-5 p-3 p-md-0 p-lg-0">
        <BoostApyBox className="d-md-none">
          <div className="row">
            <div className="col-6 pr-0 d-flex flex-column justify-content-center  ">
              Up to 100% extra APY
            </div>
            <div className="col-6 pl-0 d-flex flex-column justify-content-center align-items-end">
              <BoostButton />
            </div>
          </div>
        </BoostApyBox>
      </Col>
    </>
  );
};
