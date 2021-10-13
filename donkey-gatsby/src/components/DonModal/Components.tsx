import { CloseIcon } from "icons/CloseIcon";
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
  width: 18px;
  height: 18px;
  z-index: 10;
  right: 30px;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    right: 25px;
    width: 20px;
    height: 20px;
  }
`;

export { ModalContent, ModalHeading, IconWrapper, StyledCloseIcon };
