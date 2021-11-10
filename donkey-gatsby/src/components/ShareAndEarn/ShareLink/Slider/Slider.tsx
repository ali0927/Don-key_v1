import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import SlickSlider from "react-slick";
import { LeftSliderArrow, RightSliderArrow } from "icons";
import { convertToInternationalCurrencySystem } from "helpers";
import { breakPoints } from "breakponts";
import { ReferralImage, useWeb3Context } from "don-components";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { DonCommonmodal } from "components/DonModal";
import { ButtonWidget } from "components/Button";
import { api } from "strapi";
import { useReferralContext } from "contexts/ReferralContext";
import { signUser } from "components/Navbar";



const CutomSlickSlider = styled(SlickSlider)`
  overflow: hidden;
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
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1
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
  color: #909090;
  &:hover {
    text-decoration: none;
  }
`;

const DisplayImage = styled.img`
  border-radius: 10px;
`;

const SaveButton = styled(ButtonWidget)`
  height: 40px !important;
  @media only screen and (min-width: ${breakPoints.md}) {
    height: 50px !important;
  }
`;


const LoaderRoot = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-color: #fff;
  z-index: 1;
`;

const ImageRoot = styled.div`
  min-height: 100px;
  @media only screen and (min-width: ${breakPoints.md}) {
    min-height: 150px;
  }
`;

type IBanner = { url: string; id: string };
export const Slider: React.FC<{
  tvl: string;
  apy: string;
  farmerName: string;
  strategyName: string;
  image_id: string;
  poolAddress: string;
  short_code: string;
  slug: string;
}> = (props) => {
  const { tvl, apy, farmerName, image_id, short_code, slug, poolAddress } = props;

  const [selectedBanner, setSelectedBanner] = useState(image_id);
  const [imageLoading, setImageLoading] = useState(false);

  const slickRef = useRef<SlickSlider | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, loading } = useQuery(IMAGE_LIST_QUERY);
  const [isLoading, setIsLoading] = useState(false);
  const { getConnectedWeb3 } = useWeb3Context();
  const banners: IBanner[] = useMemo(() => {
    if (data) {
      return data.referralImages.map((item: any) => ({
        url: item.image.url,
        id: item.id,
      }));
    }
    return [];
  }, [data]);

  React.useEffect(() => {
    setImageLoading(true);
  }, [image_id, slug]);

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

  const bgImage =
    process.env.GATSBY_API_URL +
    "/api/v2/referral-image?image_id=" +
    image_id +
    "&slug=" +
    slug;
    

  const selectedImage = useMemo(() => {
    const banner = banners.find((item) => item.id === selectedBanner);

    return banner?.url as string;
  }, [banners, selectedBanner]);
  const {dispatch} = useReferralContext();
  const tvlUpdate = convertToInternationalCurrencySystem(tvl);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      
      await signUser(getConnectedWeb3());

      await api.put("/api/v2/shortener", {
        image: selectedBanner,
        shortcode: short_code,
      });
      dispatch({type: "CHANGE_IMAGE",data: {poolAddress,image_id: selectedBanner }})
    } catch (e) {
      console.log(e);
    } finally {
    
      setIsLoading(false);
      setImageLoading(true);
      setIsEditOpen(false);
    }
  };


  return (
    <>
      {/* <ReferralImage
        bgImage={bgImage}
        apy={apy}
        tvl={tvlUpdate}
        farmerName={farmerName}
      /> */}

      <ImageRoot className="position-relative">
        <DisplayImage
          className={clsx("img-fluid", {"d-non": imageLoading})}
          src={bgImage}
          onLoad={() => setImageLoading(false)}
        />
        {(loading || imageLoading) && (
          <LoaderRoot className="d-flex align-items-center justify-content-center">
             <Spinner animation="border" />
          </LoaderRoot>
        )}
      </ImageRoot>
      <p className="text-center py-3">
        {" "}
        <StyledLink onClick={() => setIsEditOpen(true)}>
          Edit Background
        </StyledLink>
      </p>
      {isEditOpen && (
        <DonCommonmodal
          isOpen={isEditOpen}
          title="Edit Background"
          variant="common"
          onClose={() => setIsEditOpen(false)}
          size="mdSmall"
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
                      style={{ objectFit: "cover", width: "100%" }}
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
              Select background for the banner
            </FooterText>
            <RightSliderArrow
              role="button"
              className="ml-2"
              onClick={handleNext}
            />
          </div>
          <SaveButton
            varaint="contained"
            height={"50px"}
            className="mt-3"
            disabled={selectedBanner === image_id}
            containedVariantColor="lightYellow"
            onClick={handleSave}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <> Save Changes</>
            )}
          </SaveButton>
        </DonCommonmodal>
      )}
    </>
  );
};
