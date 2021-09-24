import * as React from "react"
import { IIconProps } from "./interfaces"

export const EmailIcon = (props: IIconProps) => {
  return (
    <svg
    width={23}
    height={23}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5 0C5.149 0 0 5.149 0 11.5S5.149 23 11.5 23 23 17.851 23 11.5 17.851 0 11.5 0zm5.181 6.389l-5.185 4.1-5.354-4.1h10.54zm.534 10.222H5.608v-8.49l5.35 4.057a.92.92 0 00.527.165.736.736 0 00.472-.172l5.258-4.183v8.623z"
      fill="#222"
    />
  </svg>
  )
}

