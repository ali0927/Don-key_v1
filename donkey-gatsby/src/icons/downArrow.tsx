import * as React from "react"

const SvgComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.645 1.41a1 1 0 0 1 1.71 0l7.318 12.072A1 1 0 0 1 15.818 15H1.182a1 1 0 0 1-.855-1.518L7.645 1.41Z"
      fill="#FAC200"
    />
  </svg>
)

export default SvgComponent
