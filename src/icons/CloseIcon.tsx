export function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1l5 5m0 0l5 5M6 6l5-5M6 6l-5 5"
        stroke="#2D2900"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}