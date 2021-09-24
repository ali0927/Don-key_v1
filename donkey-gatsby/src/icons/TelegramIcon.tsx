import * as React from "react";
import {IIconProps} from "./interfaces";

export const TelegramIcon =(props: IIconProps) => {
  return (
    <svg
    width={16}
    height={13}
    viewBox="0 0 16 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.121 8.568l-.258 3.63c.37 0 .53-.16.72-.35l1.732-1.654 3.587 2.627c.657.366 1.12.173 1.298-.605l2.355-11.032c.209-.973-.351-1.353-.992-1.115L.724 5.367c-.944.367-.93.893-.16 1.132l3.538 1.1 8.218-5.142c.386-.256.738-.114.449.142L6.12 8.568z"
      fill="#fff"
    />
  </svg>
  )
}

