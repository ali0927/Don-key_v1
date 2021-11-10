import {
  captureException,
  formatNum,
  nFormatter,
  getPoolContract,
  getTokenPrice,
} from "helpers";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getWeb3 } from "don-components";
import { useUSDViewBool } from "contexts/USDViewContext";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useMediaQuery } from "@material-ui/core";
import PositiveIcon from "images/positiveicon.png";
import NegativeIcon from "images/negativeicon.png";
import { DataTable } from "./DataTable/DataTable";
import { theme } from "theme";
import { InvestorAccordion } from "./InvestorAccordion";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { filter } from "lodash";

const INVESTORS_QUERY_DATA = gql`
  query AllInvestors {
    investors(first: 1000, where: { isInvested: true }) {
      address
      isInvested
      timestamp
    }
  }
`;

const usdAmount = (amount: string, amountN: number) => {
  if (amountN > 0) {
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
        ${amount}{" "}
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
        ${amount}{" "}
      </>
    );
  }
};

const busdAmount = (amount: string, symbol: string, amountN: number) => {
  if (amountN > 0) {
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
        ? usdAmount(formatNum(amountInUSD), Number(formatNum(amountInUSD)))
        : busdAmount(formatNum(amount), symbol, Number(formatNum(amount)))}
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
        ? usdAmount(
            nFormatter(formatNum(amountInUSD)).toString(),
            Number(formatNum(amountInUSD))
          )
        : busdAmount(
            nFormatter(formatNum(amount)).toString(),
            symbol,
            Number(formatNum(amount))
          )}
    </>
  ) : (
    <>
      {isUSD
        ? `$${nFormatter(formatNum(amountInUSD))}`
        : `${nFormatter(formatNum(amount))} ${symbol}`}
    </>
  );
};

export const hideAddress = (item: string,{ mask = "xxxxxxxxxxxxxxxxxxxxx", size = 10} = {}) => {
  return (
    item.slice(0, size) +
     mask +
    item.slice(item.length - size, item.length)
  );
};

export const hideAddressForMobile = (item: string) => {
  return item.slice(0, 4) + "xxxxx" + item.slice(item.length - 4, item.length);
};

type Investors = {
  address: string;
  timestamp: string;
};

export const InvestorListTable = ({
  poolAddress,
  chainId,
  graphUrl,
  poolVersion,
  blacklist,
}: {
  poolAddress: string;
  chainId: number;
  graphUrl: string;
  poolVersion: number;
  blacklist: { address: string }[];
}) => {
  const theGraphClient = useMemo(() => {
    return new ApolloClient({
      uri: graphUrl,
      cache: new InMemoryCache(),
    });
  }, [graphUrl]);

  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<Investors[]>([]);

  const [tokenPrice, setTokenPrice] = useState<string | null>(null);
  const [pool, setPool] = useState<any | null>(null);
  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);
  const { data } = useQuery(INVESTORS_QUERY_DATA, {
    client: theGraphClient,
  });
  const web3 = getWeb3(chainId);

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

  useEffect(() => {
    if (data) {
      if (data && data.investors.length > 0) {
        if(blacklist.length > 0){
          const filteredItems = filter(
            data.investors,
            (item) =>
              blacklist.findIndex((bl) => bl.address.trim().toLowerCase() === item.address.trim().toLowerCase()) === -1
          );
          setInvestments(filteredItems);
        }else {
          setInvestments(data.investors);
        }
      }
    }
  }, [data]);

  if (poolAddress === "0x072a5DBa5A29ACD666C4B36ab453A5ed015589d2") {
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
          investorsList={investments}
          poolAddress={poolAddress}
          chainId={chainId}
          tokenPrice={tokenPrice}
          pool={pool}
          poolVersion={poolVersion}
        />
      )}

      {isDesktop && pool && tokenPrice && data && (
        <DataTable
          poolVersion={poolVersion}
          investorsList={investments}
          poolAddress={poolAddress}
          chainId={chainId}
          tokenPrice={tokenPrice}
          pool={pool}
        />
      )}
    </>
  );
};
