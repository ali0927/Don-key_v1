import * as React from "react";
import styled from "styled-components";
import banter from "./investorlogos/banter.svg";
import spark from "./investorlogos/spark.svg";
import morning from "./investorlogos/morningstar.svg";
import solidity from "./investorlogos/solidity.svg";
import au21 from "./investorlogos/au21.svg";
import blackEdage from "./investorlogos/blackedge.svg";
import moonwhale from "./investorlogos/moonwhile.svg";
import gbv from "./investorlogos/gbv.svg";
import { theme } from "theme";
const StyledP = styled.p`
  border-left: 3px solid #070602;
  font-size: 25px;
  font-weight: 300;
  padding: 0;
  line-height: 1.3;
  padding-left: 10px;
  margin: 0;
`;

const images = [
  [banter, spark],
  [morning, solidity],
  [au21, blackEdage],
  [moonwhale, gbv],
];

const InvestorSection = styled.section`
  background:${theme.palette.background.yellow};
  padding: 6rem 0;
`;

const ImageWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
img {
  height: 60px;
  object-fit: contain;
}
`

export const RoundedCompletedSection: React.FC = () => {
  return (
    <>
      <InvestorSection>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 ">
              <StyledP className="mb-5 mb-sm-0 text-center text-sm-left">Strategic Investment Round Completed</StyledP>
            </div>
            <div className="col-md-9">
              <div className="row">
                {images.map((item, i) => {
                  return (
                    <div className="col-md-3" key={i}>
                      {item.map((src, key) => {
                        return (
                          <ImageWrapper key={key} className="py-3">
                            <img className="img-fluid" alt="ImageNotFound" key={key} src={src} />
                          </ImageWrapper>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </InvestorSection>
    </>
  );
};
