import * as React from "react";
import { IIconProps } from "./interfaces";

export const MeadiumEllipse = (props: IIconProps) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={9} cy={9} r={9} fill="#FAF17F" />
    </svg>
  );
};
