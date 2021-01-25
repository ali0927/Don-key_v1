import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";


export const AutoCompleteInput = ({ currencies, multi, onSelect = () => {} }) => {




    const [inputValue, setInputValue] = useState("");

    const fuse = useMemo(() => {
        return new Fuse(currencies, { keys: ['name'] });
    }, [currencies])

    const filteredCurrencies = useMemo(() => {

        if (inputValue === '') {
            return currencies;
        }


        return fuse.search(inputValue).map(val => val.item)
    }, [inputValue, fuse]);

    const onInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, [])
    const getNextIndex = (index) => {
        const next = index + 1;
        if (currencies.length === next) {
          return 0;
        }
        return next;
      };
     

    const handleKeyDown = () => {

    }


    return (
        <div className="cryptoinput__wrapper">
            <span className="mr-3">
                <FaSearch />
            </span>
            <input
                className="cryptoinput__input text-left"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                value={inputValue}
                onChange={onInputChange}
                autoFocus
                type="text"
            />
            <div className="cryptoinput__list">
                {filteredCurrencies.map((currency, index) => {
                  
                    const getIcon = () => {
                        if (multi) {
                          return (
                            <>
                              {currency.icon} {currencies[getNextIndex(index)].icon}
                            </>
                          );
                        }
                        return currency.icon;
                      };
                      const getName = () => {
                        if (multi) {
                          return (
                            <>
                              {currency.name}/{currencies[getNextIndex(index)].name}
                            </>
                          );
                        }
                        return currency.name;
                      };
                    return (
                        <div onClick={() => onSelect(currencies[index])} className="cryptoinput__list__item">
                            <span className="cryptoinput__icon">{getIcon()}</span>
                            <span className="cryptoinput__name">{getName()}
                           
                            </span>
                            <span className="cryptoinput__percent">{currency.percent}%
                                <span>APY</span>
                            </span>
                            <span className="cryptoinput__value">{currency.value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
