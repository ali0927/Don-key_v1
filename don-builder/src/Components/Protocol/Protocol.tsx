/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import React from "react";
import { useToggle } from "don-hooks";
function drag(ev: React.DragEvent, protocol: string) {
  ev.dataTransfer.setData("protocol", protocol);
  ev.dataTransfer.effectAllowed = 'move';
}
const Protocol = ({
  name,
  showOnToolbar,
  icon,
}: {name: string; showOnToolbar?: boolean; icon: string}) => {
  const [dragging, enableDragging, disableDragging] = useToggle(false);
  if (!showOnToolbar) {
    return null;
  }
  return (
    <li className={clsx("protocol-list-item", { dragging })}>
      <img
        src={icon}
        style={{ maxWidth: 58 }}
        draggable
        onDragStart={(e) => {
          drag(e, name);
          enableDragging();
        }}
        onMouseEnter={disableDragging}
      />
      <div className="protocol-list-item-tooltip">{name}</div>
    </li>
  );
};

export default React.memo(Protocol);
