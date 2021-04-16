import { useYFITokens } from "../YFITokensProvider";
import { CryptoCurrencyInput, DownArrow } from "don-components";

export const UniswapInput = () => {
  const yfiTokens = useYFITokens();

  if (yfiTokens.length === 0) {
    return <></>;
  }
  return (
    <div className="mt-4">
      <CryptoCurrencyInput
        currencies={yfiTokens}
        label="Input"
        placeholder="Amount"
      />
      <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max mr-1">Prev Output</div>
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        currencies={yfiTokens}
        label="Input"
        placeholder="Amount"
      />
      <div className="arrow-wrapper my-1">
        <DownArrow />
      </div>
      <CryptoCurrencyInput
        label="Output (Estimate)"
        multi
        placeholder="0"
        currencies={yfiTokens}
      />
    </div>
  );
};

export const UniswapInputReverse = () => {
  const yfiTokens = useYFITokens();
  if (yfiTokens.length === 0) {
    return <></>;
  }
  return (
    <div className="mt-4">
      <CryptoCurrencyInput
        label="Input"
        multi
        placeholder="0"
        currencies={yfiTokens}
      />
      <div className="arrow-wrapper">
        <DownArrow />
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
        currencies={yfiTokens}
        label="Output (Estimate)"
        placeholder="Amount"
      />

      <CryptoCurrencyInput
        className="mt-4"
        currencies={yfiTokens}
        label="Output (Estimate)"
        placeholder="Amount"
      />
    </div>
  );
};
