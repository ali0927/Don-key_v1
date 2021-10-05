import React from "react";
import {
  TableResponsive,
  Table,
  TableHead,
  TableRow,
  TableHeading,
  TableBody,
  TableData,
} from "components/Table";
import { Paginate } from "components/Paginate";
import { IDataTableProps } from "./interfaces";
import { DataTableRow } from "./DataTableRow";
import { IInvestment, IInvestorsAPIData } from "../interfaces/IInvestors";
import { useInvestments } from "../hooks";
import { Spinner } from "react-bootstrap";
import clsx from "clsx";

export const DataTable: React.FC<IDataTableProps> = (props) => {
  const { poolAddress, chainId, pool, tokenPrice } = props;

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
  });

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const totalPages = Math.ceil(props.investorsList.length / rowsLimit);

  if (props.investorsList.length === 0) {
    return null;
  }

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
                Duration
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
