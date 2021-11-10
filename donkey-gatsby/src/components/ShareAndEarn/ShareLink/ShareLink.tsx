import React from "react";
import { DonCommonmodal } from "components/DonModal";
import { IShareLinkProps } from "./interfaces/IShareLinkProps";
import styled from "styled-components";
import { HyperLinkIcon, TwitterIcon } from "icons";
import { ButtonWidget } from "components/Button";
import { Tooltip } from "@material-ui/core";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import { Slider } from "./Slider/Slider";
import { useTVL } from "hooks";
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
  border-radius: 10px;
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

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: #909090;
  &:hover {
    text-decoration: none;
    color: #909090;
  }
`;

export const ShareLink: React.FC<IShareLinkProps> = (props) => {
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const { tvl } = useTVL(props.poolAddress, props.chainId);

  React.useEffect(() => {
    if (openTooltip) {
      setTimeout(() => {
        setOpenTooltip(false);
      }, 1000);
    }
  }, [openTooltip]);
  const copyLink = props.link as string;
  const handleCopy = () => {
    if (copyLink) {
      navigator.clipboard.writeText(copyLink);
      setOpenTooltip(true);
    }
  };

  const renderSpinner = () => {
    return (
      <>
        <div
          className="row justify-content-between"
          style={{ alignItems: "flex-end" }}
        >
          <div className="col-lg-8 mb-2">
            <TextOnInput className="mt-3">
              <Label htmlFor="inputText">Your Sharable Link</Label>
              <Input type="text" value={copyLink} />
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
          <Slider
            tvl={tvl}
            poolAddress={props.poolAddress}
            image_id={props.image_id}
            apy={props.apy}
            farmerName={props.farmerName}
            strategyName={props.strategyName}
            short_code={props.shortcode}
            slug={props.slug}
          />
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-lg-2 d-none d-md-block" />
          <div className="col-6 col-md-4 mb-2">
            <TwitterShareButton
              className="w-100"
              url={copyLink}
              title={"Check out my investment on Don-key"}
            >
              <TwitterButton
                varaint="contained"
                height={"50px"}
                containedVariantColor="lightYellow"
              >
                <TwitterIcon /> Twitter
              </TwitterButton>
            </TwitterShareButton>
          </div>

          <div className="col-6 col-md-4 mb-2">
            <TelegramShareButton
              className="w-100"
              url={copyLink}
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

          <div className="col-lg-2 d-none d-md-block" />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <StyledLink href="https://don-key-finance.medium.com/don-key-referrals-are-about-to-go-live-9ac2b37d94cc" target="_blank">Read More</StyledLink>
        </div>
      </>
    );
  };

  return (
    <>
      <DonCommonmodal
        isOpen={props.open}
        title="Copy share link"
        variant="common"
        onClose={props.onClose}
        size="mdSmall"
      >
        {renderSpinner()}
      </DonCommonmodal>
    </>
  );
};
