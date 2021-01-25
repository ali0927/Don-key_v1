import React, { useCallback, useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useClickAwayListener } from "../../hooks";
import { AutoCompleteInput } from "./AutoCompleteInput";
import "./cryptocurrencyinput.scss";
import { currencies } from "./currencies";

export const CryptoCurrencyInput = ({
  label,
  placeholder,
  defaultCurrency = currencies[0],
  className = "",
  multi = false,
  noDropdown = false,
  icon,
  name,
}) => {
  const [isOpen, setIsOpen] = useState();

  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

  const getNextIndex = (index) => {
    const next = index + 1;
    if (currencies.length === next) {
      return 0;
    }
    return next;
  };
  const currentIndex = currencies.indexOf(selectedCurrency);

  const getIcon = () => {
    if (icon) {
      return icon;
    }
    if (multi) {
      return (
        <>
          {selectedCurrency.icon} {currencies[getNextIndex(currentIndex)].icon}
        </>
      );
    }
    return selectedCurrency.icon;
  };
  const getName = () => {
    if (name) {
      return name;
    }
    if (multi) {
      return (
        <>
          {selectedCurrency.name}/{currencies[getNextIndex(currentIndex)].name}
        </>
      );
    }
    return selectedCurrency.name;
  };


  const handleChange = useCallback((item) => {
    setIsOpen(false)
    setSelectedCurrency(item)
  }, [])
  const renderInput = () => {
    if (isOpen) {
      return <AutoCompleteInput onSelect={handleChange}  multi={multi} currencies={currencies} />;
    }
    if (!isOpen) {
      return (
        <>
          <div
            className="cryptoinput__selected"
            onClick={noDropdown ? undefined : () => setIsOpen(true)}
          >
            <span className={`cryptoinput__icon`}>{getIcon()}</span>
            <span>{getName()}</span>
            {!noDropdown && (
              <span className="cryptoinput__caret">
                <FaCaretDown />
              </span>
            )}
          </div>
          <input
            className="cryptoinput__input "
            type="number"
            placeholder={placeholder}
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
      className={`cryptoinput ${isOpen ? "active" : ""} ${className}`}
    >
      <label className="cryptoinput__label">{label}</label>
      <div className="cryptoinput__wrapper">{renderInput()}</div>
    </div>
  );
};
