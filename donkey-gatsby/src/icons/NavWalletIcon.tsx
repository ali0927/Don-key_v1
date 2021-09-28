import { IIconProps } from "./interfaces";

export const NavWalletIcon = (props: IIconProps) => {
  return (
    <svg
      width={19}
      height={18}
      style={{fill: "currentcolor", color: "inherit"}}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.556 4.753c.06 0 .117-.026.159-.073a.265.265 0 00.065-.177v-.832a.87.87 0 00-.215-.58.698.698 0 00-.518-.24h-1.203l-.275-.904a.244.244 0 00-.11-.142.203.203 0 00-.167-.017L6.776 4a.235.235 0 00-.124.124.277.277 0 00-.014.185.247.247 0 00.104.144c.05.032.109.041.165.026l6.308-2.142.601 1.982c.02.063.06.115.113.144.054.03.115.034.171.013a.234.234 0 00.13-.126.277.277 0 00.01-.191l-.244-.808h1.051c.158 0 .286.143.286.32v.832c0 .138.1.25.223.25z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.4}
      />
      <path
        d="M17.343 8.5a.213.213 0 00-.158.074.265.265 0 00-.066.177c0 .066.024.13.066.176a.213.213 0 00.158.074c.157 0 .224.074.224.25v3c0 .175-.067.25-.224.25h-3.582c-.157 0-.224-.075-.224-.25v-2.5c0-.176.067-.25.224-.25h2.687c.06 0 .116-.027.158-.074a.265.265 0 00.066-.176v-3c0-.456-.264-.75-.672-.75H2.343c-.552 0-.895-.384-.895-1 0-.617.343-1 .895-1h2.273L3.261 4a.217.217 0 00-.08.046.246.246 0 00-.056.077.272.272 0 00.03.282c.02.025.044.046.071.06a.205.205 0 00.175.01l8.113-2.987a.219.219 0 00.076-.048.27.27 0 00.066-.268.259.259 0 00-.042-.085.229.229 0 00-.07-.06.207.207 0 00-.17-.014L5.956 3.008c-.01-.002-.02-.007-.03-.007H2.342C1.54 3 1 3.604 1 4.5v11c0 .897.54 1.5 1.343 1.5H16c.408 0 .672-.295.672-.75v-2.5a.265.265 0 00-.066-.177.213.213 0 00-.158-.073.213.213 0 00-.159.073.265.265 0 00-.065.177v2.5c0 .175-.067.25-.224.25H2.343c-.552 0-.895-.384-.895-1V5.657c.23.216.533.344.895.344H16c.157 0 .224.074.224.25V9H13.76c-.408 0-.671.294-.671.75v2.5c0 .455.263.75.671.75h3.582c.408 0 .672-.295.672-.75v-3c0-.456-.264-.75-.672-.75z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.4}
      />
      <path
        d="M15.328 11.6c.313 0 .548-.28.548-.6 0-.32-.235-.6-.548-.6-.312 0-.547.28-.547.6 0 .32.235.6.547.6z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.2}
      />
    </svg>
  );
};