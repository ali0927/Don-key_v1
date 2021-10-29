import { breakPoints } from "breakponts";
import { ShowMoreContent } from "components/ShowmoreContent";
import React from "react";
import styled from "styled-components";
import SlickSlider from "react-slick";
import tier1 from "./images/tier1.png";
import tier2 from "./images/tier2.png";
import tier3 from "./images/tier3.png";
import tier4 from "./images/tier4.png";
import tier5 from "./images/tier5.png";
import { ITierSection } from "./interfaces";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "theme";
import clsx from "clsx";

const Root = styled.div`
  background-color: #f2f2f2;
  min-height: 642px;
  padding: 55px 20px 38px 20px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    min-height: 725px;
    padding: 135px 120px 86px 120px;
  }
`;

const Typography = styled.p`
  font-family: "Poppins";
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  text-align: left;
  line-height: 38.4px;
  margin-bottom: 15px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 50px;
    margin-bottom: 30px;
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
    width: 218px;
    height: 275px;
  }
`;

const CutomSlickSlider = styled(SlickSlider)`
  overflow: hidden;
  width: 100%;
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
  height: 86px;
  background: linear-gradient(101.84deg, #fac200 2.78%, #fff037 98.95%);
  padding: 13px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 104px;
  }
`;

const Image = styled.img`
  position: absolute;
  right: 0px;
  top: 21%;
`;

const CardBody = styled.div`
  padding: 13px;
  padding-top: 36px;
`;

const Dots = styled.div<{ selected: boolean }>`
  width: 8.68px;
  height: 8.68px;
  background: ${(props) => (props.selected ? "#000000" : "#E2E2E2")};
  border-radius: 100%;
`;

export const TiersSection: React.FC = () => {
  const slickRef = React.useRef<SlickSlider | null>(null);
  const content = `While base profits are given in the farmed coin, whether it be
       USDS, CAKE, Matic or whatewer else the investor decides to deposit
       in, additional rewards will be given in DON according to the
       following tier system! Through staking 100 DON, investors will
       have full access to Don-key’s range of farming options. It’s the
       base requirement, Tier 0.`;

  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 3,
    centerMode: true,
    variableWidth: true
  };

  const tiers: ITierSection[] = [
    { tier: 1, image: tier1, stakedDons: "500" },
    { tier: 2, image: tier2, stakedDons: "25,00" },
    { tier: 3, image: tier3, stakedDons: "5,000" },
    { tier: 4, image: tier4, stakedDons: "25,000" },
    { tier: 5, image: tier5, stakedDons: "50,000" },
  ];

  const [selectedTier, setSelectedTier] = React.useState(0);

  const renderCards = (index: number) => {
    const tier = tiers[index];
    return (
      <div className={clsx({ "mr-3": !isDesktop })}>
        <Card>
          <CardHeader>
            <CardTypography
              lgFontSize={"30px"}
              smFontSize="25px"
              color="#fff"
              bold
            >
              Tier {tier.tier}
            </CardTypography>
          </CardHeader>
          <CardBody>
            <CardTypography
              lgFontSize={"12px"}
              smFontSize="10px"
              color="#222222"
              bold
            >
              Staked $DON
            </CardTypography>
            <CardTypography
              lgFontSize={"16px"}
              smFontSize="14px"
              color="#070602"
              bold
            >
              {tier.stakedDons} $DON
            </CardTypography>
          </CardBody>
          <Image src={tier.image} alt="Image not found" />
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
      <Root>
        <Typography>Check on our Tiers system!</Typography>
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
            <CutomSlickSlider ref={slickRef} {...settings}>
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
      </Root>
    </>
  );
};
