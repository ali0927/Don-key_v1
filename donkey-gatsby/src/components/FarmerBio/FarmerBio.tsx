import { Col, Container, Row } from "react-bootstrap";
import { ShareandEarnIcon } from "icons";
import { DetailTable } from "components/DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { ShowMoreContent } from "components/ShowmoreContent";
import { useEffect, useState } from "react";
import { IFarmerInter } from "interfaces";
import { TwitterIcon } from "components/TwitterIcon";
import BigNumber from "bignumber.js";
import { theme } from "theme";
import { fixUrl, getShareUrl } from "helpers";
import { Share, ShareLink } from "components/ShareAndEarn";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import { gql, useLazyQuery } from "@apollo/client";
import { useIsomorphicEffect } from "hooks";

import { breakPoints } from "../../../src/breakponts";
import { BackArrowButton } from "components/BackArrowButton";

const StyledFarmerImage = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  @media only screen and (max-width: ${breakPoints.md}) {
    width: 56px;
    height: 56px !important;
  }
`;

const Title = styled.h2`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 24px;
    font-weight: 800;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ShareButton = styled.button`
  background: linear-gradient(146.14deg, #35424b 0%, #0b0e12 100%);
  box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
    4px 4px 18px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 14px 30px;
  position: relative;
  background-color: #fff037;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  color: #ffffff;
  transition: all 0.5s;
  :hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      linear-gradient(146.14deg, #606060 0%, #0b0e12 100%);
    box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
      4px 4px 18px rgba(0, 0, 0, 0.5);
  }
`;

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const StrategyName = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 16px;
  }
`;
const P = styled.p`
  font-size: 15px;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 12px;
  }
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

export const FarmerBio = ({
  farmer,
  tvl,
}: {
  farmer: IFarmerInter;
  isInvestor?: boolean;
  investorCount?: number;
  tvl: string;
  telegram?: string;
  twitter?: string;
}) => {
  const {
    description,
    name,
    network,
    poolAddress,
    strategies,
    poolVersion: pool_version,
    twitter,
    slug,
    farmerImage: { url: picture },
    oldPoolAddress,
    oldPoolVersion,
  } = farmer;

  const [openSharePopup, setSharePopup] = useState(false);
  const [openShareLink, setShareLink] = useState(false);

  const [shortCode, setShortCode] = useState<{
    referral_image: { id: string };
    shortcode: string;
  } | null>(null);
  const { connected, address } = useWeb3Context();

  const [fetchData, { loading, data: shortLink }] = useLazyQuery(
    SHORT_LINKS_QUERY,
    { fetchPolicy: "no-cache" }
  );

  const fetchInfoFromApi = async () => {
    try {
      fetchData({ variables: { poolAddress, walletAddress: address } });
    } catch (e) {}
  };

  useEffect(() => {
    if (connected) {
      fetchInfoFromApi();
    }
  }, [connected, address]);

  useIsomorphicEffect(() => {
    if (shortLink && shortLink.shortLinks.length > 0) {
      setShortCode(shortLink.shortLinks[0]);
    }
  }, [loading]);

  const handleShareClick = async () => {
    if (!connected) {
      return alert("Connect Wallet");
    }
    if (shortLink && shortLink.shortLinks.length > 0) {
      setShareLink(true);
    } else {
      setSharePopup(true);
    }
  };

  // const handleCreateLink = () => {
  //   fetchInfoFromApi();
  //   setShareLink(true);
  //   setSharePopup(false);
  // };

  const apy =
    strategies && strategies.length > 0
      ? new BigNumber(strategies![0].apy).toFixed(0) + "%"
      : "100%";

  const boostApy =
    strategies && strategies.length > 0 ? strategies[0].token?.boostApy : false;

  const strategyName =
    strategies && strategies.length > 0 ? strategies[0].name : "Description";

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Section>
        <Container>
          <Row>
            <Col lg={12} className="mt-3">
              <BackArrowButton to={"#"} onClick={handleBack} />
              <div className="d-flex justify-content-between align-items-start align-items-lg-center flex-wrap mb-3">
                <Title className="mb-0 mb-lg-3">
                  DON - {capitalize(name || "")}
                </Title>
                <div className="d-block d-sm-none">
                  <div className="mr-3">
                    {twitter && (
                      <TwitterIcon
                        fill={"#000"}
                        handle={twitter || "#"}
                      ></TwitterIcon>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-0 mt-2 mt-lg-5">
            <div className="col-lg-6">
              <div className="row" style={{ flexWrap: "nowrap" }}>
                <ImageWrapper className="pl-4" style={{ width: "auto" }}>
                  <StyledFarmerImage
                    src={fixUrl(picture)}
                    className="img-fluid "
                    alt="farmer"
                  />{" "}
                </ImageWrapper>

                <Col lg={9} xs={9} className="pl-4 mt-0 mt-md-0">
                  {description.length > 0 && (
                    <>
                      <div className="d-flex justify-content-between">
                        <StrategyName>{strategyName}</StrategyName>
                        <div className="d-none d-lg-block">
                          <div className="mr-3">
                            {twitter && (
                              <TwitterIcon
                                fill={"#000"}
                                handle={twitter || "#"}
                              ></TwitterIcon>
                            )}
                          </div>
                        </div>
                      </div>

                      <P>
                        <ShowMoreContent length={120} content={description} />
                      </P>
                    </>
                  )}
                </Col>
              </div>
            </div>

            <Col
              lg={6}
              className="d-none d-sm-none d-md-flex d-lg-flex justify-content-lg-end pb-2 align-items-end justify-content-sm-center justify-content-center justify-content-md-center"
            >
              {/* {pool_version === 3 && network.chainId === BINANCE_CHAIN_ID ? (
                <ShareButton onClick={handleShareClick}>
                  <ShareandEarnIcon className="mr-2" color="#fff" />
                  Share and Earn
                </ShareButton>
              ) : null} */}
            </Col>
          </Row>

          <Row className="mt-2 mt-lg-5 justify-content-between">
            <DetailTable
              apy={apy}
              network={network}
              tvl={tvl}
              oldPoolAddress={oldPoolAddress}
              oldPoolVersion={oldPoolVersion}
              poolVersion={pool_version}
              poolAddress={poolAddress}
              boostApy={boostApy}
            />
          </Row>
        </Container>
      </Section>

      {/* {openSharePopup && (
        <Share
          open={openSharePopup}
          pool_address={poolAddress}
          apy={apy}
          onCreateLink={handleCreateLink}
          onClose={() => setSharePopup(false)}
        />
      )} */}

      {/* {openShareLink && shortCode && (
        <ShareLink
          chainId={network.chainId}
          link={getShareUrl(shortCode.shortcode)}
          open={openShareLink}
          image_id={shortCode.referral_image.id.toString()}
          farmerName={name}
          slug={slug}
          strategyName={strategyName}
          poolAddress={poolAddress}
          fetchData={() => fetchInfoFromApi()}
          apy={apy}
          shortcode={shortCode.shortcode}
          onClose={() => setShareLink(false)}
        />
      )} */}
    </>
  );
};
