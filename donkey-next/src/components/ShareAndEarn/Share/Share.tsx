import { DonCommonmodal } from "components/DonModal";
import React from "react";
import { IShareProps } from "./interfaces/IShareProps";
import styled from "styled-components";
import Star from "../images/star.png";
import shareTelegram from "../images/shareTelegram.png";
import earnings from "../images/earnings.png";
import { ButtonWidget } from "components/Button";
import { uuidv4 } from "don-utils";
import { Spinner } from "react-bootstrap";
import {
  getShareUrl,
  getUserReferralCode,
  signUpAsReferral,
} from "helpers";
import { useReferralContext } from "contexts/ReferralContext";
import { useWeb3Context } from "don-components";
import { Step } from "./Step";
import { api } from "strapi";

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

export const Share: React.FC<IShareProps> = (props) => {
  const { open, pool_address } = props;

  const [loading, setLoading] = React.useState(false);

  const { getConnectedWeb3 } = useWeb3Context();

  const { checkSignUp } = useReferralContext();
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
    const urlToShorten =
      window.location.origin + window.location.pathname + `?referral=${code}`;
    const result = await api.post("/api/v2/shortener", {
      pool_address,
      url: urlToShorten,
      referralcode: code,
      image: 1,
    });
    const shortUrl = getShareUrl(result.data.shortcode);
    props.onCreateLink(shortUrl);
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Share"
        variant="common"
        onClose={props.onClose}
        titleRightContent={
          <ReadMore
            href="https://don-key-finance.medium.com/referral-program-bad96e3aa1cb"
            target="_blank"
          >
            Read more
          </ReadMore>
        }
        size="md"
      >
        {/* <div className="d-flex justify-content-between align-items-center">
          <h2>Share</h2> <ReadMore href="https://don-key-finance.medium.com/referral-program-bad96e3aa1cb" target="_blank">Read more</ReadMore>
        </div> */}

        <div className="row py-md-5">
          <Step
            title="Step 1"
            content="Create a sharable link with a unique Don-key banner that you love!"
            image={Star.src}
          />
          <Step
            title="Step 2"
            content="Share the link on any platform to bring more users to the DAPP"
            image={shareTelegram.src}
          />
          <Step
            title="Step 3"
            content="For each unique user who invests, you will earn the equivalent of 20% from their profit in DON tokens"
            image={earnings.src}
          />
        </div>

        <div className="row  mt-3 mt-lg-1 justify-content-center">
          <div className="col-md-1 col-lg-3" />
          <div className="col-md-5 col-lg-3 mb-2">
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

          <div className="col-md-5 col-lg-3 mb-2">
            <CancelButton
              varaint="outlined"
              height="41px"
              onClick={props.onClose}
            >
              Cancel
            </CancelButton>
          </div>
          <div className="col-md-1 col-lg-3" />
        </div>
      </DonCommonmodal>
    </>
  );
};
