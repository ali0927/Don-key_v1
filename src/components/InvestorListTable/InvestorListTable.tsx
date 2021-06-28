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
  getAmount,
  getPoolContract,
  getTokenAddress,
  getTokenPrice,
} from "helpers";
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useWeb3 } from "don-components";
import { formatNum } from "Pages/FarmerBioPage/DetailTable";
import {  useUSDViewBool } from "contexts/USDViewContext";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { sortBy } from "lodash";

const ShowAmount = ({
  amount,
  amountInUSD,
  poolAddress,
}: {
  poolAddress: string;
  amount: string;
  amountInUSD: string;
}) => {
  const { isUSD } = useUSDViewBool();
  const { symbol, loading } = usePoolSymbol(poolAddress);
  if (loading) {
    return <>-</>;
  }

  return <>{isUSD ? `$${formatNum(amountInUSD)}` : `${formatNum(amount)} ${symbol}`}</>;
};

const hideAddress = (item: string) => {
  return (
    item.slice(0, 10) +
    "xxxxxxxxxxxxxxxxxxxxx" +
    item.slice(item.length - 10, item.length)
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
}[];

export const InvestorListTable = ({ poolAddress }: { poolAddress: string }) => {
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<InvestorList>([]);
  const [{ data }] = useAxios(`/api/v2/investments/${poolAddress}`);
  const web3 = useWeb3();
  useEffect(() => {
    (async () => {
      if (data) {
        setLoading(true);
        const investmentList: InvestorList = [];
        try {
          const investors = data.data;
          const tokenPrice = await getTokenPrice(
            web3,
            await getTokenAddress(web3, poolAddress)
          );
          const pool = await getPoolContract(web3, poolAddress, 2);
          await Promise.all(
            investors.map(async (investor: any) => {
              const address = investor.from_walletaddress;
              const isInvested = await pool.methods.isInvestor(address).call();
              if (isInvested) {
                const [initialInvestment, initialInvestmentInUSD, claimableAmount] = await Promise.all([
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
                });
              }
            })
          );
          setInvestments(investmentList);
        } catch (e) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [data]);
  const {isUSD} = useUSDViewBool();

  const sortedInvestments = useMemo(() => {
    return sortBy(investments, o => new BigNumber(isUSD ? o.profitLossInUSD: o.profitLoss).toNumber()).reverse()
  }, [investments, isUSD])


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
                  <ShowAmount amount={item.initialInvestment} amountInUSD={item.initialInvestmentInUSD} poolAddress={poolAddress} />
                </TableData>

                <TableData style={{ textAlign: "center" }}>
                <ShowAmount amount={item.claimableAmount} amountInUSD={item.claimableAmountInUSD} poolAddress={poolAddress} />
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                <ShowAmount amount={item.profitLoss} amountInUSD={item.profitLossInUSD} poolAddress={poolAddress} />
                  {/* <TotalProfitLoss poolAddress={poolAddress} address={item} /> */}
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};
