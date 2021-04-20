import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { ShowMoreContent } from "components/ShowmoreContent";
import Web3 from "web3";
import { getWeb3 } from "don-utils";
import { withWeb3 } from "hoc";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FarmerModal } from "components/FarmerModal/FarmerModal";
import { IFarmerInter, IStoreState } from "interfaces";
import { EditIcon } from "icons/EditIcon";
import { StrategyTable } from "components/StrategyTable";
import { DetailTable } from "./DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { useAxios } from "hooks/useAxios";
import { StyledLink } from "components/StyledLink";
import { FarmerStrategies } from "./FarmerStrategies";
import { FarmerBio } from "./FarmerBio";
import { FarmerBioFromApi } from "./FarmerBioFromApi";

export const FarmerBioPage = withWeb3(() => {
  const [balance, setBalance] = useState(0);

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

  return (
    <div style={{ background: "#F4F4F4" }}>
      <NavBar variant="loggedin" />
      <section className="bg-buru">
        {isCurrentFarmer ? (
          <FarmerBio farmer={farmer}/>
        ) : (
          <FarmerBioFromApi farmerId={farmerId} />
        )}
      </section>
      <FarmerStrategies
        farmerId={farmerId || (farmer?.GUID as string)}
        isInvestor={!isCurrentFarmer}
      />
      <Footer />
    </div>
  );
});
