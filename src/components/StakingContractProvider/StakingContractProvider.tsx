import {
  IStakingContractContext,
  StakingContractContext,
} from "contexts/StakingContractContext";
import { memo, useEffect, useMemo, useState } from "react";
import { useWeb3 } from "don-components";
import DonStaking from "JsonData/DonStaking.json";
import { getBSCDon, toEther } from "helpers";
import BigNumber from "bignumber.js";
const DonStakingAddress =  "0x9305A9e52076d8107c6851Ca4670Db6Bdd3c6a89";
export const StakingContractProvider: React.FC = memo(({ children }) => {
  const web3 = useWeb3();

  const stakingContract = useMemo(() => {
    return new web3.eth.Contract(
      DonStaking.abi as any,
      DonStakingAddress
    );
  }, []);

  const [isStaked, setIsStaked] = useState<boolean | null>(null);
  const [stakedDon, setStakedDon] = useState<string>("0");

  const fetchState = async () => {
    const accounts = await web3.eth.getAccounts();
    const userInfo = await stakingContract.methods.userInfo(accounts[0]).call();

    setIsStaked(userInfo.isStaked);
    setStakedDon(toEther(userInfo.tokenAmount));
  };

  useEffect(() => {
    fetchState();
  }, []);
  const checkAndApproveDon = async (amount: string) => {
    const accounts = await web3.eth.getAccounts();
    const donContract =await  getBSCDon(web3)
    const allowance =  await donContract.methods.allowance(accounts[0], DonStakingAddress )
        .call();
    
    if(new BigNumber(allowance).lt(amount)){
      await donContract.methods.approve(DonStakingAddress,amount )
      .send({from: accounts[0]});
    }
  }
  const stake = async (amount: string) => {
    const accounts = await web3.eth.getAccounts();
    await checkAndApproveDon(amount);
    await stakingContract.methods.stake(amount).send({from: accounts[0]});
    await fetchState();
  }
  const unstake = async (amount: string) => {
    const accounts = await web3.eth.getAccounts();
    await checkAndApproveDon(amount);
    await stakingContract.methods.unstake(amount).send({from: accounts[0]});
    await fetchState();
  }

  const stakingObj: IStakingContractContext = useMemo(() => {
    return {
      isStaked: isStaked,
      stakedDon,
      stakingContract,
      refetch: fetchState,
      stakingAddress: DonStakingAddress,
      stake,
      unstake
    };
  }, [isStaked, stakedDon]);
  

  return (
    <StakingContractContext.Provider value={stakingObj}>
      {children}
    </StakingContractContext.Provider>
  );
});
