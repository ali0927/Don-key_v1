import React from "react";
import styled from "styled-components";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import {
  BoostApyIcon,
} from "icons";
import { useToggle } from "don-hooks";
import { ButtonWidget } from "components/Button";


const StyledApyIcon = styled(BoostApyIcon)`
   height: 31px;
   margin-right: 10px; 
   width: 31px;
`;


export const BoostButton: React.FC = () => {

    const [isOpen, onOpen, onClose] = useToggle();

    return(
        <>
          <ButtonWidget
              varaint="contained"
              fontSize="12px"
              className={"ml-3 d-flex align-items-center"}
              containedVariantColor="lightYellow"
              height="30px"
              width="119px"
              onClick={onOpen}
            >
              <StyledApyIcon/>
              Boost APY
            </ButtonWidget>
            {isOpen && (
                    <AcceleratedAPYModal open={isOpen} onClose={onClose} />
             )}
        </>
    )
}