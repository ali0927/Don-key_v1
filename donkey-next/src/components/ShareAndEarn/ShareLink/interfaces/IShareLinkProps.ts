
export interface IShareLinkProps {
    open: boolean;
    link: string | null;
    farmerName: string;
    strategyName: string;
    poolAddress: string;
    apy: string;
    chainId: number;
    code: string;
    onClose: ()=> void;
}