import React from "react";
import {useGraphMethods} from "../GraphProvider/GraphProvider";
export const SetButton = ({ protocol, lastProtocol, action }) => {

    const {insertAction} = useGraphMethods();

    const handleClick = () => {
        


    };

    return (
        <button onClick={handleClick} className="setbtn">
            Set
        </button>
    );
};
