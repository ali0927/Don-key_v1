import { LeftArrowMediumSIze, ShareIcon } from "icons";
import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const IconsWrapper = styled.div`
  width: 100%;
  min-height: 56px;
  background: #f4e41c;
`;

export const RootHeader: React.FC = () => {
  return (
    <>
      <IconsWrapper className="d-flex align-items-center">
        <Container className="d-flex justify-content-between mt-2">
          <LeftArrowMediumSIze />
          <ShareIcon />
        </Container>
      </IconsWrapper>
    </>
  );
};
