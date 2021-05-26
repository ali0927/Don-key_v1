import clsx from "clsx";
import { LeftArrowMediumSIze, ShareIcon } from "icons";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share";
import { theme } from "theme";

const IconsWrapper = styled.div`
  width: 100%;
  min-height: 56px;
  background:${theme.palette.background.yellow};
`;

export const RootHeader: React.FC<{
  hideBackButton?: boolean;
  onBack?: () => void;
}> = (props) => {
  const { hideBackButton } = props;
  const [shareIcons, setShareIcons] = useState(false);

  const handleBack = () => {
    if (props.onBack) {
      props.onBack();
    }
  };

  const toggleShareIcons = () => {
    setShareIcons(!shareIcons);
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
          {!shareIcons && <ShareIcon onClick={toggleShareIcons} />}
          {shareIcons && (
            <div style={{ display: "flex" }}>
              <TwitterShareButton
                url={"https://don-key.finance"}
                title={"Twitter"}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <FacebookShareButton
                url={"https://don-key.finance"}
                title={"Facebook"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <EmailShareButton
                url={"https://don-key.finance"}
                title={"Facebook Messenger"}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <WhatsappShareButton
                url={"https://don-key.finance"}
                title={"Facebook Messenger"}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TelegramShareButton
                url={"https://don-key.finance"}
                title={"Facebook Messenger"}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <RedditShareButton
                url={"https://don-key.finance"}
                title={"Facebook Messenger"}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
          )}
        </Container>
      </IconsWrapper>
    </>
  );
};
