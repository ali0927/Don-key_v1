import * as React from "react"
import {IIconProps} from "./interfaces";

export const EraserIcon = (props: IIconProps) => {
  return (
    <svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.28 9.322c.96-.96.96-2.516 0-3.476l-.005-.005-3.81-3.795a2.468 2.468 0 00-3.48 0l-8.215 8.22-2.628 2.623c-.96.955-.96 2.51-.004 3.47l2.34 2.342H.486a.486.486 0 00-.485.484c0 .267.218.485.485.485H14.9a.486.486 0 00.485-.485.486.486 0 00-.485-.484h-3.994l1.158-1.15 8.216-8.23zM9.534 18.7H5.846l-3.02-3.025a1.49 1.49 0 010-2.104l2.283-2.278 5.923 5.914L9.534 18.7zm-3.737-8.09l7.877-7.877a1.492 1.492 0 012.108 0l3.81 3.8a1.492 1.492 0 010 2.109l-7.872 7.891-5.923-5.923z"
        fill="#000"
        opacity={0.4}
      />
    </svg>
  )
}

