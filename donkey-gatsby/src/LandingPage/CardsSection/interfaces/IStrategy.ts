export interface IStrategy {
  apy: string;
  description: string;
  name: string;
  slug: string;
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
    status: "active" | "deprecated" | "disabled";
    network: number;
    farmerImage: {
      url: string;
    };
    poolAddress: string;
    slug: string;
  };
}
