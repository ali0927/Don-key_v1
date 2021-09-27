import { IIconProps } from "./interfaces";




export const MainIcon = (props: IIconProps) => {
    return (
      <svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 .56L0 10.983l1.228 1.414 1.124-.976v9.21c0 1.549 1.26 2.81 2.81 2.81h5.246v-9.18h3.278v9.18h5.152c1.55 0 2.81-1.261 2.81-2.81v-9.21l1.124.976L24 10.982 12 .56zm7.775 20.07c0 .516-.42.936-.937.936h-3.279v-9.18H8.534v9.18H5.162a.938.938 0 01-.937-.937V9.794L12 3.042l7.775 6.752v10.835z"
          fill="#000"
        />
      </svg>
    );
  };