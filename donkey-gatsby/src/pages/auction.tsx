import { Footer } from "components/Footer";
import { NavBar } from "components/Navbar";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { theme } from "theme";
import './auction.css';

const Header = styled.div`
  background-color: ${theme.palette.background.yellow};
  position: relative;
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 266px;
    background-color: ${theme.palette.background.yellow};
    height: 300px;
    width: 100%;
    border-bottom-left-radius: 90% 25%;
    border-bottom-right-radius: 90% 25%;
    z-index: 0;
  }
`;



const Comp = (props: { className?: string }) => {
  return (
    <StaticImage
      className={props.className}
      src="../images/bug-report/fix-donkey.png"
      alt="Bug Reporter Donkey"
      layout="fullWidth"
    />
  );
};



export default function Auction() {

  return (
    <>
      <NavBar />
      <Header>
        <div className="boxed ">

        </div>
      </Header>
 
      <Footer />
    </>
  );
}
