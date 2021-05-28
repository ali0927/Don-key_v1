/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
} from "components/Table";
import moment from "moment";
import { useEffect, useState } from "react";
import { IStrategy } from "interfaces";
import styled from "styled-components";
import { getPoolContract, toEther } from "helpers";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";



const formatDate = (
  date: string | null | undefined,
  defaultVal: string = ""
) => {
  try {
    if (date) {
      return moment(date).format("MMMM Do YYYY");
    }
    return defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const useTVL = (poolAddress: string) => {
  const [tvl, setTvl] = useState("");
  const web3 = useWeb3();
  useEffect(() => {
    (async () => {
      const pool = await getPoolContract(web3, poolAddress);
      const amount = toEther(await pool.methods.getTotalInvestAmount().call());
      setTvl(amount);
    })();
  }, [poolAddress]);
  return { tvl };
};

const useProfit = (poolAddress: string) => {
  const [profit, setprofit] = useState("");
  const web3 = useWeb3();
  useEffect(() => {
    (async () => {
      const pool = await getPoolContract(web3, poolAddress);
      const amount = toEther(await pool.methods.getTotalInvestAmount().call());
      const totalPoolValue = toEther(
        await pool.methods.getinvestedAmountWithReward().call()
      );
      setprofit(new BigNumber(totalPoolValue).minus(amount).toFixed(2));
    })();
  }, [poolAddress]);
  return { profit };
};

const formatNum = (val: string) => {
  return `${Number(val).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} BUSD`;
};

export const StrategyTableForInvestor = ({
  strategies,
  poolAddress,
}: {
  strategies: IStrategy[];
  poolAddress: string;
}) => {
  const { tvl } = useTVL(poolAddress);
  const { profit } = useProfit(poolAddress);
  return (
    <TableResponsive>
      <Table>
        <colgroup></colgroup>
        <TableHead>
          <TableRow>
            <TableHeading style={{ textAlign: "center" }}>Name</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>Profit</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>TVL</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>APY</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>Status</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>
              Created On
            </TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {strategies.map((item, i) => {
            return (
              <TableRow key={item.id}>
                <TableData style={{ textAlign: "center" }}>
                  {item.strategyName}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {formatNum(profit ? profit : "0")}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {formatNum(tvl ? tvl : "0")}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {new BigNumber(item.apy).multipliedBy(100).toFixed(2)+ "%"}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {item.status || "Active"}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {formatDate(item.createdAt)}
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};
