import * as React from "react";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { StaticImage } from "gatsby-plugin-image";

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
    font-size: 23px;
  }
`;

const InvestorSection = styled.section`
  background: #f3f3f3;
  padding: 3rem 0;
  min-height: 559px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${breakPoints.md}) {
    padding: 6rem 0;
  }
`;

export const RoundedCompletedSection: React.FC = () => {
  return (
    <>
      <InvestorSection>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 ">
              <StyledP className="mb-0  mb-md-5 text-center text-sm-left">
                Strategic Investment Round Completed
              </StyledP>
            </div>
            <div className="col-md-9 mt-5 mt-md-0">
              <div className="row">
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/banter.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/morningstar.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/au21.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/iangles1.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/spark.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/solidity.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/blackedge.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/gbv.png"
                    className="mb-5"
                    height={60}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </InvestorSection>
    </>
  );
};
