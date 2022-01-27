import {TableGroup} from "components/TableGroup"

export const PreviousAuctionsTable = () => {
    return  <div className="strip table_strip previous_auctions" style={{paddingTop: '71px'}}>
    <div className="boxed">
      <h3>Previous Auctions</h3>
      <table className="previous_auctions_head">
        <thead>
          <tr>
          <th>#</th>
          <th>wallet</th>
          <th>strategy lp</th>
          <th>value</th>
          <th>borrow</th>
          <th>commission</th>
          </tr>
        </thead>
        
      </table>
      <TableGroup date="12/03/2022">
      <tr>
          <td>1</td>
          <td data-title="wallet">040h329sdf820223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$1,650,00</td>
          <td data-title="borrow">$1 320,00</td>
          <td data-title="commission">9%</td>
        </tr>
        <tr>
          <td>2</td>
          <td data-title="wallet">0404sjwasdf820223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$1,280,00</td>
          <td data-title="borrow">$1 280,00</td>
          <td data-title="commission">10%</td>
        </tr>
        <tr>
          <td data-title="">3</td>
          <td data-title="wallet">098asdu8ff0223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$2,280,00</td>
          <td data-title="borrow">$2 280,00</td>
          <td data-title="commission">9%</td>
        </tr>
        </TableGroup>
        <TableGroup date="9/03/2022">
        <tr>
          <td data-title="">1</td>
          <td data-title="wallet">0404sjwasdf820223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$1,280,00</td>
          <td data-title="borrow">$1 280,00</td>
          <td data-title="commision">10%</td>
        </tr>
        <tr>
          <td data-title="">2</td>
          <td data-title="wallet">098asdu8ff0223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$2,280,00</td>
          <td data-title="borrow">$2 280,00</td>
          <td data-title="commission">9%</td>
        </tr>
        </TableGroup>
      </div>
    </div>
}