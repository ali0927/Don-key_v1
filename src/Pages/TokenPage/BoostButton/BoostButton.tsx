import React from "react";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";

import { useToggle } from "don-hooks";
import { ButtonWidget } from "components/Button";



export const BoostButton: React.FC = () => {

    const [isOpen, onOpen, onClose] = useToggle();

    return(
        <>
          <ButtonWidget
              varaint="contained"
              fontSize="12px"
              className={"ml-3"}
              containedVariantColor="lightYellow"
              height="30px"
              width="119px"
              onClick={onOpen}
            >
              Boost APY
            </ButtonWidget>
            {isOpen && (
                    <AcceleratedAPYModal open={isOpen} onClose={onClose} />
             )}
        </>
    )
}