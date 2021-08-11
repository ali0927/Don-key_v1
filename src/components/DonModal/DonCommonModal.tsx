import { Dialog, DialogProps, Paper, withStyles } from "@material-ui/core";
import * as React from "react";
import {
  IconWrapper,
  ModalContent,
  ModalHeading,
  StyledCloseIcon,
} from "./Components";
import styled from "styled-components";

const CutomizeModalHeading = styled.h4`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const StyledDialog = withStyles({
  paperWidthMd: {
    maxWidth: "761px",
  },
})(Dialog);

export const DonCommonmodal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  icon,
  variant,
  style,
  PaperProps,
  titleRightContent,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  style?: React.CSSProperties;
  PaperProps?: DialogProps["PaperProps"];
  variant: "common" | "v1";
  icon?: React.ReactElement;
  size?: DialogProps["maxWidth"];
  titleRightContent?: React.ReactElement;
  children: React.ReactNode;
}) => {
  const modalInnerContent = () => {
    if (variant === "common") {
      return (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <CutomizeModalHeading>{title}</CutomizeModalHeading>
            {titleRightContent && (
              <p>
                <small>{titleRightContent}</small>
              </p>
            )}
          </div>
        </>
      );
    }

    return (
      <>
        <ModalHeading>
          {icon && <IconWrapper className="mr-2">{icon}</IconWrapper>}

          {title}
        </ModalHeading>
      </>
    );
  };

  return (
    <StyledDialog
      open={isOpen}
      style={style}
      onClose={onClose}
      PaperProps={PaperProps}
      fullWidth={true}
      maxWidth={size}
    >
      <>
        <ModalContent>
          <StyledCloseIcon onClick={onClose} />
          {modalInnerContent()}
          {children}
        </ModalContent>
      </>
    </StyledDialog>
  );
};
