import * as React from "react"
import {IIconProps} from "./interfaces";

export const PositiveIcon =(props: IIconProps) => {
    return (
        <svg
          width={8}
          height={10}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M4.002 10a.463.463 0 01-.461-.465V1.58L.783 4.36a.454.454 0 01-.648 0 .464.464 0 010-.653L3.675.136a.454.454 0 01.65 0l3.54 3.572c.09.09.135.207.135.328 0 .121-.045.238-.135.33a.454.454 0 01-.648 0L4.459 1.583v7.959c0 .25-.202.457-.457.457z"
            fill="#42FF00"
          />
        </svg>
    )
}
