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
import { hideAddress, ShowAmount } from "../InvestorListTable";
import { IInvestorAccordionProps } from "./interfaces";
import React from "react";
import { useInvestments } from "../hooks";
import { Spinner } from "react-bootstrap";

export const InvestorAccordion: React.FC<IInvestorAccordionProps> = (props) => {
  const { chainId, pool, poolAddress, tokenPrice } = props;

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
  });

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const totalPages = Math.ceil(props.investorsList.length / rowsLimit);

  if (props.investorsList.length === 0) {
    return null;
  }

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
                    <AccordionHeadingText>
                      <MobileCaption>Investor</MobileCaption>
                      <MobileHeading>
                        {hideAddress(item.address).slice(0, 10)}...
                      </MobileHeading>
                    </AccordionHeadingText>
                    <AccordionHeadingText>
                      <MobileCaption>Profit/Loss</MobileCaption>
                      <MobileHeading>
                        <ShowAmount
                          chainId={chainId}
                          amount={item.profitLoss}
                          amountInUSD={item.profitLossInUSD}
                          poolAddress={poolAddress}
                          icon={true}
                        />
                      </MobileHeading>
                    </AccordionHeadingText>
                    <AccordionHeadingText>
                      <MobileCaption>Duration</MobileCaption>
                      <MobileHeading>{item.duration} ago</MobileHeading>
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
                          <ShowAmount
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
                          <ShowAmount
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
