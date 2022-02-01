import BigNumber from "bignumber.js";
import clsx from "clsx";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import { graphql, useStaticQuery } from "gatsby";
import {
  formatNum,
  getERCContract,
  getPoolContract,
  getTokenPrice,
} from "helpers";
import { useStakingContract } from "hooks";
import { IStoreState } from "interfaces";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IAuctionPageState } from "templates/auctionTemplate";

const Dropdown: React.FC = (props) => {
  const [condition, setCondition] = useState(false);
  return (
    <div
      onClick={() => setCondition(!condition)}
      className={condition ? "field dropdown active" : "field dropdown"}
    >
      {props.children}
    </div>
  );
};

type IBidFormState = {
  percentLp: string;
  selectedLp: number;
  commission: BigNumber;
};

const INITIAL_FORM_STATE: IBidFormState = {
  percentLp: "25",
  selectedLp: 0,
  commission: new BigNumber(0),
};

const calcCommisionPercent = (
  borrowAmount: BigNumber,
  commission: BigNumber
) => {
  return new BigNumber(commission)
    .dividedBy(borrowAmount)
    .multipliedBy(100)
    .toFixed(2);
};

const NewInput = (props: {
  value: string;
  onChange: (value: string) => void;
  validator: (value: string) => boolean;
}) => {
  const [value, setValue] = useState("");

  const lastValidValueRef = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);
  if (props.validator(value)) {
    lastValidValueRef.current = value;
  }

  const onBlur = () => {
    if (lastValidValueRef.current !== value) {
      setValue(lastValidValueRef.current);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    if (props.validator(value)) {
      props.onChange(value);
    }
    setValue(value);
  };
  useEffect(() => {
    if (inputRef.current !== document.activeElement) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
    />
  );
};

const calcFloorCommission = (
  borrowAmount: BigNumber,
  floorCommission: string | number
) => {
  return borrowAmount.multipliedBy(floorCommission).dividedBy(100);
};

const transformArray = <T extends any>(arr: T[], index: number) => {
  if (arr.length > 2) {
    return [
      arr[index],
      ...arr.slice(0, index),
      ...arr.slice(index + 1, arr.length),
    ];
  }
  return arr.reverse();
};

const AuctionForm = ({
  auction,
}: {
  auction: IAuctionPageState["auctions"][0];
}) => {
  const [state, setState] = useState(INITIAL_FORM_STATE);

  const { tier } = useStakingContract();
  const { connected } = useWeb3Context();
  // const [selectedLp]
  const commissionRef = useRef(new BigNumber(0));
  const selectedLp = auction.supportedLps[state.selectedLp];

  const selectNewLp = (index: number) => {
    setState((old) => ({ ...old, selectedLp: index }));
  };
  const maxDebtRatio = auction.maxDebtMap[tier.tier as 0] || "0";

  const balance = selectedLp.balance || "10";

  const selectLpPercent = (percent: string) => {
    setState((old) => {
      const newState = { ...old, percentLp: percent };
      if (balance) {
        const borrowAmount = new BigNumber(balance)
          .multipliedBy(percent).multipliedBy(maxDebtRatio).dividedBy(100)
          .dividedBy(100);
          console.log(borrowAmount.toFixed(2), "BorrowAmount", selectedLp.minCommission)
        newState.commission = calcFloorCommission(borrowAmount, selectedLp.minCommission);
      }

      return newState;
    });
  };

  const debtAmount = useMemo(() => {
    return new BigNumber(isNaN(parseInt(state.percentLp)) ? 0 : state.percentLp)
      .multipliedBy(balance)
      .dividedBy(100);
  }, [state.percentLp, auction, selectedLp]);

  const minCommission = useMemo(() => {
    return new BigNumber(selectedLp.minCommission);
  }, [selectedLp]);

  if (!state.commission.lt(minCommission)) {
    commissionRef.current = state.commission;
  }

  const validate = (val: string) => {
    return minCommission.lte(val);
  };

  const balanceInUsd = new BigNumber(balance)
    .multipliedBy(selectedLp.price)
    .toFixed(2);

  const borrowAmount = debtAmount.multipliedBy(maxDebtRatio).dividedBy(100);
  const debtAmountInUsd = debtAmount.multipliedBy(selectedLp.price).toFixed(2);
  const borrowAmountInUsd = borrowAmount
    .multipliedBy(selectedLp.price)
    .toFixed(2);

  return (
    <>
      <div className="head" style={{ marginBottom: "22px" }}>
        <h4>Make a Bid</h4>
        <div className="tooltip_con">
          <div className="tooltip_trigger info_icon">i</div>
          <div className="tooltip_content">
            <p>This is some demo text. please replace with what ever.</p>
          </div>
        </div>
      </div>
      <div className="lp_staking" style={{ marginBottom: "43px" }}>
        <div className="head">
          <h5>LP for staking</h5>
          <span className="data">≈ ${formatNum(balanceInUsd)}</span>
        </div>
        <div className="dropdown_container">
          <Dropdown>
            {transformArray(auction.supportedLps, state.selectedLp).map(
              (item, index) => {
                return (
                  <div
                    key={item.lpAddress}
                    onClick={() => selectNewLp(index)}
                    className="option"
                  >
                    <div className="left">
                      <div
                        className="icon"
                        style={{
                          backgroundImage: `url('${item.tokenImage}')`,
                        }}
                      ></div>
                      <div className="title">{item.strategyName}</div>
                    </div>
                    <div className="right">
                      <div className="amount">
                        <div
                          className="icon"
                          style={{
                            backgroundImage: `url('${item.tokenImage}')`,
                          }}
                        ></div>
                        <div className="amount">
                          {balance} {item.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </Dropdown>
        </div>
      </div>
      <div className="collateral">
        <div className="head">
          <h5>How much to use for collateral</h5>
          <span className="data">≈ ${formatNum(debtAmountInUsd)}</span>
        </div>
        <div className="field">
          <div className="option">
            <div className="left">
              <div className="icon pancake"></div>
              <input
                type="number"
                size={3}
                max={100}
                min={0}
                value={state.percentLp}
                onChange={(e) => {
                  const value = e.target.value;
                  if (parseFloat(value) > 100) {
                    return;
                  }
                  setState((old) => ({ ...old, percentLp: value }));
                }}
              />
              <div className="title x_amount">
                % {balance} {selectedLp!.symbol}
              </div>
            </div>
            <div className="right">
              <div className="amount">
                <div className="icon"></div>
                <div className="amount">
                  = {debtAmount.toFixed(2)} {selectedLp!.symbol}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="percent_select">
          <div
            className={clsx({ selected: state.percentLp === "25" })}
            onClick={() => selectLpPercent("25")}
          >
            25%
          </div>
          <div
            className={clsx({ selected: state.percentLp === "50" })}
            onClick={() => selectLpPercent("50")}
          >
            50%
          </div>
          <div
            className={clsx({ selected: state.percentLp === "70" })}
            onClick={() => selectLpPercent("70")}
          >
            70%
          </div>
          <div
            className={clsx({ selected: state.percentLp === "100" })}
            onClick={() => selectLpPercent("100")}
          >
            100%
          </div>
        </div>
      </div>
      <div className="borrow">
        <div className="reflection"></div>
        <div className="head">
          <h5>Borrow</h5>
          <div className="tooltip_con">
            <div className="tooltip_trigger info_icon">i</div>
            <div className="tooltip_content">
              <p>
                The Tier 5 will get 70%, Tier 4 will get 50%, and all the rest
                will get 0%.
              </p>
              <a href="https://google.com">MORE INFO</a>
            </div>
          </div>
        </div>
        <h5>
          {borrowAmount.toFixed(2)} {selectedLp.symbol}
        </h5>
        <p>
          Collateral {debtAmount.toFixed(2)} {selectedLp.symbol} *{" "}
          {maxDebtRatio}% = {borrowAmount.toFixed(2)} {selectedLp!.symbol} Tier{" "}
          {tier.tier} Debt ratio is {maxDebtRatio}%
        </p>
      </div>

      <div className="bid">
        <div className="head">
          <h5>Bid (how much commision)</h5>
        </div>
        <div className="field">
          <div className="option">
            <div className="left">
              <div className="title">
                <NewInput
                  onChange={(e) =>
                    setState((old) => ({
                      ...old,
                      commission: new BigNumber(e),
                    }))
                  }
                  validator={validate}
                  value={state.commission.toFixed(2)}
                />{" "}
                {selectedLp!.symbol}
              </div>
            </div>
            <div className="right">
              <div className="amount">
                <div className="icon"></div>
                <div className="amount">
                  {calcCommisionPercent(borrowAmount, commissionRef.current)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="submit_btn_con">
        <button className="submit_and_stake" style={{ marginTop: "41px" }}>
          Submit &amp; Stake
        </button>
        <div className="info">
          <span>Floor commision {selectedLp.minCommission}%</span>
          <span>Repay loan date: 06/12/2021</span>
        </div>
      </div>
    </>
  );
};

export const MakeABidForm = () => {
  const currentAuctionState = useSelector(
    (state: IStoreState) => state.auctions
  );

  return (
    <div className="make_a_bid">
      {currentAuctionState.status !== "FETCH_SUCCESS" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 500,
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <AuctionForm auction={currentAuctionState.currentAuction} />
      )}
    </div>
  );
};
