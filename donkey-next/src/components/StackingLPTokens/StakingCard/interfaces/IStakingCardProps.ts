
export interface IStakingCardProps {
    key: number;
    networkData : {
        chainId: number;
        networkName: string;
        tvl: string;
        apy: string;
        rewardsInEther: string;
        stakedLp: string;
    }
}