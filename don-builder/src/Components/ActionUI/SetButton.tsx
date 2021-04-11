import { IActionCell } from "../../interfaces";
import React from "react";
import {useGraphMethods} from "../GraphProvider/GraphProvider";
export const SetButton = ({  action, onInsert,disabled }: {action: string; onInsert?: (cell: IActionCell) => void; disabled?: boolean}) => {

    const {insertAction} = useGraphMethods();

    const handleClick = () => {
        const cell = insertAction(action);
        console.log(cell);
        onInsert && onInsert(cell);
    };

    return (
        <button disabled={disabled} onClick={handleClick} className="setbtn">
            Set
        </button>
    );
};
