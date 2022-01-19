import {useState} from 'react'

export const TableGroup = (props) => {
  const [open,setOpen] = useState(false)

    return  <tr className="table_group" onClick={() => setOpen(true)}>
      {props.children}
    </tr>
}