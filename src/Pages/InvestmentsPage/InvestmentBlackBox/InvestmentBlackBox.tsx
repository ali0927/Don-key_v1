import { ContainedButton } from "components/Button";
import { PoolReserveAmount } from "components/PoolReserveAmount";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { calculateInitialInvestment, calculateWithdrawAmount, getPoolContract, getTotalPoolValue } from "helpers";
import React, { useState,useEffect } from "react";
import { useWeb3 } from "don-components";
import styled from "styled-components";
import { BigNumber } from "bignumber.js";
import { parse } from "graphql";
import { IMyInvestments } from "../interfaces";

const CardWrapper = styled.div`
  min-height: 250px;
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
  min-height: 160px;
`;

const CardLabel = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
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
  color: #fff;
`;

const CutomButton = styled(ContainedButton)`
  background: #f5f290;
  width: 119px;
  height: 30px;
  :hover {
    background: #f5f290;
  }
`;

const ColumnsTitle = styled.p`
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
`;

const ColumnsSubTitle = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
  word-break: break-word;
`;

const Columns = styled.div`
  border-right: 1px solid #ededf2;
  min-height: 50px;
  :last-child {
    border-right: none;
  }
`;




export const InvestmentBlackBox = ({ poolAddress, myInvestments }: { poolAddress: string, myInvestments: IMyInvestments[] }) => {
   
    const [initialInvestment, setInitialInvestment] = useState("0");
    const [totalInvestment, SetTotalInvestment]= useState(0);
    const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);


    const [myShare, setMyShare] = useState(0);
    const [roi, setRoi] = useState("0");

    const web3 = useWeb3();
  

    React.useEffect(() => {
        async function apiCall() {
          const accounts = await web3.eth.getAccounts();
          const pool = await getPoolContract(web3, poolAddress);

          let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
          lptokensresponse = new BigNumber(lptokensresponse);
          let totalShares = await pool.methods.totalSupply().call();
          totalShares = new BigNumber(totalShares);
          const myShares = lptokensresponse.dividedBy(totalShares);
          setMyShare(myShares);
      
    
          const amount = await calculateInitialInvestment(web3, poolAddress);
          setInitialInvestment(amount);
    
          const withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
          const profit =parseFloat(withdrawAmount) - parseFloat(amount);

          const roi =  (profit/parseFloat(amount)).toString();
          
          setRoi(roi);

          let total = 0;

          for(let investment of myInvestments){
            const investedAmount = await calculateWithdrawAmount(web3, investment.poolAddress);
            total = (total + parseFloat(investedAmount))
          } 

          SetTotalInvestment(total);
        }
        apiCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  const getSecondCardColumns = (
    label: string,
    value: string | React.ReactNode,
  ) => {
    return (
      <Columns className="col-md-3 d-flex justify-content-center">
        <div>
          <ColumnsTitle> {label}</ColumnsTitle>
          <ColumnsSubTitle>{value}</ColumnsSubTitle>
        </div>
      </Columns>
    );
  };

  return (
    <>
      <CardWrapper className="p-2" color="black">
        <CardInnerInfo className="d-flex justify-content-center align-items-center">
          <div>
            <CardLabel> My Holdings </CardLabel>
            <CardValue>{totalInvestment}</CardValue>

            <div className="d-flex mt-2 mb-2 justify-content-center">
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
            Number(initialInvestment).toFixed(2).toString()
          
          )}

          {getSecondCardColumns(
            "Profit/Loss",
            <TotalProfitLoss poolAddress={poolAddress} />,
         
          )}
          {getSecondCardColumns(
            "My ROI",
             roi
            
          )}
          {getSecondCardColumns(
            "My share",
           Number(myShare).toFixed(2).toString()
          )}
        </div>
      </CardWrapper>
    </>
  );
};
