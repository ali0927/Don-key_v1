import { IIconProps } from "./interfaces";

export const DisconnectIcon = (props: IIconProps) => {
  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.469 13.781v1.64a1.64 1.64 0 01-1.64 1.642H4.265a1.64 1.64 0 01-1.641-1.641V5.578a1.64 1.64 0 011.64-1.64H10.5c.906 0 1.969.734 1.969 1.64v1.64M15.094 13.781l3.281-3.281-3.281-3.281M7.219 10.5h10.5"
        stroke="#000"
        strokeWidth={1.313}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
