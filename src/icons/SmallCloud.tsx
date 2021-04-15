import * as React from "react"
import { IIconProps } from "./interfaces";

export const SmallCloud = (props: IIconProps) => {
    return (
        <svg
            width={127}
            height={51}
            viewBox="0 0 127 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M123.664 51c2.123-3.74 3.336-6.063 3.336-9.256 0-9.916-11.733-18.208-26.329-18.435 0-.113.019-.34.019-.453C100.69 10.256 90.075 0 76.977 0 66.61 0 57.832 6.366 54.61 15.281c-3.014-3.608-7.734-5.95-13.041-5.95-9.118 0-16.51 6.838-16.51 15.3 0 .34.038.68.057 1.02a22.678 22.678 0 00-5.592-.718C8.738 24.953 0 32.904 0 42.16c0 3.06.967 5.1 2.635 8.84h121.029z"
                fill="#F8F4F4"
            />
        </svg>
    )
}
