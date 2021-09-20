import { ApolloClient, InMemoryCache } from "@apollo/client";

const StrapiURI = process.env.NEXT_PUBLIC_STRAPI_URL;
export const client = new ApolloClient({
  uri: StrapiURI
    ? `${StrapiURI}/graphql`
    : "https://don-strapi-g36tg.ondigitalocean.app/graphql",
  cache: new InMemoryCache(),
});

export const uniswapClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});

export const thegraphClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/adeee11/referral",
  cache: new InMemoryCache(),
});
