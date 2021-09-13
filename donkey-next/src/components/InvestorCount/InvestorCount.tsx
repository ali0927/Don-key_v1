import { useInvestorCount } from "hooks/useInvestorCount";
import { useEffect } from "react";

export const InvestorCount = ({
  farmerId,
  refresh,
}: {
  farmerId: string;
  refresh: boolean;
}) => {
  const { loading, count, refetch } = useInvestorCount(farmerId, true);
  useEffect(() => {
    refetch();
  }, [refresh]);
  if (loading) {
    return <>-</>;
  }
  return <>{count}</>;
};
