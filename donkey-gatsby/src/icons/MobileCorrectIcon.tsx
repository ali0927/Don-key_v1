import React from "react";

export function MobileCorrectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse cx={9.921} cy={9.072} rx={7.642} ry={7.561} fill="#fff" />
      <path
        d="M9.924 16.634c-4.218-.005-7.637-3.388-7.642-7.562v-.15c.084-4.156 3.542-7.465 7.742-7.41 4.2.055 7.568 3.454 7.54 7.61-.027 4.156-3.44 7.51-7.64 7.512zM6.417 8.762L5.339 9.83l3.057 3.024 6.113-6.049-1.077-1.073-5.036 4.982-1.98-1.95z"
        fill="#000"
      />
    </svg>
  );
}
