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
import { generateGradientImage, getQueryParam, uuidv4 } from "../../helpers/helpers";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onApiRequest } from "actions/apiActions";





const Builder = () => {
    const [panel, setPanel] = useState(null);
    const [isModalOpen, , , toggleModal] = useToggle();
    const [protocols, setProtocols] = useState([]);
    const closePanel = () => setPanel(null);

    const history = useHistory();

    const [strategy, setStrategy] = useState({
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
    });

    const dispatch = useDispatch()

    const getStrategy = () => {
        return new Promise((res,rej) => {
            dispatch(onApiRequest({method: "GET",endpoint: "/api/v1/strategies?id=" + strategy,onDone: res,onFail: rej}));
        })
    }

    const createStrategy = () => {
        return new Promise((res,rej) => {
            dispatch(onApiRequest({method: "POST",endpoint: "/api/v1/strategies" ,onDone: res,onFail: rej}));
        })
    }
    const getProtocols = () => {
        return new Promise((res,rej) => {
            dispatch(onApiRequest({method: "GET",endpoint: "/api/v1/protocols" ,onDone: res,onFail: rej}));
        })
    }
    

    useEffect(() => {
        const strategy = getQueryParam("id");
        const request = strategy
            ?  getStrategy()
            : createStrategy();

        Promise.all([request, getProtocols()]).then(
            ([strategy, protocol]) => {
                const json = strategy.data.data.json;
                const strategyid = strategy.data.data.id;
                history.replace("/strategy/build?id=" + strategyid);
                setStrategy((old) => {
                    const data = json ? JSON.parse(json) : old;
                    return { ...data, id: strategyid };
                });
                setProtocols(protocol.data);
            }
        );
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={clsx(`page-wrapper`, { blur: isModalOpen })}>
                <NavBar3 />
                <img src={generateGradientImage("red", "blue")} />
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
