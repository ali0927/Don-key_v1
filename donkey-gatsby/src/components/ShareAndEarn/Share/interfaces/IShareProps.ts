

export interface IShareProps {
    open: boolean;
    pool_address: string;
    apy: string;
    farmername: string;
    slug: string;
    chainId: number;
    strategyName: string;
    onClose: () => void;
}