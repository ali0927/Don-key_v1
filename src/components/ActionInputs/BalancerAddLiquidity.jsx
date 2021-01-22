import React from "react";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { DownArrow } from "./DownArrow";
import { MTAIcon } from "./MTAIcon";
import { MUSDIcon } from "./MUSDIcon";

export const BalancerAddLiquidity = () => {
  return (
    <div>
      <CryptoCurrencyInput
        noDropdown
        label="Input (Estimate)"
        name={"mUSD"}
        icon={<MUSDIcon />}
        placeholder="Amount"
      />
      <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        noDropdown
        icon={<MTAIcon />}
        label="Input (Estimate)"
        name={"MTA"}
        placeholder="Amount"
      />
      <div className={`arrow-wrapper `}>
        <DownArrow />
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        icon={<MTAIcon />}
        label="Output (Estimate)"
        name={"0x003A"}
        placeholder="0"
      />
      <div className="actionprop_info">
        <div className="">Weight</div>
        <div>
          <div>
            <span className="text-dark">20,00%</span> mUSD
          </div>
          <div>
            {" "}
            <span className="text-dark">00,00%</span> {"  "} MTA
          </div>
        </div>
      </div>
    </div>
  );
};
