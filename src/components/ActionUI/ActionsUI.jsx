import React, { useState } from "react";
import { ActionsPanel } from "../Panel/ActionsPanel";
import { FaChevronLeft } from "react-icons/fa";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput/CryptoCurrencyInput";



export const ActionsUI = ({ icon, protocol, lastProtocol }) => {
  const [state, setState] = useState({ selectedAction: null });

  const onSelect = (name) => {
    setState({ selectedAction: name });
  };
  if (state.selectedAction) {
    return (
      <div className="p-4">
        <div className="d-flex align-items-center justify-content-between">
          <span onClick={() => setState({selectedAction: null})} className="cursor-pointer">
            <FaChevronLeft />
          </span>
          <h3 style={{ fontSize: 23 }} className="mb-0">{state.selectedAction}</h3>
          <span style={{width: 22}}>
            <img className="img-fluid" src={icon} />
          </span>
        </div>
        <div>
            <CryptoCurrencyInput />
        </div>

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
