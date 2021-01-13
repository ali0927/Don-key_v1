/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
// import { map } from "lodash";
import { PROTOCOLS,  useToggle } from "../../hooks";
import clsx from "clsx";
import "./main.scss";
import "./modal.scss";
import { ProtocolBar } from "../../components/ProtocolBar/ProtocolBar";
import Protocol from "../../components/Protocol/Protocol";
import { BuilderModal } from "../../components/BuilderModal/BuilderModal";
import { ActionConfig } from "../../components/ActionConfig/ActionConfig";
import { CompPanel, YearnPanel } from "./Panels";
import { GraphProvider } from "../../components/GraphProvider/GraphProvider";

/**
 *
 *
 * @return {*}
 */
const Builder = () => {
  const [panel, setPanel] = useState(null);
  const [isModalOpen, , , toggleModal] = useToggle();
 

  const closePanel = () => setPanel(null);

  const getPanel = (name) => {
    switch (name) {
      case "yfi": {
        return YearnPanel;
      }
      case "comp": {
        return CompPanel;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      <div className={clsx(`page-wrapper`, { blur: isModalOpen })}>
        <GraphProvider openPanel={setPanel} >
          <ProtocolBar>
            {Object.keys(PROTOCOLS).map((name) => {
              return (
                <Protocol
                  key={name}
                  toggleModal={toggleModal}
                  onClose={closePanel}
                  openedPanel={panel}
                  name={name}
                  panel={getPanel(name)}
                />
              );
            })}
          </ProtocolBar>

          <BuilderModal
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />

          <ActionConfig  />
        </GraphProvider>
      </div>
    </>
  );
};

export default Builder;
