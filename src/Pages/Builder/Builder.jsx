/* eslint-disable jsx-a11y/alt-text */
import React from "react";
// import { map } from "lodash";
import { useGraph } from "../../hooks";
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
    closePanel
  } = useGraph({ id: "graphContainer" });

  return (
    <>
      <div className={clsx(`page-wrapper`, { blur: isModalOpen })}>
        <div id="graphContainer" className="graph-wrapper"></div>
        <ProtocolBar>
          <Protocol name="buru" />
          <Protocol
            name="yfi"
            panel={
              <YearnPanel
                isOpen={panel === "#yfipanel"}
                toggleModal={toggleModal}
                onClose={closePanel}
              />
            }
          />
          <Protocol name="uniswap" />
          <Protocol name="aave" />
          <Protocol
            name="comp"
            panel={
              <CompPanel
                isOpen={panel === "#cmppanel"}
                toggleModal={toggleModal}
                onClose={closePanel}
              />
            }
          />
          <Protocol name="harvest" />
          <Protocol name="crv" />
          <Protocol name="balancer" />
          <Protocol name="oneinch" />
          <Protocol name="maker" />
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
