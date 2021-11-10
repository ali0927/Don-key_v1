import { IIconProps } from "./interfaces";

export const GrayInfoIcon = (props: IIconProps) => {
  return (
    <svg
      width={12}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={6.002} cy={6} r={5.5} stroke="#A8A8A8" />
      <path
        d="M6.327 9.378h-.78V4.562h.78v4.816zm-.843-6.094c0-.133.038-.246.114-.338.079-.092.194-.138.346-.138.151 0 .267.046.345.138a.503.503 0 01.118.338c0 .134-.04.245-.118.334-.078.089-.194.134-.345.134-.152 0-.267-.045-.346-.134a.497.497 0 01-.114-.334z"
        fill="#A8A8A8"
      />
    </svg>
  );
};
