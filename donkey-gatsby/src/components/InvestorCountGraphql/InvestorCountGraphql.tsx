import { gql, useQuery } from "@apollo/client";
import { captureException, getPoolContract } from "helpers";
import { useEffect, useRef, useState } from "react";
import { getWeb3 } from "don-components";
import BigNumber from "bignumber.js";

const INVESTOR_COUNT_QUERY = gql`
  query investorCount($list: [String]) {
    investmentsConnection(where: { to_pooladdress_in: $list }) {
      aggregate {
        count
      }
    }
  }
`;

const useDidUpdate: typeof useEffect = (fn, deps) => {
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      fn();
    } else {
      hasMounted.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const InvestorCountGraphql = ({
  poolAddresses,
  refresh,
}: {
  poolAddresses: string[];
  refresh?: boolean;
}) => {
  const { data, loading, refetch } = useQuery(INVESTOR_COUNT_QUERY, {
    variables: {
      list: poolAddresses,
    },
  });
  useDidUpdate(() => {
    refetch();
  }, [refresh]);

  if (loading) {
    return <>-</>;
  }

  const count = data.investmentsConnection.aggregate.count;
  return <>{count}</>;
};

export const InvestorCountContract = ({
  poolAddresses,
  refresh,
  chainId,
}: {
  poolAddresses: string[];
  chainId: number;
  refresh?: boolean;
}) => {
  const [investorCount, setInvestorCount] = useState("-");
  const [loading, setLoading] = useState(true);
  const web3 = getWeb3(chainId);


  const fetchCount = async () => {
    const promises = poolAddresses.map(async (item) => {
      const pool = await getPoolContract(web3, item, 2);
      try {
        const count = await pool.methods.getInvestorCount().call();
        return count;
      } catch (e) {
        captureException(e, "InvestorCountContract");
        return "-";
      }
    });
    const allCounts = await Promise.all(promises);
    const count = allCounts.reduce((prev, next) => {
      if (next === "-" || prev === "-") {
        return "-";
      }
      return prev.plus(next);
    }, new BigNumber(0));
    setInvestorCount(typeof count === "string" ? count: count.toFixed(0));
    setLoading(false);
  };

  useEffect(() => {
    fetchCount();
  }, [refresh]);

  if (loading) {
    return <>-</>;
  }

  return <>{investorCount}</>;
};
