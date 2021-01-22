/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useToggle } from "../../hooks";
import clsx from "clsx";
import { ProtocolBar } from "../../components/ProtocolBar/ProtocolBar";
import Protocol from "../../components/Protocol/Protocol";
import { BuilderModal } from "../../components/BuilderModal/BuilderModal";
import { ActionConfig } from "../../components/ActionConfig/ActionConfig";
import { GraphProvider } from "../../components/GraphProvider/GraphProvider";
import { NavBar3 } from "../../components/Navbar/NavBar";
import "./main.scss";
import { api } from "../../services/api";

const Builder = () => {
  const [panel, setPanel] = useState(null);
  const [isModalOpen, , , toggleModal] = useToggle();
  const [protocols, setProtocols] = useState([]);
  const closePanel = () => setPanel(null);

  useEffect(() => {
    api.get("/api/v1/protocols").then((res) => {
      setProtocols(res.data);
    });
  }, []);
  // const { showTooltip } = useTooltip();

  // useEffect(() => {
  //   if (protocols.length > 0) {
  //     showTooltip({
  //       rect: {top: 100, left: 100, width: 100, height: 100},
  //       direction: "right",
  //       msg: "Test Messsssssssss",
  //       duration: 10000,
  //     });
  //   }
  // }, [protocols]);

  return (
    <>
      <div className={clsx(`page-wrapper`, { blur: isModalOpen })}>
        <NavBar3 />
        {protocols.length > 0 ? (
          <GraphProvider openPanel={setPanel} protocols={protocols}>
            <ProtocolBar>
              {protocols.map(({ name, showOnToolbar, toolbarImageURL, website, description }) => {
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
