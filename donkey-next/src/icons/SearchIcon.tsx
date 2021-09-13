import * as React from "react";
import {IIconProps} from "./interfaces";

export const SearchIcon = (props: IIconProps) => {
    return (
        <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M17.065 16.394l-4.245-4.25a6.895 6.895 0 001.794-4.64A6.922 6.922 0 007.697.577c-3.82 0-6.918 3.1-6.918 6.925a6.921 6.921 0 006.918 6.925c1.65 0 3.164-.58 4.353-1.546l4.262 4.266a.533.533 0 00.753-.754zm-9.368-3.031a5.856 5.856 0 01-5.853-5.86c0-3.236 2.62-5.86 5.853-5.86a5.856 5.856 0 015.853 5.86c0 3.236-2.62 5.86-5.853 5.86z"
          fill="#929292"
        />
      </svg>
    )
}
