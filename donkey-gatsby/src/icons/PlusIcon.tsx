import * as React from "react";
import { IIconProps } from "./interfaces";

export const PlusIcon = (props: IIconProps) => {
  return (
    <svg
      width={14}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 7v5.565V7zm0 0V1.435M7 7h5.565M7 7H1.435"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
