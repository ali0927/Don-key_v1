import { ILinkImage } from "components/ShareAndEarn/LinkImage/interfaces";

export interface IShareProps {
    open: boolean;
    imageData: ILinkImage;
    pool_address: string;
    apy: string;
    onCreateLink: (imageUrl: string, shortUrl: string) => void;
    onClose: () => void;
}