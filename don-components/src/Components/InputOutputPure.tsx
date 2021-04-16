import React from "react";
import { DownArrow } from "./DownArrow";
import {  CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { ICurrency } from "../interfaces";

export type IInputOutputPureProps<T extends ICurrency> = {
  input: {
    currencies: T[];
    onFocus?: () => void;
    onBlur?: () => void;
    selectedCurrency: T;
    onChangeCurrency: (val: T) => void;
    onChangeAmount?: (val: React.ChangeEvent<HTMLInputElement>) => void
    amount?: number | null;
    noDropDown?: boolean;
  };
  output?: {
    currencies: T[];
    selectedCurrency: T;
    onFocus?: () => void;
    onBlur?: () => void;
    onChangeCurrency: (val: T) => void;
    onChangeAmount?: (val: React.ChangeEvent<HTMLInputElement>) => void;
    amount?: number | null;
    noDropDown?: boolean;
  };
  noOutput?: boolean;
};

export const InputOutputPure = <T extends ICurrency>({
  input,
  output,
  noOutput,
}: IInputOutputPureProps<T>) => {
  return (
    <div>
      <CryptoCurrencyInput
        className="mt-4"
        label="Input"
        currencies={input.currencies}
        currency={input.selectedCurrency}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        onChange={input.onChangeCurrency}
        amount={input.amount}
        onChangeAmount={input.onChangeAmount}
        placeholder="Amount"
      />
      <div className={`arrow-wrapper ${noOutput ? "justify-content-end" : ""}`}>
        {!noOutput && <DownArrow />}
        <div className="arrow-max">Max</div>
      </div>
      {!noOutput && output && (
        <CryptoCurrencyInput
          label="Output (Estimate)"
          placeholder="0"
          amount={output.amount}
          onBlur={output.onBlur}
          onFocus={output.onFocus}
          currencies={output.currencies}
          noDropdown={output.noDropDown}
          currency={output.selectedCurrency}
          onChangeAmount={output.onChangeAmount}
          onChange={output.onChangeCurrency}
        />
      )}
    </div>
  );
};


