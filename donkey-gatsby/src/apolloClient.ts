import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import fetch from 'isomorphic-fetch'

const StrapiURI = process.env.GATSBY_STRAPI_URL;

const REFERRAL_SUBGRAPH = process.env.GATSBY_REFERRAL_SUBGRAPH;

export const link = createHttpLink({
  fetch,
  uri:StrapiURI
  ? `${StrapiURI}/graphql`
  : "https://don-strapi-g36tg.ondigitalocean.app/graphql"
})

export const client = new ApolloClient({
  link ,
  cache: new InMemoryCache(),
});

export const uniswapClient = new ApolloClient({
  link: createHttpLink({
    fetch,
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
  }),
  cache: new InMemoryCache(),
});

export const thegraphClient = new ApolloClient({
  link: createHttpLink({
    fetch,
    uri: REFERRAL_SUBGRAPH,
  }),
 
  cache: new InMemoryCache(),
});


