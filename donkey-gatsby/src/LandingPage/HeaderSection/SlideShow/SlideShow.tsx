import React from "react";
import { Slide } from "./Slide";
import styled from "styled-components";
import { ISlideShowProps } from "./interfaces/ISlideShowProps";
import { chunk } from "lodash";
import { Carousel } from "react-bootstrap";

const GrayBorder = styled.hr`
  position: absolute;
  width: 70%;
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
              <GrayBorder/>
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

