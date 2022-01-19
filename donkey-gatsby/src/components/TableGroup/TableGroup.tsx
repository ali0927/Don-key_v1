import {useState} from 'react'

export const TableGroup = (props) => {
  const [open,setOpen] = useState(false)

    return  <div className={open ? "table_group open" : "table_group"}><table>
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
      <tr onClick={() => setOpen(!open)}>
          <td>►</td>
          <td>{props.date}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      {props.children}
    </tbody>
    </table>
    </div>
}