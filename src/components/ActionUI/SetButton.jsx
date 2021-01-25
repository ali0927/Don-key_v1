import React from "react";
import {useGraphMethods} from "../GraphProvider/GraphProvider";
export const SetButton = ({ protocol, lastProtocol, action }) => {

    const {insertAction,getProtocolByName} = useGraphMethods();

    const handleClick = () => {
        
        let pMap = getProtocolByName(lastProtocol.name);


    };

    return (
        <button onClick={handleClick} className="setbtn">
            Set
        </button>
    );
};
