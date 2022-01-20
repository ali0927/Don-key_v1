import {useState} from 'react'

export const TableRow = (props) => {
  const [open,setOpen] = useState(false)

    return  <tr className={open ? "open" : ""}>
      <div className="toggle_fold" onClick={() => setOpen(!open)}>⌵</div>
      {props.children}
    </tr>
}