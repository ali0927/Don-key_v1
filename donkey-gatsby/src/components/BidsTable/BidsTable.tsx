

export const BidsTable = () => {
    return   <div className="strip table_strip your_bids" style={{paddingTop: '165px'}}>
    <div className="boxed">
      <h3>Your Bids</h3>
      <table>
        <thead>
          <tr>
          <th>#</th>
          <th>status</th>
          <th>wallet</th>
          <th>strategy lp</th>
          <th>value</th>
          <th>borrow</th>
          <th>comission</th>
          <th>action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td className="status success">successful</td>
          <td>0404sjww1920223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$2,280,00</td>
          <td>$2,280,00</td>
          <td>8%</td>
          <td><button>claim</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td className="status pending">pending</td>
          <td>qqw04sjww1920223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$2,280,00</td>
          <td>$2,280,00</td>
          <td>12%</td>
          <td><button className="white">See Details</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td className="status rejected">rejected</td>
          <td>0608sjhw1320223.....</td>
          <td>DON - Curve DAL * *</td>
          <td>$2,280,00</td>
          <td>$2,280,00</td>
          <td>10%</td>
          <td><button className="gray">Unstake LP</button></td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
}