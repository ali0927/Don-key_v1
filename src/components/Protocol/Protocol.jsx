/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { PROTOCOLS } from "../../hooks";
function drag(ev) {
  ev.dataTransfer.setData("protocol", ev.target.id);
}

/**
 * Protocol Component
 *
 * @param {{name: keyof typeof PROTOCOLS, panel: any}} props
 *
 * @return {React.ReactNode} 
 */
const Protocol = ({ name, panel }) => {
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
      {panel}
    </li>
  );
};

export default React.memo(Protocol)
