import { breakPoints } from "breakponts";
import React from "react";
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
import { useReferralContext } from "contexts/ReferralContext";
import { tiersInfo } from "LandingPage/TiersSection";

const Root = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  min-height: ${(props) => (props.bgColor === "#FFF9E5" ? "" : "642px")};
  padding: ${(props) =>
    props.bgColor === "#FFF9E5" ? "20px 0px" : "55px 0px 38px 0px"};
  border-radius: ${(props) => (props.bgColor === "#FFF9E5" ? "0px" : "")};
  @media only screen and (min-width: ${breakPoints.lg}) {
    min-height: ${(props) =>
      props.bgColor === "#FFF9E5" ? "fit-content" : "725px"};
    padding: ${(props) =>
      props.bgColor === "#FFF9E5" ? "0px 0px 20px" : "135px 120px 86px 120px"};
    border-radius: ${(props) => (props.bgColor === "#FFF9E5" ? "10px" : "")};
    margin: 0;
  }
`;



const Card = styled.div<{
  height: string;
}>`
  position: relative;
  overflow: hidden;
  border-radius: 16.3595px;
  background: #fff;
  width: 180px;
  height: ${(props) => (props.height === "218px" ? "218px" : "249px")};
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 170px;
    height: ${(props) => (props.height === "218px" ? "215px" : "249px")};
  }
`;

const CutomSlickSlider = styled(SlickSlider)`
  overflow: hidden;
  width: 100%;
  height: 248px;
  padding: 0 20% 0 0 !important;
  .slick-list {
    overflow: visible;
  }
`;

const CardTypography = styled.p<{
  lgFontSize: string;
  smFontSize: string;
  color: string;
  bold?: boolean;
  maxWidth?: string;
}>`
  font-family: "Poppins";
  margin: 0px;
  font-size: ${(props) => props.smFontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "800" : "400")};
  max-width: ${(props) => props.maxWidth};
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


interface IProps {

  staking?: boolean;
}

export const TiersSection: React.FC<IProps> = ({

  staking,
}: IProps) => {
  const slickRef = React.useRef<SlickSlider | null>(null);
 

  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);



  const [selectedTier, setSelectedTier] = React.useState(0);


  const { getTierCommission } = useReferralContext();

  const renderCards = (index: number, staking?: boolean) => {
    const tier = tiersInfo[index];
    //const tierImage = getImage(tier.image);
    return (
      <div className={clsx({ "mr-3": !isDesktop })}>
        <Card height={staking ? "249px" : "218px"}>
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
                Extra APR
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
            {staking && (
              <>
                <CardTypography
                  lgFontSize={"10px"}
                  smFontSize="10px"
                  color="#222222"
                  maxWidth="77px"
                >
                  REFERAL REWARDS
                </CardTypography>
                <CardTypography
                  lgFontSize={"14px"}
                  smFontSize="14px"
                  color="#070602"
                  bold
                >
                  {getTierCommission(tier.tier)}%
                </CardTypography>
              </>
            )}
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

  return (
    <>
      <Root bgColor={staking ? "#FFF9E5" : "#F2F2F2"}>
        <Container className="p-0">
          {!isDesktop && (
            <div className="mt-3 w-100">
              <CutomSlickSlider
                ref={slickRef}
                {...settings}
                afterChange={(currentSlide) => setSelectedTier(currentSlide)}
           
                infinite={false}
              >
                {tiersInfo.map((currentTier, index) => {
                  return <>{renderCards(index, staking)}</>;
                })}
              </CutomSlickSlider>
              <div className="d-flex justify-content-center mt-4">
                {tiersInfo.map((value, index) => {
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
              {tiersInfo.map((currentTier, index) => {
                return <>{renderCards(index, staking)}</>;
              })}
            </div>
          )}
        </Container>
      </Root>
    </>
  );
};
