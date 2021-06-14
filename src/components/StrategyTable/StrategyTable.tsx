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
import { useEffect, useMemo, useState } from "react";
import { IStrategy } from "interfaces";
import { getPoolContract, toEther, getTotalPoolValue } from "helpers";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { DollarView } from "Pages/FarmerBioPage/DollarView";
import { useRefresh } from "components/LotteryForm/useRefresh";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
  const { dependsOn } = useRefresh();
  useEffect(() => {
    (async () => {
      let poolValue = await getTotalPoolValue(web3, poolAddress);
      setTvl(web3.utils.fromWei(poolValue, "ether"));
    })();
  }, [poolAddress, dependsOn]);
  return { tvl };
};

// const useProfit = (poolAddress: string) => {
//   const [profit, setprofit] = useState("");
//   const web3 = useWeb3();
//   useEffect(() => {
//     (async () => {
//       const pool = await getPoolContract(web3, poolAddress, 2);
//       const amount = toEther(await pool.methods.getTotalInvestAmount().call());
//       const totalPoolValue = toEther(
//         await pool.methods.getinvestedAmountWithReward().call()
//       );
//       setprofit(new BigNumber(totalPoolValue).minus(amount).toFixed(2));
//     })();
//   }, [poolAddress]);
//   return { profit };
// };

export const StrategyTableForInvestor = ({
  strategies,
  poolAddress,
}: {
  strategies: IStrategy[];
  poolAddress: string;
}) => {
  const { tvl } = useTVL(poolAddress);

  const getFee = (key: keyof IStrategy) => {
    const item = strategies[0];
    if (item) {
      return item[key];
    }
    return null;
  };
  const totalFee = useMemo(() => {
    const item = strategies[0];
    const swapIn = item.swapInFees;
    const swapOut = item.swapOutFees;
    const entranceFee = item.entranceFees;
    const exitFee = item.exitFees;
    const sum = [swapIn, swapOut, entranceFee, exitFee]
      .filter((item) => !!item)
      .map((item) => {
        return item?.replace("~", "").replace("%", "");
      })
      .reduce(
        (prev, next) => new BigNumber(prev || 0).plus(next || 0).toString(),
        "0"
      );
    return sum || 0;
  }, [strategies]);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="mytooltip">
      <p>This strategy requires swap and protocol fees as the following:</p>
      <ul
        style={{
          textAlign: "left",
        }}
      >
        {getFee("swapInFees") && <li>Swap in: {getFee("swapInFees")}</li>}
        {getFee("swapOutFees") && <li>Swap out: {getFee("swapOutFees")}</li>}
        {getFee("entranceFees") && (
          <li>Entrance fees: {getFee("entranceFees")}</li>
        )}
        {getFee("exitFees") && <li>Exit fees: {getFee("exitFees")}</li>}
      </ul>
    </Tooltip>
  );
  const hasFees = new BigNumber(totalFee).gt(0);

  return (
    <TableResponsive>
      <Table>
        <colgroup></colgroup>
        <TableHead>
          <TableRow>
            <TableHeading style={{ textAlign: "center" }}>Name</TableHeading>
            {/* <TableHeading style={{ textAlign: "center" }}>Profit</TableHeading> */}
            <TableHeading style={{ textAlign: "center" }}>TVL</TableHeading>
            {hasFees && (
              <TableHeading style={{ textAlign: "center" }}>Fees</TableHeading>
            )}
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
                  <DollarView poolAddress={poolAddress} tokenAmount={tvl} />
                </TableData>
                {hasFees && (
                  <TableData style={{ textAlign: "center" }}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <div>{totalFee}%</div>
                    </OverlayTrigger>
                  </TableData>
                )}
                <TableData style={{ textAlign: "center" }}>
                  {new BigNumber(item.apy).multipliedBy(100).toFixed(2) + "%"}
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
