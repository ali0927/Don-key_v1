import { useEffect } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { shortenAddress } from "don-utils";
import { useMediaQuery } from "@material-ui/core";
import { PoolAmount } from "components/PoolAmount";
import { PoolReserveAmount } from "components/PoolReserveAmount";
import { MyInvestment } from "components/MyInvestment";
import { MyInitialInvestment } from "components/MyInitialInvestment";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { useIsInvested } from "hooks/useIsInvested";
import { WithDrawPopup } from "components/WithDrawPopup";
import {
  getPoolContract,
  calculateInitialInvestment,
  calculateWithdrawAmount,
  getTotalPoolValue,
} from "helpers";
import { useWeb3 } from "don-components";
import { ContainedButton } from "components/Button";

const CardWrapper = styled.div`
  min-height: 250px;
  background: ${(props: { color: "black" | "white" }) =>
    props.color === "black" ? "#171717" : "#ffffff"};
  border-radius: 10px;
`;

const CardInnerInfo = styled.div`
  min-height: 160px;
`;

const PoolCardInnerInfo = styled.div`
  min-height: 194px;
`;

const CardLabel = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
  width: 100%;
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

const Columns = styled.div`
  border-right: 1px solid #ededf2;
  min-height: 50px;
  :last-child {
    border-right: none;
  }
`;

const ColumnsTitle = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#000000" : "#fff"};
`;

const ColumnsSubTitle = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#070602" : "#fff"};
`;

const ColumnsTitle1 = styled(ColumnsTitle)`
  font-size: 11px;
`;

const CutomButton = styled(ContainedButton)`
  background: #f5f290;
  width: 119px;
  height: 30px;
  :hover {
    background: #f5f290;
  }
`;

const TokensParagraph = styled.p`
  font-size: 10px;
  margin: 0px;
  text-align: center;
  color: #fff;
`;

export const DetailTable = ({ poolAddress }: { poolAddress: string }) => {
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);
  const [totalLPTokens, setTotalLPTokens] = useState("0");
  const [userLPTokens, setUserLPTokens] = useState("0");
  const [totalPoolValue, setTotalPoolValue] = useState("0");
  const [initialInvestment, setInitialInvestment] = useState("0");
  const [currentHoldings, setCurrentHoldings] = useState("0");
  const web3 = useWeb3();

  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);

  const { isInvested, getIsInvested } = useIsInvested(poolAddress);

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);

  useEffect(() => {
    async function apiCall() {
      const accounts = await web3.eth.getAccounts();
      const pool = await getPoolContract(web3, poolAddress);
      let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
      setUserLPTokens(web3.utils.fromWei(lptokensresponse, "ether"));
      let total = await pool.methods.totalSupply().call();
      setTotalLPTokens(web3.utils.fromWei(total, "ether"));

      let poolValue = await getTotalPoolValue(web3, poolAddress);
      setTotalPoolValue(web3.utils.fromWei(poolValue, "ether"));

      let amount = await calculateInitialInvestment(web3, poolAddress);
      setInitialInvestment(amount);

      let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
      setCurrentHoldings(withdrawAmount);
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSuccess = async () => {
    let d = await getTotalPoolValue(web3, poolAddress);
    setTotalPoolValue(web3.utils.fromWei(d, "ether"));
    const accounts = await web3.eth.getAccounts();
    const pool = await getPoolContract(web3, poolAddress);
    let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
    setUserLPTokens(web3.utils.fromWei(lptokensresponse, "ether"));
    let total = await pool.methods.totalSupply().call();
    setTotalLPTokens(web3.utils.fromWei(total, "ether"));

    let amount = await calculateInitialInvestment(web3, poolAddress);
    setInitialInvestment(amount);
    let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
    setCurrentHoldings(withdrawAmount);

    await getIsInvested();
  };

  const getFirstCardcolumns = (
    label: string,
    value: string | React.ReactNode,
    color: "black" | "white"
  ) => {
    return (
      <Columns className="col-md-3 d-flex align-items-center justify-content-center">
        <div>
          <ColumnsTitle color={color}>{label}</ColumnsTitle>
          <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
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
      <Columns className="col-md-3 d-flex align-items-center justify-content-center">
        <div>
          <ColumnsTitle1 color={color}>{label}</ColumnsTitle1>
          <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
        </div>
      </Columns>
    );
  };

  return (
    <>
    <div className="col-md-5 mb-5">
      <CardWrapper className="p-3" color="white">
        <PoolCardInnerInfo className="d-flex justify-content-center align-items-center">
          <div>
            <CardLabel color="black"> Pool Address</CardLabel>
            <CardValue color="black">
              {isSmall ? shortenAddress(poolAddress) : poolAddress}
            </CardValue>
          </div>
        </PoolCardInnerInfo>
        <div className="row">
          {getFirstCardcolumns("APK", "25%", "black")}
          {getFirstCardcolumns("ROI", "31.2%", "black")}
          {getFirstCardcolumns("Followers", "1,753", "black")}
          {getFirstCardcolumns("Dominance", "71%", "black")}
        </div>
      </CardWrapper>
      </div>
      <div className="col-md-5 mb-5 p">
      <CardWrapper className="p-2" color="black">
        <CardInnerInfo className="d-flex justify-content-center align-items-center">
          <div>
            <CardLabel color="white"> Total Pool Value </CardLabel>
            <CardValue color="white">
              {Number(totalPoolValue).toFixed(2)}
            </CardValue>

            <div className="d-flex mt-2 mb-2">
              <CutomButton onClick={() => setShowInvestmentPopup(true)}>
                Invest
              </CutomButton>
              <CutomButton
                onClick={() => setShowWithdrawPopup(true)}
                className="ml-2"
              >
                WithDraw
              </CutomButton>
            </div>
          </div>
        </CardInnerInfo>
        <div className="row">
          {getSecondCardColumns(
            "Initial Investment",
            Number(initialInvestment).toFixed(2).toString(),
            "white"
          )}

          {getSecondCardColumns(
            "Profit/Loss",
            <TotalProfitLoss poolAddress={poolAddress} />,
            "white"
          )}
          {getSecondCardColumns(
            "Total Reserve Value",
            <PoolReserveAmount poolAddress={poolAddress} />,
            "white"
          )}
          {getSecondCardColumns(
            "My Current Holdings",
            Number(currentHoldings).toFixed(8).toString(),
            "white"
          )}
        </div>
        <TokensParagraph className="pt-2 pb-2">
          LP Tokens: {userLPTokens} out of {totalLPTokens} total
        </TokensParagraph>
      </CardWrapper>
      </div>
      {showInvestmentPopup && (
        <InvestmentPopup
          poolAddress={poolAddress}
          onClose={() => setShowInvestmentPopup(false)}
          onSuccess={onSuccess}
        />
      )}

      {showWithdrawPopup && (
        <WithDrawPopup
          open
          onClose={() => setShowWithdrawPopup(false)}
          onError={() => {}}
          onSuccess={onSuccess}
          poolAddress={poolAddress}
        />
      )}
    </>
  );
};

{
  /* <Poolinfo className="bg-white h-100">
<div className="list-box">
  <h5 className="heading-title">Pool address</h5>
  <div>{isSmall ? shortenAddress(poolAddress) : poolAddress}</div>
  <br />
  <h5 className="heading-title">APY: 25%</h5>
</div>
</Poolinfo> */
}

{
  /* <Col lg={6}>
<InvestmentDisplay className="h-100">
  <div className="row">
    <div className="col-md-6">
      <div>Total Pool Value</div>{" "}
      <h5 className="heading-title">
        {Number(totalPoolValue).toFixed(2)}
      </h5>
      <div>Total Reserve Value</div>{" "}
      <h5 className="heading-title">
        <PoolReserveAmount poolAddress={poolAddress} />
      </h5>
      {isInvested && (
        <>
          <div>My Initial Investment</div>{" "}
          <h5 className="heading-title">
            {Number(initialInvestment).toFixed(2)}
          </h5>
          <div>My Current Holdings</div>{" "}
          <h5 className="heading-title">
            {Number(currentHoldings).toFixed(8)}
          </h5>
          <div>Total Profit/Loss</div>{" "}
          <h5 className="heading-title">
            <TotalProfitLoss poolAddress={poolAddress} />
          </h5>
          <p style={{ fontSize: 10 }}>
            LP Tokens: {userLPTokens} out of {totalLPTokens} total
          </p>
        </>
      )}
    </div>
    <div className="col-md-6">
      {showInvestmentPopup && (
        <InvestmentPopup
          poolAddress={poolAddress}
          onClose={() => setShowInvestmentPopup(false)}
          onSuccess={onSuccess}
        />
      )}
      <InvestCardButton
        className="mb-3"
        onClick={() => setShowInvestmentPopup(true)}
      >
        Invest
      </InvestCardButton>
      {isInvested && (
        <InvestCardButton onClick={() => setShowWithdrawPopup(true)}>
          Withdraw
        </InvestCardButton>
      )}
      {showWithdrawPopup && (
        <WithDrawPopup
          open
          onClose={() => setShowWithdrawPopup(false)}
          onError={() => {}}
          onSuccess={onSuccess}
          poolAddress={poolAddress}
        />
      )}
    </div>
  </div>
</InvestmentDisplay>
</Col> */
}
