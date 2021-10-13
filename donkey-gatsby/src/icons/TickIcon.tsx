import * as React from "react"

export function TickIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.95 6.741l3.072 3.309 7.682-8.273"
        stroke="#FFF037"
        strokeWidth={2.206}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
