import { breakPoints } from "breakponts";
import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { IVideo } from "./interfaces/IVideo";
import SlickSlider from "react-slick";
import clsx from "clsx";

const Root = styled.div`
  background-color: #fff;
  min-height: 400px;
  padding: 45px 0px 45px 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    padding: 145px 0px 45px 0px;
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    padding: 200px 0px 100px 0px;
    min-height: 800px;
  }
`;

const VideoRoot = styled.div`
  margin-top: 30px;
  margin-left: 15px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    margin-top: 60px;
    margin-left: 211px;
  }
`;

const Typography = styled.p<{
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

const IFrameRoot = styled.div`
  border-radius: 12px;
  height: 162px;
  width: 260px;
  overflow: hidden;
  margin-top: 15px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 470px;
    height: 330px;
    margin: 0px;
    margin-top: 20px;
  }
`;

const IFrame = styled.iframe`
  border-radius: inherit;
  height: 100%;
  width: 100%;
  border: 0px;
`;

const VideoItem = styled.div`
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  opacity: 0.5;
`;

const CutomSlickSlider = styled(SlickSlider)`
  overflow: hidden;
  width: 100%;
  height: 250px;
  .selected-slide {
    opacity: 1;
  }
  .selected-slide .iframeCSS {
    transform: scale(1.1);
  }
  .slick-slide {
    margin: 0 0px;
    @media only screen and (min-width: ${breakPoints.md}) {
      margin: 0 10px;
    }
  }
  .slick-slide.slick-center .iframeCSS {
    transform: scale(1.1);
 
  }
  .slick-slide.slick-center .videoItem {
    opacity: 1;
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 500px;
  }
  /* height: 220px; */
`;

const GrayBorder = styled.hr`
  width: 100%;
  border-top: 1.8px dashed #c5c5c5;
  top: 2px;
  margin: 0px;
  margin-left: 15px;
`;

const DarkBorder = styled.div`
  width: 29px;
  height: 5px;
  background: #000;
  position: absolute;
  top: -2px;
  cursor: pointer;
`;

const Dots = styled.div<{ selected: boolean }>`
  width: 8.68px;
  height: 8.68px;
  background: ${(props) => (props.selected ? "#000000" : "#E2E2E2")};
  border-radius: 100%;
  cursor: pointer;
`;

export const VideoSection: React.FC = () => {
  const slickRef = React.useRef<SlickSlider | null>(null);
  const [selectedTier, setSelectedTier] = React.useState(0);
  const videos: IVideo[] = [
    {
      url: "https://www.youtube.com/embed/XrLwOmmz4bs",
      name: "Crypto Banter",
      subscribers: "426K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/XkiRXMM5TTE",
      name: "Kyle Chasse",
      subscribers: "20.2K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/NHyP0tKIM68",
      name: "EllioTrades Crypto",
      subscribers: "454K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/gRwqZOJDUOU",
      name: "Crypto Banter",
      subscribers: "426K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/vAw0H0tuwM4",
      name: "BitBoy Crypto",
      subscribers: "1.33M subscribers",
    },
  ];

  const settings = {
    className: "center",
    infinite: true,
    speed: 300,
    centerMode: true,
    variableWidth: true,
    centerPadding: '10px',
    slidesToShow: 1,
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
        <Container>
          <Typography lgFontSize="36px" smFontSize="30px" color="#000" bold>
            As seen on:
          </Typography>
        </Container>

        <VideoRoot className="d-flex position-relative">
          <CutomSlickSlider ref={slickRef} {...settings}>
            {videos.map((video, index) => {
              return (
                <VideoItem
                  className={clsx("videoItem")}
                  key={index}
                  onClick={handleChangeSlide(index)}
                >
                  <IFrameRoot className="iframeCSS">
                    {" "}
                    <IFrame src={video.url}></IFrame>
                  </IFrameRoot>
                  <Typography
                    className="mt-3"
                    lgFontSize="32px"
                    smFontSize="18px"
                    color="#000"
                    bold
                  >
                    {video.name}
                  </Typography>
                  <Typography
                    className="mt-2"
                    lgFontSize="16px"
                    smFontSize="12px"
                    color="#000"
                  >
                    {video.subscribers}
                  </Typography>
                  <div className="position-relative mt-4 mb-2 d-none d-md-block">
                    <GrayBorder />
                    <DarkBorder />
                  </div>
                </VideoItem>
              );
            })}
          </CutomSlickSlider>
        </VideoRoot>
        <Container>
          <div className="d-flex justify-content-center mt-4">
            {videos.map((value, index) => {
              return (
                <Dots
                  className="mr-2"
                  selected={index === selectedTier}
                  onClick={handleChangeSlide(index)}
                />
              );
            })}
          </div>
        </Container>
      </Root>
    </>
  );
};
