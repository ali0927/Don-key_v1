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

  return (
    <TableResponsive>
      <Table>
        <colgroup></colgroup>
        <TableHead>
          <TableRow>
            <TableHeading style={{ textAlign: "center" }}>Name</TableHeading>
            {/* <TableHeading style={{ textAlign: "center" }}>Profit</TableHeading> */}
            <TableHeading style={{ textAlign: "center" }}>TVL</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>Fees</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>APY</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>Status</TableHeading>
            <TableHeading style={{ textAlign: "center" }}>
              Created On
            </TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {strategies.map((item, i) => {
            let entranceFees =
              item.entranceFees !== undefined &&
              item.entranceFees &&
              parseFloat(item.entranceFees);
            let swapInFees =
              item.swapInFees !== undefined &&
              item.swapInFees &&
              parseFloat(item.swapInFees);
            let swapOutFees =
              item.swapOutFees !== undefined &&
              item.swapOutFees &&
              parseFloat(item.swapOutFees);
            let totalFees =
              typeof entranceFees === "number"
                ? entranceFees
                : 0 + typeof swapInFees === "number"
                ? swapInFees
                : 0 + typeof swapOutFees === "number"
                ? swapOutFees
                : 0;
            console.log(totalFees);
            return (
              <TableRow key={item.id}>
                <TableData style={{ textAlign: "center" }}>
                  {item.strategyName}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  <DollarView poolAddress={poolAddress} tokenAmount={tvl} />
                </TableData>
                {totalFees > 0 ? (
                  <TableData style={{ textAlign: "center" }}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip" className="mytooltip">
                          <p>
                            This strategy requires swap and protocol fees as the
                            following:
                          </p>
                          <ul
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <li>
                              Swap in:{" "}
                              {item.swapInFees !== undefined &&
                              parseFloat(item.swapInFees) > 0
                                ? item.swapInFees
                                : 0}
                              {"%"}
                            </li>
                            <li>
                              Swap out:{" "}
                              {item.swapOutFees !== undefined &&
                              parseFloat(item.swapOutFees) > 0
                                ? item.swapOutFees
                                : 0}
                              {"%"}
                            </li>
                            <li>
                              Entrance fees:{" "}
                              {item.entranceFees !== undefined &&
                              parseFloat(item.entranceFees) > 0
                                ? item.entranceFees
                                : 0}
                              {"%"}
                            </li>
                            <li>
                              Exit fees:{" "}
                              {item.exitFees !== undefined &&
                              parseFloat(item.exitFees) > 0
                                ? item.exitFees
                                : 0}
                              {"%"}
                            </li>
                          </ul>
                        </Tooltip>
                      }
                    >
                      <div>{totalFees}</div>
                    </OverlayTrigger>
                  </TableData>
                ) : (
                  <TableData style={{ textAlign: "center" }}>-</TableData>
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
