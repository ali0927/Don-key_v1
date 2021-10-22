import React from "react";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { StaticImage } from "gatsby-plugin-image";

const Root = styled.section`
  background: #ffff;
  padding: 3rem 0;
  padding-bottom: 1rem;
  min-height: 450px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${breakPoints.md}) {
    padding: 6rem 0;
  }
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
  color: #423F15;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 25px;
  }
`;

export const PartnerSection: React.FC = () => {
  return (
    <>
      <Root>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 ">
              <StyledP className="mb-5 mb-sm-0 text-center text-sm-left">
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
              </div>
            </div>
          </div>
        </div>
      </Root>
    </>
  );
};
