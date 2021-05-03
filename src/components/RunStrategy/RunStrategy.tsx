import { StyledLink } from "components/StyledLink";
import { IStoreState, IStrategy } from "interfaces";
import { useSelector } from "react-redux";

export const RunStrategy = ({ strategy }: { strategy: IStrategy }) => {
  //const web3 = useWeb3();
  const farmer = useSelector((state: IStoreState) => state.farmer);

  const handleCubesAddition = async () => {
    if (farmer?.poolAddress) {
      //  await bui(web3, farmer?.poolAddress);
    }
  };

  return (
    <>
      <StyledLink
        to="/"
        onClick={(e) => {
          e.preventDefault();
          handleCubesAddition();
        }}
      >
        Add Cubes
      </StyledLink>
    </>
  );
};
