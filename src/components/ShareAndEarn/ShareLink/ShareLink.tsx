import React, { useEffect, useState } from "react";
import { DonCommonmodal } from "components/DonModal";
import { IShareLinkProps } from "./interfaces/IShareLinkProps";
import styled from "styled-components";
import { HyperLinkIcon, TwitterIcon } from "icons";
import { ButtonWidget } from "components/Button";
import { Tooltip } from "@material-ui/core";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import { Slider } from "./Slider/Slider";
import { useTVL } from "hooks";
import { getShareUrl, getUserReferralCode } from "helpers";

import html2canvas from "html2canvas";
import { api, uuidv4, waitFor } from "don-utils";
import { Spinner } from "react-bootstrap";
import { useWeb3Context } from "don-components";
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

export const ShareLink: React.FC<IShareLinkProps> = (props) => {
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const { tvl } = useTVL(props.poolAddress, props.chainId);
  const [copyLink, setCopyLink] = React.useState(props.link || "");
  const [code, setCode] = useState(props.code || "");
  React.useEffect(() => {
    if (openTooltip) {
      setTimeout(() => {
        setOpenTooltip(false);
      }, 1000);
    }
  }, [openTooltip]);

  const handleCopy = () => {
    if (copyLink) {
      navigator.clipboard.writeText(copyLink);
      setOpenTooltip(true);
    }
  };

  const {web3} = useWeb3Context();

  const [loading, setLoading] = useState(false);

  const handleImageGenerate = async (isUpdate?: string | null) => {
    setLoading(true);
    await waitFor(2000);
    const element = document.querySelector("#shareEarnImage") as HTMLElement;
    if (element) {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scrollY: 0,
        logging: process.env.NODE_ENV === "development",
        removeContainer: true,
      });
      const dataUrl = canvas.toDataURL("image/webp", 1);
      const res: Response = await fetch(dataUrl);
      const blob: Blob = await res.blob();

      const file = new File([blob], "file-" + uuidv4() + ".png", {
        type: "image/jpeg",
      });
      let formData = new FormData();

      let result: any;
      if (!isUpdate) {
        let code = await getUserReferralCode(web3);
        const urlToShorten =
          window.location.origin +
          window.location.pathname +
          `?referral=${code}`;
        formData.append("url", urlToShorten);
        formData.append("image", file);
        formData.append("pool_address", props.poolAddress);
        result = await api.post("/api/v2/shortener", formData);
        setCode(result.data.code)
      } else {
        formData.append("code", props.code);
        formData.append("image", file);
        result = await api.put("/api/v2/shortener", formData);
      }

      const shortUrl = getShareUrl(result.data.code);

      setCopyLink(shortUrl);
      setLoading(false);
    }
  };

  const handleFirstRender = async () => {
    await handleImageGenerate(copyLink);
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
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      {" "}
                      <HyperLinkIcon /> Copy Link
                    </>
                  )}
                </ButtonWidget>
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="mt-4">
          <Slider
            tvl={tvl}
            apy={props.apy}
            farmerName={props.farmerName}
            strategyName={props.strategyName}
            onChange={() => {
              handleImageGenerate();
            }}
            onFirstRender={handleFirstRender}
          />
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-lg-2" />
          <div className="col-lg-4 mb-2">
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

          <div className="col-lg-4 mb-2">
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

          <div className="col-lg-2" />
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
        size="sm"
      >
        {renderSpinner()}
      </DonCommonmodal>
    </>
  );
};
