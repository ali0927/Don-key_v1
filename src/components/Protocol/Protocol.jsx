/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React from "react";
import { useToggle } from "../../hooks";
function drag(ev) {
  ev.dataTransfer.setData("protocol", ev.target.id);
}

const Protocol = ({
  name,
  panel: PanelComp,
  toggleModal,
  onClose,
  openedPanel,
  showOnToolbar,
  icon
}) => {

  const [dragging, enableDragging, disableDragging] = useToggle(false);
  if (!showOnToolbar) {
    return null;
  }
  return (
    <li className={clsx("protocol-list-item", { dragging })}>
      <img
        src={icon}
        draggable
        id={name}
        onDragStart={(e) => {
          drag(e);
          enableDragging();
        }}
        onMouseEnter={disableDragging}
      />
      <div className="protocol-list-item-tooltip">{name}</div>
      {PanelComp && (
        <PanelComp
          toggleModal={toggleModal}
          onClose={onClose}
          isOpen={openedPanel === name}
        />
      )}
    </li>
  );
};

export default React.memo(Protocol);
