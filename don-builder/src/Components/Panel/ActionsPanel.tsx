import React, { useMemo } from "react";
import { IProtocolFromAPI } from "../../interfaces";

export const ActionsPanel = ({
  lastProtocol,
  protocol,
  onSelect = () => {},
}: {
  lastProtocol: IProtocolFromAPI;
  protocol: IProtocolFromAPI;
  onSelect: (name: string) => void;
}) => {
  const { actions: actionsObj } = protocol;

  const actions = useMemo(() => {
    return Object.keys(actionsObj).map((item) => {
      return {
        name: item,
        icon: actionsObj[item].icon,
      };
    });
  }, [actionsObj]);

  return (
    <div className="p-4">
      <h3 style={{ fontSize: 23 }}>Select Action</h3>
      <div className="row mt-4">
        {actions &&
          actions.length > 0 &&
          actions.map((action) => {
            return (
              <div className="col-4">
                <button
                  onClick={() => onSelect(action.name)}
                  className="panel-action-btn"
                >
                  <div
                    className="panel-action-btn-bg"
                    style={{
                      background: `linear-gradient(to right, ${lastProtocol.edgeColor}, ${protocol.edgeColor})`,
                    }}
                  />
                  {action.icon ? (
                    <span className="d-inline-block mr-2" style={{ width: 15 }}>
                      <img className="img-fluid" src={action.icon} />
                    </span>
                  ) : null}
                  {action.name}{" "}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
