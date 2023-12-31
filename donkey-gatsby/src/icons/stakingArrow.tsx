import * as React from "react";
import { IIconProps } from "./interfaces";

const StakingArrow = (props: IIconProps) => {
  return (
    <svg
      width="23"
      height="20"
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.634 0.499999C11.0189 -0.166668 11.9811 -0.166667 12.366 0.5L22.3253 17.75C22.7102 18.4167 22.2291 19.25 21.4593 19.25H1.54071C0.770906 19.25 0.289782 18.4167 0.674682 17.75L10.634 0.499999Z"
        fill="#FAC200"
      />
    </svg>
  );
};

export default StakingArrow;
