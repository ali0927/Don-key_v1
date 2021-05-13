import * as React from "react"
import {IIconProps} from "./interfaces";

export const LeftArrowMediumSIze = (props: IIconProps)=> {
  return (
    <svg
      width={10}
      height={18}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.634 2.195L3.018 9l6.616 6.805a1.312 1.312 0 010 1.818 1.226 1.226 0 01-1.768 0L.366 9.91a1.312 1.312 0 010-1.818l7.5-7.714a1.226 1.226 0 011.768 0 1.312 1.312 0 010 1.818z"
        fill="#000"
      />
    </svg>
  )
}
