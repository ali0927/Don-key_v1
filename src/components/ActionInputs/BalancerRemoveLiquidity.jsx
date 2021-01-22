import React from "react";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { DownArrow } from "./DownArrow";
import { MTAIcon } from "./MTAIcon";
import { MUSDIcon } from "./MUSDIcon";

export const BalancerRemoveLiquidity = () => {
  return (
    <div>
      <CryptoCurrencyInput
        noDropdown
        label="Input (Estimate)"
        name={"0x003A"}
        icon={<MTAIcon />}
        placeholder="Amount"
      />
      <div className={`arrow-wrapper `}>
        <DownArrow />
        <div className="arrow-max">Max</div>
      </div>
      <div className={`cryptoinput flex-column`}>
        <label className="cryptoinput__label">Output (Estimate)</label>
        <div className="cryptoinput__wrapper py-2">
          <div
            className="cryptoinput__selected"
          >
            <span className={`cryptoinput__icon`}>
              <MUSDIcon />
            </span>
            <span>mUSD</span>
          </div>
          <input
            className="cryptoinput__input "
            style={{ maxWidth: 80 }}
            type="number"
            placeholder={"0"}
          />
        </div>
        <div className="cryptoinput__wrapper py-2">
          <div
            className="cryptoinput__selected"
          >
            <span className={`cryptoinput__icon`}>
              <MTAIcon />
            </span>
            <span>MTA</span>
          </div>
          <input
            className="cryptoinput__input "
            style={{ maxWidth: 80 }}
            type="number"
            placeholder={"0"}
          />
        </div>
      </div>
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
