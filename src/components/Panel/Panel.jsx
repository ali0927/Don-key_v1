/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React from "react";
import { createPortal } from "react-dom";
import { PROTOCOLS } from "../../hooks";
import { useGraphMethods } from "../GraphProvider/GraphProvider";
import noProtocol from "../../images/no-protocol.png";
import { SquareLine } from "../SquareLine/SquareLine";
import { SelectedAction } from "../SelectedAction/SelectedAction";




const Panel = ({ isOpen, title, onClose, icon, url, desc, children }) => {
  const { getSelectedProtocol } = useGraphMethods();
  const selectedProtocol = getSelectedProtocol();

  const renderActionSelector = () => {
    if (selectedProtocol) {
      const protocol = PROTOCOLS[selectedProtocol.protocol];
      const actions = Object.values(protocol.actions || {});
      return (
        <div className="panel_action">
          <div className="panel_action_img">
            <img className="img-fluid" src={protocol.base64} />
          </div>
          <SquareLine color={protocol.edgeColor} />
          <SelectedAction actions={actions} />
          <SquareLine color="#A1A5A4" />
          <div className="panel_action_img">
            <img className="img-fluid" src={noProtocol} />
          </div>
        </div>
      );
    }
    return null;
  };

  return createPortal(
    <div className={clsx("panel", { panel_open: isOpen })}>
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
        {renderActionSelector()}
      </div>

      <div className="panel_scroll">{children}</div>

      <div className="panel_footer">
        <button className="btn btn_cancel">Cancel</button>
        <button className="btn btn_delete">Delete</button>
        <input type="submit" className="btn btn_save" value="Save" />
      </div>
    </div>,
    document.body
  );
};

export default Panel;
