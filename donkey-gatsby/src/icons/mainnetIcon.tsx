import * as React from "react"

const SvgComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m6.605 9.071 4.26-4.191 4.26 4.195 2.476-2.44L10.864 0 4.127 6.633 6.605 9.07ZM0 11.001l2.474-2.476 2.476 2.476-2.476 2.474L0 11.001ZM6.605 12.65l4.258 4.195 4.26-4.197 2.478 2.438-6.736 6.637-6.738-6.632 2.478-2.44ZM17.05 11l2.474-2.475L22 10.998l-2.476 2.477L17.05 11Z"
      fill="#F3BA2F"
    />
    <path
      d="M13.475 11.004 11 8.525l-1.83 1.832-.211.21-.434.433L11 13.475l2.475-2.47v-.001Z"
      fill="#F3BA2F"
    />
  </svg>
)

export default SvgComponent
