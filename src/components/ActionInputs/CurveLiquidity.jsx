import React from "react";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { currencies } from "../CryptoCurrencyInput/currencies";
import { DownArrow } from "./DownArrow";

export const CurveLiquidity = () => {
  return (
    <div className="my-4">
      <CryptoCurrencyInput label="Input" placeholder="Amount" />
      <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max mr-1">Prev Output</div>
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        defaultCurrency={currencies[1]}
        label="Input"
        placeholder="Amount"
      />
      <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        defaultCurrency={currencies[1]}
        label="Input"
        placeholder="Amount"
      />
       <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        defaultCurrency={currencies[1]}
        label="Input"
        placeholder="Amount"
      />
      <div className="arrow-wrapper my-1">
        <DownArrow />
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        label="Output (Estimate)"
        multi
        placeholder="0"
        defaultCurrency={currencies[1]}
      />
    </div>
  );
};
