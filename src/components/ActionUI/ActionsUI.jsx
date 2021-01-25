/* eslint-disable default-case */
import React, { useState } from "react";
import { ActionsPanel } from "../Panel/ActionsPanel";
import { FaChevronLeft } from "react-icons/fa";
import { InputOutput } from "../ActionInputs/InputOutput";
import "./actionsui.scss";
import {
  UniswapInput,
  UniswapInputReverse,
} from "../ActionInputs/UniswapInput";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput";
import { CurveInput } from "../ActionInputs/CurveInput";
import { CurveLiquidity } from "../ActionInputs/CurveLiquidity";
import { actionsMap } from "../../hooks/ActionsMap";
import { BalancerAddLiquidity } from "../ActionInputs/BalancerAddLiquidity";
import { BalancerRemoveLiquidity } from "../ActionInputs/BalancerRemoveLiquidity";
import { CryptoInputSimple } from "../CryptoCurrencyInput/CryptoInputSimple";
import { currencies } from "../CryptoCurrencyInput/currencies";
import { SetButton } from "./SetButton";

export const ActionsUI = ({ icon, protocol, lastProtocol }) => {
  const [state, setState] = useState({ selectedAction: null });

  const onSelect = (name) => {
    setState({ selectedAction: name });
  };

  const renderPanel = () => {
    if (protocol.name === "YFI") {
      switch (state.selectedAction) {
        case "Withdrawal":
        case "Deposit": {
          return (
            <div className="action-wrapper">
              <InputOutput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }

    if (protocol.name === "Uniswap") {
      switch (state.selectedAction) {
        case "SwapToken": {
          return (
            <div className="action-wrapper">
              <InputOutput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "AddLiquidity": {
          return (
            <div className="action-wrapper">
              <UniswapInput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "RemoveLiquidity": {
          return (
            <div className="action-wrapper">
              <UniswapInputReverse />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }

    if (protocol.name === "AAVE") {
      switch (state.selectedAction) {
        case "Withdrawal":
        case "Deposit": {
          return (
            <div className="action-wrapper">
              <InputOutput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }

    if (protocol.name === "Compound") {
      switch (state.selectedAction) {
        case "Supply":
        case "Borrow":
        case "Repay":
        case "Withdrawal": {
          return (
            <div className="action-wrapper">
              <InputOutput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "CollectComp": {
          return (
            <div className="action-wrapper py-4">
              <CryptoCurrencyInput
                name="COMP"
                icon={
                  <span style={{ width: 22 }}>
                    <img className="img-fluid" src={icon} />
                  </span>
                }
                noDropdown
                label={"Output"}
                placeholder="Amount"
              />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }

    if (protocol.name === "Curve") {
      switch (state.selectedAction) {
        case "SwapStable": {
          return (
            <div className="action-wrapper py-4">
              <CurveInput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "SwapBTC": {
          return (
            <div className="action-wrapper py-4">
              <CurveInput noPrev />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "AddLiquidity": {
          return (
            <div className="action-wrapper py-4">
              <CurveLiquidity />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "RemoveLiquidity": {
          return (
            <div className="action-wrapper py-4">
              <InputOutput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "StakeToken": {
          return (
            <div className="action-wrapper py-4">
              <InputOutput noOutput />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "ClaimCRV": {
          return (
            <div className="action-wrapper py-4">
              <CryptoCurrencyInput
                name="yCRV"
                icon={
                  <span style={{ width: 22 }}>
                    <img className="img-fluid" src={icon} />
                  </span>
                }
                noDropdown
                label={"Output"}
                placeholder="0"
              />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }

    if (protocol.name === "Balancer") {
      switch (state.selectedAction) {
        case "SwapToken": {
          return (
            <div className="action-wrapper py-4">
              <CurveInput noPrev />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "AddLiquidity": {
          return (
            <div className="action-wrapper py-4">
              <BalancerAddLiquidity />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "RemoveLiquidity": {
          return (
            <div className="action-wrapper py-4">
              <BalancerRemoveLiquidity />
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }

    if (protocol.name === "MakerDAO") {
      switch (state.selectedAction) {
        case "Deposit Colleteral": {
          return (
            <div className="action-wrapper py-4">
              <div>
                <CryptoInputSimple
                  label="Vault"
                  name="#"
                  placeholder="Number"
                />
                <CryptoInputSimple
                  className="mt-4"
                  icon={currencies[1].icon}
                  label="Input"
                  name="ETH"
                  placeholder="Amount"
                />
                <div className="arrow-wrapper justify-content-end">
                  <div className="arrow-max">Max</div>
                </div>
                <div className="makerdao_info">
                  <div>
                    <div>Current ETH locked</div>
                    <div>Collateralization ratio</div>
                  </div>
                  <div>
                    <div>0 ETH</div>
                    <div>N/A</div>
                  </div>
                </div>
              </div>

              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "Withdrawal": {
          return (
            <div className="action-wrapper py-4">
              <div>
                <CryptoInputSimple
                  label="Vault"
                  name="#"
                  placeholder="Number"
                />
                <CryptoInputSimple
                  className="mt-4"
                  icon={currencies[1].icon}
                  label="Input"
                  name="ETH"
                  placeholder="Amount"
                />
                <div className="arrow-wrapper justify-content-end">
                  <div className="arrow-max">Withdrawal all</div>
                </div>
                <div className="actionprop_info mt-0">
                  <div>
                    <div>Current ETH locked</div>
                    <div>Able to withdrawal</div>
                    <div>Collateralization ratio</div>
                  </div>
                  <div>
                    <div>0 ETH</div>
                    <div>0 ETH</div>
                    <div>N/A</div>
                  </div>
                </div>
              </div>
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "Generate DAI": {
          return (
            <div className="action-wrapper py-4">
              <div>
                <CryptoInputSimple
                  label="Vault"
                  name="#"
                  placeholder="Number"
                />
                <CryptoInputSimple
                  className="mt-4"
                  icon={currencies[0].icon}
                  label="Input"
                  name="DAI"
                  placeholder="Amount"
                />
                <div className="arrow-wrapper justify-content-end">
                  <div className="arrow-max">Withdrawal all</div>
                </div>
                <div className="actionprop_info mt-0">
                  <div>
                    <div>Able to generate</div>
                    <div>Collateralization ratio</div>
                  </div>
                  <div>
                    <div>0 DAI</div>
                    <div>N/A</div>
                  </div>
                </div>
              </div>
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
        case "Repay": {
          return (
            <div className="action-wrapper py-4">
              <div>
                <CryptoInputSimple
                  label="Vault"
                  name="#"
                  placeholder="Number"
                />
                <CryptoInputSimple
                  className="mt-4"
                  icon={currencies[0].icon}
                  label="Input"
                  name="DAI"
                  placeholder="Amount"
                />
                <div className="arrow-wrapper justify-content-end">
                  <div className="arrow-max">Withdrawal all</div>
                </div>
                <div className="actionprop_info mt-0">
                  <div>
                    <div>Outstanding Dai debit</div>
                    <div>Collateralization ratio</div>
                  </div>
                  <div>
                    <div>0 DAI</div>
                    <div>N/A</div>
                  </div>
                </div>
              </div>
              <SetButton protocol={protocol} action={state.selectedAction} />
            </div>
          );
        }
      }
    }
  };

  if (state.selectedAction) {
    return (
      <div className="p-4 d-flex flex-column flex-val-1">
        <div className="d-flex align-items-center justify-content-between">
          <span
            onClick={() => setState({ selectedAction: null })}
            className="cursor-pointer"
          >
            <FaChevronLeft />
          </span>
          <h3 style={{ fontSize: 23 }} className="mb-0">
            {state.selectedAction}
          </h3>
          <span style={{ width: 22 }}>
            <img className="img-fluid" src={icon} />
          </span>
        </div>
        {renderPanel()}
      </div>
    );
  } else {
    return (
      <ActionsPanel
        lastprotocol={lastProtocol}
        onSelect={onSelect}
        protocol={protocol}
      />
    );
  }
};
