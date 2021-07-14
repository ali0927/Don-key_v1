
export interface ILinkImage {
    imageUrl: string;
    farmerName: string;
    strategyName: string;
}


export interface ILinkImageProps {
   farmerData: ILinkImage;
   tvl: string;
   apy: string;
}