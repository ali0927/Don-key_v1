import * as React from "react";
import BigNumber from "bignumber.js";
import {
  BoxWrapper,
  BoxInput,
  StyledInput,
  BoxUsd,
  defaultPercents,
  Pill,
} from "./WithDrawPopup";
import { formatNum } from "helpers";
import { isUndefined } from "lodash";

const calcAvailable = (available: string, locked?: string) => {
  if (!locked) {
    return available;
  }
  const lockedBn = new BigNumber(locked);
  if (lockedBn.eq(0)) {
    return available;
  }
  const diff = new BigNumber(available).minus(locked);
  if (diff.gt(0)) {
    return diff.toFixed(8);
  }
  return "0";
};

export const SelectableWithdrawComponent = ({
  title,
  available,
  currency,
  price,
  lockedAmount,
  percent,
  setPercent,
  equivalent,
}: {
  title: string;
  available: string;
  lockedAmount?: string;
  currency: string;
  price: string;
  percent: string;
  setPercent: (val: string) => void;
  equivalent?: React.ReactNode;
}) => {
  const hasLocked =  lockedAmount ? new BigNumber(lockedAmount).gt(0): false;
  const calculatedavailable = calcAvailable(available, lockedAmount);
  const isAvailabledSmall = lockedAmount
    ? new BigNumber(available).lt(lockedAmount)
    : false;
  const amount = new BigNumber(available).multipliedBy(percent).dividedBy(100);

  const [input, setInput] = React.useState(amount.toFixed(4));
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#A3A3A3" }}>
          <div>
            Available: {formatNum(calculatedavailable)} {currency}
          </div>
          {hasLocked && lockedAmount && (
            <>
              {" "}
              <div>
                Locked:{" "}
                {formatNum(isAvailabledSmall ? available : lockedAmount)}{" "}
                {currency}{" "}
              </div>
              <div>
                Total:{" "}
                {formatNum(
                  isAvailabledSmall
                    ? available
                    : new BigNumber(calculatedavailable).plus(lockedAmount).toFixed(8)
                )}{" "}
                {currency}{" "}
              </div>
            </>
          )}
        </div>
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
              }}
            />
          </div>
          <div>{currency}</div>
        </BoxInput>
        <BoxUsd>
          {!isUndefined(equivalent) ? (
            equivalent
          ) : (
            <>
              ≈ $
              {input === ""
                ? "0.00"
                : new BigNumber(input).multipliedBy(price).toFixed(2)}
            </>
          )}
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
