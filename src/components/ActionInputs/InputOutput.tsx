import { IToken } from "components/CryptoCurrencyInput/AutoCompleteInput";
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput/CryptoCurrencyInput";
import { DownArrow } from "./DownArrow";

export const InputOutput = ({ noOutput = false }) => {

  const [yfiTokens, setTokens] = useState<IToken[]>([]);


  const [selectedToken, setSelectedToken] = useState<IToken | null>();

  useEffect(() => {
    api.get("/api/v1/protocols/yfi").then((res) => {
      setTokens(res.data.data);
      setSelectedToken(res.data.data[0]);
    })
  }, [])
  if(!selectedToken){
    return "Loading";
  }
  return (
    <div>
      <CryptoCurrencyInput
        className="mt-4"
        label="Input"
        currencies={yfiTokens}
        currency={selectedToken}
        onChange={setSelectedToken}
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
          currencies={yfiTokens}
          noDropdown
          currency={{...selectedToken, tokenIcon: selectedToken.vaultIcon,tokenSymbol: selectedToken.symbol}}
          onChange={setSelectedToken}
        />
      )}
    </div>
  );
};
