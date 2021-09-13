import { IIconProps } from "./interfaces";

export const  EthereumIcon = (props: IIconProps) => {
    return (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#prefix__clip0_ethereum)">
          <path
            d="M8.019 16.037A8.019 8.019 0 108.019 0a8.019 8.019 0 000 16.037z"
            fill="#fff"
          />
          <g clipPath="url(#prefix__clip1_etheruem)">
            <path
              d="M7.778 2.526l-.071.24v6.96l.07.07 3.231-1.91-3.23-5.36z"
              fill="#343434"
            />
            <path d="M7.773 2.526l-3.231 5.36 3.23 1.91v-7.27z" fill="#8C8C8C" />
            <path
              d="M7.789 10.407l-.04.049v2.48l.04.115L11.022 8.5l-3.233 1.908z"
              fill="#3C3C3B"
            />
            <path d="M7.773 13.051v-2.644L4.542 8.5l3.23 4.552z" fill="#8C8C8C" />
            <path d="M7.79 9.8l3.23-1.91-3.23-1.468V9.8z" fill="#141414" />
            <path d="M4.542 7.89l3.23 1.91V6.422L4.543 7.89z" fill="#393939" />
          </g>
        </g>
        <defs>
          <clipPath id="prefix__clip0_ethereum">
            <path fill="#fff" d="M0 0h16v16H0z" />
          </clipPath>
          <clipPath id="prefix__clip1_etheruem">
            <path
              fill="#fff"
              transform="translate(2.526 2.526)"
              d="M0 0h10.526v10.526H0z"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };
  