import { SetButton } from "components/ActionUI/SetButton";
import { ICurrency, ICurrencyWithAddress, IProtocol } from "interfaces";
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import { InputOutputPure } from "./InputOutput";




export const UniswapSwapToken = ({
    lastProtocol,
    protocol,
}: {
    lastProtocol: IProtocol;
    protocol: IProtocol;
}) => {
    const [currencies, setCurrencies] = useState<ICurrencyWithAddress[]>([]);
    const [inputCurrency, setInputCurrency] = useState<ICurrencyWithAddress | null>(
        null
    );
    const [outputCurrency, setOutputCurrency] = useState<ICurrencyWithAddress | null>(
        null
    );
    const [{ midPrice, invertedMidPrice }, setPriceRatio] = useState({ midPrice: '0', invertedMidPrice: '0' });
    const [inputAmount, setInputAmount] = useState<number | string>('');
    const [outputAmount, setOutPutAmount] = useState<number | string>('');
    useEffect(() => {
        api.get("/api/v1/protocols/uni").then((res) => {
            const data = res.data;
            const curr = data.tokens.filter((item: any) => item.chainId === 1).map((item: any) => {
                return {
                    tokenSymbol: item.symbol,
                    tokenIcon: item.logoURI,
                    apy_apyOneMonthSample: 10,
                    address: item.address
                } as ICurrencyWithAddress;
            });
            setCurrencies(curr);
            setInputCurrency(curr[0]);
            setOutputCurrency(curr[1]);
        });
    }, []);


    useEffect(() => {
        (async () => {
            if (inputCurrency && outputCurrency) {
                const resp = await api.post("/api/v1/protocols/uni", { address1: inputCurrency.address, address2: outputCurrency.address });
                setPriceRatio(resp.data.data);
            }
        })()
    }, [inputCurrency, outputCurrency])

    if (!inputCurrency || !outputCurrency) {
        return <>Loading</>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAmount((e.target.value))
        if(e.target.value === ""){
            setOutPutAmount('')
        }else {
            setOutPutAmount(parseFloat(e.target.value) * parseFloat(midPrice));
        }
    }
    const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutPutAmount((e.target.value))
        if(e.target.value === ""){
            setInputAmount('')
        }else {
            setInputAmount(parseFloat(e.target.value) * parseFloat(invertedMidPrice));
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
                lastProtocol={lastProtocol}
                protocol={protocol}
                action="SwapToken"
            />
        </div>
    );
};
