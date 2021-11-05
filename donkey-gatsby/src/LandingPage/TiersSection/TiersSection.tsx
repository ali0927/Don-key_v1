import { breakPoints } from "breakponts";
import { ShowMoreContent } from "components/ShowmoreContent";
import React, { useState } from "react";
import styled from "styled-components";
import SlickSlider, { Settings as SlickSettings } from "react-slick";
import teir0 from "./images/tier0.png";
import teir1 from "./images/tier1.png";
import tier2 from "./images/tier2.png";
import tier3 from "./images/tier3.png";
import tier4 from "./images/tier4.png";
import tier5 from "./images/tier5.png";
import { ITierSection } from "./interfaces";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "theme";
import clsx from "clsx";
import { Container } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import { ButtonWidget } from "components/Button";
import { useWeb3Context } from "don-components";
import { useStakingContract } from "hooks";
const Root = styled.div`
  background-color: #f2f2f2;
  min-height: 642px;
  padding: 55px 0px 38px 0px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    min-height: 725px;
    padding: 135px 120px 86px 120px;
  }
`;

const Heading = styled.h2`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 40px;
  font-weight: 900;
  text-align: left;
  color: #222222;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 49px;
  }
`;

const Paragraph = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16.3595px;
  background: #fff;
  width: 180px;
  height: 218px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 170px;
    height: 215px;
  }
`;

const CutomSlickSlider = styled(SlickSlider)`
  overflow: hidden;
  width: 100%;
  height: 220px;
`;

const CardTypography = styled.p<{
  lgFontSize: string;
  smFontSize: string;
  color: string;
  bold?: boolean;
}>`
  font-family: "Poppins";
  margin: 0px;
  font-size: ${(props) => props.smFontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "800" : "400")};
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: ${(props) => props.lgFontSize};
  }
`;

const CardHeader = styled.div`
  height: 100px;
  padding: 13px;
  padding-top: 0px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 92px;
  }
`;

const Image = styled.img<{ bottom?: string; height?: string }>`
  position: absolute;
  right: 0px;
  z-index: 1;
  height: ${(props) => (props.height ? props.height : "144px")};
  bottom: ${(props) => (props.bottom ? props.bottom : "0px")};
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: ${(props) => (props.height ? props.height : "144px")};
  }
`;

const CardBody = styled.div`
  padding: 13px;
  padding-top: 0px;
  padding-bottom: 0px;
  /* 
  @media only screen and (min-width: ${breakPoints.lg}) {
    padding-top: 36px;
  } */
`;

const Divider = styled.hr`
  border-top: 1px solid #dedee0;
  margin: 0px;
  width: 54px;
`;

const CardBg = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const Dots = styled.div<{ selected: boolean }>`
  width: 8.68px;
  height: 8.68px;
  background: ${(props) => (props.selected ? "#000000" : "#E2E2E2")};
  border-radius: 100%;
`;

const settings: SlickSettings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
};

const StakeButton = styled(ButtonWidget)`
  border: 2px solid #222222;
  font-weight: 600;
  width: 221px;
  @media only screen and (min-width: ${breakPoints.md}) {
    width: 178px;
  }
`;

export const TiersSection: React.FC = () => {
  const slickRef = React.useRef<SlickSlider | null>(null);
  const content = `Our Tier System unlocks utility on Don-key’s copy-farming platform. Each level unlocks an additional level of benefits and profitability, rewarding holders of $DON as much as possible.
  At the moment our tiers provide extra APY in the form of $DON tokens, while base profits are given in the farmed coin. In the future the tiers will unlock more utilities such as: referral rewards, generative NFT rewards, exclusive farming opportunities, autonomous strategy building interface and more. `;

  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);

  const tiers: ITierSection[] = [
    {
      tier: 0,
      image: teir0,
      stakedDons: "100",
      apy: "Access to DAPP",
      height: "139px",
      bottom: "34px",
    },
    { tier: 1, image: teir1, stakedDons: "500", apy: "10%", bottom: "5px" },
    {
      tier: 2,
      image: tier2,
      stakedDons: "2,500",
      apy: "20%",
      bottom: "10px",
      height: "120px",
    },
    { tier: 3, image: tier3, stakedDons: "5,000", apy: "50%" },
    { tier: 4, image: tier4, stakedDons: "25,000", height: "90%", apy: "75%" },
    { tier: 5, image: tier5, stakedDons: "50,000", apy: "100%" },
  ];

  const [selectedTier, setSelectedTier] = React.useState(0);

  const renderCards = (index: number) => {
    const tier = tiers[index];
    //const tierImage = getImage(tier.image);
    return (
      <div className={clsx({ "mr-3": !isDesktop })}>
        <Card>
          <CardHeader>
            <CardTypography
              lgFontSize={"25px"}
              smFontSize="25px"
              color="#fff"
              bold
              style={{ zIndex: 1 }}
            >
              Tier {tier.tier}
            </CardTypography>
          </CardHeader>
          <CardBody>
            <CardTypography
              lgFontSize={"10px"}
              smFontSize="10px"
              color="#222222"
            >
              {tier.tier === 0 ? "Hold" : "Stake"}
            </CardTypography>
            <CardTypography
              lgFontSize={"14px"}
              smFontSize="14px"
              color="#070602"
              bold
            >
              {tier.stakedDons} $DON
            </CardTypography>
            <Divider className="mt-2 mb-2" />
            {tier.tier !== 0 && (
              <CardTypography
                lgFontSize="10px"
                smFontSize="10px"
                color="#222222"
              >
                Extra APY
              </CardTypography>
            )}
            <CardTypography
              lgFontSize={"14px"}
              smFontSize="14px"
              color="#070602"
              style={{ maxWidth: "50%" }}
              bold
            >
              {tier.apy}
            </CardTypography>
          </CardBody>
          <Image
            src={tier.image}
            style={{
              bottom: tier.bottom,
              height: tier.height,
              right: tier.right,
            }}
            alt="Image not found"
          />
          {/* <GatsbyImage image={tierImage} alt="Image not found"/> */}
          {/* <StaticImage src={tier.image} alt="Card image not found" /> */}
          <CardBg>
            <StaticImage
              src={"./images/CardProfile.png"}
              alt="Card image not found"
            />
          </CardBg>
        </Card>
      </div>
    );
  };

  const handleChangeSlide = (slideNumber: number) => () => {
    if (slickRef.current) {
      slickRef.current.slickGoTo(slideNumber);
      setSelectedTier(slideNumber);
    }
  };
  const { loading } = useStakingContract();
  const { connectDapp, connected } = useWeb3Context();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Root>
        <Container>
          <Heading>Check out our tier system</Heading>
          <div className="row">
            <div className="col-12 col-lg-6">
              <Paragraph className="d-block d-lg-none">
                <ShowMoreContent content={content} length={220} />
              </Paragraph>
              <Paragraph className="d-none d-lg-block">{content}</Paragraph>
            </div>
          </div>
          {!isDesktop && (
            <div className="mt-3 w-100">
              <CutomSlickSlider
                ref={slickRef}
                {...settings}
                afterChange={(currentSlide) => setSelectedTier(currentSlide)}
              >
                {tiers.map((currentTier, index) => {
                  return <>{renderCards(index)}</>;
                })}
              </CutomSlickSlider>
              <div className="d-flex justify-content-center mt-4">
                {tiers.map((value, index) => {
                  return (
                    <Dots
                      className="mr-2"
                      selected={index === selectedTier}
                      onClick={handleChangeSlide(index)}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {isDesktop && (
            <div className="d-flex justify-content-between mt-3 w-100">
              {tiers.map((currentTier, index) => {
                return <>{renderCards(index)}</>;
              })}
            </div>
          )}
          {/* <div className="d-flex justify-content-center  mt-5">
            <StakeButton
              varaint="outlined"
              className="mt-3 "
              width="178px"
              height="55px"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              STAKE $DON
            </StakeButton>
            {isOpen && connected && !loading && (
              <AcceleratedAPYModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />
            )}
            {isOpen && !connected && (
              <WalletPopup onClose={() => setIsOpen(false)} onDone={() => setIsOpen(true)} />
            )}
          </div> */}
        </Container>
      </Root>
    </>
  );
};
