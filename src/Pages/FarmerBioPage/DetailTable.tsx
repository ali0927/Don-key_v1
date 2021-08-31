//eslint-disable
import { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Switch, withStyles } from "@material-ui/core";
import { getTotalPoolValue, toEther } from "helpers";
import { useWeb3 } from "don-components";
import {
  AwardIcon,
  FollowersIcon,
  LinkIcon,
  StatisticIcon,
  StatisticRoi,
} from "icons";
import { useDominance } from "./useDominance";
import { InvestorCount } from "components/InvestorCount/InvestorCount";
import BigNumber from "bignumber.js";

import { useUSDViewBool } from "contexts/USDViewContext";
import { DollarView } from "./DollarView";
import { useRefresh } from "components/LotteryForm/useRefresh";
import { yellow } from "@material-ui/core/colors";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import {
  BSCChainId,
  PolygonChainId,
  useWeb3Network,
} from "components/Web3NetworkDetector";
import { IFarmerInter } from "interfaces";
import { InvestBlackCard } from "./InvestBlackCard";
import { InactiveNetworkCard } from "./InactiveNetworkCard";
import { InvestorCountContract } from "components/InvestorCountGraphql";

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
`;

export const CardValue = styled.p`
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
`;

const FirstCardRow = styled.div``;

export const Columns = styled.div`
  border-right: 1px solid #b4b4b4;
  height: 70px;
  padding: 5px 13px;
  :last-child {
    border-right: none;
  }
`;

const ColumnsTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  font-family: Poppins;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
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
`;

const ColumnsSubTitleColored = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
  color: ${(props: { color: string }) => props.color};
`;

export const ColumnsTitle1 = styled(ColumnsTitleColored)`
  font-size: 14px;
  font-family: Poppins;
  font-weight: 500;
`;

export const formatNum = (num: string) => {
  const wrappedNum = new BigNumber(num);
  let digits = wrappedNum.gt(1) ? 2 : 6;
  if (process.env.REACT_APP_ENV === "development") {
    digits = 6;
  }
  const formatted = wrappedNum.toFixed(digits);

  return Number(formatted).toLocaleString("en-us", {
    minimumSignificantDigits: digits,
  });
};

const YellowSwitch =  withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: "#fff",
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: yellow[300],
        borderColor: yellow[500],
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid #fff`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: yellow[500],
  },
  checked: {},
}))(Switch);;

const URLMap = {
  [BSCChainId]: "https://bscscan.com",
  [PolygonChainId]: "https://polygonscan.com",
};

const TokenSwitchLabels = styled.div`
font-weight: 500;
font-size: 14px;
color: #808080;
`;


const IconWrapper = styled.div`
transform: scale(0.7);
`;

export const DetailTable = ({
  poolAddress,
  apy,
  farmerId,
  poolVersion,
  network,
}: {
  poolAddress: string;
  apy: string;
  network: IFarmerInter["network"];
  poolVersion: number;
  farmerId: string;
  gasLimit?: string;
}) => {
  const [totalPoolValue, setTotalPoolValue] = useState("0");

  const { dominance } = useDominance(poolAddress);
  const web3 = useWeb3();
  const [initialCheck, setInitialCheck] = useState(false);
  const { chainId: currentNetwork } = useWeb3Network();

  useEffect(() => {
    if (farmerId === "e3ce43a6-963c-476a-bb3f-c07b7434f911") {
      setInitialCheck(true);
    }
  }, [farmerId]);
  const { toggle } = useUSDViewBool();
  const handleToggle = () => {
    toggle();
    setInitialCheck(!initialCheck);
  };

  const { dependsOn } = useRefresh();

  const { symbol } = usePoolSymbol(poolAddress);

  const isActiveNetwork = network?.chainId === currentNetwork;
  useEffect(() => {
    (async () => {
      let poolValue = await getTotalPoolValue(web3, poolAddress);
      setTotalPoolValue(toEther(poolValue));
    })();
  }, [dependsOn, currentNetwork]);

  const getFirstCardcolumns = (
    label: string,
    value: string | number | React.ReactNode,
    color: "black" | "white",
    icon: React.ReactNode
  ) => {
    return (
      <Columns className="col-md-4 d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-between">
          <ColumnsTitle
            className="d-flex align-items-center justify-content-center w-100"
            color={color}
          >
            <>
              {icon}
              {label}
            </>
          </ColumnsTitle>
          <ColumnsSubTitleColored color={"#808080"}>
            {value}
          </ColumnsSubTitleColored>
        </div>
      </Columns>
    );
  };

  return (
    <>
      <div className="col-lg-6 mb-5">
        <CardWrapper color="white">
          <div style={{marginTop: 30}}>
            <CardInnerInfo className="d-flex justify-content-center mb-2">
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-baseline mb-2">
                  <TotalPoolValueLabel color="black">
                    Total Pool Value
                  </TotalPoolValueLabel>
                  <a
                    href={
                      `${URLMap[(network?.chainId as 56) || 56]}/address/` +
                      poolAddress
                    }
                    target="_blank"
                    className="ml-2"
                  >
                    <LinkIcon />
                  </a>
                </div>
                <CardPoolAddress >
                  {isActiveNetwork ? (
                    <DollarView
                      poolAddress={poolAddress}
                      tokenAmount={totalPoolValue}
                    />
                  ) : (
                    "-"
                  )}
                </CardPoolAddress>
                {isActiveNetwork ? (
                  <TokenSwitchLabels className="d-flex align-items-center">
                    {symbol}
                    <YellowSwitch
                    className="mx-2"
                      value={true}
                      onChange={handleToggle}
                      checked={initialCheck}
                    />{" "}
                    USD
                  </TokenSwitchLabels>
                ) : (
                  <TokenSwitchLabels>You are connected To Wrong Network</TokenSwitchLabels>
                )}
              </div>
            </CardInnerInfo>
          </div>
          <FirstCardRow className="row mt-3">
            {getFirstCardcolumns(
              "APY",
              apy,
              "black",
              <IconWrapper className="mr-2">
                <StatisticIcon />
              </IconWrapper>
            )}
            {getFirstCardcolumns(
              "Followers",
              <InvestorCountContract
                refresh={dependsOn % 2 === 0}
                poolAddresses={[poolAddress]}
              />,
              "black",
              <IconWrapper className="mr-2">
                <FollowersIcon />
              </IconWrapper>
            )}
            {getFirstCardcolumns(
              "Dominance",
              dominance + " %",
              "black",
              <IconWrapper className="mr-2" >
                <AwardIcon />
              </IconWrapper>
            )}
          </FirstCardRow>
        </CardWrapper>
      </div>
      <div className="col-lg-6 mb-5">
        <CardWrapper  color="black">
          {isActiveNetwork ?(
            <InvestBlackCard
              poolAddress={poolAddress}
              poolVersion={poolVersion}
            />
          ): <InactiveNetworkCard correctNetwork={network} />}
        </CardWrapper>
      </div>
    </>
  );
};
