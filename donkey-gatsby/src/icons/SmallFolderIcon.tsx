import * as React from "react";
import {IIconProps} from "./interfaces";

export const SmallFolderIcon =(props: IIconProps) => {
  return (
    <svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_dash)">
        <path
          d="M14.944 6.96a1.243 1.243 0 00-1.07-.588h-1.109V4.326c0-.494-.414-.896-.922-.896H6.416a.03.03 0 01-.015-.004L5.43 2.06a.931.931 0 00-.76-.387H1.14c-.51 0-.924.402-.924.896v9.819c0 .505.424.916.946.916h10.983c.171 0 .319-.099.39-.243l2.462-4.976c.178-.36.159-.78-.053-1.124zM1.14 2.55h3.53c.027 0 .045.012.05.02l.973 1.37c.164.23.435.369.724.369h5.427c.03 0 .046.014.05.02v2.043H3.99c-.49 0-.935.278-1.135.709l-1.767 3.804V2.57c.004-.005.02-.02.05-.02zm13.076 5.142l-2.34 4.732H1.338l2.308-4.971a.378.378 0 01.344-.202h9.883c.14 0 .262.064.328.171.037.06.07.157.013.27z"
          fill="#25303E"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_dash">
          <path fill="#fff" transform="translate(.216)" d="M0 0h14.902v15H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
