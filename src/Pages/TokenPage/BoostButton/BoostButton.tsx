import React from "react";
import styled from "styled-components";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import {
  BoostApyIcon,
} from "icons";
import { useToggle } from "don-hooks";

const CustomButton = styled.button`
  background-color: transparent;
  border: 2px solid #000;
  box-shadow: 0px 5px 10px rgba(20, 20, 18, 0.14);
  border-radius: 15px;
  text-transform: uppercase;
  padding: 16px 50px;
  position: relative;
  background-color: #fff037;
  font-weight: bold;
  :hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
  }
`;

const StyledApyIcon = styled(BoostApyIcon)`
  position: absolute;
  top: -22px;
  right: 35px;
  background-color: #fff037;
  padding: 4px;
  transform: scale(1.2);
`;


export const BoostButton: React.FC = () => {

    const [isOpen, onOpen, onClose] = useToggle();

    return(
        <>
            <CustomButton onClick={onOpen}>
                    <StyledApyIcon />
                    Boost APY
            </CustomButton>
                  {isOpen && (
                    <AcceleratedAPYModal open={isOpen} onClose={onClose} />
                  )}
        </>
    )
}