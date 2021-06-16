//eslint-disable
import { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { shortenAddress } from "don-utils";
import { Switch, useMediaQuery, withStyles } from "@material-ui/core";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { useIsInvested } from "hooks/useIsInvested";
import { WithDrawPopup } from "components/WithDrawPopup";
import { calculateWithdrawAmount, getTotalPoolValue } from "helpers";
import { useWeb3 } from "don-components";
import { ButtonWidget } from "components/Button";
import {
  AwardIcon,
  FollowersIcon,
  LinkIcon,
  StatisticIcon,
  StatisticRoi,
} from "icons";
import { useROIAndInitialInvestment } from "hooks/useROIAndInitialInvestment";
import { useDominance } from "./useDominance";
import { InvestorCount } from "components/InvestorCount/InvestorCount";
import BigNumber from "bignumber.js";

import { useUSDViewBool } from "contexts/USDViewContext";
import { DollarView } from "./DollarView";
import { useRefresh } from "components/LotteryForm/useRefresh";
import { yellow } from "@material-ui/core/colors";
import { usePoolSymbol } from "hooks/usePoolSymbol";

const CardWrapper = styled.div`
  min-height: 280px;
  background: ${(props: { color: "black" | "white" }) =>
    props.color === "black" ? "#171717" : "#ffffff"};
  border-radius: 10px;
  box-shadow: 4.01577px 8.05442px 118px rgba(0, 0, 0, 0.05),
    2.60281px 5.22045px 69.1065px rgba(0, 0, 0, 0.037963),
    1.54681px 3.10244px 37.5852px rgba(0, 0, 0, 0.0303704),
    0.803153px 1.61088px 19.175px rgba(0, 0, 0, 0.025),
    0.327211px 0.656286px 9.61481px rgba(0, 0, 0, 0.0196296),
    0.0743661px 0.149156px 4.64352px rgba(0, 0, 0, 0.012037);
`;

const CardInnerInfo = styled.div`
  min-height: 109px;
`;

const CardLabel = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1px;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
  width: 100%;
  text-decoration: underline;
`;

const TotalPoolValueLabel = styled(CardLabel)`
  font-weight: 500;
`;

const CardPoolAddress = styled.p`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: #000000;
`;

const CardValue = styled.p`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
`;

const FirstCardRow = styled.div``;

const Columns = styled.div`
  border-right: 1px solid #b4b4b4;
  height: 70px;
  padding: 5px 20px;
  :last-child {
    border-right: none;
  }
`;

const ColumnsTitle = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
`;

const ColumnsTitleColored = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: any }) => props.color};
`;

const ColumnsSubTitle = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  word-break: break-word;
  letter-spacing: 0em;
  margin-bottom: 0;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#070602" : "#fff"};
`;

const ColumnsSubTitleColored = styled.p`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  word-break: break-word;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 0;
  color: ${(props: { color: any }) => props.color};
`;

const ColumnsTitle1 = styled(ColumnsTitleColored)`
  font-size: 14px;
  font-weight: 400;
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

const YellowSwitch = withStyles({
  switchBase: {
    color: yellow[300],
    "&$checked": {
      color: yellow[500],
    },
    "&$checked + $track": {
      backgroundColor: yellow[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: "#d9d9d9",
  },
})(Switch);
export const DetailTable = ({
  poolAddress,
  apy,
  farmerId,
  gasLimit,
  poolVersion,
}: {
  poolAddress: string;
  apy: string;
  poolVersion: number;
  farmerId: string;
  gasLimit?: string;
}) => {
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);
  const [totalPoolValue, setTotalPoolValue] = useState("0");
  const [currentHoldings, setCurrentHoldings] = useState("0");
  const { dominance } = useDominance(poolAddress);
  const web3 = useWeb3();
  const [initialCheck, setInitialCheck] = useState(false);

  useEffect(() => {
    if (farmerId === "e3ce43a6-963c-476a-bb3f-c07b7434f911") {
      setInitialCheck(true);
    }
  }, [farmerId]);

  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);

  const finalPoolAddress = isSmall ? shortenAddress(poolAddress) : poolAddress;

  const { refresh, dependsOn } = useRefresh();
  const { initialInvestment, myShare, fetchRoi, initialInvestmentInUSD } =
    useROIAndInitialInvestment(
      web3,
      finalPoolAddress,
      dependsOn % 2 == 0,
      true
    );
  const { symbol } = usePoolSymbol(poolAddress);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const { getIsInvested, isInvested } = useIsInvested(poolAddress);

  const { isUSD, toggle } = useUSDViewBool();
  console.log("here");
  console.log(isUSD);

  useEffect(() => {
    async function apiCall() {
      let poolValue = await getTotalPoolValue(web3, poolAddress);
      setTotalPoolValue(web3.utils.fromWei(poolValue, "ether"));

      let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
      console.log(withdrawAmount);
      setCurrentHoldings(withdrawAmount);
      getIsInvested();
      fetchRoi();
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependsOn]);

  const onSuccess = () => {
    setShowWithdrawPopup(false);
    refresh();
  };

  const handleToggle = () => {
    toggle();
    setInitialCheck(!initialCheck);
  };

  const getFirstCardcolumns = (
    label: string,
    value: string | number | React.ReactNode,
    color: "black" | "white",
    icon: React.ReactNode
  ) => {
    return (
      <Columns className="col-md-3 d-flex justify-content-center">
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

  const getSecondCardColumns = (
    label: string,
    value: string | React.ReactNode,
    color: "black" | "white"
  ) => {
    return (
      <Columns className="col-md-3 d-flex   flex-column align-items-center justify-content-between">
        <ColumnsTitle1 className="w-100" color={"#CEC6C6"}>
          {" "}
          {label}
        </ColumnsTitle1>
        <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
      </Columns>
    );
  };

  return (
    <>
      <div className="col-lg-6 mb-5">
        <CardWrapper className="p-2" color="white">
          <CardInnerInfo className="d-flex justify-content-center mb-2">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-baseline">
                <TotalPoolValueLabel color="black">
                  {" "}
                  Total Pool Value
                </TotalPoolValueLabel>
                <a
                  href={"https://bscscan.com/address/" + poolAddress}
                  target="_blank"
                  className="ml-2"
                >
                  <LinkIcon />
                </a>
              </div>
              <CardPoolAddress>
                <DollarView
                  poolAddress={poolAddress}
                  tokenAmount={totalPoolValue}
                />
              </CardPoolAddress>
              <div className="d-flex align-items-center">
                {symbol}
                <YellowSwitch
                  value={true}
                  onChange={handleToggle}
                  checked={initialCheck}
                />{" "}
                USD
              </div>
            </div>
          </CardInnerInfo>
          <FirstCardRow className="row mt-3">
            {getFirstCardcolumns(
              "APY",
              apy,
              "black",
              <div className="mr-2">
                <StatisticIcon />
              </div>
            )}
            {getFirstCardcolumns(
              "ROI",
              "---",
              "black",
              <div className="mr-2">
                <StatisticRoi />
              </div>
            )}
            {getFirstCardcolumns(
              "Followers",
              <InvestorCount
                refresh={dependsOn % 2 == 0}
                farmerId={farmerId}
              />,
              "black",
              <div className="mr-2">
                <FollowersIcon />
              </div>
            )}
            {getFirstCardcolumns(
              "Dominance",
              dominance + " %",
              "black",
              <div className="mr-2">
                <AwardIcon />
              </div>
            )}
          </FirstCardRow>
        </CardWrapper>
      </div>
      <div className="col-lg-6 mb-5 p">
        <CardWrapper className="p-2" color="black">
          <CardInnerInfo className="d-flex justify-content-center mb-3">
            <div style={{ marginTop: 53 }}>
              <CardLabel color="white"> My current holdings </CardLabel>
              <CardValue color="white">
                <DollarView
                  poolAddress={poolAddress}
                  tokenAmount={currentHoldings}
                />
              </CardValue>

              <div className="d-flex mt-2 mb-2">
                <ButtonWidget
                  varaint="contained"
                  fontSize="14px"
                  className="mr-3"
                  containedVariantColor="lightYellow"
                  height="30px"
                  width="119px"
                  onClick={() => setShowInvestmentPopup(true)}
                >
                  Invest
                </ButtonWidget>
                {isInvested && (
                  <ButtonWidget
                    fontSize="14px"
                    varaint="contained"
                    height="30px"
                    containedVariantColor="lightYellow"
                    width="119px"
                    onClick={() => setShowWithdrawPopup(true)}
                    className="ml-3"
                  >
                    Withdraw
                  </ButtonWidget>
                )}
              </div>
            </div>
          </CardInnerInfo>
          <div className="row mt-4">
            {getSecondCardColumns(
              "Initial Investment",
              isUSD ? (
                `$${formatNum(initialInvestmentInUSD)}`
              ) : (
                <DollarView
                  poolAddress={poolAddress}
                  tokenAmount={initialInvestment}
                />
              ),
              "white"
            )}

            {getSecondCardColumns(
              "Profit/Loss",
              <TotalProfitLoss
                refresh={dependsOn % 2 == 0}
                poolAddress={poolAddress}
              />,
              "white"
            )}
            {getSecondCardColumns("My ROI", "---", "white")}
            {getSecondCardColumns(
              "My share",
              Number(myShare).toFixed(2) + " %",
              "white"
            )}
          </div>
        </CardWrapper>
      </div>
      {showInvestmentPopup && (
        <InvestmentPopup
          gasLimit={gasLimit}
          poolVersion={poolVersion}
          poolAddress={poolAddress}
          onClose={() => setShowInvestmentPopup(false)}
          onSuccess={onSuccess}
        />
      )}

      {showWithdrawPopup && (
        <WithDrawPopup
          open
          poolVersion={poolVersion}
          onClose={() => setShowWithdrawPopup(false)}
          onError={() => {}}
          onSuccess={onSuccess}
          poolAddress={poolAddress}
        />
      )}
    </>
  );
};
