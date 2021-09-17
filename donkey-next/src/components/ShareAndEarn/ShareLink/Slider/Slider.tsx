import React, { useMemo, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import SlickSlider from "react-slick";
import { LeftSliderArrow, RightSliderArrow } from "icons";
import { convertToInternationalCurrencySystem } from "helpers";
import { breakPoints } from "breakponts";
import { ReferralImage } from "don-components";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";

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
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  initialSlide: 0,
};

const IMAGE_LIST_QUERY = gql`
  query imageList {
    referralImages {
      image {
        url
      }
    }
  }
`;

type IBanner = {url: string; id: string;};
export const Slider: React.FC<{
  tvl: string;
  apy: string;
  farmerName: string;
  strategyName: string;
}> = (props) => {
  const { tvl, apy, farmerName } = props;

  const slickRef = React.useRef<SlickSlider | null>(null);

  const [selectedBanner, setSelectedBanner] = useState(0);

  const handleChangeImage = (index: number) => () => {
    setSelectedBanner(index);
  };

  const { data, loading } = useQuery(IMAGE_LIST_QUERY);

  const banners: IBanner[] = useMemo(() => {
    if (data) {
      return data.referralImages.map((item: any) => ({url: item.image.url, id: item.image.id}));
    }
    return [] ;
  }, [data]);

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



  const tvlUpdate = convertToInternationalCurrencySystem(tvl);
  if(loading){
    return <Spinner animation="border" size="sm" />
  }
  return (
    <>
      <ReferralImage
        bgImage={banners[selectedBanner].url}
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
                  src={banner.url}
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
