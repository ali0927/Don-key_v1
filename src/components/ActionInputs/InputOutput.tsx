
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput/CryptoCurrencyInput";
import { DownArrow } from "./DownArrow";
import { IToken } from "interfaces";
import { useYFITokens } from "components/YFITokensProvider";






export const InputOutput = ({ noOutput = false }) => {

  const yfiTokens = useYFITokens();

  const [selectedToken, setSelectedToken] = useState<IToken | null>();

  useEffect(() => {

    if (yfiTokens.length > 0) {
      setSelectedToken(yfiTokens[0]);
    }
  }, [yfiTokens])
  if (!selectedToken) {
    return <>Loading</>;
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
      <div className={`arrow-wrapper ${noOutput ? "justify-content-end" : ''}`}>
        {!noOutput && <DownArrow />}
        <div className="arrow-max">Max</div>
      </div>
      {!noOutput && (
        <CryptoCurrencyInput
          label="Output (Estimate)"
          placeholder="0"
          currencies={yfiTokens}
          noDropdown
          currency={{ ...selectedToken, tokenIcon: selectedToken.vaultIcon, tokenSymbol: selectedToken.symbol }}
          onChange={setSelectedToken}
        />
      )}
    </div>
  );
};
