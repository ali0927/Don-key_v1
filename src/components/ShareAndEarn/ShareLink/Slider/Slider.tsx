import React from 'react';
import Banner2 from "./images/Banner2.png";
import styled from "styled-components";

const BannerImage = styled.img`
    height: 227px;
    width: 100%;
`;

const Heading = styled.h2`
  color: #fff;
  font-weight: 800;
`;

const BannerContentRoot = styled.div`
   background-image: linear-gradient(to left, rgba(255,255,255,0.1) 0, #000000 100%);
   top: 0;
   position: absolute;
   height: 100%;
   width: 100%;

`;

export const Slider: React.FC<any> = (props) => {

    return (
        <>
          <div>
              <div>

                  <BannerImage src={Banner2} alt="Banner image not found"/>
                  <div>
                      <Heading>Don-key</Heading>
                  </div>
              </div>

              <div>

              </div>

          </div>
        </>
    )
}