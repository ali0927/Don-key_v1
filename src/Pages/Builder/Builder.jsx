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
import { getQueryParam, uuidv4 } from "../../helpers/helpers";
import { useHistory } from "react-router-dom";

const createStrategy = {};

export const first = uuidv4();
const Builder = () => {
    const [panel, setPanel] = useState(null);
    const [isModalOpen, , , toggleModal] = useToggle();
    const [protocols, setProtocols] = useState([]);
    const closePanel = () => setPanel(null);

    const history = useHistory();

    const [strategy, setStrategy] = useState({
        protocolCells: [
            {
                protocolId: first,
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
    });

    useEffect(() => {
        const strategy = getQueryParam("id");
        if (strategy) {
            Promise.all([
                api.get("/api/v1/strategies?id=" + strategy),
                api.get("/api/v1/protocols"),
            ]).then(([strategy, protocol]) => {
                const json = strategy.data[0].json;

                setStrategy((old) => {
                    const data = json ? JSON.parse(json) : old;

                    return { ...data, id: strategy.data[0].id };
                });
                setProtocols(protocol.data);
            });
        } else {
            api.post("/api/v1/strategies").then((res) => {
                const strategyid = res.data.id;
                history.push("/strategy/build?id=" + strategyid);
                window.location.reload();
            });
        }
    }, []);

    return (
        <>
            <div className={clsx(`page-wrapper`, { blur: isModalOpen })}>
                <NavBar3 />
                {protocols.length > 0 ? (
                    <GraphProvider
                        strategy={strategy}
                        openPanel={setPanel}
                        protocols={protocols}
                    >
                        <ProtocolBar>
                            {protocols.map(
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
