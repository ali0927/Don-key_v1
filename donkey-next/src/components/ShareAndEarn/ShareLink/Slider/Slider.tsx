import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import SlickSlider from "react-slick";
import { LeftSliderArrow, RightSliderArrow } from "icons";
import { convertToInternationalCurrencySystem } from "helpers";
import { breakPoints } from "breakponts";
import { ReferralImage } from "don-components";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { DonCommonmodal } from "components/DonModal";
import { ButtonWidget } from "components/Button";
import { api } from "don-utils";

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
      id
      image {
        url
      }
    }
  }
`;


const StyledLink = styled.span`
cursor: pointer;
text-decoration: underline;
&:hover {
  text-decoration: none;
}
`;

type IBanner = { url: string; id: string };
export const Slider: React.FC<{
  tvl: string;
  apy: string;
  farmerName: string;
  strategyName: string;
  image_id: string;
  short_code: string;
  refetch: () => Promise<void>;
}> = (props) => {
  const { tvl, apy, farmerName, image_id, short_code, refetch } = props;

  const [selectedBanner, setSelectedBanner] = useState(image_id);

  const slickRef = useRef<SlickSlider | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, loading } = useQuery(IMAGE_LIST_QUERY);
  const [isLoading, setIsLoading] = useState(false);
  const banners: IBanner[] = useMemo(() => {
    if (data) {
      return data.referralImages.map((item: any) => ({
        url: item.image.url,
        id: item.id,
      }));
    }
    return [];
  }, [data]);

  const handleChangeImage = (id: string) => () => {
    const banner = banners.find((item) => item.id === id);
    setSelectedBanner(banner?.id as string);
  };

  const handleNext = () => {
    if (slickRef.current) {
      const index = banners.findIndex((item) => item.id === selectedBanner);
      const nextSlide = index + 1;
      if (banners.length > nextSlide) {
        slickRef.current.slickGoTo(nextSlide);
        setSelectedBanner(banners[nextSlide].id);
      } else {
        slickRef.current.slickGoTo(0);
        setSelectedBanner(banners[0].id);
      }
    }
  };

  const handlePrev = () => {
    if (slickRef.current) {
      const index = banners.findIndex((item) => item.id === selectedBanner);
      const nextSlide = index - 1;
      if (nextSlide === 0) {
        const prev = banners.length - 1;
        slickRef.current.slickGoTo(prev);
        setSelectedBanner(banners[prev].id);
      } else {
        slickRef.current.slickGoTo(nextSlide);
        setSelectedBanner(banners[nextSlide].id);
      }
    }
  };

  const bgImage = useMemo(() => {
    const banner = banners.find((item) => item.id === image_id);

    return banner?.url as string;
  }, [banners, image_id]);

  const selectedImage = useMemo(() => {
    const banner = banners.find((item) => item.id === selectedBanner);

    return banner?.url as string;
  }, [banners, selectedBanner]);

  const tvlUpdate = convertToInternationalCurrencySystem(tvl);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await api.put("/api/v2/shortener", {
        image: selectedBanner,
        shortcode: short_code,
      });
    } catch (e) {
      console.log(e);
    } finally {
      await refetch();
      setIsLoading(false); 
      setIsEditOpen(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" size="sm" />;
  }
  return (
    <>
      <ReferralImage
        bgImage={bgImage}
        apy={apy}
        tvl={tvlUpdate}
        farmerName={farmerName}
      />
      <p className="text-center py-3">
        {" "}
        <StyledLink  onClick={() => setIsEditOpen(true)}>Edit Background</StyledLink>
      </p>
      {isEditOpen && (
        <DonCommonmodal
          isOpen={isEditOpen}
          title="Edit Background"
          variant="common"
          onClose={() => setIsEditOpen(false)}
          size="sm"
        >
          <ReferralImage
            bgImage={selectedImage}
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
                      selected: banner.id === selectedBanner,
                    })}
                  >
                    <LIImage
                      src={banner.url}
                      style={{objectFit: "cover", width: "100%" }}
                      alt="Banner image not found"
                      onClick={handleChangeImage(banner.id)}
                    />
                  </ThumbDiv>
                </div>
              );
            })}
          </CutomSlickSlider>

          <div className="justify-content-center mt-2 d-none d-md-flex">
            <LeftSliderArrow
              role="button"
              className="mr-2"
              onClick={handlePrev}
            />
            <FooterText className="ml-2 mr-2">
              Select the background for the banner
            </FooterText>
            <RightSliderArrow
              role="button"
              className="ml-2"
              onClick={handleNext}
            />
          </div>
          <ButtonWidget
            varaint="contained"
            height={"50px"}
            disabled={selectedBanner === image_id}
            containedVariantColor="lightYellow"
            onClick={handleSave}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <> Save Changes</>
            )}
          </ButtonWidget>
        </DonCommonmodal>
      )}
    </>
  );
};
