import { SetButton } from "components/ActionUI/SetButton";
import { usePanel } from "components/Panel/Panel";
import { ICurrencyWithAddress, IProtocol } from "interfaces";
import React, { useState } from "react";
import { InputOutputPure } from "./InputOutput";
import pancakejson from "./Pancakeswap.json"


const currencies: ICurrencyWithAddress[] = pancakejson.tokens.map(item => {
  return {
    address: item.address,
    apy_apyOneMonthSample: 10,
    tokenIcon: item.logoURI,
    tokenSymbol: item.symbol
  }
})

export const PancakeSwapToken = ({

}: {
    lastProtocol: IProtocol;
    protocol: IProtocol;
}) => {
  
    const [inputCurrency, setInputCurrency] = useState<ICurrencyWithAddress>(
        currencies[0]
    );
    const [outputCurrency, setOutputCurrency] = useState<ICurrencyWithAddress>(
        currencies[1]
    );
  
    const [inputAmount, setInputAmount] = useState<number | string>('');
    const [outputAmount, setOutPutAmount] = useState<number | string>('');
   


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAmount((e.target.value))
        if (e.target.value === "") {
            setOutPutAmount('')
        } else {
        
        }
    }
    const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutPutAmount((e.target.value))
        if (e.target.value === "") {
            setInputAmount('')
        } else {
          // setInputAmount(parseFloat(e.target.value) * parseFloat(midPrice));
        }

    }

    return (
        <div className="action-wrapper">
            <InputOutputPure
                input={{
                    currencies,
                    onChangeCurrency: setInputCurrency,
                    selectedCurrency: inputCurrency,
                    amount: inputAmount as number,
                    onChangeAmount: handleInputChange
                }}
                output={{
                    currencies,
                    onChangeCurrency: setOutputCurrency,
                    selectedCurrency: outputCurrency,
                    amount: outputAmount as number,
                    onChangeAmount: handleOutputChange
                }}
            />
            <SetButton
                action="SwapToken"
            />
        </div>
    );
};
