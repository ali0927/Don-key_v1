import React from "react";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { StaticImage } from "gatsby-plugin-image";
import Certik from "./logos/certik.png";

const Section = styled.div`
  background: #ffff;
`;

const Root = styled.section`
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 3rem 0;
  padding-bottom: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    padding: 5rem 0;
    padding-bottom: 0px;
  }
`;

const StyledAnchor = styled.a`
color: #222;
text-decoration: none;
&:hover {
  color: #222;
  text-decoration: none;
}
`;

const Footer = styled.div`
  padding-bottom: 3rem;
`;

const StyledP = styled.p`
  border-left: 3px solid #070602;
  font-size: 23px;
  padding: 0;
  line-height: 1.3;
  padding-left: 10px;
  margin: 0;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-style: normal;
  font-weight: 800;
  color: #423f15;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 25px;
  }
`;

const FooterText = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const PartnerSection: React.FC = () => {
  return (
    <Section>
      <Root>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 ">
              <StyledP className="mb-0 mb-md-5 text-center text-sm-left">
                Partners
              </StyledP>
            </div>
            <div className="col-md-9 mt-5 mt-md-0">
              <div className="row">
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./logos/RIDOTTO.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/BakerySwap.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    className="mb-5"
                    src="./logos/Moonpot.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/Poolz.png"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/MARKET_ACROSS.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/Gero_Wallet.png"
                  />
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/Super_Farm.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/CYBERFI.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/scallop_logo.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    height={60}
                    className="mb-5"
                    src="./logos/fireblocks_logo.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Root>
      <Footer className="container">
        <div className="d-flex justify-content-center justify-content-md-end align-items-center">
          <StyledAnchor
            href="https://www.certik.org/projects/donkeyfinance"
            target="_blank"
            rel="noreferrer"
          >
            <FooterText>Audited by</FooterText>
            <img src={Certik} alt="Certik logo" />
          </StyledAnchor>
        </div>
      </Footer>
    </Section>
  );
};
