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

const StyledFarmerImage = styled.img`
  border-radius: 15px;
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const Title = styled.h2`
  font-family: "ObjectSans-Bold";
  font-weight: 900;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 400px) {
    width: initial;
    display: inline-flex;
  }
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
  font-family: "ObjectSans-Bold";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
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
    farmerImage: { url: picture },
  } = farmer;

  const [openSharePopup, setSharePopup] = useState(false);
  const [openShareLink, setShareLink] = useState(false);

  const [shortCode, setShortCode] = useState<{
    referral_image: { id: string };
    shortcode: string;
  } | null>(null);
  const { connected, address } = useWeb3Context();

  const [fetchData, { loading, data: shortLink }] =
    useLazyQuery(SHORT_LINKS_QUERY, {fetchPolicy: "no-cache"});

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

  const handleCreateLink = () => {
    fetchInfoFromApi();
    setShareLink(true);
    setSharePopup(false);
  };

  const apy =
    strategies && strategies.length > 0
      ? new BigNumber(strategies![0].apy).toFixed(0) + "%"
      : "100%";

  const boostApy =
    strategies && strategies.length > 0 ? strategies[0].token?.boostApy : false;

  const strategyName =
    strategies && strategies.length > 0 ? strategies[0].name : "Description";

  return (
    <>
      <Section>
        <Container>
          <Row>
            <Col lg={12} className="mt-3">
              <div className="d-flex flex-column flex-md-row align-items-center flex-wrap mb-3">
                <Title className="mb-2 mb-md-0">
                  DON - {capitalize(name || "")}
                </Title>
              </div>
            </Col>
          </Row>

          <Row className="mt-0 mt-sm-5 mb-5">
            <div className="col-lg-6">
              <div className="row">
                <ImageWrapper className="pl-4">
                  <StyledFarmerImage
                    src={fixUrl(picture)}
                    className="img-fluid "
                    alt="farmer"
                    style={{ borderRadius: 0 }}
                  />{" "}
                </ImageWrapper>

                <Col lg={9} className="pl-4 mt-4 mt-md-0">
                  {description.length > 0 && (
                    <>
                      <div className="d-flex justify-content-between">
                        <StrategyName>
                          {strategies && strategies.length > 0
                            ? strategies[0].name
                            : "Description"}
                        </StrategyName>
                        <div className="d-flex">
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

                      <p style={{ fontSize: 15 }}>
                        <ShowMoreContent length={120} content={description} />
                      </p>
                    </>
                  )}
                </Col>
              </div>
            </div>

            <Col
              lg={6}
              className="d-flex justify-content-lg-end pb-2 align-items-end justify-content-sm-center justify-content-center justify-content-md-center"
            >
              {pool_version === 3 && network.chainId === BINANCE_CHAIN_ID ? (
                <ShareButton onClick={handleShareClick}>
                  <ShareandEarnIcon className="mr-2" color="#fff" />
                  Share and Earn
                </ShareButton>
              ) : null}
            </Col>
          </Row>

          <Row className="mt-5 justify-content-center">
            <DetailTable
              apy={apy}
              network={network}
              tvl={tvl}
              poolVersion={pool_version}
              poolAddress={poolAddress}
              boostApy={boostApy}
            />
          </Row>
        </Container>
      </Section>

      {openSharePopup && (
        <Share
          open={openSharePopup}
          pool_address={poolAddress}
          apy={apy}
          onCreateLink={handleCreateLink}
          onClose={() => setSharePopup(false)}
        />
      )}

      {openShareLink && shortCode && (
        <ShareLink
          chainId={network.chainId}
          link={getShareUrl(shortCode.shortcode)}
          open={openShareLink}
          image_id={shortCode.referral_image.id.toString()}
          farmerName={name}
          strategyName={strategyName}
          poolAddress={poolAddress}
          fetchData={() =>
            fetchInfoFromApi()
          }
          apy={apy}
          shortcode={shortCode.shortcode}
          onClose={() => setShareLink(false)}
        />
      )}
    </>
  );
};
