import * as React from "react"
import { IIconProps } from "./interfaces"

export const RightArrowIcon = (props: IIconProps) => {
    return (
        <svg
            width={6}
            height={10}
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M1 8.973l3.929-3.916a.1.1 0 000-.141L1 1"
                stroke="#222"
                strokeLinecap="round"
            />
        </svg>
    )
}
