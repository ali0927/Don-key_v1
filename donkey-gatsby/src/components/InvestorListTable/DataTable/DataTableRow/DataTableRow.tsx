import {
  hideAddress,
  ShowAmount,
} from "components/InvestorListTable/InvestorListTable";
import { TableData, TableRow } from "components/Table";
import React from "react";
import { IDataTableRowProps } from "./interfaces";

export const DataTableRow: React.FC<IDataTableRowProps> = (props) => {
  const { investment, chainId, poolAddress } = props;

  return (
    <>
      <TableRow key={investment.address}>
        <TableData style={{ textAlign: "center" }}>
          {hideAddress(investment.address)}
        </TableData>
        <TableData style={{ textAlign: "center" }}>
          <ShowAmount
            chainId={chainId}
            amount={investment.initialInvestment}
            amountInUSD={investment.initialInvestmentInUSD}
            poolAddress={poolAddress}
          />
        </TableData>

        <TableData style={{ textAlign: "center" }}>
          <ShowAmount
            chainId={chainId}
            amount={investment.claimableAmount}
            amountInUSD={investment.claimableAmountInUSD}
            poolAddress={poolAddress}
          />
        </TableData>
        <TableData style={{ textAlign: "center" }}>
          <ShowAmount
            chainId={chainId}
            amount={investment.profitLoss}
            amountInUSD={investment.profitLossInUSD}
            poolAddress={poolAddress}
          />
          {/* <TotalProfitLoss poolAddress={poolAddress} address={item} /> */}
        </TableData>
        <TableData style={{ textAlign: "center" }}>
          {investment.duration} ago
        </TableData>
      </TableRow>
    </>
  );
};
