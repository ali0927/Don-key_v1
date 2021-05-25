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
import {  AwardIcon, FollowersIcon, LinkIcon, StatisticIcon, StatisticRoi } from "icons";
import { useROIAndInitialInvestment } from "hooks/useROIAndInitialInvestment";
import { useDominance } from "./useDominance";



const CardWrapper = styled.div`
  min-height: 280px;
  background: ${(props: { color: "black" | "white" }) =>
    props.color === "black" ? "#171717" : "#ffffff"};
  border-radius: 10px;
  box-shadow: 4.01577px 8.05442px 118px rgba(0, 0, 0, 0.05), 2.60281px 5.22045px 69.1065px rgba(0, 0, 0, 0.037963), 1.54681px 3.10244px 37.5852px rgba(0, 0, 0, 0.0303704), 0.803153px 1.61088px 19.175px rgba(0, 0, 0, 0.025), 0.327211px 0.656286px 9.61481px rgba(0, 0, 0, 0.0196296), 0.0743661px 0.149156px 4.64352px rgba(0, 0, 0, 0.012037);
`;

const CardInnerInfo = styled.div`
  min-height: 160px;
`;

const PoolCardInnerInfo = styled.div`
  min-height: 153px;
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


const FirstCardRow = styled.div`

`;

const Columns = styled.div`
  border-right: 1px solid #ededf2;
  min-height: 50px;
  :last-child {
    border-right: none;
  }
`;

const ColumnsTitle = styled.div`
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
  word-break: break-word;
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




const usePoolApy = () => {

  const [] = useState();


}

export const DetailTable = ({ poolAddress,investorCount }: { poolAddress: string;investorCount: number }) => {
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);
  const [totalPoolValue, setTotalPoolValue] = useState("0");
  const [currentHoldings, setCurrentHoldings] = useState("0");
  const {dominance} = useDominance(poolAddress);
  const web3 = useWeb3();

  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);

  const finalPoolAddress = isSmall ? shortenAddress(poolAddress) : poolAddress

  const {roi,farmerRoi, initialInvestment, myShare} = useROIAndInitialInvestment(web3, finalPoolAddress);

  
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);


  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function apiCall() {

      let poolValue = await getTotalPoolValue(web3, poolAddress);
      setTotalPoolValue(web3.utils.fromWei(poolValue, "ether"));


      let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
      setCurrentHoldings(withdrawAmount);
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const onSuccess = () => {
    setRefresh(old => !old);
  }

  const getFirstCardcolumns = (
    label: string,
    value: string | number | React.ReactNode,
    color: "black" | "white",
    icon: React.ReactNode,
  ) => {
    return (
      <Columns className="col-md-3 d-flex justify-content-center">
        <div className="mt-3">
          <ColumnsTitle className="d-flex justify-content-center mb-2" color={color}>
            <>{icon}{label}</>
            </ColumnsTitle>
          <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
        </div>
      </Columns>
    );
  };

  const getSecondCardColumns = (
    label: string,
    value: string | React.ReactNode,
    color: "black" | "white",
 
  ) => {
    return (
      <Columns className="col-md-3 d-flex  justify-content-center">
        <div  className="mt-3">
         <ColumnsTitle1 color={color}> {label}</ColumnsTitle1>
          <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
        </div>
      </Columns>
    );
  };

  return (
    <>
    <div className="col-lg-6 mb-5">
      <CardWrapper className="p-3" color="white">
        <PoolCardInnerInfo className="d-flex justify-content-center align-items-center">
          <div>
            <div className="d-flex align-items-baseline">
              <TotalPoolValueLabel color="black"> Total Pool Value</TotalPoolValueLabel>
              <a href={'https://bscscan.com/address/'+poolAddress} target="_blank" className="ml-2"><LinkIcon/></a>
            </div>
            <CardPoolAddress>
              $ {Number(totalPoolValue).toFixed(2)}
              {/* {isSmall ? shortenAddress(poolAddress) : poolAddress} */}
            </CardPoolAddress>
          </div>
        </PoolCardInnerInfo>
        <FirstCardRow className="row">
          {getFirstCardcolumns("APY", "25%", "black",<div className="mr-1"><StatisticIcon /></div>)}
          {getFirstCardcolumns("ROI", roi, "black",<div className="mr-1"><StatisticRoi /></div>)}
          {getFirstCardcolumns("Followers", investorCount, "black",<div className="mr-1"><FollowersIcon /></div>)}
          {getFirstCardcolumns("Dominance", dominance, "black",<div className="mr-1"><AwardIcon /></div>)}
        </FirstCardRow>
      </CardWrapper>
      </div>
      <div className="col-lg-6 mb-5 p">
      <CardWrapper className="p-2" color="black">
        <CardInnerInfo className="d-flex justify-content-center align-items-center">
          <div>
            <CardLabel color="white"> My current holdings </CardLabel>
            <CardValue color="white">
             $  {Number(currentHoldings).toFixed(8).toString()}
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
            <TotalProfitLoss refresh={refresh} poolAddress={poolAddress} />,
            "white"
          )}
          {getSecondCardColumns(
            "My ROI",
            farmerRoi,
            "white"
          )}
          {getSecondCardColumns(
            "My share",
            Number(myShare).toFixed(2)+" %",
            "white"
          )}
        </div>
     
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
