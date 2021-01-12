import clsx from "clsx";
import React from "react";

export const ActionConfig = ({ style }) => {
  return (
    <div className={clsx("actionConfig")} style={style}>
      <div className="actionInner">
        <div id="pointer"></div>
        <div className="actionContent">
          <ul>
            <li>
              <div className="header">Amount</div>
              <div className="input">
                <select>
                  <option>$1000</option>
                  <option>$5000</option>
                  <option>$10000</option>
                  <option>$15000</option>
                  <option>$20000</option>
                </select>
              </div>
            </li>
            <li>
              <div className="header">Pool</div>
              <div className="input">
                <select>
                  <option>yDAI</option>
                  <option>yCRV</option>
                  <option>yUSDC</option>
                  <option>yETH</option>
                </select>
              </div>
            </li>
            <li>
              <div className="header">LTV</div>
              <div className="input">
                <select>
                  <option>150%</option>
                  <option>180%</option>
                  <option>200%</option>
                  <option>300%</option>
                </select>
              </div>
            </li>
            <li>
              <div className="header">Days</div>
              <div className="input">
                <select>
                  <option>15</option>
                  <option>30</option>
                  <option>60</option>
                  <option>90</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
