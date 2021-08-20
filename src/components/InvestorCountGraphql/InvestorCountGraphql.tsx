import { gql, useQuery } from "@apollo/client";
import { getPoolContract } from "helpers";
import { useEffect, useRef, useState } from "react";
import { useWeb3 } from "don-components";
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
}: {
  poolAddresses: string[];
  refresh?: boolean;
}) => {
  const [investorCount, setInvestorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const web3 = useWeb3();

  const fetchCount = async () => {
    const promises = poolAddresses.map(async (item) => {
      const pool = await getPoolContract(web3, item, 2);
      try {
        const count = await pool.methods.getInvestorCount().call();
        return count;
      } catch (e) {
        return 0;
      }
    });
    const allCounts = await Promise.all(promises);
    const count = allCounts.reduce((prev, next) => {
      return prev.plus(next);
    }, new BigNumber(0));
    setInvestorCount(count.toFixed(0));
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
