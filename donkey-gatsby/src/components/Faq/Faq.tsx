import React from "react";
import { NavBar } from "../Navbar";
import { MainSection } from "./MainSection/MainSection";
import { Footer } from "../Footer";
import { StaticImage } from "gatsby-plugin-image";
import { theme } from "theme";
import styled from "styled-components";

const ImageWrapper = styled.div`
  text-align: right;
  position: relative;
  margin-top: -40px;
  ${theme.mediaQueries.sm.up} {
    margin-top: -250px;
  }
  /* z-index: 10; */
  img {
    width: 800px;
    height: 500px;

    /* z-index: 10; */
  }

  @media (max-width: 992px) {
    img {
      margin-top:23px;
      width: 100%;
      height: 100%;
      z-index:0;
    }
    
  }
  @media (max-width: 575px) {
    img {
      margin-top:0px;
      width: 100%;
      height: 100%;
      z-index:0;
    }
    
  }
`;

export const Faq = () => {
  return (
    <div style={{ background: "#F5F5F5" }}>
      <NavBar />
      <MainSection />
      <ImageWrapper>
        <StaticImage
          className="d-inline-block text-right"
          src="../../images/donkeyImageFAQ.png"
          alt="ImageNotFound"
          objectFit="contain"
        />
      </ImageWrapper>
      <Footer />
    </div>
  );
};
