import clsx from "clsx";
import { LeftArrowMediumSIze, ShareIcon } from "icons";
import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { TwitterIcon, TwitterShareButton } from "react-share";

const IconsWrapper = styled.div`
  width: 100%;
  min-height: 56px;
  background: #f4e41c;
`;

export const RootHeader: React.FC<{
  hideBackButton?: boolean;
  onBack?: () => void;
}> = (props) => {
  const { hideBackButton } = props;

  const handleBack = () => {
    if (props.onBack) {
      props.onBack();
    }
  };

  return (
    <>
      <IconsWrapper className="d-flex align-items-center">
        <Container
          className={clsx("d-flex  mt-2", {
            "justify-content-end": hideBackButton,
            "justify-content-between": !hideBackButton,
          })}
        >
          {!hideBackButton && <LeftArrowMediumSIze onClick={handleBack} />}
          <TwitterShareButton url={"https://don-key.finance"} title={"Twitter"}>
            <ShareIcon />
          </TwitterShareButton>
        </Container>
      </IconsWrapper>
    </>
  );
};
