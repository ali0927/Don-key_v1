import { NavBar } from "components/Navbar/NavBar";
import { useEffect } from "react";
import { Footer } from "components/Footer/Footer";
import { withWeb3 } from "hoc";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { IStoreState } from "interfaces";
import { FarmerStrategies } from "./FarmerStrategies";
import { FarmerBio } from "./FarmerBio";
import { FarmerBioFromApi } from "./FarmerBioFromApi";
import styled from "styled-components";
import { theme } from "theme";
import { GridBackground } from "components/GridBackground";

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

export const FarmerBioPage = withWeb3(() => {
  const farmer = useSelector((state: IStoreState) => state.farmer);

  const { id: farmerId } = useParams<{ id: string }>();

  const isCurrentFarmer = farmerId
    ? farmer?.GUID === farmerId
      ? true
      : false
    : true;
  useEffect(() => {
    (async () => {
      // const balance = await fetchBalance();
      // NOTE: When working wit Ether and Weis it is not correct to operate with `int` and `float` as it have known issues
      // with precision. To work with flat numbers correctly it is better to represent it as strings and use
      // Bignumber.js or Big.js to avoid losing precision (it is extremely important when working with money!)
      // setBalance(parseFloat(balance));
    })();
  }, []);

  if (!farmer) {
    return null;
  }
  if (isCurrentFarmer && !farmer.poolAddress) {
    return <Redirect to="/dashboard/farmer/signup" />;
  }

  return (
    <div style={{ background: "#F4F4F4" }}>
      <NavBar variant="loggedin" />
      <Section>
        {isCurrentFarmer ? (
          <FarmerBio farmer={farmer} />
        ) : (
          <FarmerBioFromApi farmerId={farmerId} />
        )}
      </Section>
      <GridBackground>
        <FarmerStrategies
          farmerId={farmerId || (farmer?.GUID as string)}
          isInvestor={!isCurrentFarmer}
        />
      </GridBackground>
      <Footer />
    </div>
  );
});
