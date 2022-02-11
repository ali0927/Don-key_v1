import {useState} from 'react'

export const TableRow = (props: any) => {
  const [open,setOpen] = useState(false)

    return  <tr className={open ? "folding open" : "folding"}>
      <div className="toggle_fold" onClick={() => setOpen(!open)}>⌵</div>
      {props.children}
    </tr>
}