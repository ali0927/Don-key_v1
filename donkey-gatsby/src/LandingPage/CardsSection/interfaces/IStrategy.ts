export interface IStrategy {
  apy: string;
  description: string;
  name: string;
  slug: string;
  network: number;
  strategyImage: {
    url: string;
  };
  risk: {
    Title: string;
    image: {
      url: string;
    };
  };
  token: {
    boostApy: boolean;
  };
  farmer: {
    name: string;
    farmerImage: {
      url: string;
    };
    poolAddress: string;
    slug: string;
  };
}
