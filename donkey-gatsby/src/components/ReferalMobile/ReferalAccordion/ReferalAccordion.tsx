import React from "react";
import styled from "styled-components";
import { IReferalAccordionProps } from "./Interfaces";
import { fixUrl } from "helpers";
import { hideAddressForMobile } from "components/InvestorListTable/InvestorListTable";
import { ShowAmount } from "../ShowAmount";
import { navigate } from "gatsby-link";
import {
  Accordion,
  AccordionCard,
  AccordionCardHeader,
  AccordionHeaderRow,
  AccordionDetails,
  AccordionHeadingText,
  AccordionCaptionText,
} from "don-components";

export const StyledMobileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 5px;
`;

export const ReferalAccordion: React.FC<IReferalAccordionProps> = (props) => {
  const { referalState } = props;

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    navigate("/dashboard/farmer/" + poolAddress);
  };

  return (
    <Accordion id="accordion-referal" className=" d-md-block d-lg-none">
      {referalState.map((investment, index) => {
        return (
          <>
            <AccordionCard key={investment.GUID}>
              <AccordionCardHeader
                index={index}
                // className="d-flex w-100 accordion-button collapsed"
              >
                <div className="d-flex">
                  <div className="d-flex align-items-center">
                    <StyledMobileImage
                      onClick={RedirectToFarmerProfile(investment.slug)}
                      src={fixUrl(investment.farmerImage)}
                    />
                  </div>

                  <div className="d-flex align-items-center ml-4">
                    <AccordionHeadingText>
                      {investment.farmerName}
                    </AccordionHeadingText>
                  </div>
                </div>
              </AccordionCardHeader>
              <AccordionHeaderRow>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <AccordionCaptionText>Invested</AccordionCaptionText>
                  <AccordionHeadingText>
                    <ShowAmount
                      amount={investment.referralInvestment}
                      poolAddress={investment.pool_address}
                      poolSymbol={investment.poolSymbol}
                    />
                  </AccordionHeadingText>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <AccordionCaptionText>Total Profit</AccordionCaptionText>
                  <AccordionHeadingText>
                    <ShowAmount
                      amount={investment.referralProfit}
                      poolAddress={investment.pool_address}
                      poolSymbol={investment.poolSymbol}
                    />
                  </AccordionHeadingText>
                </div>
              </AccordionHeaderRow>

              <AccordionDetails accordionId="accordion-referal" index={index}>
                <div className="d-block w-100">
                  <div className="d-flex align-items-center justify-content-between  mb-2">
                    <AccordionCaptionText>
                      Referral Address
                    </AccordionCaptionText>
                    <AccordionHeadingText>
                      {hideAddressForMobile(investment.wallet_address)}
                    </AccordionHeadingText>
                  </div>
                  <div className="d-flex align-items-center justify-content-between  mb-2">
                    <AccordionCaptionText>Rewards</AccordionCaptionText>
                    <AccordionHeadingText>
                      <ShowAmount
                        amount={investment.rewards}
                        poolAddress={investment.pool_address}
                        poolSymbol={"DON"}
                        isDon
                      />
                    </AccordionHeadingText>
                  </div>
                  <div className="d-flex align-items-center justify-content-between  mb-2">
                    <AccordionCaptionText>Materialized </AccordionCaptionText>
                    <AccordionHeadingText>
                      {investment.expired ? "Yes" : "No"}
                    </AccordionHeadingText>
                  </div>
                </div>
              </AccordionDetails>
            </AccordionCard>
          </>
        );
      })}
    </Accordion>
  );
};
