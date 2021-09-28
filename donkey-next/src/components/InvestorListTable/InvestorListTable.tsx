import BigNumber from "bignumber.js";
import {
  TableResponsive,
  Table,
  TableHead,
  TableRow,
  TableHeading,
  TableBody,
  TableData,
} from "components/Table";
import {
  calculateInitialInvestment,
  calculateInitialInvestmentInUSD,
  captureException,
  formatNum,
  getAmount,
  getPoolContract,
  getTokenPrice,
} from "helpers";
import {
  MobileHeading,
  MobileCaption,
  MobileCaption1,
} from "./AccordionComponents";

import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getWeb3 } from "don-components";
import { useUSDViewBool } from "contexts/USDViewContext";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { sortBy } from "lodash";
import moment from "moment";

import styled from "styled-components";
import { PositiveIcon, NegativeIcon } from 'icons';

const AccordionGrid = styled.div`
  display: table;
  width: 33%;
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
`;

const AccordionHeaderSection = styled.div`
  background: transparent;
  border-bottom: none;
`;


const AccordionBody = styled.div`
  padding-top: 0;
`;

const usdAmount = ( amount:number ) => {
  if(amount > 0) {
     return(
      <> <PositiveIcon/> {amount} </>
     ) 
 }
else {
  return <> <NegativeIcon/> {amount} </>
  }
}

const busdAmount = ( amount:number , symbol:string ) => {
  if(amount > 0) {
    return(
      <>  <PositiveIcon/> {amount} {symbol}</>
     )
 }
else {
  return(
    <>  <NegativeIcon/> {amount} {symbol}</>
   )
  }
}

const ShowAmount = ({
  amount,
  amountInUSD,
  poolAddress,
  chainId,
  icon = false,
}: {
  poolAddress: string;
  amount: string;
  amountInUSD: string;
  chainId: number;
  icon?: boolean;
}) => {
  const { isUSD } = useUSDViewBool();
  const web3 = getWeb3(chainId);
  const { symbol, loading } = usePoolSymbol(poolAddress, web3);
  if (loading) {
    return <>-</>;
  }

  return (
    icon
    ?
    <>
    { isUSD ? usdAmount(Number(formatNum(amountInUSD))) : busdAmount(Number(formatNum(amount)), symbol) }
    </>
    :
    <>
    {isUSD ? `$${formatNum(amountInUSD)}` : `${formatNum(amount)} ${symbol}`}
    </>
  );
};

export const hideAddress = (item: string) => {
  return (
    item.slice(0, 10) +
    "xxxxxxxxxxxxxxxxxxxxx" +
    item.slice(item.length - 10, item.length)
  );
};

export const hideAddressForMobile = (item: string) => {
  return (
    item.slice(0, 4) +
    "xxxxx" +
    item.slice(item.length - 4, item.length)
  );
};

type InvestorList = {
  address: string;
  initialInvestment: string;
  initialInvestmentInUSD: string;
  claimableAmount: string;
  claimableAmountInUSD: string;
  profitLoss: string;
  profitLossInUSD: string;
  duration: string;
}[];

export const InvestorListTable = ({
  poolAddress,
  chainId,
}: {
  poolAddress: string;
  chainId: number;
}) => {
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<InvestorList>([]);
  const [{ data }] = useAxios(`/api/v2/investments/${poolAddress}`);
  const web3 = getWeb3(chainId);
  const { isUSD } = useUSDViewBool();
  useEffect(() => {
    (async () => {
      if (data) {
        setLoading(true);
        const investmentList: InvestorList = [];
        try {
          const investors = data.data;
          const tokenPrice = await getTokenPrice(web3, poolAddress);
          const pool = await getPoolContract(web3, poolAddress, 2);
          await Promise.all(
            investors.map(async (investor: any) => {
              const address = investor.from_walletaddress;
              const isInvested = await pool.methods.isInvestor(address).call();
              if (isInvested) {
                const [
                  initialInvestment,
                  initialInvestmentInUSD,
                  claimableAmount,
                ] = await Promise.all([
                  calculateInitialInvestment(web3, poolAddress, address),
                  calculateInitialInvestmentInUSD(web3, poolAddress, address),
                  getAmount(web3, poolAddress, address),
                ]);
                const initiailInvestmentBN = new BigNumber(initialInvestment);
                const claimableAmountBN = new BigNumber(claimableAmount);
                const investmentInUSD = new BigNumber(initialInvestmentInUSD);
                const claimableAmountInUSD =
                  claimableAmountBN.multipliedBy(tokenPrice);
                const profit = claimableAmountBN.minus(initiailInvestmentBN);
                const profitInUSD = claimableAmountInUSD.minus(investmentInUSD);

                investmentList.push({
                  address,
                  claimableAmount: claimableAmount,
                  claimableAmountInUSD: claimableAmountInUSD.toFixed(),
                  initialInvestment: initialInvestment,
                  initialInvestmentInUSD: investmentInUSD.toFixed(),
                  profitLoss: profit.toFixed(),
                  profitLossInUSD: profitInUSD.toFixed(),
                  duration: moment
                    .duration(moment().diff(moment(investor.date_created)))
                    .humanize(),
                });
              }
            })
          );
          setInvestments(investmentList);
        } catch (e) {
          captureException(e, "InvestorListTable");
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [data, isUSD]);

  const sortedInvestments = useMemo(() => {
    return sortBy(investments, (o) =>
      new BigNumber(isUSD ? o.profitLossInUSD : o.profitLoss).toNumber()
    ).reverse();
  }, [investments, isUSD]);
  if (poolAddress === "0x072a5DBa5A29ACD666C4B36ab453A5ed015589d2") {
    // disabled vfat old pool
    return null;
  }
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: 400 }}
      >
        <Spinner animation="border" color="dark" />
      </div>
    );
  }
  if (investments.length === 0) {
    return null;
  }

  return (
    <>
     <div
      className="accordion accordion-flush d-md-block d-lg-none"
      id="accordionFlushExample">

        {sortedInvestments.map((item, index) => (
          <>
           <AccordionItem className="card">
              <AccordionHeaderSection className="card-header" id={`flush-heading` + index}>
                <AccordionHeader
                  className="d-flex w-100 accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target={"#flush-collapse-" + index}
                  aria-expanded="false"
                  aria-controls={"flush-collapse-" + index}
                >
                  <AccordionGrid>
                    <MobileCaption>Investor</MobileCaption>
                    <MobileHeading>{hideAddress(item.address).slice(0,10)}...</MobileHeading>
                  </AccordionGrid>

                  <AccordionGrid>
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
                  </AccordionGrid>

                  <AccordionGrid>
                    <MobileCaption>Duration</MobileCaption>
                    <MobileHeading>{item.duration} ago</MobileHeading>
                  </AccordionGrid>
                </AccordionHeader>
              </AccordionHeaderSection>
              <div
                id={"flush-collapse-" + index}
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <AccordionBody className="accordion-body">
                  <div className="d-flex w-100 justify-content-between">
                    <MobileCaption1>Invested Amount</MobileCaption1>
                        <MobileHeading>
                          <ShowAmount
                            chainId={chainId}
                            amount={item.initialInvestment}
                            amountInUSD={item.initialInvestmentInUSD}
                            poolAddress={poolAddress}
                          />
                        </MobileHeading>
                      </div>
                      <div className="d-flex w-100 justify-content-between">
                        <MobileCaption1>Claimable Amount</MobileCaption1>
                        <MobileHeading>
                          <ShowAmount
                            chainId={chainId}
                            amount={item.claimableAmount}
                            amountInUSD={item.claimableAmountInUSD}
                            poolAddress={poolAddress}
                          />
                        </MobileHeading>
                  </div>
                </AccordionBody>
              </div>
              </AccordionItem>
          </>
        ))}

    </div>
      <TableResponsive className='d-none d-lg-block d-xl-block'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeading style={{ textAlign: "center" }}>
                Investor
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Invested Amount
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Claimable Amount
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Profit/Loss
              </TableHeading>
              <TableHeading style={{ textAlign: "center" }}>
                Duration
              </TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedInvestments.map((item) => {
              return (
                <TableRow key={item.address}>
                  <TableData style={{ textAlign: "center" }}>
                    {hideAddress(item.address)}
                  </TableData>
                  <TableData style={{ textAlign: "center" }}>
                    <ShowAmount
                      chainId={chainId}
                      amount={item.initialInvestment}
                      amountInUSD={item.initialInvestmentInUSD}
                      poolAddress={poolAddress}
                    />
                  </TableData>

                  <TableData style={{ textAlign: "center" }}>
                    <ShowAmount
                      chainId={chainId}
                      amount={item.claimableAmount}
                      amountInUSD={item.claimableAmountInUSD}
                      poolAddress={poolAddress}
                    />
                  </TableData>
                  <TableData style={{ textAlign: "center" }}>
                    <ShowAmount
                      chainId={chainId}
                      amount={item.profitLoss}
                      amountInUSD={item.profitLossInUSD}
                      poolAddress={poolAddress}
                    />
                    {/* <TotalProfitLoss poolAddress={poolAddress} address={item} /> */}
                  </TableData>
                  <TableData style={{ textAlign: "center" }}>
                    {item.duration} ago
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableResponsive>
    </>
  );
};