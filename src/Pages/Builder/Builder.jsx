/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useToggle } from "../../hooks";
import clsx from "clsx";
import { ProtocolBar } from "../../components/ProtocolBar/ProtocolBar";
import Protocol from "../../components/Protocol/Protocol";
import { BuilderModal } from "../../components/BuilderModal/BuilderModal";
import { ActionConfig } from "../../components/ActionConfig/ActionConfig";
import { CompPanel, YearnPanel } from "./Panels";
import { GraphProvider } from "../../components/GraphProvider/GraphProvider";
import { NavBar3 } from "../../components/Navbar/NavBar";
import "./main.scss";
import { api } from "../../services/api";

const Builder = () => {
  const [panel, setPanel] = useState(null);
  const [isModalOpen, , , toggleModal] = useToggle();
  const [protocols, setProtocols] = useState([]);
  const closePanel = () => setPanel(null);
  console.log(panel);
  const getPanel = (name) => {
    name = name.toLowerCase();
    switch (name) {
      case "yfi": {
        return YearnPanel;
      }
      case "compound": {
        return CompPanel;
      }
      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    api.get("/api/v1/protocols").then((res) => {
      setProtocols(res.data);
    });
  }, []);

  return (
    <>
      <div className={clsx(`page-wrapper`, { blur: isModalOpen })}>
        <NavBar3 />
        {protocols.length > 0 ? (
          <GraphProvider openPanel={setPanel} protocols={protocols}>
            <ProtocolBar>
              {protocols.map(({ name, showOnToolbar, toolbarImageURL }) => {
                return (
                  <Protocol
                    key={name}
                    toggleModal={toggleModal}
                    onClose={closePanel}
                    openedPanel={panel}
                    icon={toolbarImageURL}
                    name={name}
                    panel={getPanel(name)}
                    showOnToolbar={showOnToolbar === "1"}
                  />
                );
              })}
            </ProtocolBar>
            <BuilderModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
            <ActionConfig />
          </GraphProvider>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
};

export default Builder;
