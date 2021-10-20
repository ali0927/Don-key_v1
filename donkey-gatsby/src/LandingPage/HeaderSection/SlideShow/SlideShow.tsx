import React from "react";
import { Slide } from "./Slide";
import styled from "styled-components";
import { ISlideShowProps } from "./interfaces/ISlideShowProps";
import { chunk } from "lodash";
import { Carousel } from "react-bootstrap";

const GrayBorder = styled.hr`
  position: absolute;
  width: 78%;
  border-top: 1.8px dashed#000D09;
  top: 2px;
  margin: 0px;
  margin-left: 15px;
`;

export const SlideShow: React.FC<ISlideShowProps> = (props) => {
  const { slides } = props;
  const chunks = chunk(slides, 3);

  return (
    <>
      <Carousel interval={3000} indicators={false} controls={false}>
        {chunks.map((items) => {
          return (
            <Carousel.Item>
              <GrayBorder className="d-none d-md-block" />
              <div className="row justify-content-between">
                {items.map((item, itemIndex) => {
                  return <Slide key={itemIndex} {...item} />;
                })}
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

{
  /* <div
  id="myCarousel"
  className="carousel slide"
  data-ride="carousel"
  data-interval="3000"
>
  <div className="carousel-inner">
    {chunks.map((items, index) => {
      return (
        <div
          key={index}
          className={clsx("carousel-item ", { active: index === 0 })}
        >
          <GrayBorder />
          <div className="row">
            {items.map((item, itemIndex) => {
              return (
                <Slide
                  key={itemIndex}
                  isLoading={item.isLoading}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </div>
        </div>
      );
    })}
    <a
      className="carousel-control-prev"
      href="#myCarousel"
      role="button"
      data-slide="prev"
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="carousel-control-next"
      href="#myCarousel"
      role="button"
      data-slide="next"
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div> */
}
