import { useCallback, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { withWeb3 } from "hoc";
import styled from "styled-components";
import { theme } from "theme";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";
import { InvestmentsPage } from "Pages/InvestmentsPage/InvestmentsPage";

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

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

          <Footer />
        </div>
      </RefreshProvider>
    </USDViewProvider>
  );
});
