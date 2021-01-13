/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { PROTOCOLS } from "../../hooks";
function drag(ev) {
  ev.dataTransfer.setData("protocol", ev.target.id);
}

const Protocol = ({
  name,
  panel: PanelComp,
  toggleModal,
  onClose,
  openedPanel,
}) => {
  const protocol = PROTOCOLS[name];
  if (!protocol.showOnToolbar) {
    return null;
  }
  return (
    <li className="protocol-list-item">
      <img
        src={protocol.icon}
        draggable
        id={name}
        onDragStart={(e) => drag(e)}
      />
      {PanelComp && (
        <PanelComp
          toggleModal={toggleModal}
          onClose={onClose}
          isOpen={openedPanel === protocol.panel}
        />
      )}
    </li>
  );
};

export default React.memo(Protocol);
