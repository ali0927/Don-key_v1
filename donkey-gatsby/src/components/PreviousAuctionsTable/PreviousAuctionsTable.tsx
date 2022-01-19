import {TableGroup} from "components/TableGroup"

export const PreviousAuctionsTable = () => {
    return  <div className="strip table_strip previous_auctions" style={{paddingTop: '71px'}}>
    <div className="boxed">
      <h3>Previous Auctions</h3>
      <table>
        <thead>
          <tr>
          <th>#</th>
          <th>wallet</th>
          <th>strategy lp</th>
          <th>value</th>
          <th>borrow</th>
          <th>commision</th>
          </tr>
        </thead>
        <tbody>
        <TableGroup>
          <td>►</td>
          <td>12/03/2022</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </TableGroup>
        <tr>
          <td>1</td>
          <td>0404sjww1920223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$3,280,00</td>
          <td>$3 280,00</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>2</td>
          <td>0404sjwasdf820223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$1,280,00</td>
          <td>$1 280,00</td>
          <td>10%</td>
        </tr>
        <tr>
          <td>3</td>
          <td>098asdu8ff0223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$2,280,00</td>
          <td>$2 280,00</td>
          <td>9%</td>
        </tr>
        </tbody>
        <tbody>
        <TableGroup>
          <td>►</td>
          <td>11/03/2022</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </TableGroup>
        <tr>
          <td>2</td>
          <td>0404sjwasdf820223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$1,280,00</td>
          <td>$1 280,00</td>
          <td>10%</td>
        </tr>
        <tr>
          <td>3</td>
          <td>098asdu8ff0223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$2,280,00</td>
          <td>$2 280,00</td>
          <td>9%</td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
}