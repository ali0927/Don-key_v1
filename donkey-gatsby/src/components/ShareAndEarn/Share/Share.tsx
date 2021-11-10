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
import {breakPoints} from "breakponts";
import {
  calculateInitialInvestmentInUSD,
  getShareUrl,
  signUpAsReferral,
} from "helpers";
import { useReferralContext } from "contexts/ReferralContext";
import { useWeb3Context } from "don-components";
import BigNumber from "bignumber.js";
import { Step } from "./Step";
import { api } from "strapi";
import { ShareLink } from "..";
import { client } from "apolloClient";
import gql from "graphql-tag";
import { signUser } from "components/Navbar";
import { CircularProgress, useMediaQuery } from "@material-ui/core";
import { theme } from "theme";

const ReadMore = styled.a`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #a8a8a8;
  cursor: pointer;
  left: -40px;
  position: relative;
  :hover {
    text-decoration: none;
    color: #a8a8a8;
  }
  @media only screen and (max-width: ${breakPoints.md}) {
     left: unset;
     top: 4px;
  }
`;

const CancelButton = styled(ButtonWidget)`
  :hover {
    background: #fff !important;
  }
`;

const HeadingRoot = styled.div`
  position: absolute;
  top: 29px;
`;

const ModalHeading = styled.h4`
  font-size: 23px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const SHORT_LINKS_QUERY = gql`
  query shortLinks($walletAddress: String!, $poolAddress: String!) {
    shortLinks(
      where: { poolAddress_eq: $poolAddress, walletAddress_eq: $walletAddress }
    ) {
      shortcode
      referral_image {
        id
      }
    }
  }
`;

export const Share: React.FC<IShareProps> = (props) => {
  const { pool_address, farmername, apy, strategyName, slug, chainId } = props;
  const isMobile = useMediaQuery(`@media screen and (max-width:768px)`);
  const { myLinks, dispatch } = useReferralContext();
  const { getConnectedWeb3, address } = useWeb3Context();
  const currentLink = myLinks.byId[pool_address];

  const [selectedPopup, setSelectedPopup] = useState<
    "LOADING" | "SHOW_SIGN_UP_POPUP" | "SHOW_SHARE_LINK_POPUP"
  >("LOADING");

  const [loading, setLoading] = useState(false);
  const fetchLink = async () => {
    setSelectedPopup("LOADING");
    if (!currentLink) {
      try {
        const result = await client.query({
          query: SHORT_LINKS_QUERY,
          variables: { poolAddress: pool_address, walletAddress: address },
        });
        const { data } = result;
        const link = data.shortLinks[0];
        if (link) {
          dispatch({
            type: "ADD_LINK",
            data: {
              code: link.shortcode,
              image_id: link.referral_image.id,
              poolAddress: pool_address,
              url: getShareUrl(link.shortcode),
            },
          });
        } else {
          return setSelectedPopup("SHOW_SIGN_UP_POPUP");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setSelectedPopup("SHOW_SHARE_LINK_POPUP");
    }
  };

  useEffect(() => {
    fetchLink();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLink]);

  const handleCreateLink = async () => {
    setLoading(true);
    const investedAmount = await calculateInitialInvestmentInUSD(
      getConnectedWeb3(),
      pool_address,
      address
    );
    if (new BigNumber(investedAmount).lt(250)) {
      setLoading(false);
      return alert(
        "You need to invest at least 250$ worth of tokens in Pool To create link."
      );
    }
    const web3 = getConnectedWeb3();

    let code = uuidv4().slice(0, 7);
    code = await signUpAsReferral(web3, code.toLowerCase(), pool_address);

    const urlToShorten =
      window.location.origin + window.location.pathname + `?referral=${code}`;

    await signUser(web3);

    await api.post("/api/v2/shortener", {
      pool_address,
      url: urlToShorten,
      referralcode: code,
      image: 1,
    });
    dispatch({
      type: "ADD_LINK",
      data: {
        code,
        image_id: "1",
        poolAddress: pool_address,
        url: getShareUrl(code),
      },
    });

    setLoading(false);
  };

  if (selectedPopup === "LOADING") {
    return (
      <DonCommonmodal
        isOpen
        title={<></>}
        onClose={props.onClose}
        variant="common"
        size="sm"
      >
        <div
          style={{ minHeight: 200 }}
          className="d-flex justify-content-center align-items-center"
        >
          <CircularProgress color="inherit" />
        </div>
      </DonCommonmodal>
    );
  }

  return (
    <>
      {selectedPopup === "SHOW_SIGN_UP_POPUP" && (
        <DonCommonmodal
          isOpen={selectedPopup === "SHOW_SIGN_UP_POPUP"}
          title={isMobile ? "" : "Share"}
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
          {isMobile && (
            <HeadingRoot>
              <ModalHeading>Share</ModalHeading>
            </HeadingRoot>
          )}

          <div className="row py-md-4">
            <Step
              title="Step 1"
              content="Create a sharable link with a unique Don-key banner that you love!"
              image={Star}
            />
            <Step
              title="Step 2"
              content="Share the link on any platform to bring more users to the DAPP"
              image={shareTelegram}
            />
            <Step
              title="Step 3"
              content="For each unique user who invests, you will earn of up to 20% from their profit in $DON tokens"
              image={earnings}
            />
          </div>
          <div className="text-center mt-1 mb-3 mt-lg-0 mb-lg-4" style={{ fontSize: 12 }}>
            * You must have an active investment of $250 in the pool in order to
            create a link.
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
      )}
      {selectedPopup === "SHOW_SHARE_LINK_POPUP" && (
        <ShareLink
          chainId={chainId}
          link={getShareUrl(currentLink.code)}
          open={selectedPopup === "SHOW_SHARE_LINK_POPUP"}
          image_id={currentLink.image_id}
          farmerName={farmername}
          slug={slug}
          strategyName={strategyName}
          poolAddress={pool_address}
          apy={apy}
          shortcode={currentLink.code}
          onClose={props.onClose}
        />
      )}
    </>
  );
};
