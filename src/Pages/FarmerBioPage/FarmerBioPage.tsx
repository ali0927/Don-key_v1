import { NavBar } from "components/Navbar/NavBar";
import { useCallback, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { useParams } from "react-router-dom";
import { FarmerBioFromApi } from "./FarmerBioFromApi";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";

export const FarmerBioPage = () => {
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
};
