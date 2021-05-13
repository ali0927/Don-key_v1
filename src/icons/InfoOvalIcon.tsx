import * as React from "react"
import {IIconProps} from "./interfaces";

export const InfoOvalIcon =(props:IIconProps )=> {
  return (
    <svg
      width={72}
      height={72}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36z"
        fill="#FFF471"
      />
      <path
        d="M36 22c-8.291 0-15 6.71-15 15 0 8.291 6.71 15 15 15 8.291 0 15-6.71 15-15 0-8.291-6.71-15-15-15zm0 27.656c-6.996 0-12.656-5.66-12.656-12.656S29.004 24.344 36 24.344 48.656 30.004 48.656 37 42.996 49.656 36 49.656z"
        fill="#000"
      />
      <path
        d="M36 34.559c-.647 0-1.172.524-1.172 1.172v7.546a1.172 1.172 0 102.344 0V35.73c0-.647-.525-1.171-1.172-1.171zM36 33.125a1.582 1.582 0 100-3.164 1.582 1.582 0 000 3.164z"
        fill="#000"
      />
    </svg>
  )
}
