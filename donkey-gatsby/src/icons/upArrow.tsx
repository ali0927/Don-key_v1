import * as React from "react"

const ArrowUp = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={7}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.866 6.5a1 1 0 0 1-1.732 0L.536 2A1 1 0 0 1 1.402.5h5.196A1 1 0 0 1 7.464 2L4.866 6.5Z"
      fill="#FFC406"
    />
  </svg>
)

export default ArrowUp;
