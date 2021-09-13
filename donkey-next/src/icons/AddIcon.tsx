import * as React from "react"
import {IIconProps} from "./interfaces";

export const AddIcon =(props: IIconProps) => {
  return (
    <svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={27} height={27} rx={2} fill="#2D2900" />
      <path
        d="M14.818 12.041h3.526v2.549h-3.526v3.984h-2.685V14.59H8.598V12.04h3.535V8.223h2.685v3.818z"
        fill="#fff"
      />
    </svg>
  )
}
