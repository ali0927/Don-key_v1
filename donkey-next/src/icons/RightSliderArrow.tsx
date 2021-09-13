

import * as React from "react";
import { IIconProps } from "./interfaces";

export const RightSliderArrow: React.FC<IIconProps> = (props) => {
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
       d="M.46 13.264a1.345 1.345 0 01.951-2.295h15.578l-5.263-5.264a1.345 1.345 0 111.901-1.901l7.56 7.559a1.345 1.345 0 010 1.902l-7.56 7.559a1.345 1.345 0 11-1.901-1.902l5.263-5.264H1.411c-.357 0-.698-.141-.95-.394z"
      fill="#040404"
   />
   </svg>
    )
}
