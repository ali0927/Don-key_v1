import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import { theme } from "theme";
import { FarmerBio } from "./FarmerBio";
import { gql, useQuery } from "@apollo/client";
import { GridBackground } from "components/GridBackground";
import { FarmerStrategies } from "./FarmerStrategies";

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const FARMER_QUERY = gql`
  query farmerInfo($id: String) {
    farmers(where: { guid_eq: $id, active_eq: true, status_in: ["active"] }) {
      name
      description
      farmerImage {
        url
      }
      active
      twitter
      telegram
      guid
      poolAddress
      poolVersion
      network {
        name
        chainId
        symbol
      }
      strategies {
        name
        apy
        created_at
        id
        entranceFees
        exitFees
        swapInFees
        swapOutFees
        description
        strategyImage {
          url
        }
      }
    }
  }
`;

export const FarmerBioFromApi = ({ farmerId }: { farmerId: string }) => {
  const { loading, data } = useQuery(FARMER_QUERY, {
    variables: { id: farmerId },
  });

  return (
    <>
      {loading ? (
        <Section
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
        </Section>
      ) : (
        <FarmerBio farmer={data.farmers[0]} investorCount={0} />
      )}
      <GridBackground>
        <FarmerStrategies
          isLoaded={!loading}
          farmer={loading ? [] : data.farmers[0]}
        />
      </GridBackground>
    </>
  );
};
