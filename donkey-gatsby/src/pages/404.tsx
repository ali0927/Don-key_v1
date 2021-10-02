import React from "react";
import { NavBar } from "components/Navbar";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import PageNotFoundImage from "../images/404page.png";
import { theme } from "theme";
import { ButtonWidget } from "components/Button";
import { Footer } from "components/Footer";
import { navigate } from "gatsby-link";

const Heading = styled.h1`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 240px;
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 400px;
  }
`;

const Subheading = styled.h3`
  font-family: "Poppins";
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 32px;
  }
`;

const Paragraph = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

const Body = styled.div`
  background: ${theme.palette.background.yellow};
  padding-bottom: 64px; ;
`;

const DesktopHeaderContent = styled.div`
  width: 100%;
  margin-bottom: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    width: 84%;
    margin-bottom: 60px;
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 80%;
    margin-bottom: 0px;
  }
`;

const StyledButton = styled(ButtonWidget)`
  width: 100%;
  height: 48px;
  background: linear-gradient(
      117.9deg,
      rgba(255, 255, 255, 0.69) -51.59%,
      rgba(255, 255, 255, 0) 65.38%
    ),
    #000000;
  @media only screen and (min-width: ${breakPoints.md}) {
    width: 218px;
  }
`;

const StyledImage = styled.img`
  @media only screen and (max-width: ${breakPoints.sm}) {
    height: 253px;
    width: 253px;
  }
  @media only screen and (max-width: ${breakPoints.md}) {
    height: 191px !important;
    width: 191px;
  }
`;

const NotFoundPage: React.FC = () => {
  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <Body>
        <div className="container d-flex justify-content-center">
          <DesktopHeaderContent className="d-none  d-md-flex align-items-center justify-content-between">
            <Heading>4</Heading>
            <StyledImage
              className="img-fluid"
              src={PageNotFoundImage}
              alt="Image not found"
            />
            <Heading>4</Heading>
          </DesktopHeaderContent>
          <div className="d-flex d-md-none mb-5">
            <StyledImage
              className="img-fluid"
              src={PageNotFoundImage}
              alt="Image not found"
            />
          </div>
        </div>
        <div className="container">
          <Heading className="d-block d-md-none text-center">404</Heading>
          <Subheading className="mb-3">Oops, page not found!</Subheading>
          <Paragraph className="mb-5">
            Unfortunately this page has been moved or deleted
          </Paragraph>
          <div className="d-flex justify-content-center">
            <StyledButton varaint="contained" onClick={handleGoToHome}>
              Go to home
            </StyledButton>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
};

export default NotFoundPage;
