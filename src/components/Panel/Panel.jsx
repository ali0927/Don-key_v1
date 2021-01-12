/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React from "react";
import { createPortal } from "react-dom";
const Panel = ({ isOpen, title, onClose,  icon, url, desc, children }) => {
  return createPortal(
    <div className={clsx("panel", { panel_open: isOpen })}>
      <div className="panel_header">
        <div className="d-flex align-items-center">
          <h2>{title}</h2>
          <div className="panel_icon"><img className="img-fluid" src={icon}  /></div>
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