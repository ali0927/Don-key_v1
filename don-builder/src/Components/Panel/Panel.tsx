/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React, { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ActionsUI } from "../ActionUI/ActionsUI";
import { SquareLine } from "../SquareLine/SquareLine";
import { useToggle } from "don-hooks";
import { IProtocolFromAPI } from "../../interfaces";

const TriangleIcon = () => {
  return (
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
  );
};

export type IPanelContext = {
  enableBlur: () => void;
  disableBlur: () => void;
};

const PanelContext = createContext<IPanelContext | null>(null);

export const usePanel = () => useContext(PanelContext) as IPanelContext;

const Panel = ({
  isOpen,
  onClose,
  lastProtocol,
  currentProtocol,
}: {
  lastProtocol: IProtocolFromAPI;
  onClose: () => void;

  isOpen: boolean;
  currentProtocol: IProtocolFromAPI;
}) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const renderActionSelector = () => {
    return (
      <div className="panel_action">
        <div className="panel_action_img">
          <img className="img-fluid" src={lastProtocol.vertextImage} />
        </div>
        <SquareLine color={lastProtocol.edgeColor} />
        {selectedAction ? (
          <div
            className="action_select"
            style={{
              color: "#fff",
              border: "none",
              background: `linear-gradient(to right, ${lastProtocol.edgeColor}, ${currentProtocol.edgeColor})`,
            }}
          >
            {selectedAction}
          </div>
        ) : (
          <div className="action_select">Select action</div>
        )}
        <SquareLine color={currentProtocol.edgeColor} />
        <div className="panel_action_img">
          <img className="img-fluid" src={currentProtocol.vertextImage} />
        </div>
      </div>
    );
  };



  const [isBlurred, enableBlur, disableBlur] = useToggle();
  const memoizedArgs = useMemo(() => {
    return { enableBlur, disableBlur };
  }, []);
  const {name: title,toolbarImageURL: icon,description: desc,website: url} = currentProtocol;

  return createPortal(
    <PanelContext.Provider value={memoizedArgs}>
      <div
        className={clsx("panel", { panel_open: isOpen })}
      >
        <div
          className={clsx("d-flex  flex-column flex-val-1", {
            "blur-2": isBlurred,
          })}
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
              <a
                className="panel_link"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                {url}
              </a>
            </div>
            {/* <div className="desc panel-desc">{desc}</div> */}
            <div className="d-flex justify-content-center">
              {renderActionSelector()}
            </div>

            <div className="panel-triangle">
              <TriangleIcon />
            </div>
          </div>
          <ActionsUI
            onSelect={setSelectedAction}
            selectedAction={selectedAction}
            icon={icon}
            protocol={currentProtocol}
            lastProtocol={lastProtocol}
          />
        </div>
      </div>
    </PanelContext.Provider>,
    document.body
  );
};

export default Panel;
