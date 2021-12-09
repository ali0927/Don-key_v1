import * as React from "react";
import BigNumber from "bignumber.js";
import { BoxWrapper, BoxInput, StyledInput, BoxUsd, defaultPercents, Pill } from "./WithDrawPopup";
import { formatNum } from "helpers";
import { isUndefined } from "lodash";

export const SelectableWithdrawComponent = ({
  title, available, currency, price, percent, setPercent,equivalent,
}: {
  title: string;
  available: string;
  currency: string;
  price: string;
  percent: string;
  setPercent: (val: string) => void;
  equivalent?: React.ReactNode;
}) => {
  const amount = new BigNumber(available).multipliedBy(percent).dividedBy(100);
  const [input, setInput] = React.useState(amount.toFixed(4));

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#A3A3A3" }}>
          Available: {formatNum(available)} {currency}
        </span>
      </div>
      <BoxWrapper>
        <BoxInput>
          <div>
            <StyledInput
              type="number"
              value={input}
              placeholder="0.0000"
              onChange={(e) => {
                const result = e.target.value;

                setInput(result);
                if (result === "") {
                  setPercent("0");
                }
                if (new BigNumber(result).gt(available)) {
                  setPercent("0");
                } else {
                  setPercent(
                    new BigNumber(result)
                      .multipliedBy(100)
                      .dividedBy(available)
                      .toFixed()
                  );
                }
              }} />
          </div>
          <div>{currency}</div>
        </BoxInput>
        <BoxUsd>
         {!isUndefined(equivalent) ? equivalent:  <>≈ $
          {input === ""
            ? "0.00"
            : new BigNumber(input).multipliedBy(price).toFixed(2)}</>}
        </BoxUsd>
      </BoxWrapper>
      <div className="mt-3 mb-4 d-flex align-items-center justify-content-between">
        {defaultPercents.map((num) => {
          return (
            <Pill
              key={num}
              onClick={() => {
                setPercent(num.toFixed());
                setInput(
                  new BigNumber(available)
                    .multipliedBy(num)
                    .dividedBy(100)
                    .toFixed(4)
                );
              }}
              selected={num === parseInt(percent)}
            >
              {num}%
            </Pill>
          );
        })}
      </div>
    </div>
  );
};
