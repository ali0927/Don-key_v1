import { IToken } from "interfaces";
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { currencies } from "../CryptoCurrencyInput/currencies";
import { DownArrow } from "./DownArrow";

export const CurveLiquidity = () => {
  const [yfiTokens, setTokens] = useState<IToken[]>([]);


  useEffect(() => {
    api.get("/api/v1/protocols/yfi").then((res) => {
      setTokens(res.data.data);
     
    })
  }, [])
  if(yfiTokens.length === 0){
    return <>Loading</>;
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
