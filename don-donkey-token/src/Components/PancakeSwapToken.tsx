import { getEstimatedAmount } from "don-utils";
import { useToggle } from "don-hooks";
import { ICurrencyWithAddress,InputOutputPure } from "don-components";
import React, { useEffect, useState } from "react";
import { useBuilderActions} from "don-builder";
import pancakejson from "./Pancakeswap.json";
import { debounce } from "lodash";

const debouncedGetEstimate = debounce(getEstimatedAmount, 1000, {
  leading: true,
});

const currencies: ICurrencyWithAddress[] = pancakejson.tokens.map((item) => {
  return {
    address: item.address,
    apy_apyOneMonthSample: 10,
    tokenIcon: item.logoURI,
    tokenSymbol: item.symbol,
  };
});

export const PancakeSwapToken = () => {
  const [inputCurrency, setInputCurrency] = useState<ICurrencyWithAddress>(
    currencies[0]
  );
  const [outputCurrency, setOutputCurrency] = useState<ICurrencyWithAddress>(
    currencies[1]
  );
  // const { getSelectedProtocol, updateActionData } = useGraphMethods();
  // const protocolCell: IProtocolCell = getSelectedProtocol();

  const getInputAmount = () => {
    // const cell = null;
    // if (cell) {
    //     const amount = cell.data?.outputAmount || "";
    //     return amount;
    // }
    return "";
  };

  const [inputAmount, setInputAmount] = useState<number | string>(() =>
    getInputAmount()
  );
  const [isInputFocused, setFocus, setBlur] = useToggle(false);
  const [isOutputfocused, setFocus2, setBlur2] = useToggle(false);
  const [outputAmount, setOutPutAmount] = useState<number | string>("");

  // const web3 = useWeb3();

  const updateInputAmount = async () => {
    if (outputAmount) {
      // const amount = await debouncedGetEstimate(
      //   web3,
      //   outputAmount as string,
      //   outputCurrency.address,
      //   inputCurrency.address
      // );
      // if (amount) {
      //   setInputAmount(amount);
      // }
    }
  };
  const updateOutputAmount = async () => {
    if (parseFloat(inputAmount as string)) {
      // const amount = await debouncedGetEstimate(
      //   web3,
      //   inputAmount as string,
      //   inputCurrency.address,
      //   outputCurrency.address
      // );
      // if (amount) {
      //   setOutPutAmount(amount);
      // }
    }
  };
  useEffect(() => {
    if (isInputFocused) {
      updateOutputAmount();
    }
  }, [inputAmount, isInputFocused]);
  useEffect(() => {
    updateInputAmount();
  }, [inputCurrency]);
  useEffect(() => {
    if (isOutputfocused) {
      updateInputAmount();
    }
  }, [outputAmount, isOutputfocused]);
  useEffect(() => {
    updateOutputAmount();
  }, [outputCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
    if (e.target.value === "") {
      setOutPutAmount("");
    }
  };
  const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutPutAmount(e.target.value);
    if (e.target.value === "") {
      setInputAmount("");
    }
  };

  const {addAction} = useBuilderActions();

  const handleClick = () => {
    addAction("SwapToken",{someData: ""});
  }

  return (
    <div className="action-wrapper">
      <InputOutputPure
        input={{
          currencies,
          onFocus: setFocus,
          onBlur: setBlur,
          onChangeCurrency: setInputCurrency,
          selectedCurrency: inputCurrency,
          amount: inputAmount as number,
          onChangeAmount: handleInputChange,
        }}
        output={{
          currencies,
          onBlur: setBlur2,
          onFocus: setFocus2,
          onChangeCurrency: setOutputCurrency,
          selectedCurrency: outputCurrency,
          amount: outputAmount as number,
          onChangeAmount: handleOutputChange,
        }}
      />
      <button onClick={handleClick}>
        AddAction
      </button>
    </div>
  );
};
