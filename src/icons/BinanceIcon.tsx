import { IIconProps } from "./interfaces";

export const BinanceIcon = (props: IIconProps) => {
    return (
      <svg
        width={15}
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#prefix__clip0_binance)">
          <path
            d="M7.517 15.035A7.517 7.517 0 107.517 0a7.517 7.517 0 000 15.035z"
            fill="#FBEAC1"
          />
          <path
            d="M5.481 6.624l1.974-1.942 1.974 1.944 1.147-1.131-3.121-3.074-3.122 3.073 1.148 1.13zM2.42 7.518L3.568 6.37l1.147 1.147-1.147 1.146-1.146-1.146zM5.481 8.283l1.973 1.943 1.974-1.944 1.148 1.13-3.121 3.074-3.122-3.072 1.148-1.131zM10.32 7.517l1.147-1.146 1.147 1.145-1.147 1.148-1.147-1.147z"
            fill="#F3BA2F"
          />
          <path
            d="M8.665 7.519L7.518 6.37l-.848.848-.098.097-.2.201 1.146 1.147L8.665 7.52v-.001z"
            fill="#F3BA2F"
          />
        </g>
        <defs>
          <clipPath id="prefix__clip0_binance">
            <path fill="#fff" d="M0 0h15v15H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  };