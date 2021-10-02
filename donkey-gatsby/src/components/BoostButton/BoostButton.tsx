import React from "react";
import styled from "styled-components";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import { BoostRocketIcon } from "icons";
import { useToggle } from "don-hooks";
import { ButtonWidget } from "components/Button";

const StyledApyIcon = styled(BoostRocketIcon)`
  margin-right: 6px;
`;

export const BoostButton: React.FC<{className?: string}> = ({className}) => {
  const [isOpen, onOpen, onClose] = useToggle();

  return (
    <>
      <ButtonWidget
        varaint="contained"
        fontSize="14px"
        className={className}
        containedVariantColor="lightYellow"
        height="30px"
        width="132px"
        onClick={onOpen}
      >
        <StyledApyIcon />
        Boost APY
      </ButtonWidget>
      {isOpen && <AcceleratedAPYModal open={isOpen} onClose={onClose} />}
    </>
  );
};
