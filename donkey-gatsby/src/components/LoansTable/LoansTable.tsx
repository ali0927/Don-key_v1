import { CountDown } from "components/CountDown"

export const LoansTable = () => {
    return  <div className="strip table_strip your_loans" style={{paddingTop: '54px' ,paddingBottom: '104px'}}>
    <div className="boxed">
      <h3>Your Loans</h3>
      <table>
        <thead>
          <tr>
          <th>#</th>
          <th>last day to pay</th>
          <th>value</th>
          <th>Loan</th>
          <th>commision</th>
          <th>total</th>
          <th>action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td className="timer"><CountDown date={`2022-03-20T00:00:00`}/></td>
          <td>$2,280,00</td>
          <td>$2,280,00</td>
          <td>0.003</td>
          <td className="total">195</td>
          <td><button className="claim">pay</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td className="timer"><CountDown date={`2022-03-20T00:00:20`}/></td>
          <td>$1,180,00</td>
          <td>$1,180,00</td>
          <td>0.001</td>
          <td className="total">164</td>
          <td><button className="claim">pay</button></td>
        </tr>
        <tr className="closed">
          <td>3</td>
          <td className="timer"><CountDown date={`2001-02-10T00:00:00`}/></td>
          <td>$3,530,00</td>
          <td>$3,530,00</td>
          <td>0.004</td>
          <td className="total">195</td>
          <td><span className="closed">closed</span></td>
        </tr>
        
        </tbody>
      </table>
      </div>
    </div>
}