import * as React from "react"
import { IIconProps } from "./interfaces"

export const SelectArrow = (props: IIconProps) => {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={22} height={22} rx={5} fill="#222" />
      <path
        d="M15.113 8.06v2.38H7.261l2.141-2.142-.833-.833L5 11.035l3.57 3.568.832-.832-2.141-2.142h9.042v-3.57h-1.19z"
        fill="#fff"
      />
    </svg>
  )
}