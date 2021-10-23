import React from "react";
import {
  TableResponsive,
  Table,
  TableHead,
  TableRow,
  TableHeading,
  TableBody,
} from "components/Table";
import { Paginate } from "components/Paginate";
import { IDataTableProps } from "./interfaces";
import { DataTableRow } from "./DataTableRow";
import { useInvestments } from "../hooks";
import { Spinner } from "react-bootstrap";
import clsx from "clsx";
import { TableHeadingToolTip } from "../ToolTip";


export const NewPoolListUpdated = [
  {
    address: "0x66bf2E433c9B9aD56d952845F32201F727A8eD52",
    date: "22/10/2021",
  },
  {
    address: "0x965534Bd90e2A2135756f60F97798B833E461739",
    date: "18/10/2021",
  },
  {
    address: "0x57c1fEc5A17EaF4F0C8597e7be7E6CC32AA488d6",
    date: "23/10/2021",
  },
];

export const DataTable: React.FC<IDataTableProps> = (props) => {
  const { poolAddress, chainId, pool, tokenPrice, poolVersion } = props;

  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const rowsLimit = 50;

  const { investmentsList, loading } = useInvestments({
    investors: props.investorsList,
    chainId: chainId,
    currentPageNumber: pageNumber,
    pool: pool,
    tokenPrice: tokenPrice,
    poolAddress: poolAddress,
    rowsLimit,
    poolVersion,
  });

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const totalPages = Math.ceil(props.investorsList.length / rowsLimit);

  if (props.investorsList.length === 0) {
    return null;
  }

  const renderCaption = () => {
    
    const item = NewPoolListUpdated.find(
      (item) => item.address.toLowerCase() === poolAddress.toLowerCase()
    );
    if (item) {
      return (
        <TableHeadingToolTip
          label="Duration"
          position="right"
          message={`Pool contract has been updated to V2 on ${item.date}. Investor list data
      is on-chain based.`}
        />
      );
    }
    return <>Duration</>;
  };

  return (
    <>
      {props.investorsList.length > rowsLimit && (
        <Paginate totalItems={totalPages} onChange={handlePageChange} />
      )}

      <TableResponsive className="d-none d-lg-block d-xl-block">
        <Table className={clsx({ "mb-0": loading })}>
          <TableHead>
            <TableRow>
              <TableHeading style={{ textAlign: "center" }}>
                Investor
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Invested Amount
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Claimable Amount
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Profit/Loss
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                {renderCaption()}
              </TableHeading>
            </TableRow>
          </TableHead>

          {!loading && (
            <TableBody>
              {investmentsList.map((item) => {
                return (
                  <DataTableRow
                    key={item.address}
                    investment={item}
                    chainId={chainId}
                    poolAddress={poolAddress}
                    poolVersion={poolVersion}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
        {loading && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: 200, background: "#fff" }}
          >
            <Spinner animation="border" color="dark" />
          </div>
        )}
      </TableResponsive>
    </>
  );
};
