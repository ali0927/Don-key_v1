import * as React from "react"
import { IIconProps } from "./interfaces"

export const FileIcon: React.FC<IIconProps> = (props) => {
  return (
    <svg
      width={22}
      height={27}
      viewBox="0 0 22 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.517 6.521L15.125.231A.807.807 0 0014.56 0H3.374C2.052 0 .977 1.058.977 2.36v22.123c0 1.3 1.075 2.36 2.397 2.36h15.98c1.321 0 2.397-1.06 2.397-2.36V7.078a.787.787 0 00-.234-.557zm-6.158-3.836l3.664 3.606h-2.865a.794.794 0 01-.8-.786v-2.82zm3.995 22.584H3.374a.794.794 0 01-.8-.786V2.359c0-.433.359-.786.8-.786H13.76v3.932c0 1.3 1.075 2.359 2.397 2.359h3.995v16.619a.794.794 0 01-.8.786z"
        fill="#2D2900"
      />
      <path
        d="M16.157 14.262H6.57a.793.793 0 00-.799.786c0 .434.358.787.8.787h9.587a.793.793 0 00.8-.787.793.793 0 00-.8-.786zM16.157 17.406H6.57a.793.793 0 00-.799.787c0 .434.358.786.8.786h9.587a.793.793 0 00.8-.786.793.793 0 00-.8-.787z"
        fill="#2D2900"
      />
    </svg>
  )
}
