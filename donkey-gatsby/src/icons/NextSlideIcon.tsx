import * as React from "react";
import { IIconProps } from "./interfaces";

export const NextSlideIcon = (props: IIconProps) => {
  return (
    <svg
      width={21}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.508 5.16a.687.687 0 00-.086-.87L16.297.165a.687.687 0 00-.97.97l2.95 2.956H.687a.688.688 0 100 1.375h17.59l-2.95 2.953a.687.687 0 10.97.97l4.125-4.126a.616.616 0 00.086-.103z"
        fill="#222"
      />
    </svg>
  );
};
