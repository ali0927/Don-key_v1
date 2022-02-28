import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";
import { useCallback, useState } from "react";
import { GridBackground } from "components/GridBackground";
import { FarmerStrategies } from "components/FarmerStrategies";
import { FarmerBio } from "components/FarmerBio";
import { IFarmerInter } from "interfaces";

export default function FarmerTemplate({
  pageContext: { data, tvl },
}: {
  pageContext: {
    data: { farmers: IFarmerInter[] };
    tvl: string;
  };
}) {
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
          <NavBar variant="loggedin" />
          <FarmerBio tvl={tvl} farmer={data.farmers[0]} investorCount={0} />
          <GridBackground>
           
            <FarmerStrategies isLoaded farmer={data.farmers[0]} />
          </GridBackground>
          <Footer />
        </div>
      </RefreshProvider>
    </USDViewProvider>
  );
}
