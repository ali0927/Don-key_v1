import { DonCommonmodal } from "components/DonModal";
import React, { useEffect, useState } from "react";
import { IShareProps } from "./interfaces/IShareProps";
import styled from "styled-components";
import Star from "../images/star.png";
import shareTelegram from "../images/shareTelegram.png";
import earnings from "../images/earnings.png";
import { ButtonWidget } from "components/Button";
import { uuidv4 } from "don-utils";
import { Spinner } from "react-bootstrap";
import {
  getTokenPrice,
  getTotalPoolValue,
  getUserReferralCode,
  signUpAsReferral,
  toEther,
} from "helpers";
import BigNumber from "bignumber.js";
import { useReferralContext } from "contexts/ReferralContext";
import { useWeb3Context } from "don-components";

const ReadMore = styled.a`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #a8a8a8;
  cursor: pointer;
  :hover {
    text-decoration: none;
    color: #a8a8a8;
  }
`;

const CancelButton = styled(ButtonWidget)`
  :hover {
    background: #fff !important;
  }
`;

// const setShareUrl = (
//   poolAddress: string,
//   data: { imageUrl: string; shortUrl: string }
// ) => {
//   localStorage.setItem(poolAddress, JSON.stringify(data));
// };

export const Share: React.FC<IShareProps> = (props) => {
  const { open, pool_address } = props;

  const [loading, setLoading] = React.useState(false);

  const [_, setTvl] = useState("");

  const {getConnectedWeb3} = useWeb3Context();
  const fetchTvl = async () => {
    const web3 = getConnectedWeb3();
    const poolValue = await getTotalPoolValue(web3, pool_address);
    const tokenPrice = await getTokenPrice(
      web3,
      pool_address
    );
    
    setTvl(new BigNumber(toEther(poolValue)).multipliedBy(tokenPrice).toFixed(1));
  };

  useEffect(() => {
    fetchTvl();
  }, []);
  const {checkSignUp} = useReferralContext();
  const handleCreateLink = async () => {
    setLoading(true);
    const web3 = getConnectedWeb3();
    let code = await getUserReferralCode(web3);
    if (!code) {
      code = uuidv4().slice(0, 7);
      await signUpAsReferral(web3, code.toLowerCase());
      checkSignUp();
    }
    setLoading(false);
    props.onCreateClick();
    
    // const element = document.querySelector("#shareEarnImage") as HTMLElement;
    // if (element) {
    //   const canvas = await html2canvas(element, {
    //     useCORS: true,
    //     scrollY: 0,
    //     logging: process.env.NODE_ENV === "development",
    //     removeContainer: true,
    //   });
    //   const dataUrl = canvas.toDataURL("image/jpeg");
    //   const res: Response = await fetch(dataUrl);
    //   const blob: Blob = await res.blob();

    //   //Use this file in api call
    //   const file = new File([blob], "file-" + uuidv4() + ".png", {
    //     type: "image/jpeg",
    //   });
    //   const formData = new FormData();
    //   const urlToShorten =
    //     window.location.origin + window.location.pathname + `?referral=${code}`;
    //   formData.append("url", urlToShorten);
    //   formData.append("image", file);
    //   formData.append("pool_address", props.pool_address);
    //   const result = await api.post("/api/v2/shortener", formData);
    //   const shortUrl = getShareUrl(result.data.code);
    //   setShareUrl(props.pool_address, {
    //     shortUrl,
    //     imageUrl: result.data.image,
    //   });
    //   setLoading(false);
    //   props.onCreateLink(result.data.image, shortUrl);
    // }
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title=""
        variant="common"
        onClose={props.onClose}
        size="md"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h2>Share</h2> <ReadMore href="https://don-key-finance.medium.com/referral-program-bad96e3aa1cb" target="_blank">Read more</ReadMore>
        </div>
        <div className="row py-5">
          <div className="col-lg-4 ">
            <img
              src={Star.src}
              className="img-fluid d-block mx-auto"
              alt="Image not found"
            />
            <p className="text-center mt-4 w-100">
              {" "}
              <b>Step 1.</b> Create a sharable link with a unique Don-key banner that you love!
            </p>
          </div>
          <div className="col-lg-4 ">
            <img
              src={shareTelegram.src}
              className="img-fluid d-block mx-auto"
              alt="Image not found"
            />
            <p className="text-center mt-4 w-100">
              <b>Step 2.</b> Share the link on any platform to bring more users to the DAPP
            </p>
          </div>
          <div className="col-lg-4">
            <img
              src={earnings.src}
              className="img-fluid d-block mx-auto"
              alt="Image not found"
            />
            <p className="text-center mt-4 w-100">
              <b>Step 3.</b> For each unique user who invests, you will earn the equivalent of 20% from their profit in DON tokens. 
            </p>
          </div>
        </div>

        <div className="row  mt-4 justify-content-center">
          <div className="col-lg-3" />
          <div className="col-lg-3 mb-2">
            <ButtonWidget
              varaint="contained"
              disabled={loading}
              height="41px"
              containedVariantColor="lightYellow"
              onClick={handleCreateLink}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Create Link"
              )}
            </ButtonWidget>
          </div>

          <div className="col-lg-3 mb-2">
            <CancelButton
              varaint="outlined"
              height="41px"
              onClick={props.onClose}
            >
              Cancel
            </CancelButton>
          </div>
          <div className="col-lg-3" />
        </div>
      </DonCommonmodal>
    </>
  );
};
