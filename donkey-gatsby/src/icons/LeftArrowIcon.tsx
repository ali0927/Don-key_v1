import * as React from "react"
import { IIconProps } from "./interfaces"

export const LeftArrow = (props: IIconProps) =>  {
  return (
    <svg
      width={6}
      height={10}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 8.973L1.071 5.057a.1.1 0 010-.141L5 1"
        stroke="#222"
        strokeLinecap="round"
      />
    </svg>
  )
}
