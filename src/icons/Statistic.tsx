import * as React from "react";
import {IIconProps} from "./interfaces";

export const StatisticIcon = (props: IIconProps) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)" fill="#222">
        <path d="M19.414 18.828h-.625L18.93.586A.586.586 0 0018.345 0H16a.586.586 0 00-.586.586l-.14 18.242h-1.172V9.96a.586.586 0 00-.586-.586h-2.344a.586.586 0 00-.586.586v8.867H9.414v-4.18a.586.586 0 00-.586-.586H6.484a.586.586 0 00-.586.586v4.18H4.727v-6.523a.586.586 0 00-.586-.586H1.797a.586.586 0 00-.586.586v6.523H.586a.586.586 0 100 1.172h18.828a.586.586 0 100-1.172z" />
        <path d="M5.043 6.04H5.02a.435.435 0 01-.435-.435.458.458 0 10-.917 0A1.352 1.352 0 005.02 6.957h.023v.458a.458.458 0 00.917 0v-.458a1.375 1.375 0 100-2.75V3.29h.01c.247 0 .448.201.448.449a.458.458 0 00.917 0A1.365 1.365 0 005.97 2.374h-.01v-.459a.458.458 0 00-.917 0v.459a1.375 1.375 0 100 2.75v.916zm.917 0v-.916a.458.458 0 010 .916zm-.917-2.75v.917a.458.458 0 110-.917zm.458 5.959a4.583 4.583 0 110-9.167 4.583 4.583 0 010 9.167z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
