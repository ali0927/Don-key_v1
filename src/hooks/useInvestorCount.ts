import { useAxios } from "./useAxios";


export const useInvestorCount = (farmerId: string, manual= false) => {
  const [{ loading, data }, refetch] = useAxios(
    `/api/v2/farmer/${farmerId}/investors/count`,
    { useCache: false , manual}
  );

  return {
    loading,
    count: data?.data?.count,
    refetch
  };
};
