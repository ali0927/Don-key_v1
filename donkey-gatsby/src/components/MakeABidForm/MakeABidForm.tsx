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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

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
  fetchstatus: "initial" | "fetching" | "fetchingcomplete" | "fetchfailed";
  lpForStaking: {
    icon: string;
    strategyName: string;
    poolAddress: string;
    poolVersion: number;
    tokenAddress: string;
    tokenSymbol: string;
    balance: string;
    tokenImage: string;
    tokenPrice: string;
    floorCommission: string;
  }[];
  selectedLp: number;
  commission: BigNumber;
};

const INITIAL_FORM_STATE: IBidFormState = {
  fetchstatus: "initial",
  lpForStaking: [],
  percentLp: "25",
  selectedLp: 0,
  commission: new BigNumber(0),
};

const TierBorrowPercentMap = {
  0: "50",
  1: "70",
};

const useActivePools = () => {
  const data = useStaticQuery(graphql`
    query Active {
      allStrapiFarmers(
        filter: { network: { chainId: { eq: 56 } }, status: { in: ["active"] } }
      ) {
        nodes {
          status
          poolAddress
          poolVersion
          farmerImage {
            url
          }
          strategies {
            name
            token {
              image {
                url
              }
            }
          }
        }
      }
    }
  `);

  return useMemo(() => {
    return data.allStrapiFarmers.nodes.map((item: any) => {
      return {
        poolAddress: item.poolAddress,
        poolVersion: item.poolVersion,
        poolContract: getPoolContract(
          getWeb3(BINANCE_CHAIN_ID),
          item.poolAddress,
          item.poolVersion
        ),
        icon: item.farmerImage.url,
        strategyName: item.strategies[0].name,
        tokenImage: item.strategies[0].token.image.url,
      } as const;
    });
  }, data);
};

const calcCommisionPercent = (debtAmount: string, commission: BigNumber) => {
  return new BigNumber(commission)
    .dividedBy(debtAmount)
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

const calcFloorCommission = (state: IBidFormState, debtRatio: string) => {
  if (state.fetchstatus !== "fetchingcomplete") {
    return state.commission;
  }
  if (state.lpForStaking.length === 0) {
    return state.commission;
  }
  const selectedLp = state.lpForStaking[state.selectedLp];
  const AmountOfToken = new BigNumber(selectedLp.balance)
    .multipliedBy(state.percentLp)
    .dividedBy(100);
  const borrowAmount = AmountOfToken.multipliedBy(debtRatio).dividedBy(100);
  return borrowAmount.multipliedBy(selectedLp.floorCommission).dividedBy(100);
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

export const MakeABidForm = () => {
  const { tier } = useStakingContract();
  const { connected, address } = useWeb3Context();
  const pools = useActivePools();

  const [state, setState] = useState(INITIAL_FORM_STATE);
  const commissionRef = useRef(state.commission);
  const maxDebtRatio = TierBorrowPercentMap[tier.tier as 0] || "0";

  const fetchLps = async () => {
    setState((old) => ({ ...old, fetchstatus: "fetching" }));
    const listPromises = pools.map(async (item: any) => {
      try {
        const poolContract = await item.poolContract;

        const tokenAddress = await poolContract.methods.getToken().call();
        const web3 = getWeb3(BINANCE_CHAIN_ID);
        const tokenContract = await getERCContract(web3, tokenAddress);
        const tokenPrice = await getTokenPrice(web3, item.poolAddress);
        const symbol = await tokenContract.methods.symbol().call();
        const userInvestment = "10";
        return {
          tokenImage: item.tokenImage,
          icon: item.icon,
          poolAddress: item.poolAddress,
          poolVersion: item.poolVersion,
          floorCommission: "10",
          strategyName: item.strategyName,
          tokenAddress,
          tokenPrice,
          balance: userInvestment,
          tokenSymbol: symbol,
        } as IBidFormState["lpForStaking"][0];
      } catch (e) {
        console.log(e);
        return null;
      }
    });
    const result = await Promise.all(listPromises);
    const newState: IBidFormState = {
      percentLp: "25",
      fetchstatus: "fetchingcomplete",
      lpForStaking: result,
      selectedLp: 0,
      commission: new BigNumber(0),
    };
    newState.commission = calcFloorCommission(newState, maxDebtRatio);
    setState(newState);
    return result;
  };

  const selectedLp =
    state.lpForStaking.length > 0 ? state.lpForStaking[state.selectedLp] : null;

  useEffect(() => {
    if (connected && address) {
      fetchLps();
    }
  }, [connected, address]);

  const amountInUsd = selectedLp
    ? new BigNumber(selectedLp.balance)
        .multipliedBy(selectedLp.tokenPrice)
        .toFixed(2)
    : "10";

  const selectedAmountInBalance = selectedLp
    ? new BigNumber(selectedLp.balance)
        .multipliedBy(isNaN(parseInt(state.percentLp)) ? 0 : state.percentLp)
        .dividedBy(100)
        .toFixed(2)
    : "10";

  const selectedAmountinUSd = selectedLp
    ? new BigNumber(selectedAmountInBalance)
        .multipliedBy(selectedLp.tokenPrice)
        .toFixed(2)
    : "10";

  const borrowAmount = selectedLp
    ? new BigNumber(selectedAmountInBalance)
        .multipliedBy(maxDebtRatio)
        .dividedBy(100)
        .toFixed(2)
    : "10";

  const selectNewLp = (index: number) => {
    setState((old) => ({ ...old, selectedLp: index }));
  };

  const selectLpPercent = (percent: string) => {
    setState((old) => {
      const newState = { ...old, percentLp: percent };

      newState.commission = calcFloorCommission(newState, maxDebtRatio);

      return newState;
    });
  };

  const minCommission = useMemo(() => {
    return calcFloorCommission(state, maxDebtRatio);
  }, [state, maxDebtRatio]);

  if (!state.commission.lt(minCommission)) {
    commissionRef.current = state.commission;
  }

  const validate = (val: string) => {
    return minCommission.lte(val);
  };

  return (
    <div className="make_a_bid">
      {state.fetchstatus !== "fetchingcomplete" ? (
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
              <span className="data">≈ ${formatNum(amountInUsd)}</span>
            </div>
            <div className="dropdown_container">
              <Dropdown>
                {transformArray(state.lpForStaking, state.selectedLp).map(
                  (item, index) => {
                    return (
                      <div
                        key={item.poolAddress}
                        onClick={() => selectNewLp(index)}
                        className="option"
                      >
                        <div className="left">
                          <div
                            className="icon"
                            style={{
                              backgroundImage: `url('${item.icon}')`,
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
                              {item.balance} {item.tokenSymbol}
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
              <span className="data">≈ ${formatNum(selectedAmountinUSd)}</span>
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
                    * {selectedLp!.balance} {selectedLp!.tokenSymbol}
                  </div>
                </div>
                <div className="right">
                  <div className="amount">
                    <div className="icon"></div>
                    <div className="amount">
                      = ${selectedAmountInBalance} {selectedLp!.tokenSymbol}
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
                    The Tier 5 will get 70%, Tier 4 will get 50%, and all the
                    rest will get 0%.
                  </p>
                  <a href="https://google.com">MORE INFO</a>
                </div>
              </div>
            </div>
            <h5>
              {borrowAmount} {selectedLp!.tokenSymbol}
            </h5>
            <p>
              Collateral {selectedAmountInBalance} {selectedLp!.tokenSymbol} *{" "}
              {maxDebtRatio}% = {borrowAmount} {selectedLp!.tokenSymbol} Tier{" "}
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
                    {selectedLp!.tokenSymbol}
                  </div>
                </div>
                <div className="right">
                  <div className="amount">
                    <div className="icon"></div>
                    <div className="amount">
                      {calcCommisionPercent(
                        borrowAmount,
                        commissionRef.current
                      )}
                      %
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
              <span>Floor commision {selectedLp!.floorCommission}%</span>
              <span>Repay loan date: 06/12/2021</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
