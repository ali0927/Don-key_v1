import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useClickAwayListener } from "../../hooks";
import "./cryptocurrencyinput.scss";
import { currencies } from "./currencies";

export const CryptoCurrencyInput = ({ label }) => {
  const [isOpen, setIsOpen] = useState();

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const renderInput = () => {
    if (isOpen) {
      return (
        <div className="cryptoinput__wrapper">
          <span className="mr-3">
            <FaSearch />
          </span>
          <input className="cryptoinput__input" autoFocus type="text" />
          <div className="cryptoinput__list">
            {currencies.map((currency) => {
              return (
                <div className="cryptoinput__list__item">
                  <span className="cryptoinput__icon">{currency.icon}</span>
                  <span className="cryptoinput__name">{currency.name}</span>
                  <span className="cryptoinput__percent">{currency.percent}%</span>
                  <span className="cryptoinput__value">{currency.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (!isOpen) {
      return (
        <>
          <div
            className="cryptoinput__selected"
            onClick={() => setIsOpen(true)}
          >
            <span className="cryptoinput__icon">{selectedCurrency.icon}</span>
            <span>{selectedCurrency.name}</span>
            <span className="cryptoinput__caret">
              <FaCaretDown />
            </span>
          </div>
          <input
            className="cryptoinput__input"
            style={{ maxWidth: 80 }}
            type="number"
            placeholder="Amount"
          />
        </>
      );
    }
  };

  const { onMouseDown } = useClickAwayListener({
    onClickAway: () => {
      setIsOpen(false);
    },
  });

  return (
    <div
      onMouseDown={onMouseDown}
      className={"cryptoinput " + (isOpen ? "active" : "")}
    >
      <label className="cryptoinput__label">Input</label>
      <div className="cryptoinput__wrapper">{renderInput()}</div>
    </div>
  );
};
