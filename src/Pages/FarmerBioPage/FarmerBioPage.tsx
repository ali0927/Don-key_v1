import { NavBar } from "components/Navbar/NavBar";
import { useCallback, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { withWeb3 } from "hoc";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { IStoreState } from "interfaces";
import { FarmerStrategies } from "./FarmerStrategies";
import { FarmerBio } from "./FarmerBio";
import { FarmerBioFromApi } from "./FarmerBioFromApi";
import { GridBackground } from "components/GridBackground";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";

export const FarmerBioPage = withWeb3(() => {
  const { id: farmerId } = useParams<{ id: string }>();
  const [isInUsd, setIsInUsd] = useState(false);

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  return (
    <USDViewProvider
      value={{
        isUSD:
          farmerId === "e3ce43a6-963c-476a-bb3f-c07b7434f911"
            ? !isInUsd
            : isInUsd,
        toggle: toggleCurrency,
      }}
    >
      <RefreshProvider>
        <div style={{ background: "#F4F4F4" }}>
          <NavBar variant="loggedin" />
          <FarmerBioFromApi farmerId={farmerId} />
          <Footer />
        </div>
      </RefreshProvider>
    </USDViewProvider>
  );
});
