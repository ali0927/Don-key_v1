import { StyledLink } from "components/StyledLink";
import { useWeb3 } from "don-components";
import { addCubesToTestStrategy, getPancakeContract, getStrategyContract } from "helpers";
import { IStoreState, IStrategy } from "interfaces";
import { useEffect } from "react";
import pancakeRouteAbi from "JsonData/PancakeRouter.json";
import { useSelector } from "react-redux";



export const RunStrategy = ({ strategy, }: { strategy: IStrategy;  }) => {

  const web3 = useWeb3();
  const farmer = useSelector((state: IStoreState) => state.farmer);
  
 

  const handleCubesAddition = async () => {
    if( farmer?.poolAddress){
       await addCubesToTestStrategy(web3, farmer?.poolAddress);
    }

  }



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
