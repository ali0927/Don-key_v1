import BigNumber from "bignumber.js";
import {
  captureException,
  formatNum,
  nFormatter,
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
import { useMediaQuery } from "@material-ui/core";

import PositiveIcon from "images/positiveicon.png";
import NegativeIcon from "images/negativeicon.png";
import { DataTable } from "./DataTable/DataTable";
import { theme } from "theme";
import { InvestorAccordion } from "./InvestorAccordion";

const usdAmount = (amount: number) => {
  if (amount > 0) {
    return (
      <>
        {" "}
        <img
          src={PositiveIcon}
          style={{
            width: 10,
            height: 10,
          }}
        />{" "}
        {amount}{" "}
      </>
    );
  } else {
    return (
      <>
        {" "}
        <img
          src={NegativeIcon}
          style={{
            width: 10,
            height: 10,
          }}
        />{" "}
        {amount}{" "}
      </>
    );
  }
};

const busdAmount = (amount: number, symbol: string) => {
  if (amount > 0) {
    return (
      <>
        {" "}
        <img
          src={PositiveIcon}
          style={{
            width: 10,
            height: 10,
          }}
        />{" "}
        {amount} {symbol}
      </>
    );
  } else {
    return (
      <>
        {" "}
        <img
          src={NegativeIcon}
          style={{
            width: 10,
            height: 10,
          }}
        />{" "}
        {amount} {symbol}
      </>
    );
  }
};

export const ShowAmount = ({
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

  return icon ? (
    <>
      {isUSD
        ? usdAmount(Number(formatNum(amountInUSD)))
        : busdAmount(Number(formatNum(amount)), symbol)}
    </>
  ) : (
    <>
      {isUSD ? `$${formatNum(amountInUSD)}` : `${formatNum(amount)} ${symbol}`}
    </>
  );
};

export const ShowAmountMobile = ({
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

  return icon ? (
    <>
      {isUSD
        ? usdAmount(Number(nFormatter(formatNum(amountInUSD))))
        : busdAmount(Number(nFormatter(formatNum(amount))), symbol)}
    </>
  ) : (
    <>
      {isUSD ? `$${nFormatter(formatNum(amountInUSD))}` : `${nFormatter(formatNum(amount))} ${symbol}`}
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
  return item.slice(0, 4) + "xxxxx" + item.slice(item.length - 4, item.length);
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
  const [tokenPrice, setTokenPrice] = useState<string | null>(null);
  const [pool, setPool] = useState<any | null>(null);
  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);

  const web3 = getWeb3(chainId);
  const { isUSD } = useUSDViewBool();
  // useEffect(() => {
  //   (async () => {
  //     if (data) {
  //       setLoading(true);
  //       const investmentList: InvestorList = [];
  //       try {
  //         const investors = data.data;
  //         const tokenPrice = await getTokenPrice(web3, poolAddress);
  //         const pool = await getPoolContract(web3, poolAddress, 2);
  //         await Promise.all(
  //           investors.map(async (investor: any) => {
  //             const address = investor.from_walletaddress;
  //             const isInvested = await pool.methods.isInvestor(address).call();
  //             if (isInvested) {
  //               const [
  //                 initialInvestment,
  //                 initialInvestmentInUSD,
  //                 claimableAmount,
  //               ] = await Promise.all([
  //                 calculateInitialInvestment(web3, poolAddress, address),
  //                 calculateInitialInvestmentInUSD(web3, poolAddress, address),
  //                 getAmount(web3, poolAddress, address),
  //               ]);
  //               const initiailInvestmentBN = new BigNumber(initialInvestment);
  //               const claimableAmountBN = new BigNumber(claimableAmount);
  //               const investmentInUSD = new BigNumber(initialInvestmentInUSD);
  //               const claimableAmountInUSD =
  //                 claimableAmountBN.multipliedBy(tokenPrice);
  //               const profit = claimableAmountBN.minus(initiailInvestmentBN);
  //               const profitInUSD = claimableAmountInUSD.minus(investmentInUSD);

  //               investmentList.push({
  //                 address,
  //                 claimableAmount: claimableAmount,
  //                 claimableAmountInUSD: claimableAmountInUSD.toFixed(),
  //                 initialInvestment: initialInvestment,
  //                 initialInvestmentInUSD: investmentInUSD.toFixed(),
  //                 profitLoss: profit.toFixed(),
  //                 profitLossInUSD: profitInUSD.toFixed(),
  //                 duration: moment
  //                   .duration(moment().diff(moment(investor.date_created)))
  //                   .humanize(),
  //               });
  //             }
  //           })
  //         );
  //         setInvestments(investmentList);
  //       } catch (e) {
  //         captureException(e, "InvestorListTable");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   })();
  // }, [data, isUSD]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const tokenPrice = await getTokenPrice(web3, poolAddress);
        const pool = await getPoolContract(web3, poolAddress, 2);
        setTokenPrice(tokenPrice);
        setPool(pool);
      } catch (e) {
        captureException(e, "InvestorListTable");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // const sortedInvestments = useMemo(() => {
  //   return sortBy(investments, (o) =>
  //     new BigNumber(isUSD ? o.profitLossInUSD : o.profitLoss).toNumber()
  //   ).reverse();
  // }, [investments, isUSD]);
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

  return (
    <>
      {!isDesktop && pool && tokenPrice && data && (
        <InvestorAccordion
          investorsList={data.data}
          poolAddress={poolAddress}
          chainId={chainId}
          tokenPrice={tokenPrice}
          pool={pool}
        />
      )}

      {isDesktop && pool && tokenPrice && data && (
        <DataTable
          investorsList={data.data}
          poolAddress={poolAddress}
          chainId={chainId}
          tokenPrice={tokenPrice}
          pool={pool}
        />
      )}
    </>
  );
};
