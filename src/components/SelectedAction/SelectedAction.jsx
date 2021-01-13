/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAwayListener, useToggle } from "../../hooks";

export const SelectedAction = ({ actions = [] }) => {
  const [open, , doClose, doToggle] = useToggle();

  const anchorRef = useRef();

  const getPopupStyle = () => {
    if (open) {
      const styles = anchorRef.current.getBoundingClientRect();
      return {
        display: "block",
        left: styles.left,
        top: styles.top + styles.height + 10,
        transform: `translateX(-25%)`,
      };
    } else {
      return { display: "none" };
    }
  };
  const { onMouseDown } = useClickAwayListener({ onClickAway: doClose });
  return (
    <div onMouseDown={onMouseDown} className="position-relative">
      <div ref={anchorRef} onClick={doToggle} className="action_select">
        Select default
      </div>
      {createPortal(
        <div style={getPopupStyle()} className={clsx("action_select_popup")}>
          {actions.map(({ name, icon }) => {
            return (
              <div key={name} className="action_select_item">
                {icon && (
                  <span className="action_select_icon">
                    <img className="img-fluid" src={icon} />
                  </span>
                )}
                {name}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
};
