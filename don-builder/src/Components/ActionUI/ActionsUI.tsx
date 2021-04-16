
import { ActionsPanel } from "../Panel/ActionsPanel";
import { FaChevronLeft } from "react-icons/fa";
import "./actionsui.scss";

import { IProtocolFromAPI } from "../../interfaces";

export const ActionsUI = ({
  icon,
  selectedAction,
  onSelect,
  protocol,
  lastProtocol,
}: {
  icon: string;
  selectedAction: string | null;
  onSelect: (val: string | null) => void;
  protocol: IProtocolFromAPI;
  lastProtocol: IProtocolFromAPI;
}) => {

  
  if (selectedAction) {
    const Comp = protocol.actions[selectedAction].Comp;
    return (
      <div className="p-4 d-flex flex-column flex-val-1">
        <div className="d-flex align-items-center justify-content-between">
          <span onClick={() => onSelect(null)} className="cursor-pointer">
            <FaChevronLeft />
          </span>
          <h3 style={{ fontSize: 23 }} className="mb-0">
            {selectedAction}
          </h3>
          <span style={{ width: 22 }}>
            <img className="img-fluid" src={icon} />
          </span>
        </div>
        <div className="action-wrapper">
          <Comp />
        </div>
      </div>
    );
  } else {
    return (
      <ActionsPanel
        lastProtocol={lastProtocol}
        onSelect={onSelect}
        protocol={protocol}
      />
    );
  }
};


