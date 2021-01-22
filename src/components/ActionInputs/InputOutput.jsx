import React from "react";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput/CryptoCurrencyInput";
import { currencies } from "../CryptoCurrencyInput/currencies";
import { DownArrow } from "./DownArrow";

export const InputOutput = ({ noOutput = false }) => {
  return (
    <div>
      <CryptoCurrencyInput
        className="mt-4"
        label="Input"
        placeholder="Amount"
      />
      <div className={`arrow-wrapper ${noOutput ? "justify-content-end": ''}`}>
        {!noOutput && <DownArrow />}
        <div className="arrow-max">Max</div>
      </div>
      {!noOutput && (
        <CryptoCurrencyInput
          label="Output (Estimate)"
          placeholder="0"
          defaultCurrency={currencies[1]}
        />
      )}
    </div>
  );
};
