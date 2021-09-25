import React from "react";
import {
  MobileHeading,
  MobileCaption,
  StyledMobileImage,
} from "./AccordionComponents";
import styled from "styled-components";
import { IReferalAccordionProps } from "./Interfaces";
import { fixUrl } from "helpers";
import { hideAddressForMobile } from "components/InvestorListTable/InvestorListTable";
import { ShowAmount } from "../ShowAmount";
import { navigate } from "gatsby-link";

const HeaderRow = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const AccordionItem = styled.div`
  padding: 5px;
  :first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  }
`;

const AccordionHeader = styled.div`
  background: unset !important;
  box-shadow: none !important;
  color: inherit !important;
  //margin-bottom: 19px !important;
`;

const AccordionBody = styled.div`
  padding-top: 0;
`;

export const ReferalAccordion: React.FC<IReferalAccordionProps> = (props) => {
  const { referalState } = props;

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
   navigate("/dashboard/farmer/" + poolAddress);
  };

  return (
    <div
      className="accordion accordion-flush d-md-block d-lg-none"
      id="accordionFlushExample"
    >
      {referalState.map((investment, index) => {
        return (
          <>
            <AccordionItem key={investment.GUID} className="accordion-item">
              <div className="accordion-header" id={`flush-heading` + index}>
                <AccordionHeader
                  className="d-flex w-100 accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target={"#flush-collapse-" + index}
                  aria-expanded="false"
                  aria-controls={"flush-collapse-" + index}
                >
                  <div className="d-flex align-items-center">
                    <StyledMobileImage
                      onClick={RedirectToFarmerProfile(investment.slug)}
                      src={fixUrl(investment.farmerImage)}
                    />
                  </div>

                  <div className="d-flex align-items-center ml-4">
                    <MobileHeading>{investment.farmerName}</MobileHeading>
                  </div>
                </AccordionHeader>
                <HeaderRow>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <MobileCaption>Invested</MobileCaption>
                    <MobileHeading>
                      <ShowAmount
                        amount={investment.referralInvestment}
                        poolAddress={investment.pool_address}
                        poolSymbol={investment.poolSymbol}
                      />
                    </MobileHeading>
                  </div>
                  <div className="d-flex align-items-center justify-content-between  mb-2">
                    <MobileCaption>Total Profit</MobileCaption>
                    <MobileHeading>
                      <ShowAmount
                        amount={investment.referralProfit}
                        poolAddress={investment.pool_address}
                        poolSymbol={investment.poolSymbol}
                      />
                    </MobileHeading>
                  </div>
                </HeaderRow>
              </div>
              <div
                id={"flush-collapse-" + index}
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <AccordionBody className="accordion-body">
                  <div className="d-block w-100">
                    <div className="d-flex align-items-center justify-content-between  mb-2">
                      <MobileCaption>Referral Address</MobileCaption>
                      <MobileHeading>
                        {hideAddressForMobile(investment.wallet_address)}
                      </MobileHeading>
                    </div>
                    <div className="d-flex align-items-center justify-content-between  mb-2">
                      <MobileCaption>Rewards</MobileCaption>
                      <MobileHeading>
                        <ShowAmount
                          amount={investment.rewards}
                          poolAddress={investment.pool_address}
                          poolSymbol={"DON"}
                          isDon
                        />
                      </MobileHeading>
                    </div>
                    <div className="d-flex align-items-center justify-content-between  mb-2">
                      <MobileCaption>Materialized </MobileCaption>
                      <MobileHeading>
                        {investment.expired ? "Yes" : "No"}
                      </MobileHeading>
                    </div>
                  </div>
                </AccordionBody>
              </div>
            </AccordionItem>
          </>
        );
      })}
    </div>
  );
};
