import * as React from "react"
import {IIconProps} from "./interfaces";

export const UploadIcon = (props: IIconProps) => {
  return (
    <svg
    width={24}
    height={18}
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.753 17.733H13.604v-5.204h1.701c.432 0 .687-.49.432-.843l-3.31-4.58a.527.527 0 00-.858 0l-3.31 4.58a.53.53 0 00.43.843h1.703v5.204H4.624C2.05 17.59 0 15.183 0 12.573c0-1.8.976-3.368 2.423-4.217a3.275 3.275 0 01-.202-1.142A3.321 3.321 0 016.684 4.09 6.658 6.658 0 0112.711.27a6.669 6.669 0 016.62 6.017C21.985 6.743 24 9.2 24 11.98c0 2.972-2.315 5.547-5.247 5.753z"
      fill="#000"
    />
  </svg>
  )
}