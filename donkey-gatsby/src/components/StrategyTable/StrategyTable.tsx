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
import React, { useMemo } from "react";
import { IStrategy } from "interfaces";

import BigNumber from "bignumber.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTVL } from "hooks";
import { isNull } from "lodash";
import { DollarView } from "components/DollarView/DollarView";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";
const Table1 = styled.table`
  border-collapse: separate;
  border-radius: 10px;
  text-align: center;
`;

const TableData1 = styled.td`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
`;

const TableHead1 = styled.thead`
  font-size: 12px;
  font-weight: 500;
  text-align: left;
`;

const TableHeading1 = styled.th`
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  font-weight: 500;
  color: #c4c4c4;
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

export const StrategyTableForInvestor = ({
  strategies,
  poolAddress,
  farmerfee,
  performancefee,
  chainId,
}: {
  strategies: IStrategy[];
  poolAddress: string;
  chainId: number;
  farmerfee: number;
  performancefee: number;
}) => {
  const { tvl } = useTVL(poolAddress, chainId);

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
        Farmer performance fee: {isNull(farmerfee) ? "10" : farmerfee}%
      </strong>
      <br />{" "}
      <strong>
        Don-key Performance fee: {isNull(performancefee) ? "5" : performancefee}
        %
        <br />
      </strong>{" "}
    </Tooltip>
  );

  return (
    <>
      {strategies.map((item) => (
        <>
          <Table1
            className="mobile-table table table-borderless table-light d-md-none d-lg-none d-xl-none"
            style={{ borderRadius: "10px", padding: 10 }}
          >
            <TableHead1 style={{ borderBottomStyle: "none" }}>
              <TableRow>
                <TableHeading1
                  style={{
                    textAlign: "left",
                    borderRadius: "10px",
                    width: "40%",
                  }}
                >
                  Name
                </TableHeading1>
                <TableHeading1 style={{ textAlign: "left", width: "40%" }}>
                  TVL
                </TableHeading1>
                <TableHeading1
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    width: "20%",
                  }}
                >
                  Fees
                </TableHeading1>
              </TableRow>
            </TableHead1>
            <TableBody>
              <TableRow>
                <TableData1>{item.name}</TableData1>
                <TableData1>
                  <DollarView
                    chainId={chainId}
                    poolAddress={poolAddress}
                    tokenAmount={tvl}
                  />
                </TableData1>
                <TableData1 style={{ textAlign: "center" }}>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipFees}
                  >
                    <svg
                      width={13}
                      height={16}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx={6.5} cy={6.5} r={6} stroke="#FAC200" />
                      <path
                        d="M6.915 10.219h-.903V4.936h.903v5.283zm-.977-6.685c0-.146.044-.27.132-.37.091-.102.225-.152.4-.152.176 0 .31.05.401.151.091.101.137.225.137.371a.516.516 0 01-.137.366c-.091.098-.225.147-.4.147-.176 0-.31-.049-.4-.147a.527.527 0 01-.133-.366z"
                        fill="#F6C301"
                      />
                    </svg>
                  </OverlayTrigger>
                </TableData1>
              </TableRow>
            </TableBody>
            <TableHead1 style={{ borderBottomStyle: "none" }}>
              <TableRow>
                <TableHeading1 style={{ textAlign: "left", width: "40%" }}>
                  Created
                </TableHeading1>
                <TableHeading1 style={{ textAlign: "left", width: "40%" }}>
                  Status
                </TableHeading1>
                <TableHeading1 style={{ width: "20%", textAlign: "center" }}>
                  APY
                </TableHeading1>
              </TableRow>
            </TableHead1>
            <TableBody>
              <TableRow>
                <TableData1 style={{ borderRadius: "10px" }}>
                  {moment(item.created_at).format("DD.MM.YYYY")}
                </TableData1>
                <TableData1>Active</TableData1>
                <TableData1 style={{ borderRadius: "10px" }}>
                  {new BigNumber(item.apy).toFixed(2) + "%"}
                </TableData1>
              </TableRow>
            </TableBody>
          </Table1>
        </>
      ))}

      <TableResponsive className="d-none d-md-block d-lg-block d-xl-block">
        <Table>
          {/* <colgroup></colgroup> */}
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
                      <FiInfo />
                    </div>
                  </OverlayTrigger>
                </div>
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>APY</TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Status
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Created On
              </TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {strategies.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableData style={{ textAlign: "center" }}>
                    {item.name}
                  </TableData>
                  <TableData style={{ textAlign: "center" }}>
                    <DollarView
                      chainId={chainId}
                      poolAddress={poolAddress}
                      tokenAmount={tvl}
                    />
                  </TableData>
                  <TableData style={{ textAlign: "center" }}>
                    {totalFee}%
                  </TableData>
                  <TableData style={{ textAlign: "center" }}>
                    {new BigNumber(item.apy).toFixed(2) + "%"}
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
    </>
  );
};
