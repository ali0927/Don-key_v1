import React, { useState } from "react";
import Banner2 from "./images/Banner2.png";
import Banner3 from "./images/Banner3.png";
import Banner4 from "./images/Banner4.png";
import Banner6 from "./images/Banner6.png";
import Banner7 from "./images/Banner7.png";
import Banner1 from "./images/Banner1.jpeg";
import Banner5 from "./images/Banner5.jpeg";
import styled from "styled-components";
import clsx from "clsx";
import SlickSlider from "react-slick";
import { LeftSliderArrow, RightSliderArrow } from "icons";
import { useDidUpdate } from "hooks";
import { convertToInternationalCurrencySystem } from "helpers";
import { breakPoints } from "breakponts";
import { ReferralImage } from "../ReferralImage/ReferralImage";

const CutomSlickSlider = styled(SlickSlider)`
  .selected {
    border: 2.5px solid #fed700;
    border-radius: 5px;
    @media only screen and (min-width: ${breakPoints.md}) {
      border: 4px solid #fed700;
      border-radius: 10px;
    }
  }
`;

const ThumbDiv = styled.div`
  width: 41px !important;
  height: 41px;
  border: 1px solid #5c5c5c;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  @media only screen and (min-width: ${breakPoints.md}) {
    width: 72px !important;
    height: 72px;
    border-radius: 10px;
  }
`;

const LIImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

const FooterText = styled.p<{ fontSize?: string }>`
  font-family: "Poppins";
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: 500;
`;
const banners = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6, Banner7];
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  initialSlide: 0,
};

export const Slider: React.FC<{
  tvl: string;
  apy: string;
  farmerName: string;
  strategyName: string;
  onChange: () => void;
  onFirstRender: () => void;
}> = (props) => {
  const { tvl, apy, farmerName } = props;

  const slickRef = React.useRef<SlickSlider | null>(null);

  const [selectedBanner, setSelectedBanner] = useState(0);

  const handleChangeImage = (index: number) => () => {
    setSelectedBanner(index);
  };

  const handleNext = () => {
    if (slickRef.current) {
      const nextSlide = selectedBanner + 1;
      if (banners.length > nextSlide) {
        slickRef.current.slickGoTo(nextSlide);
        setSelectedBanner(nextSlide);
      } else {
        slickRef.current.slickGoTo(0);
        setSelectedBanner(0);
      }
    }
  };

  const handlePrev = () => {
    if (slickRef.current) {
      const nextSlide = selectedBanner - 1;
      if (nextSlide === 0) {
        slickRef.current.slickGoTo(banners.length - 1);
        setSelectedBanner(banners.length - 1);
      } else {
        slickRef.current.slickGoTo(nextSlide);
        setSelectedBanner(nextSlide);
      }
    }
  };

  React.useEffect(() => {
    props.onFirstRender();
  }, []);

  useDidUpdate(() => {
    props.onChange();
  }, [selectedBanner]);

  const tvlUpdate = convertToInternationalCurrencySystem(tvl);

  return (
    <>
      <ReferralImage
        bgImage={banners[selectedBanner].src}
        apy={apy}
        tvl={tvlUpdate}
        farmerName={farmerName}
      />
      <CutomSlickSlider ref={slickRef} className="mt-3" {...settings}>
        {banners.map((banner, index) => {
          return (
            <div key={index}>
              <ThumbDiv
                className={clsx({
                  selected: index === selectedBanner,
                })}
              >
                <LIImage
                  src={banner.src}
                  alt="Banner image not found"
                  onClick={handleChangeImage(index)}
                />
              </ThumbDiv>
            </div>
          );
        })}
      </CutomSlickSlider>

      <div className="justify-content-center mt-2 d-none d-md-flex">
        <LeftSliderArrow role="button" className="mr-2" onClick={handlePrev} />
        <FooterText className="ml-2 mr-2">
          Select the background for the banner
        </FooterText>
        <RightSliderArrow role="button" className="ml-2" onClick={handleNext} />
      </div>
      <div className="justify-content-center mt-2 d-flex d-md-none">
        <FooterText fontSize="11px">
          Switch and select the background for the banner
        </FooterText>
      </div>
    </>
  );
};
