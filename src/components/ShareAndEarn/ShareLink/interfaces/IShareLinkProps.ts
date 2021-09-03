
export interface IShareLinkProps {
    open: boolean;
    link: string | null;
    farmerName: string;
    strategyName: string;
    poolAddress: string;
    apy: string;
    code: string;
    onClose: ()=> void;
}