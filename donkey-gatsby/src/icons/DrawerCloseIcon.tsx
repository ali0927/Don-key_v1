import { IIconProps } from "./interfaces";

export const DrawerCloseIcon = (props: IIconProps) => {
    return (
      <svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 1.806L16.194 18 18 16.194 1.806 0 0 1.806z"
          fill="#070602"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 16.194L1.806 18 18 1.806 16.194 0 0 16.194z"
          fill="#070602"
        />
      </svg>
    );
  };