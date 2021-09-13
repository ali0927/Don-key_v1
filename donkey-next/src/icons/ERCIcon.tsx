import * as React from "react"
import { IIconProps } from "./interfaces"

export const ERCIcon = (props: IIconProps) => {
  return (
    <svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="url(#prefix__pattern0)" d="M0 0h23v23H0z" />
      <defs>
        <pattern
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#prefix__image0" transform="scale(.00195)" />
        </pattern>
        <image
          id="prefix__image0"
          width={512}
          height={512}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}

