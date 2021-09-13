import {  StakingContractContext } from "contexts/StakingContractContext"
import { useContext } from "react"

export const useStakingContract = () => {
  return useContext(StakingContractContext);
}