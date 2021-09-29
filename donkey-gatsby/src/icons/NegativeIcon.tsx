import * as React from "react"
import {IIconProps} from "./interfaces";

export const NegativeIcon =(props: IIconProps) => {
    return (
        <svg
          width={8}
          height={10}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M3.998 0c.255 0 .461.208.461.465V8.42L7.217 5.64a.454.454 0 01.648 0c.18.181.18.472 0 .654l-3.54 3.571a.454.454 0 01-.649 0L.135 6.293A.462.462 0 010 5.963c0-.12.045-.237.135-.328a.454.454 0 01.648 0l2.758 2.782V.457c0-.249.202-.457.457-.457z"
            fill="#FF3F25"
          />
        </svg>
      )
}
