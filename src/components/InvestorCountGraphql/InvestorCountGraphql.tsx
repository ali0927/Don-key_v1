import { gql, useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";

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
