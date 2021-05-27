import { ButtonWidget, ContainedButton } from "components/Button";
import { PoolReserveAmount } from "components/PoolReserveAmount";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import {
  calculateInitialInvestment,
  calculateWithdrawAmount,
  getBUSDBalance,
  getPoolContract,
  getTotalPoolValue,
} from "helpers";
import React, { useState, useEffect } from "react";
import { useWeb3 } from "don-components";
import styled from "styled-components";
import { BigNumber } from "bignumber.js";
import { parse } from "graphql";
import { IMyInvestments } from "../interfaces";
import { useROIAndInitialInvestment } from "hooks/useROIAndInitialInvestment";
import { useCalInvestmentsChart } from "./useCalInvestmenstChart";
import {
  ErrorSnackbar,
  ProgressSnackbar,
  SuccessSnackbar,
} from "components/Snackbars";
import { useSnackbar } from "notistack";
import { useAxios } from "hooks/useAxios";

const CardWrapper = styled.div`
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
  border-right: 1px solid #b4b4b4;
  height: 66px;
  padding-top: 5px;
  padding-bottom: 5px;
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
  color: rgba(255, 255, 255, 0.7);
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
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  word-break: break-word;
  letter-spacing: 0em;
  margin-bottom: 0;
  text-align: center;
  color: ${(props: { color: "white" | "black" }) =>
    props.color === "black" ? "#070602" : "#fff"};
`;

const ColumnsSubTitleColored = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  word-break: break-word;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 0;
  color: ${(props: { color: any }) => props.color};
`;

const ColumnsTitle1 = styled(ColumnsTitleColored)`
  font-size: 14px;
`;

export const InvestmentBlackBox = ({
  myInvestments,
  onRefresh,
}: {
  myInvestments: IMyInvestments[];
  onRefresh: () => void;
}) => {
  const web3 = useWeb3();

  const { profitloss, investedTotal, initialInvestmentTotal, roi } =
    useCalInvestmentsChart(web3, myInvestments);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [{}, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );

  const handleWithDrawAll = async () => {
    let key: string | undefined = undefined;
    try {
      if (myInvestments.length > 0) {
        const accounts = await web3.eth.getAccounts();
        for (let investment of myInvestments) {
          const pool = await getPoolContract(web3, investment.poolAddress);

          key = enqueueSnackbar("Withdrawal is in Progress", {
            content: (key, msg) => <ProgressSnackbar message={msg as string} />,
            persist: true,
          }) as string;

          await pool.methods.withdrawLiquidity().send({ from: accounts[0] });

          await executeDelete({
            data: {
              poolAddress: investment.poolAddress,
            },
          });

          if (key) {
            closeSnackbar(key);
          }
          onRefresh();
          enqueueSnackbar("Withdrawal SuccessFull", {
            content: (key, msg) => <SuccessSnackbar message={msg as string} />,
            persist: false,
          }) as string;
        }
      }
    } catch (err) {
      console.trace(err, "error from withdrawal");
      if (key) {
        closeSnackbar(key);
      }
      enqueueSnackbar("Withdrawal Failed", {
        content: (key, msg) => <ErrorSnackbar message={msg as string} />,
        persist: false,
      }) as string;
    }
  };

  const getSecondCardColumns = (
    label: string,
    value: string | React.ReactNode
  ) => {
    return (
      <Columns className="col-md-3 d-flex flex-column align-items-center justify-content-between">
        <ColumnsTitle> {label}</ColumnsTitle>
        <ColumnsSubTitle color="white">{value}</ColumnsSubTitle>
      </Columns>
    );
  };

  return (
    <>
      <CardWrapper className="p-2 py-5" color="black">
        <CardInnerInfo className="d-flex mb-1 justify-content-center align-items-center">
          <div>
            <CardLabel color="white"> My Holdings </CardLabel>
            <CardValue color="white">{investedTotal}</CardValue>

            <div className="d-flex mt-2 justify-content-center">
              <ButtonWidget
                varaint="contained"
                containedVariantColor="lightYellow"
                fontSize="14px"
                height="30px"
                width="119px"
                onClick={handleWithDrawAll}
                className="ml-2"
              >
                Withdraw
              </ButtonWidget>
            </div>
          </div>
        </CardInnerInfo>
        <div className="row justify-content-center">
          {getSecondCardColumns(
            "Initial Investment",
            "$ " + initialInvestmentTotal
          )}

          {getSecondCardColumns("Profit/Loss", profitloss)}
          {getSecondCardColumns("My ROI", roi+ "%")}
        </div>
      </CardWrapper>
    </>
  );
};
