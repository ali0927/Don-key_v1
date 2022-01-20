import { ClaimPopup } from "components/ClaimPopup";
import { TableRow } from "components/TableRow";
import { useState } from "react";

export const BidsTable = () => {
  const [openClaim, setOpenClaim] = useState(false);
  return (
    <div
      className="strip table_strip your_bids"
      style={{ paddingTop: "165px" }}
    >
      <div className="boxed">
        <h3>Your Bids</h3>
        <table>
          {openClaim && (
            <ClaimPopup open={openClaim} onClose={() => setOpenClaim(false)} />
          )}
          <thead>
            <TableRow>
              <th>#</th>
              <th>status</th>
              <th>wallet</th>
              <th>sTableRowategy lp</th>
              <th>value</th>
              <th>borrow</th>
              <th>commission</th>
              <th>action</th>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <td>1</td>
              <td data-title="status" className="status success">
                successful
              </td>
              <td data-title="wallet">0404sjww1920223.....</td>
              <td data-title="sTableRowategy lp">DON - Curve DAL * *</td>
              <td data-title="value">$2,280,00</td>
              <td data-title="borrow">$2,280,00</td>
              <td data-title="commission">8%</td>
              <td>
                <button onClick={(e) => setOpenClaim(true)}>claim</button>
              </td>
            </TableRow>
            <TableRow>
              <td>2</td>
              <td data-title="status" className="status pending">
                pending
              </td>
              <td data-title="wallet">qqw04sjww1920223.....</td>
              <td data-title="sTableRowategy lp">DON - Curve DAL * *</td>
              <td data-title="value">$2,280,00</td>
              <td data-title="borrow">$2,280,00</td>
              <td data-title="commission">12%</td>
              <td>
                <button className="white">See Details</button>
              </td>
            </TableRow>
            <TableRow>
              <td>3</td>
              <td data-title="status" className="status rejected">
                rejected
              </td>
              <td data-title="wallet">0608sjhw1320223.....</td>
              <td data-title="sTableRowategy lp">DON - Curve DAL * *</td>
              <td data-title="value">$2,280,00</td>
              <td data-title="borrow">$2,280,00</td>
              <td data-title="commission">10%</td>
              <td>
                <button className="gray">Unstake LP</button>
              </td>
            </TableRow>
          </tbody>
        </table>
      </div>
    </div>
  );
};
