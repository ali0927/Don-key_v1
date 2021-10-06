import * as React from "react";
import { IIconProps } from "./interfaces";

export const PaginateLeftArrow = (props: IIconProps) => {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 4.5L7.5 12l7.5 7.5"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
