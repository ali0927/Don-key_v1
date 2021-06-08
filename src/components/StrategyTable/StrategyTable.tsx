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
  showFees,
}: {
  strategies: IStrategy[];
  poolAddress: string;
  showFees?: boolean;
}) => {
  const { tvl } = useTVL(poolAddress);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="mytooltip">
      <p>This strategy requires swap and protocol fees as the following:</p>
      <ul
        style={{
          textAlign: "left",
        }}
      >
        <li>Swap in: 0.185%</li>
        <li>Swap out: 0.185%</li>
        <li>Entrance fees: 0.08%</li>
      </ul>
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
            return (
              <TableRow key={item.id}>
                <TableData style={{ textAlign: "center" }}>
                  {item.strategyName}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  <DollarView poolAddress={poolAddress} tokenAmount={tvl} />
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <div>0.45%</div>
                  </OverlayTrigger>
                </TableData>
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
