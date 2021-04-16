import React, { useEffect, useState } from "react";
import { ICurrency, IToken, InputOutputPure, DownArrow } from "don-components";
import { useYFITokens } from "../YFITokensProvider";



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
