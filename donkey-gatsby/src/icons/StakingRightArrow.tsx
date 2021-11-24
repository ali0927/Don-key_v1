import * as React from "react";
import { IIconProps } from "./interfaces";

export const StakingRightArrow = (props: IIconProps) => {
  return (
    <svg
      width={15}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.707 8.707a1 1 0 000-1.414L8.343.929A1 1 0 106.93 2.343L12.586 8l-5.657 5.657a1 1 0 101.414 1.414l6.364-6.364zM0 9h14V7H0v2z"
        fill="#000"
      />
    </svg>
  );
};
