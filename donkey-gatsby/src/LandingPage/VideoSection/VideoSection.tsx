import { breakPoints } from "breakponts";
import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { IVideo } from "./interfaces/IVideo";
import SlickSlider from "react-slick";
import { theme } from "theme";

const Root = styled.div`
  background-color: #fff;
  min-height: 400px;
  padding: 45px 0px 45px 0px;
  width: 100%;
  @media only screen and (min-width: ${breakPoints.md}) {
    padding: 145px 0px 45px 0px;
    width: 105%;
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    padding: 200px 0px 100px 0px;
    min-height: 800px;
    width: 110%;
  }
`;

const VideoRoot = styled.div`
  margin-top: 14px;
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
  width: 210px;
  overflow: hidden;
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 360px;
    height: 262px;
  }
`;

const IFrame = styled.iframe`
  border-radius: inherit;
  height: 100%;
  width: 100%;
  border: 0px;
`;

const VideoWrapper = styled.div`
  opacity: 0.5;
`;

const VideoItem = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 460px;
  }
`;

const CutomSlickSlider = styled(SlickSlider)`
  overflow: hidden;
  width: 100%;
  margin-left: 0px;
  height: 280px;
  .selected-slide {
    opacity: 1;
  }

  .slick-slide.slick-center .iframeCSS {
    transform: scale(1.1);
    height: 180px;
    @media only screen and (min-width: ${breakPoints.lg}) {
      height: 305px;
    }
  }
  .slick-slide.slick-center .videoItem {
    opacity: 1;
  }
  @media only screen and (min-width: ${breakPoints.md}) {
    height: 100%;
    margin-left: -14px;
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    margin-left: -39px;
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`;

const Divider = styled.div`
  margin-top: 0px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    margin-top: 34px;
  }
`;

const DotContainer = styled.div`
${theme.mediaQueries.md.up}{
  margin-left: -75px;
}
`;

export const VideoSection: React.FC = () => {
  const slickRef = React.useRef<SlickSlider | null>(null);
  const [selectedSlide, setSelectedSlide] = React.useState(0);
  const videos: IVideo[] = [
    {
      url: "https://www.youtube.com/embed/XrLwOmmz4bs?start=2764",
      name: "Crypto Banter",
      subscribers: "426K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/XkiRXMM5TTE?start=386",
      name: "Kyle Chasse",
      subscribers: "20.2K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/NHyP0tKIM68?start=432",
      name: "EllioTrades Crypto",
      subscribers: "454K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/gRwqZOJDUOU?start=2662",
      name: "Crypto Banter",
      subscribers: "426K subscribers",
    },
    {
      url: "https://www.youtube.com/embed/vAw0H0tuwM4?start=4565",
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
    slidesToShow: 1,
  };

  const handleChangeSlide = (slideNumber: number) => () => {
    if (slickRef.current) {
      slickRef.current.slickGoTo(slideNumber);
      setSelectedSlide(slideNumber);
    }
  };

  return (
    <>
      <Container>
        <Root>
          <Typography lgFontSize="36px" smFontSize="30px" color="#000" bold>
            As seen on:
          </Typography>

          <VideoRoot className="d-flex position-relative">
            <CutomSlickSlider
              ref={slickRef}
              {...settings}
              afterChange={(currentSlide) => setSelectedSlide(currentSlide)}
            >
              {videos.map((video, index) => {
                return (
                  <VideoWrapper
                    className="videoItem position-relative"
                    onClick={handleChangeSlide(index)}
                  >
                    <VideoItem key={index}>
                      <IFrameRoot className="iframeCSS">
                        {" "}
                        <IFrame src={video.url} allow="fullscreen"></IFrame>
                      </IFrameRoot>
                      <Typography
                        className="mt-3"
                        lgFontSize="24px"
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
                    </VideoItem>
                    {selectedSlide !== index && <Overlay />}
                    <Divider className="position-relative mb-2 d-none d-md-block">
                      <GrayBorder />
                      <div className="d-flex justify-content-center w-100">
                        <DarkBorder />
                      </div>
                    </Divider>
                   
                  </VideoWrapper>
                );
              })}
            </CutomSlickSlider>
          </VideoRoot>

          <DotContainer className="d-flex justify-content-center mt-4">
            {videos.map((_, index) => {
              return (
                <Dots
                  className="mr-2"
                  selected={index === selectedSlide}
                  onClick={handleChangeSlide(index)}
                />
              );
            })}
          </DotContainer>
        </Root>
      </Container>
    </>
  );
};
