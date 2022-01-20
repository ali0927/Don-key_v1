import { CountDown } from "components/CountDown";
import { PayPopup } from "components/PayPopup";
import { TableRow } from "components/TableRow";
import { useState } from "react";

export const LoansTable = () => {
  const [isPayOpen, setIsPayOpen] = useState(false);

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
            <TableRow>
              <td>1</td>
              <td data-title="last day to pay" className="timer">
                <CountDown date={`2022-03-20T00:00:00`} />
              </td>
              <td data-title="value">$2,280,00</td>
              <td data-title="loan">$2,280,00</td>
              <td data-title="commission">0.003</td>
              <td data-title="total" className="total">
                195
              </td>
              <td>
                <button onClick={() => setIsPayOpen(true)} className="claim">
                  pay
                </button>
              </td>
            </TableRow>
            <TableRow>
              <td>2</td>
              <td data-title="last day to pay" className="timer">
                <CountDown date={`2022-03-20T00:00:20`} />
              </td>
              <td data-title="value">$1,180,00</td>
              <td data-title="loan">$1,180,00</td>
              <td data-title="commission">0.001</td>
              <td data-title="total" className="total">
                164
              </td>
              <td>
                <button className="claim">pay</button>
              </td>
            </TableRow>
            <TableRow className="closed">
              <td>3</td>
              <td data-title="last day to pay" className="timer">
                <CountDown date={`2001-02-10T00:00:00`} />
              </td>
              <td data-title="value">$3,530,00</td>
              <td data-title="loan">$3,530,00</td>
              <td data-title="commission">0.004</td>
              <td data-title="total" className="total">
                195
              </td>
              <td>
                <span className="closed">closed</span>
              </td>
            </TableRow>
          </tbody>
        </table>
      </div>
    </div>
  );
};
