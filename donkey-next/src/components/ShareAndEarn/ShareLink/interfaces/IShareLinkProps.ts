
export interface IShareLinkProps {
    open: boolean;
    link: string | null;
    farmerName: string;
    strategyName: string;
    poolAddress: string;
    apy: string;
    chainId: number;
    image_id: string;
    shortcode: string;
    fetchData: () => void;
    onClose: ()=> void;
}