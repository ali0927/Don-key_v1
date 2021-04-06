import { SetButton } from "components/ActionUI/SetButton";
import { usePanel } from "components/Panel/Panel";
import { getEstimatedAmount } from "helpers";
import { useToggle } from "hooks";
import { ICurrencyWithAddress, IProtocol } from "interfaces";
import { useWeb3 } from "providers/Web3Provider";
import React, { useEffect, useState } from "react";
import { InputOutputPure } from "./InputOutput";
import pancakejson from "./Pancakeswap.json"
import {debounce} from "lodash";

const debouncedGetEstimate = debounce(getEstimatedAmount,1000, {leading: true})

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
    const [isInputFocused, setFocus, setBlur] = useToggle(false);
    const [isOutputfocused, setFocus2, setBlur2] = useToggle(false);
    const [outputAmount, setOutPutAmount] = useState<number | string>('');
    
    const web3 = useWeb3();
    const updateInputAmount = async () => {
        if(outputAmount){
            const amount = await debouncedGetEstimate(web3,outputAmount as string,outputCurrency.address,inputCurrency.address);
            if(amount){
                setInputAmount(amount);
            }
        }
    }
    const updateOutputAmount = async () => {
        if(inputAmount){
            const amount = await debouncedGetEstimate(web3,inputAmount as string,inputCurrency.address,outputCurrency.address);
            if(amount){
                setOutPutAmount(amount);
            }
        }
    }
    useEffect(() => {
        if(isInputFocused){
            updateOutputAmount()
        }
    }, [inputAmount, isInputFocused])
    useEffect(() => {
        updateInputAmount();
    }, [inputCurrency])
    useEffect(() => {
        if(isOutputfocused){
            updateInputAmount();
        }
    }, [outputAmount, isOutputfocused])
    useEffect(() => {
        updateOutputAmount();
    }, [outputCurrency])

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
                    onFocus: setFocus,
                    onBlur: setBlur,
                    onChangeCurrency: setInputCurrency,
                    selectedCurrency: inputCurrency,
                    amount: inputAmount as number,
                    onChangeAmount: handleInputChange
                }}
                output={{
                    currencies,
                    onBlur: setBlur2,
                    onFocus: setFocus2,
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
