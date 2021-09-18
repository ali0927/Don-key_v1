

export interface IShareProps {
    open: boolean;
    pool_address: string;
    apy: string;
    onCreateLink: (url:string) => void;
    onClose: () => void;
}