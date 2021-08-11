import styled from "styled-components";

const TotalInvestedAmount = styled.span`
  font-size: 50px;
  font-weight: 700;
`;

export const StakingInfo = () => {


  return (
    <>
      <p className="mb-0">Total Investment</p>
      <TotalInvestedAmount>$920.2</TotalInvestedAmount>
    </>
  );
};
