import * as React from "react";
import { IIconProps } from "./interfaces";

export const LeftSliderArrow: React.FC<IIconProps> = (props) => {
    return (
        <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M23.54 10.736a1.344 1.344 0 01-.951 2.295H7.011l5.263 5.264a1.344 1.344 0 11-1.901 1.901l-7.56-7.559a1.345 1.345 0 010-1.902l7.56-7.559a1.345 1.345 0 011.901 1.902l-5.263 5.264h15.578c.357 0 .699.141.95.394z"
          fill="#040404"
        />
      </svg>
    )
}
