import { CloseIcon } from "icons/CloseIcon";
import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

const ModalContent = styled.div`
  padding: 3rem 3rem;
  color: rgba(45, 41, 0, 1);
`;

const ModalHeading = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;


const IconWrapper = styled.span`
  background-color: rgba(244, 228, 28, 1);
  border-radius: 2px;
  display: inline-flex;
  padding: 5px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;
export const DonModal = ({
  isOpen,
  onClose,
  children,
  title
  ,icon
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}) => {
  return (
    <Modal centered show={isOpen} contentClassName="shadow-sm" onHide={onClose}>
      <ModalContent>
        <StyledCloseIcon onClick={onClose} />
        <ModalHeading>
          <IconWrapper className="mr-2">
            {icon}
          </IconWrapper>
          {title}
        </ModalHeading>
        {children}
      </ModalContent>
    </Modal>
  );
};
