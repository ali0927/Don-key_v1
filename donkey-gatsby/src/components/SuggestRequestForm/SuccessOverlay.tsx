import { StaticImage } from "gatsby-plugin-image";
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { theme } from "theme";
import svgImage from "./donkey-success.svg";
const DonkeySuccess = (props: { className?: string }) => {
  return (
    <img
      className={props.className}
      src={svgImage}
      alt="Donkey Success Submission"
    />
  );
};

const DonkeySuccessStyled = styled(DonkeySuccess)`
  max-width: 300px;
  ${theme.mediaQueries.sm.up} {
    max-width: 600px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const StyledHeading = styled.h4`
  color: #fff;
  font-weight: 500;
  /* max-width: 200px; */
  position: relative;
  top: -100px;
  font-size: 28px;
  max-width: 600px;
  text-align: center;
`;

const Container = styled.div``;

export const SuccessOverlay = (props: {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  ticketid: number;
}) => {
  const body =
    typeof window !== "undefined"
      ? document.getElementsByTagName("body")[0]
      : null;

  const closeOverlay = useCallback(() => {
    props.onClose();
  }, []);

  useEffect(() => {
    if (props.duration) {
      const id = setTimeout(closeOverlay, props.duration * 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, []);

  if (!body) {
    return null;
  }
  if (props.isOpen) {
    return createPortal(
      <Overlay onClick={closeOverlay}>
        <Container>
          <DonkeySuccessStyled />
          <StyledHeading>
            Success! <br />
            Your issue was reported. <br/> <span style={{fontSize: 16, lineHeight: "1.1"}}>
            If we contact you in regards to this bug we
            will first identify your Ticket ID. We will not ask you for this
            Ticket ID. If the person you are talking to can not provide this
            Ticket ID then it is not an official Don-key support. <br />
            Your Ticket ID is: {props.ticketid}
            </span>
          </StyledHeading>
        </Container>
      </Overlay>,
      body
    );
  } else {
    return null;
  }
};
