import { StrategyName } from "components/StrategyName";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
} from "components/Table";
import { useAxios } from "hooks/useAxios";
import moment from "moment";
import { useEffect, useState } from "react";
import { IStrategy } from "interfaces";
import { Form, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { getPoolContract, toEther } from "helpers";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";

const OutlinedButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(34, 34, 34, 1);
  border-radius: 5px;
  width: 100%;
  padding: 5px 20px;
  font-size: 12px;
  &:disabled {
    border-color: #d9d9d9;
    color: #d9d9d9;
  }
`;

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
  return `$${val}`;
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
                  {profit ? formatNum(profit) : "0"}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {tvl ? formatNum(tvl) : "0"}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {item.apy}
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
