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
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getWeb3 } from "don-components";
import { useUSDViewBool } from "contexts/USDViewContext";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { sortBy } from "lodash";
import moment from "moment";

const ShowAmount = ({
  amount,
  amountInUSD,
  poolAddress,
  chainId
}: {
  poolAddress: string;
  amount: string;
  amountInUSD: string;
  chainId: number;
}) => {
  const { isUSD } = useUSDViewBool();
  const web3 = getWeb3(chainId);
  const { symbol, loading } = usePoolSymbol(poolAddress, web3);
  if (loading) {
    return <>-</>;
  }

  return (
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






export const InvestorListTable = ({ poolAddress, chainId }: { poolAddress: string; chainId: number }) => {
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
          const tokenPrice = await getTokenPrice(
            web3,
            poolAddress
          );
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
  if(poolAddress === "0x072a5DBa5A29ACD666C4B36ab453A5ed015589d2"){
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
    <TableResponsive>
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
  );
};