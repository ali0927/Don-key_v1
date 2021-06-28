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
  const farmer = useSelector((state: IStoreState) => state.farmer);

  const { id: farmerId } = useParams<{ id: string }>();
  const [isInUsd, setIsInUsd] = useState(false);
  const isCurrentFarmer = farmerId
    ? farmer?.GUID === farmerId
      ? true
      : false
    : true;

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  if (!farmer) {
    return null;
  }
  if (isCurrentFarmer && !farmer.poolAddress) {
    return <Redirect to="/dashboard/farmer/signup" />;
  }

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

          {isCurrentFarmer ? (
            <FarmerBio farmer={farmer} />
          ) : (
            <FarmerBioFromApi farmerId={farmerId} />
          )}
          <GridBackground>
            <FarmerStrategies
              farmerId={farmerId || (farmer?.GUID as string)}
              isInvestor={!isCurrentFarmer}
            />
          </GridBackground>

          <Footer />
        </div>
      </RefreshProvider>
    </USDViewProvider>
  );
});
