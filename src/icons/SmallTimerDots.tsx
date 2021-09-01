import * as React from "react";
import {IIconProps} from "./interfaces";

export const SmallTimerDots =(props: IIconProps) => {
  return (
    <svg
    width={2}
    height={7}
    viewBox="0 0 2 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.69 6.498c0-.137.043-.253.13-.347a.479.479 0 01.37-.147.483.483 0 01.506.494.463.463 0 01-.135.342.514.514 0 01-.371.129.514.514 0 01-.37-.13.474.474 0 01-.13-.34zm.012-5.43c0-.137.043-.253.13-.347a.479.479 0 01.37-.147.483.483 0 01.506.494.463.463 0 01-.136.342.514.514 0 01-.37.13.514.514 0 01-.37-.13.474.474 0 01-.13-.342z"
      fill="#000"
    />
  </svg>
  )
}

