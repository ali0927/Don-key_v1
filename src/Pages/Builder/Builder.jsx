/* eslint-disable jsx-a11y/alt-text */
import React from "react";
// import { map } from "lodash";
import { PROTOCOLS, useGraph } from "../../hooks";
import clsx from "clsx";
import "./main.scss";
import "./modal.scss";
import { ProtocolBar } from "../../components/ProtocolBar/ProtocolBar";
import Protocol from "../../components/Protocol/Protocol";
import { BuilderModal } from "../../components/BuilderModal/BuilderModal";
import { ActionConfig } from "../../components/ActionConfig/ActionConfig";
import { CompPanel, YearnPanel } from "./Panels";
/**
 *
 *
 * @return {*}
 */
const Builder = () => {
  const {
    getActionConfigStyle,
    isModalOpen,
    insertAction,
    panel,
    toggleModal,
    closePanel,
  } = useGraph({ id: "graphContainer" });

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
        <div id="graphContainer" className="graph-wrapper"></div>
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
      </div>
      <BuilderModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        insertAction={insertAction}
      />

      <ActionConfig style={getActionConfigStyle()} />
    </>
  );
};

export default Builder;
