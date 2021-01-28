import { SetButton } from "components/ActionUI/SetButton";
import { ICurrency, IProtocol } from "interfaces";
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import { InputOutput, InputOutputPure } from "./InputOutput";

export const UniswapSwapToken = ({
    lastProtocol,
    protocol,
}: {
    lastProtocol: IProtocol;
    protocol: IProtocol;
}) => {

    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<ICurrency | null>(null)
    useEffect(() => {
        api.get('https://gateway.ipfs.io/ipns/tokens.uniswap.org').then((res) => {
            const data = res.data;
            const curr = data.tokens.map((item: any) => {
                return {
                    tokenSymbol: item.name,
                    tokenIcon: item.logoURI,
                    apy_apyOneMonthSample: 10
                } as ICurrency

            });
            setCurrencies(curr);
            setSelectedCurrency(curr[0]);
        })
    }, [])
    if(!selectedCurrency){
        return <>Loading</>
    }

    return (
        <div className="action-wrapper">
            <InputOutputPure
                input={{currencies,onChangeCurrency:setSelectedCurrency,selectedCurrency,}}
                output={{currencies,onChangeCurrency:setSelectedCurrency,selectedCurrency,}}
             />
            <SetButton
                lastProtocol={lastProtocol}
                protocol={protocol}
                action="SwapToken"
            />
        </div>
    );
};
