import React from "react";
import styled from "styled-components";
import { fixUrl, formatNum, toEther } from "helpers";
import { hideAddressForMobile } from "components/InvestorListTable/InvestorListTable";

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
import { IPastReferrals } from "components/PastReferrals";
import { Spinner } from "react-bootstrap";
import BigNumber from "bignumber.js";

export const StyledMobileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 5px;
`;

const AnimationDiv = styled.div({
  minHeight: 500,
});
export const PastReferralAccordion = (props: {
  pastReferrals: IPastReferrals[];
  loading: boolean;
}) => {
  const { pastReferrals, loading } = props;

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    navigate("/dashboard/farmer/" + poolAddress);
  };

  
  if (loading) {
    return (
      <AnimationDiv className="d-flex align-items-center justify-content-center">
        <Spinner animation="border" />
      </AnimationDiv>
    );
  }
  if (pastReferrals?.length === 0) {
    return null;
  }
  return (
    <>
      <h4>Past Rewards</h4>
      <Accordion id="past-referal">
        {pastReferrals.map((investment, index) => {
          return (
            <>
              <AccordionCard key={investment.timeStamp}>
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
                <AccordionHeaderRow style={{ marginLeft: 13, marginRight: 13 }}>
                  <div className="d-flex align-items-center justify-content-between  mb-2">
                    <AccordionCaptionText>Reward in USD</AccordionCaptionText>
                    <AccordionHeadingText>
                      ${formatNum(toEther(investment.rewardAmountInUSD))}
                    </AccordionHeadingText>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <AccordionCaptionText>Reward in DON</AccordionCaptionText>
                    <AccordionHeadingText>
                      {formatNum(toEther(investment.rewardAmountInDon))} DON
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
                        {hideAddressForMobile(investment.from)}
                      </AccordionHeadingText>
                    </div>

                    <div className="d-flex align-items-center justify-content-between  mb-2">
                      <AccordionCaptionText>Tier </AccordionCaptionText>
                      <AccordionHeadingText>
                        {investment.tier}
                      </AccordionHeadingText>
                    </div>
                    <div className="d-flex align-items-center justify-content-between  mb-2">
                      <AccordionCaptionText>Tier Commission </AccordionCaptionText>
                      <AccordionHeadingText>
                        {new BigNumber(investment.tierPer).dividedBy(100).toFixed(0)} %
                      </AccordionHeadingText>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <AccordionCaptionText>User Profit</AccordionCaptionText>
                      <AccordionHeadingText>
                        ${formatNum(toEther(investment.profitValue))}
                      </AccordionHeadingText>
                    </div>
                  </div>
                </AccordionDetails>
              </AccordionCard>
            </>
          );
        })}
      </Accordion>
    </>
  );
};
