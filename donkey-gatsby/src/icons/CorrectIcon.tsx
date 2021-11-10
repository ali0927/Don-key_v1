import React from "react";

export function CorrectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
    width={39}
    height={38}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={19.493} cy={18.997} rx={16.25} ry={15.833} fill="#fff" />
    <path
      d="M19.498 34.832C10.527 34.822 3.258 27.74 3.248 19v-.317c.178-8.7 7.53-15.63 16.462-15.515 8.931.115 16.092 7.233 16.034 15.935-.058 8.703-7.314 15.729-16.246 15.73zm-7.46-16.482l-2.29 2.232 6.5 6.334 13-12.667L26.956 12 16.248 22.435l-4.21-4.085z"
      fill="#000"
    />
  </svg>
  );
}
