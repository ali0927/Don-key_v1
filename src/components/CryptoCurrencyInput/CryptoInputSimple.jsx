import React from "react";

export const CryptoInputSimple = ({ label, icon, name, placeholder, className ='' }) => {
  return (
    <div className={`cryptoinput ${className}`}>
      <label className="cryptoinput__label">{label}</label>
      <div className="cryptoinput__wrapper">
        <div className="cryptoinput__selected">
          {icon && <span className={`cryptoinput__icon`}>{icon}</span>}
          <span>{name}</span>
        </div>
        <input
          className="cryptoinput__input "
          style={{ maxWidth: 80 }}
          type="number"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};