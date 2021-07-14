import { Col, Container, Row } from "react-bootstrap";
import { EditIcon } from "icons/EditIcon";
import { DollarIcon } from "icons";
import { DetailTable } from "./DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { ShowMoreContent } from "components/ShowmoreContent";
import { FarmerModal } from "components/FarmerModal/FarmerModal";
import { useEffect, useState } from "react";
import { IFarmerInter, IStrategy } from "interfaces";
import { TwitterIcon } from "components/TwitterIcon";
import BigNumber from "bignumber.js";
import { theme } from "theme";
import { ButtonWidget } from "components/Button/ButtonWidget";
import { Share, ShareLink } from "components/ShareAndEarn";
import { api } from "don-utils";
import { useWeb3 } from "don-components";

const StyledFarmerImage = styled.img`
  border-radius: 15px;
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const OutlinedButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(128, 118, 2, 1);
  border-radius: 5px;
  font-size: 16px;
  color: rgba(54, 53, 44, 1);
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 15px;
  transition: all 0.3s linear;
  &:hover {
    background-color: #fff;
    border-color: #fff;
  }
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

const TypographyShare = styled.div`
  font-family: roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const getStrategyField = <T extends keyof IStrategy>(
  farmer: IFarmerInter,
  key: T
): NonNullable<IStrategy[T]> | undefined => {
  if (!farmer.strategies || farmer.strategies.length === 0) {
    return undefined;
  }
  const result = farmer.strategies[0][key];
  if (result) {
    return result as any;
  }
  return undefined;
};

export const FarmerBio = ({
  farmer,
  isInvestor,
}: {
  farmer: IFarmerInter;
  isInvestor?: boolean;
  investorCount?: number;
  telegram?: string;
  twitter?: string;
}) => {
  const [modalShow, setModalShow] = useState(false);
  const {
    description,
    name,
    picture,
    poolAddress,
    strategies,
    pool_version,
    twitter,
    GUID,
  } = farmer;
  const gasLimit = getStrategyField(farmer, "gasLimit");
  const [openSharePopup, setSharePopup] = useState(false);
  const [openShareLink, setShareLink] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [shortLink, setShortLink] = useState<string | null>(null);
  const handleCreateLink = (url: string, short: string) => {
    setImageUrl(url);
    setSharePopup(false);
    setShareLink(true);
    setShortLink(short);
  };
  const web3 = useWeb3()
  const fetchInfoFromApi = async () => {
    const accounts = await web3.eth.getAccounts();
    const response = await api.get('/api/v2/shortener?'+ new URLSearchParams({
      pool_address: poolAddress,
      wallet_address: accounts[0]
    }).toString())
    if (response.data) {
      setShortLink(`https://next.don-key.finance/share/`+ response.data.code);
      setImageUrl(response.data.image);
    }
  }

  useEffect(() => {
    fetchInfoFromApi();
  }, []);

  const handleShareClick = () => {
    if (shortLink && imageUrl) {
      setShareLink(true);
    } else {
      setSharePopup(true);
    }
  };
  const apy =
    strategies && strategies.length > 0
      ? new BigNumber(strategies![0].apy).multipliedBy(100).toFixed(0) + "%"
      : "100%";
  const network =
    strategies && strategies.length > 0 ? strategies[0].network : undefined;
  const strategyName =
    strategies && strategies.length > 0 ? strategies[0].strategyName : "";
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
                {!isInvestor && (
                  <div className="d-flex align-items-center justify-content-center">
                    <OutlinedButton
                      className="ml-3"
                      onClick={() => setModalShow(true)}
                    >
                      <EditIcon className="mr-2" />
                      Edit bio page
                    </OutlinedButton>
                    {modalShow && (
                      <FarmerModal
                        isOpen={modalShow}
                        onClose={() => setModalShow(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Row className="mt-0 mt-sm-3 mb-4">
            <div className="col-lg-6">
              <div className="row">
                <ImageWrapper className="pl-4">
                  <StyledFarmerImage
                    src={picture}
                    className="img-fluid "
                    alt="farmer"
                    style={{ borderRadius: 0 }}
                  />{" "}
                </ImageWrapper>

                <Col lg={9} className="pl-4 mt-4 mt-md-0">
                  {description.length > 0 && (
                    <>
                      <div className="d-flex justify-content-between">
                        <h4 className="font-weight-bolder">
                          {strategies && strategies.length > 0
                            ? strategies[0].strategyName
                            : "Description"}
                        </h4>
                        <div className="d-flex">
                          <div className="mr-3">
                            {twitter && (
                              <TwitterIcon
                                fill={"#000"}
                                handle={twitter || "#"}
                              ></TwitterIcon>
                            )}
                          </div>
                          {/* <div>
                          <TelegramIcon
                            fill={"#000"}
                            handle={telegram || "#"}
                          ></TelegramIcon>
                        </div> */}
                        </div>
                      </div>

                      <p style={{ fontSize: 15 }}>
                        <ShowMoreContent length={150} content={description} />
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
              {/* <DotsIcon /> */}
              <ButtonWidget
                varaint="contained"
                onClick={handleShareClick}
                containedVariantColor="gradient"
                width="193px"
                height="50px"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <DollarIcon className="mr-3" />
                  <TypographyShare> Share and Earn</TypographyShare>
                </div>
              </ButtonWidget>
            </Col>
          </Row>

          <Row className="mt-5">
            <DetailTable
              gasLimit={gasLimit}
              apy={apy}
              network={network}
              poolVersion={pool_version}
              poolAddress={poolAddress}
              farmerId={GUID}
            />
          </Row>
        </Container>
      </Section>

      {openSharePopup && (
        <Share
          open={openSharePopup}
          pool_address={poolAddress}
          imageData={{
            farmerName: name,
            imageUrl: picture,
            strategyName,
          }}
          apy={apy}
          onCreateLink={handleCreateLink}
          onClose={() => setSharePopup(false)}
        />
      )}

      {openShareLink && imageUrl && shortLink && (
        <ShareLink
          link={shortLink}
          open={openShareLink}
          imageUrl={imageUrl}
          onClose={() => setShareLink(false)}
        />
      )}
    </>
  );
};
