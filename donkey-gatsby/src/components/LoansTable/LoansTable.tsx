import { FindStrategy } from "components/BidsTable";
import { CountDown } from "components/CountDown";
import { PayPopup } from "components/PayPopup";
import { TableRow } from "components/TableRow";
import { formatNum } from "helpers";
import { IStoreState } from "interfaces";
import { useState } from "react";
import { useSelector } from "react-redux";

export const LoansTable = () => {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const loans = useSelector((state: IStoreState) => state.auctions.loans);

  if (loans.status === "FETCH_SUCCESS" && loans.data.length > 0) {
    return (
      <div
        className="strip table_strip your_loans"
        style={{ paddingTop: "54px", paddingBottom: "104px" }}
      >
        {isPayOpen && <PayPopup open onClose={() => setIsPayOpen(false)} />}
        <div className="boxed">
          <h3>Your Loans</h3>
          <table>
            <thead>
              <TableRow>
                <th>#</th>
                <th>last day to pay</th>
                <th>value</th>
                <th>Loan</th>
                <th>commission</th>
                <th>total</th>
                <th>action</th>
              </TableRow>
            </thead>
            <tbody>
              {loans.data.map((item, index) => {
                return (
                  <TableRow>
                    <td>{index + 1}</td>
                    <td data-title="last day to pay" className="timer">
                      <CountDown date={item.settlementTime} />
                    </td>
                    <FindStrategy address={item.lpAddress}>
                      {({ lptoken }) => {
                        return (
                          <>
                            {" "}
                            <td data-title="value">
                              {formatNum(item.lendedAmount)} {lptoken.symbol}
                            </td>
                            <td data-title="loan">
                              {formatNum(item.borrowedAmount)} {lptoken.symbol}
                            </td>
                            <td data-title="commission">
                              {formatNum(item.commission)} {lptoken.symbol}
                            </td>
                            <td data-title="total" className="total">
                              {formatNum(item.totalAmountTobePaid)}{" "}
                              {lptoken.symbol}
                            </td>
                          </>
                        );
                      }}
                    </FindStrategy>
                    <td>
                      <button
                        onClick={() => setIsPayOpen(true)}
                        className="claim"
                      >
                        Pay
                      </button>
                    </td>
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return null;
};
