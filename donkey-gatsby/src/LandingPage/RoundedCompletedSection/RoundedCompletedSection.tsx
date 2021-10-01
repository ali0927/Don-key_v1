import * as React from "react";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { StaticImage } from "gatsby-plugin-image";

const StyledP = styled.p`
  border-left: 3px solid #070602;
  font-size: 24px;
  padding: 0;
  line-height: 1.3;
  padding-left: 10px;
  margin: 0;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-style: normal;
  font-weight: 800;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 25px;
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
              <StyledP className="mb-5 mb-sm-0 text-center text-sm-left">
                Strategic Investment Round Completed
              </StyledP>
            </div>
            <div className="col-md-9 mt-5 mt-md-0">
              <div className="row">
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                    src="./investorlogos/banter.png"
                    height={60}
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/morningstar.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/au21.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/iangels.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/spark.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/solidity.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/blackedge.png"
                  />
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                  <StaticImage
                    layout="constrained"
                    alt="Investor"
                    quality={100}
                     height={60}
                     className="mb-4"
                    src="./investorlogos/gbv.png"
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
