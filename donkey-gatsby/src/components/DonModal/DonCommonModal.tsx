import { Dialog, DialogProps, withStyles } from "@material-ui/core";
import * as React from "react";
import {
  IconWrapper,
  ModalContent,
  ModalHeading,
  StyledCloseIcon,
} from "./Components";
import styled from "styled-components";
import { useDialogStyles } from "./styles/useDialogStyles";
import clsx from "clsx";
import { breakPoints } from "../../breakponts";

const CutomizeModalHeading = styled.h4`
  font-size: 23px;
  font-weight: bold;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 23px;
  }
`;

const StyledDialog = withStyles({
  paperWidthMdSmall: {
    maxWidth: "550px",
  },
  paperWidthMd: {
    maxWidth: "761px",
  },
  paperWidthSm: {
    maxWidth: 430,
    overflow: "hidden",
    margin: 0,
    width: `calc(100% - 28px)`,
  },
  paperWidthCycle: {
    maxWidth: "1170px",
  }
})(Dialog);

const Content = styled(ModalContent)`
  padding: 32px 25px;
  padding-bottom: 21px;
  height: 100%;
  overflow-y: auto;
  @media only screen and (max-width: 600px) {
    padding: 30px 15px;
    padding-bottom: 7px;
  }
`;

export const DonCommonmodal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  icon,
  variant,
  style,
  PaperProps = {},
  titleRightContent,
  contentStyle,
  subtitle,
  disableBackdropClick,
  footer,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  style?: React.CSSProperties;
  PaperProps?: DialogProps["PaperProps"];
  variant: "common" | "v1";
  icon?: React.ReactElement;
  size?: DialogProps["maxWidth"] | "mdSmall";
  titleRightContent?: React.ReactElement;
  children: React.ReactNode;
  rounded?: boolean;
  contentStyle?: React.CSSProperties;
  subtitle?: string;
  footer?: React.ReactNode;
  disableBackdropClick?: boolean;
  className?: string;
}) => {
  const classes = useDialogStyles();
  const modalInnerContent = () => {
    if (variant === "common") {
      return (
        <>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <CutomizeModalHeading className={clsx({ "mb-1": !!subtitle })}>
              {title}
            </CutomizeModalHeading>
            {titleRightContent && (
              <p>
                <small>{titleRightContent}</small>
              </p>
            )}
          </div>
          {subtitle && (
            <p style={{ fontSize: 14, color: "#A3A3A3" }}>{subtitle}</p>
          )}
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
      className={className}
      fullWidth={true}
      PaperProps={{ classes: { root: classes.paper }, ...PaperProps }}
      //@ts-ignore
      maxWidth={size}
      disableEscapeKeyDown
      disableBackdropClick={disableBackdropClick}
    >
      <>
        <Content style={contentStyle}>
          <StyledCloseIcon onClick={onClose} />
          {modalInnerContent()}
          {children}
        </Content>
      </>
      {footer && footer}
    </StyledDialog>
  );
};
