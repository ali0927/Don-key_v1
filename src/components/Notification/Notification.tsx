import React from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { INotification } from "./NotificationProvider";

const slideDown = keyframes`
  0% {
    transform: translateX(-50%) translateY(-100px);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
`;

const StyledNotification = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #333;
  padding: 10px 20px;
  font-size: 14px;
  min-width: 400px;
  z-index: 100;
  border-radius: 3px;
  ${(props: { variant: INotification["type"] }) =>
    props.variant === "success" &&
    `
    background-color: #37b06f;
    color: #fff;
  `}
  animation: ${slideDown} 0.5s linear;
`;

export const Notification = ({
  children,
  variant = "success",
}: {
  children: React.ReactNode;
  variant: INotification["type"];
}) => {
  return createPortal(
    <StyledNotification variant={variant}>{children}</StyledNotification>,
    document.body
  );
};
