import clsx from "clsx";
import { Web3Provider } from "don-components";
import { uuidv4 } from "don-utils";
import  { useMemo, useState } from "react";
import { GraphProvider } from "../Components";
import { ActionConfig } from "../Components/ActionConfig";
import BalanceBar from "../Components/BalanceBar/BalanceBar";
import Protocol from "../Components/Protocol/Protocol";
import { ProtocolBar } from "../Components/ProtocolBar";
import { IProtocolFromAPI } from "../interfaces";

const defaultStrategy = {
  protocolCells: [
    {
      protocolId: uuidv4(),
      protocol: "BY",
      lastProtocol: null,
      x: 200,
      y: 150,
      w: 110,
      h: 110,
      vertex: null,
    },
  ],
  actionCells: [],
};

function Builder({
  protocols,
  strategy,
}: {
  protocols: IProtocolFromAPI[];
  strategy: typeof defaultStrategy;
}) {
  const [panel, setPanel] = useState(null);
  const closePanel = () => setPanel(null);
  const firstSeven = useMemo(() => {
    return protocols.length > 6
      ? protocols.slice(0, protocols.length - 1)
      : protocols;
  }, [protocols]);
  const [isApproved, setApproved] = useState(false);
  const handleApprove = async () => {
    setApproved(true);
  };

  return (
    <Web3Provider>
      <div className={clsx(`page-wrapper`)}>
        {/* <img src={generateGradientImage("red", "blue")} /> */}
        {protocols.length > 0 ? (
          <GraphProvider
            strategy={strategy}
            openPanel={setPanel}
            protocols={protocols}
          >
            <ProtocolBar>
              {firstSeven.map(
                ({
                  name,
                  showOnToolbar,
                  toolbarImageURL,
                  website,
                  description,
                }) => {
                  return (
                    <Protocol
                      key={name}
                      onClose={closePanel}
                      openedPanel={panel}
                      icon={toolbarImageURL}
                      name={name}
                      website={website}
                      description={description}
                      showOnToolbar={showOnToolbar === "1"}
                    />
                  );
                }
              )}
         
            </ProtocolBar>
            <ActionConfig />
            <div
              style={{
                position: "absolute",
                top: 120,
                right: 87,
                padding: "15px 20px",
                backgroundColor: "white",
                border: "3px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={handleApprove}
            >
              {isApproved ? "Approved" : "Approve strategy"}
            </div>
            <div
              style={{
                position: "absolute",
                top: 200,
                right: 87,
                padding: "15px 20px",
                backgroundColor: "white",
                border: "3px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={handleApprove}
            >
              Deploy Strategy
            </div>
            <div
              style={{
                position: "absolute",
                top: 280,
                right: 87,
                padding: "15px 20px",
                backgroundColor: "white",
                border: "3px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={handleApprove}
            >
              EnableStrategy
            </div>
            <BalanceBar />
          </GraphProvider>
        ) : (
          "Loading"
        )}
      </div>
    </Web3Provider>
  );
}

export { Builder };
