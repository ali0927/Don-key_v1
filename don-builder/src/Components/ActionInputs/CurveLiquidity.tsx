import { useYFITokens } from "../YFITokensProvider";
import { CryptoCurrencyInput, DownArrow } from "don-components";

export const CurveLiquidity = () => {


  const yfiTokens = useYFITokens();

  
  if(yfiTokens.length === 0){
    return <></>;
  }

  return (
    <div className="my-4">
      <CryptoCurrencyInput currencies={yfiTokens} label="Input" placeholder="Amount" />
      <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max mr-1">Prev Output</div>
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
       currencies={yfiTokens}
        label="Input"
        placeholder="Amount"
      />
      <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
         currencies={yfiTokens}
        label="Input"
        placeholder="Amount"
      />
       <div className="arrow-wrapper justify-content-end">
        <div className="arrow-max">Max</div>
      </div>
      <CryptoCurrencyInput
         currencies={yfiTokens}
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
        currencies={yfiTokens}
      />
    </div>
  );
};
