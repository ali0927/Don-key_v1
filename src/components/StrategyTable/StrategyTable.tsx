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
import React, { useEffect, useMemo, useState } from "react";
import { IStrategy } from "interfaces";
import { getPoolContract, toEther, getTotalPoolValue } from "helpers";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { DollarView } from "Pages/FarmerBioPage/DollarView";
import { useRefresh } from "components/LotteryForm/useRefresh";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoIcon } from "icons/InfoIcon";

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

  const hasFees = new BigNumber(totalFee).gt(0);

  const renderTooltipFees = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="mytooltip">
      {hasFees && (
        <React.Fragment>
          <p>This strategy requires swap and protocol fees as the following:</p>
          <ul
            style={{
              textAlign: "left",
            }}
          >
            {getFee("swapInFees") && <li>Swap in: {getFee("swapInFees")}</li>}
            {getFee("swapOutFees") && (
              <li>Swap out: {getFee("swapOutFees")}</li>
            )}
            {getFee("entranceFees") && (
              <li>Entrance fees: {getFee("entranceFees")}</li>
            )}
            {getFee("exitFees") && <li>Exit fees: {getFee("exitFees")}</li>}
          </ul>
          In addition:
          <br />
        </React.Fragment>
      )}
      <strong>
        Farmer performance fee:{" "}
        {poolAddress.toLowerCase() ===
        "0x76406fb2b9C202D9321471504c754e009136328d".toLowerCase()
          ? "0"
          : "10"}
        %
      </strong>
      <br />{" "}
      <strong>
        Don-key Performance fee:{" "}
        {poolAddress.toLowerCase() ===
        "0x76406fb2b9C202D9321471504c754e009136328d".toLowerCase()
          ? "0"
          : "5"}
        %
        <br />
      </strong>{" "}
    </Tooltip>
  );

  return (
    <TableResponsive>
      <Table>
        <colgroup></colgroup>
        <TableHead>
          <TableRow>
            <TableHeading style={{ textAlign: "center" }}>Name</TableHeading>
            {/* <TableHeading style={{ textAlign: "center" }}>Profit</TableHeading> */}
            <TableHeading style={{ textAlign: "center" }}>TVL</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                }}
              >
                Fees
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipFees}
                >
                  <div
                    style={{
                      textAlign: "right",
                      paddingLeft: 10,
                    }}
                  >
                    <InfoIcon />
                  </div>
                </OverlayTrigger>
              </div>
            </TableHeading>
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
                  {item.name}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  <DollarView poolAddress={poolAddress} tokenAmount={tvl} />
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {totalFee}%
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  {new BigNumber(item.apy).multipliedBy(100).toFixed(2) + "%"}
                </TableData>
                <TableData style={{ textAlign: "center" }}>Active</TableData>
                <TableData style={{ textAlign: "center" }}>
                  {formatDate(item.created_at)}
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};
