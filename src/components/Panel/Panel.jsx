/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React from "react";
import { createPortal } from "react-dom";
import { ActionsUI } from "../ActionUI/ActionsUI";
import { useGraphMethods } from "../GraphProvider/GraphProvider";
import { SquareLine } from "../SquareLine/SquareLine";
import { ActionsPanel } from "./ActionsPanel";
const Panel = ({ isOpen, title, onClose, icon, url, desc }) => {
  const { getSelectedProtocol, divRef, getProtocol } = useGraphMethods();
  const selectedProtocol = getSelectedProtocol();

  const renderActionSelector = () => {
    if (selectedProtocol && selectedProtocol.lastProtocol) {
      const protocol = getProtocol(selectedProtocol.protocol);
      const lastprotcol = getProtocol(selectedProtocol.lastProtocol);

      return (
        <div className="panel_action">
          <div className="panel_action_img">
            <img className="img-fluid" src={lastprotcol.base64} />
          </div>
          <SquareLine color={lastprotcol.edgeColor} />
          <div className="action_select">Select default</div>
          <SquareLine color={protocol.edgeColor} />
          <div className="panel_action_img">
            <img className="img-fluid" src={protocol.base64} />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderActions = () => {
    if (selectedProtocol && selectedProtocol.lastProtocol) {
      const protocol = getProtocol(selectedProtocol.protocol);

      const lastprotcol = getProtocol(selectedProtocol.lastProtocol);
      return <ActionsUI icon={icon} protocol={protocol} lastProtocol={lastprotcol} />;
    }
    return null;
  };

  const getPosition = () => {
    if (!divRef.current) {
      return {};
    }
    const rect = divRef.current.getBoundingClientRect();
    return { top: rect.top, bottom: 0 };
  };

  return createPortal(
    <div
      className={clsx("panel", { panel_open: isOpen })}
      style={getPosition()}
    >
      <div className="panel_header">
        <div className="d-flex align-items-center">
          <h2>{title}</h2>
          <div className="panel_icon">
            <img className="img-fluid" src={icon} />
          </div>
        </div>
        <button onClick={onClose} id="close" className="btn_close">
          X
        </button>
        <div>
          <a className="panel_link" href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
        <div className="desc panel-desc">{desc}</div>
        <div className="d-flex justify-content-center">
          {renderActionSelector()}
        </div>

        <div className="panel-triangle">
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.37222 16.2436L9.5002 1.98614L17.6282 16.2436H1.37222Z"
              stroke="#C5C5C5"
            />
            <path
              d="M2.27344 15.668L16.7383 15.6914L17.4486 16.809L16.8659 19.1284H2.08203L1.46484 16.8304L2.27344 15.668Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {renderActions()}

      {/* <div className="panel_footer">
        <button className="btn btn_cancel">Cancel</button>
        <button className="btn btn_delete">Delete</button>
        <input type="submit" className="btn btn_save" value="Save" />
      </div> */}
    </div>,
    document.body
  );
};

export default Panel;
