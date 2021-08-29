import React from "react";
import { DonCommonmodal } from "components/DonModal";
import { IShareLinkProps } from "./interfaces/IShareLinkProps";
import styled from "styled-components";
import { HyperLinkIcon, TwitterIcon, TelegramIcon } from "icons";
import { ButtonWidget } from "components/Button";
import { Tooltip } from "@material-ui/core";
import { TwitterShareButton, TelegramShareButton } from "react-share";

const TextOnInput = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  top: -15px;
  left: 23px;
  padding: 2px;
  z-index: 1;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  color: #909090;
  display: inline-block;
  margin-bottom: 0.5rem;
  :after {
    content: " ";
    background-color: #fff;
    width: 100%;
    height: 13px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
`;

const Input = styled.input`
  box-shadow: none !important;
  height: 50px;
  width: 100%;
  border: 1px solid #3e3e3e !important;
  outline: 0px !important;
  padding-left: 10px;
  :focus-visible {
    outline: 0px !important;
  }
`;

const TwitterButton = styled(ButtonWidget)`
  background: #69abe8 !important;
  color: #fff;
  :hover {
    color: #fff;
  }
`;

const TelegramButton = styled(ButtonWidget)`
  background: #415a93 !important;
  color: #fff;
  :hover {
    color: #fff;
  }
`;

export const ShareLink: React.FC<IShareLinkProps> = (props) => {
  const [openTooltip, setOpenTooltip] = React.useState(false);

  React.useEffect(() => {
    if (openTooltip) {
      setTimeout(() => {
        setOpenTooltip(false);
      }, 1000);
    }
  }, [openTooltip]);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.link);
    setOpenTooltip(true);
  };

  return (
    <>
      <DonCommonmodal
        isOpen={props.open}
        title="Copy share link"
        variant="common"
        onClose={props.onClose}
        size="sm"
      >
        <div
          className="row justify-content-between"
          style={{ alignItems: "flex-end" }}
        >
          <div className="col-lg-8 mb-2">
            <TextOnInput className="mt-5">
              <Label htmlFor="inputText">Your Sharable Link</Label>
              <Input  type="text" value={props.link} />
            </TextOnInput>
          </div>

          <div className="col-lg-4 mb-2">
            <Tooltip
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              open={openTooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Copied"
            >
              <span>
                <ButtonWidget
                  varaint="contained"
                  height={"50px"}
                  containedVariantColor="lightYellow"
                  onClick={handleCopy}
                >
                  <HyperLinkIcon /> Copy Link
                </ButtonWidget>
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="mt-4">
          <img src={props.imageUrl} alt="Image not found" />
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-2" />
          <div className="col-lg-4 mb-2">
            <TwitterShareButton className="w-100" url={props.link} title={"Check out my investment on Don-key"}>
              <TwitterButton
                varaint="contained"
                height={"50px"}
                containedVariantColor="lightYellow"
              >
                <TwitterIcon /> Twitter
              </TwitterButton>
            </TwitterShareButton>
          </div>

          <div className="col-lg-4 mb-2">
            <TelegramShareButton
              className="w-100"
              url={props.link}
              title={"Check out my investment on Don-key"}
            >
              <TelegramButton
                varaint="contained"
                height={"50px"}
                containedVariantColor="lightYellow"
              >
                <TwitterIcon /> Telegram
              </TelegramButton>
            </TelegramShareButton>
          </div>

          <div className="col-lg-2" />
        </div>
      </DonCommonmodal>
    </>
  );
};
