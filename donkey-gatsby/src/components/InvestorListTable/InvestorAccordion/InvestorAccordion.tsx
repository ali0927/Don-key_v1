import { Paginate } from "components/Paginate";
import {
  Accordion,
  AccordionDetails,
  AccordionHeadingText,
  AccordionCaptionText,
  AccordionCard,
  AccordionCardHeader,
} from "don-components";
import { MobileCaption, MobileHeading } from "../AccordionComponents";
import { hideAddress, ShowAmountMobile } from "../InvestorListTable";
import { IInvestorAccordionProps } from "./interfaces";
import React from "react";
import { useInvestments } from "../hooks";
import { Spinner } from "react-bootstrap";

import styled from "styled-components";
import { TableHeadingToolTip } from "../ToolTip";

const EqualDiv = styled.div`
  flex: 1;
`;

export const InvestorAccordion: React.FC<IInvestorAccordionProps> = (props) => {
  const { chainId, pool, poolAddress, tokenPrice, poolVersion } = props;

  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const rowsLimit = 50;

  const { investmentsList, loading } = useInvestments({
    investors: props.investorsList,
    chainId: chainId,
    currentPageNumber: pageNumber,
    pool: pool,
    tokenPrice: tokenPrice,
    poolAddress: poolAddress,
    rowsLimit,
    poolVersion,
  });

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const totalPages = Math.ceil(props.investorsList.length / rowsLimit);

  if (props.investorsList.length === 0) {
    return null;
  }

  const renderCaption = () => {
    const list = [
      {
        address: "0x66bf2E433c9B9aD56d952845F32201F727A8eD52",
        date: "22/10/2021",
      },
      {
        address: "0x965534Bd90e2A2135756f60F97798B833E461739",
        date: "18/10/2021",
      },
    ];
    const item = list.find(
      (item) => item.address.toLowerCase() === poolAddress.toLowerCase()
    );
    if (item) {
      return (
        <TableHeadingToolTip
          label="Duration"
          position="left"
          message={`Pool contract has been updated to V2 on ${item.date}. Investor list data
    is on-chain based.`}
        />
      );
    }
    return <>Duration</>;
  };

  return (
    <>
      {props.investorsList.length > rowsLimit && (
        <Paginate totalItems={totalPages} onChange={handlePageChange} />
      )}

      {!loading && (
        <div className="d-md-block d-lg-none" id="accordionExample">
          <Accordion id="InvestmentListaccordion">
            {investmentsList.map((item, index) => (
              <>
                <AccordionCard>
                  <AccordionCardHeader index={index}>
                    <EqualDiv>
                      <AccordionHeadingText>
                        <MobileCaption>Investor</MobileCaption>
                        <MobileHeading>
                          {hideAddress(item.address).slice(0, 10)}...
                        </MobileHeading>
                      </AccordionHeadingText>
                    </EqualDiv>
                    <EqualDiv>
                      <AccordionHeadingText>
                        <MobileCaption>Profit/Loss</MobileCaption>
                        <MobileHeading>
                          <ShowAmountMobile
                            chainId={chainId}
                            amount={item.profitLoss}
                            amountInUSD={item.profitLossInUSD}
                            poolAddress={poolAddress}
                            icon={true}
                          />
                        </MobileHeading>
                      </AccordionHeadingText>
                    </EqualDiv>

                    <AccordionHeadingText>
                      <MobileCaption>{renderCaption()}</MobileCaption>
                      <MobileHeading>{item.duration}</MobileHeading>
                    </AccordionHeadingText>
                  </AccordionCardHeader>
                  <AccordionDetails
                    accordionId="InvestmentListaccordion"
                    index={index}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <AccordionCaptionText>
                        Invested Amount
                      </AccordionCaptionText>
                      <div className="d-flex">
                        <AccordionHeadingText>
                          <ShowAmountMobile
                            chainId={chainId}
                            amount={item.initialInvestment}
                            amountInUSD={item.initialInvestmentInUSD}
                            poolAddress={poolAddress}
                          />
                        </AccordionHeadingText>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <AccordionCaptionText>
                        Claimable Amount
                      </AccordionCaptionText>
                      <div className="d-flex">
                        <AccordionHeadingText>
                          <ShowAmountMobile
                            chainId={chainId}
                            amount={item.claimableAmount}
                            amountInUSD={item.claimableAmountInUSD}
                            poolAddress={poolAddress}
                          />
                        </AccordionHeadingText>
                      </div>
                    </div>
                  </AccordionDetails>
                </AccordionCard>
              </>
            ))}
          </Accordion>
        </div>
      )}

      {loading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 200 }}
        >
          <Spinner animation="border" color="dark" />
        </div>
      )}
    </>
  );
};
