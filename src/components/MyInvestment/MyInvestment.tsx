import { useInvestedAmount } from "hooks/useInvestedAmount";

export const MyInvestment = ({ poolAddress }: { poolAddress: string }) => {
  
  const {isReady, investedAmmount} = useInvestedAmount(poolAddress);

  if (!isReady) {
    return <>-</>;
  }
  return <>{investedAmmount} BUSD</>;
};