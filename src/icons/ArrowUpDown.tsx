import * as React from "react";
import { IIconProps } from "./interfaces";

export const ArrowUpDOwn = (props: IIconProps) => {
  return (
    <svg
        width={13}
        height={13}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
     >
       <path
          d="M5.222 5.167L8.39 2l3.167 3.167M1 8.333L4.166 11.5l3.167-3.167"
          stroke="#222"
          strokeWidth={1.5}
          strokeLinecap="round"
       />
  </svg>
  );
};
