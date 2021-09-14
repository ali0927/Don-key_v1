import { DonCommonmodal } from "components/DonModal";
import React, { useEffect, useState } from "react";
import { IShareProps } from "./interfaces/IShareProps";
import styled from "styled-components";
import Star from "../images/star.png";
import shareTelegram from "../images/shareTelegram.png";
import earnings from "../images/earnings.png";
import { ButtonWidget } from "components/Button";
import html2canvas from "html2canvas";
import { api, uuidv4 } from "don-utils";
import { Spinner } from "react-bootstrap";
import {
  getShareUrl,
  getTokenAddress,
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

const setShareUrl = (
  poolAddress: string,
  data: { imageUrl: string; shortUrl: string }
) => {
  localStorage.setItem(poolAddress, JSON.stringify(data));
};

export const Share: React.FC<IShareProps> = (props) => {
  const { open, pool_address } = props;

  const [loading, setLoading] = React.useState(false);

  const [tvl, setTvl] = useState("");

  const {web3} = useWeb3Context();
  const fetchTvl = async () => {
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
    let code = await getUserReferralCode(web3);
    if (!code) {
      code = uuidv4().slice(0, 7);
      await signUpAsReferral(web3, code.toLowerCase());
      checkSignUp();
    }
    setLoading(false);
    props.onCreateClick();
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
              src={Star}
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
              src={shareTelegram}
              className="img-fluid d-block mx-auto"
              alt="Image not found"
            />
            <p className="text-center mt-4 w-100">
              <b>Step 2.</b> Share the link on any platform to bring more users to the DAPP
            </p>
          </div>
          <div className="col-lg-4">
            <img
              src={earnings}
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
