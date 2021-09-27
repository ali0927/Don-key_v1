import { IIconProps } from "./interfaces";

export const HamburgerIcon = (props: IIconProps) => {
    return (
      <svg
        width={28}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M26 2.007H2M19 7.917H2M26 13.826H2"
          stroke="#000"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };