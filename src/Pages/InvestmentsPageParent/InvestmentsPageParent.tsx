import { useCallback, useState } from "react";

import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";
import { InvestmentsPage } from "Pages/InvestmentsPage/InvestmentsPage";

export const InvestmentsPageParent = () => {
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
};
