import { Col, Container, Row } from "react-bootstrap";
import { DetailTable } from "components/DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { ShowMoreContent } from "components/ShowmoreContent";
import { IFarmerInter } from "interfaces";
import { TwitterIcon } from "components/TwitterIcon";
import BigNumber from "bignumber.js";
import { theme } from "theme";
import { fixUrl } from "helpers";

import { useWeb3Context } from "don-components";

import { breakPoints } from "../../../src/breakponts";
import { BackArrowButton } from "components/BackArrowButton";

const StyledFarmerImage = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 15px;
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

// const ShareButton = styled.button`
//   background: linear-gradient(146.14deg, #35424b 0%, #0b0e12 100%);
//   box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
//     4px 4px 18px rgba(0, 0, 0, 0.5);
//   border-radius: 10px;
//   border: 2px solid #000;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 15px;
//   padding: 14px 30px;
//   position: relative;
//   background-color: #fff037;
//   font-family: Poppins;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 21px;
//   color: #ffffff;
//   transition: all 0.5s;
//   :hover {
//     background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
//       linear-gradient(146.14deg, #606060 0%, #0b0e12 100%);
//     box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
//       4px 4px 18px rgba(0, 0, 0, 0.5);
//   }
// `;

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
    hideInvestButton,
    slug,
    farmerImage: { url: picture },
    oldPoolAddress,
    oldPoolVersion,
  } = farmer;

 

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

            {/* <Col
              lg={6}
              className="d-none d-sm-none d-md-flex d-lg-flex justify-content-lg-end pb-2 align-items-end justify-content-sm-center justify-content-center justify-content-md-center"
            >
              {pool_version > 3 &&
              connected &&
              network.chainId === BINANCE_CHAIN_ID ? (
                <ShareButton onClick={() => setSharePopup(true)}>
                  <ShareandEarnIcon className="mr-2" color="#fff" />
                  Share and Earn
                </ShareButton>
              ) : null}
            </Col> */}
          </Row>

          <Row className="mt-2 mt-lg-5 justify-content-between">
            <DetailTable
              apy={apy}
              network={network}
              hideInvestButton={hideInvestButton}
              tvl={tvl}
            
              oldPoolAddress={oldPoolAddress}
              oldPoolVersion={oldPoolVersion}
              poolVersion={pool_version}
              poolAddress={poolAddress}
              boostApy={boostApy}
              slug={slug}
              strategyName={strategyName}
              name={name}
              Insurance={farmer.Insurance}
              hasInsurance={farmer.hasInsurance}
              minAmountForInsurance={farmer.minAmountForInsurance}
            />
          </Row>
        </Container>
      </Section>

      {/* {openSharePopup && (
        <Share
          open={openSharePopup}
          pool_address={poolAddress}
          apy={apy}
          chainId={network.chainId}
          farmername={name}
          slug={slug}
          strategyName={strategyName}
          onClose={() => setSharePopup(false)}
        />
      )} */}
    </>
  );
};
