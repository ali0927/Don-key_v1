
import React from "react";
export const SetButton = ({  action, onInsert,disabled }: {action: string; onInsert?: (cell: any) => void; disabled?: boolean}) => {

    // const {insertAction} = useGraphMethods();

    const handleClick = () => {
        // const cell = insertAction(action);
        // onInsert && onInsert(cell);
    };

    return (
        <button disabled={disabled} onClick={handleClick} className="setbtn">
            Set
        </button>
    );
};
