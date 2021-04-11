import React, { useEffect, useState } from "react";
import { DownArrow } from "./DownArrow";
import { ICurrency, IToken, CryptoCurrencyInput } from "don-components";
import { useYFITokens } from "../YFITokensProvider";

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

export const InputOutput = ({ noOutput = false }) => {
  const yfiTokens = useYFITokens();

  const [selectedToken, setSelectedToken] = useState<IToken | null>();

  useEffect(() => {
    if (yfiTokens.length > 0) {
      setSelectedToken(yfiTokens[0]);
    }
  }, [yfiTokens]);
  if (!selectedToken) {
    return <></>;
  }

  return (
    <InputOutputPure
      input={{
        currencies: yfiTokens,
        selectedCurrency: selectedToken,
        onChangeCurrency: setSelectedToken,
      }}
      noOutput={noOutput}
      output={{
        currencies: yfiTokens,
        selectedCurrency: {
          ...selectedToken,
          tokenIcon: selectedToken.vaultIcon,
          tokenSymbol: selectedToken.symbol,
        },
        onChangeCurrency: setSelectedToken,
      }}
    />
  );
};
