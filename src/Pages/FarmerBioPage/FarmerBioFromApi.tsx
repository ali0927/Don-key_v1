import styled from "styled-components";
import { useAxios } from "hooks/useAxios";
import { Spinner } from "react-bootstrap";
import { theme } from "theme";
import { FarmerBio } from "./FarmerBio";

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;
export const FarmerBioFromApi = ({ farmerId }: { farmerId: string }) => {
  const [{ loading, data: farmerFromApi }] = useAxios(
    `/api/v2/farmer/${farmerId}`,
    { useCache: false }
  );

  if (loading) {
    return (
      <Section
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: 400 }}
      >
        <Spinner animation="border" color="dark" />
      </Section>
    );
  }

  const bio = farmerFromApi.data.farmer;

  return (
    <FarmerBio
      isInvestor
      farmer={bio}
      investorCount={farmerFromApi.data.investorCount.count}
    />
  );
};
