
export interface IShareLinkProps {
    open: boolean;
    imageUrl: string;
    link: string;
    farmerName: string;
    strategyName: string;
    poolAddress: string;
    apy: string;
    onClose: ()=> void;
}