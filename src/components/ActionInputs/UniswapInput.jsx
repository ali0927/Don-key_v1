import React from "react";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { currencies } from "../CryptoCurrencyInput/currencies";
import { DownArrow } from "./DownArrow";

export const UniswapInput = () => {
    return (
        <div className="mt-4">
            <CryptoCurrencyInput label="Input" placeholder="Amount" />
            <div className="arrow-wrapper justify-content-end">
                <div className="arrow-max mr-1">Prev Output</div>
                <div className="arrow-max">Max</div>
            </div>
            <CryptoCurrencyInput
                defaultCurrency={currencies[1]}
                label="Input"
                placeholder="Amount"
            />
            <div className="arrow-wrapper my-1">
                <DownArrow />
            </div>
            <CryptoCurrencyInput label="Output (Estimate)" multi placeholder="0" defaultCurrency={currencies[1]} />
        </div>
    );
};

export const UniswapInputReverse = () => {
    return (
        <div className="mt-4">
            <CryptoCurrencyInput label="Input" multi placeholder="0" defaultCurrency={currencies[1]} />
            <div className="arrow-wrapper">
                <DownArrow />
                <div className="arrow-max" >Max</div>
            </div>
            <CryptoCurrencyInput label="Output (Estimate)" placeholder="Amount" />

            <CryptoCurrencyInput
                className="mt-4"
                defaultCurrency={currencies[1]}
                label="Output (Estimate)"
                placeholder="Amount"
            />


        </div>
    );
};