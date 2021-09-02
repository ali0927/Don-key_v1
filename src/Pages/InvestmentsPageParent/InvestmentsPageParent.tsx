import { useCallback, useState } from "react";
import { withWeb3 } from "hoc";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";
import { InvestmentsPage } from "Pages/InvestmentsPage/InvestmentsPage";


export const InvestmentsPageParent = withWeb3(() => {
  const [isInUsd, setIsInUsd] = useState(false);

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  return (
    <USDViewProvider
      value={{
        isUSD: isInUsd,
        toggle: toggleCurrency,
      }}
    >
      <RefreshProvider>
        <div style={{ background: "#F4F4F4" }}>
          <InvestmentsPage />
        </div>
      </RefreshProvider>
    </USDViewProvider>
  );
});
