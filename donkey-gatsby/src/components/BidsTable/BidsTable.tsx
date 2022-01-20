

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
          <th>commission</th>
          <th>action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <div className="toggle_fold">⌵</div>
          <td>1</td>
          <td data-title="status" className="status success">successful</td>
          <td data-title="wallet">0404sjww1920223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$2,280,00</td>
          <td data-title="borrow">$2,280,00</td>
          <td data-title="commission">8%</td>
          <td><button>claim</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td data-title="status" className="status pending">pending</td>
          <td data-title="wallet">qqw04sjww1920223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$2,280,00</td>
          <td data-title="borrow">$2,280,00</td>
          <td data-title="commission">12%</td>
          <td><button className="white">See Details</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td data-title="status" className="status rejected">rejected</td>
          <td data-title="wallet">0608sjhw1320223.....</td>
          <td data-title="strategy lp">DON - Curve DAL * *</td>
          <td data-title="value">$2,280,00</td>
          <td data-title="borrow">$2,280,00</td>
          <td data-title="commission">10%</td>
          <td><button className="gray">Unstake LP</button></td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
}