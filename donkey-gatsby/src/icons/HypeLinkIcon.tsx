import * as React from "react";
import { IIconProps } from "./interfaces";

export const HyperLinkIcon = (props: IIconProps) => {
    return (
        <svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5.833 7.583a2.917 2.917 0 004.398.315l1.75-1.75a2.917 2.917 0 00-4.124-4.124l-1.003.997"
                stroke="#000"
                strokeWidth={1.167}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.166 6.416A2.917 2.917 0 003.768 6.1l-1.75 1.75a2.917 2.917 0 004.124 4.124l.998-.998"
                stroke="#000"
                strokeWidth={1.167}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

