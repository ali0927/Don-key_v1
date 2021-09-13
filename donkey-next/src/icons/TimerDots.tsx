import * as React from "react";
import {IIconProps} from "./interfaces";

export const TimerDots =(props: IIconProps) => {
  return (
    <svg
      width={6}
      height={33}
      viewBox="0 0 6 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.72 29.89c0-.683.216-1.26.645-1.728.45-.488 1.065-.732 1.846-.732.781 0 1.396.244 1.846.732.449.469.673 1.045.673 1.729 0 .683-.224 1.25-.673 1.699-.45.43-1.065.644-1.846.644-.781 0-1.397-.215-1.846-.644-.43-.45-.644-1.016-.644-1.7zM.78 2.85c0-.684.214-1.26.644-1.729C1.874.633 2.488.39 3.27.39c.78 0 1.396.244 1.845.732.45.469.674 1.045.674 1.729 0 .683-.225 1.25-.674 1.699-.449.43-1.064.644-1.845.644-.782 0-1.397-.214-1.846-.644-.43-.45-.645-1.016-.645-1.7z"
        fill="#000"
      />
    </svg>
  )
}

