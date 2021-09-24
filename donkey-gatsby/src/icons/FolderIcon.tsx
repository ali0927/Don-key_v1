import * as React from "react"
import { IIconProps } from "./interfaces";

export const FolderIcon = (props: IIconProps) => {
    return (
        <svg
            width={23}
            height={23}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#prefix__clip0)">
                <path
                    d="M22.732 10.67c-.349-.563-.967-.9-1.652-.9h-1.711V6.632c0-.758-.639-1.374-1.424-1.374H9.569a.047.047 0 01-.024-.006L8.046 3.156a1.44 1.44 0 00-1.172-.594h-5.45C.64 2.563 0 3.18 0 3.937v15.056c0 .775.655 1.406 1.46 1.406H18.41a.673.673 0 00.603-.374l3.799-7.63a1.762 1.762 0 00-.08-1.723zM1.425 3.91h5.449c.04 0 .067.018.076.03l1.501 2.1c.254.354.672.566 1.118.566h8.376c.047 0 .07.022.076.03V9.77H5.826c-.756 0-1.444.426-1.752 1.086L1.348 16.69V3.94c.006-.008.03-.03.077-.03zm20.181 7.884l-3.612 7.256H1.732l3.563-7.623c.086-.185.3-.31.531-.31H21.08c.215 0 .405.099.506.263.058.092.107.24.02.414z"
                    fill="#848484"
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" d="M0 0h23v23H0z" />
                </clipPath>
            </defs>
        </svg>
    )
}
