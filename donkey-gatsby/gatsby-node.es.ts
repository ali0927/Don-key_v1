import path from "path";
import webpack from "webpack";
import _ from "lodash";
import { calcSumOfAllPoolValues } from "./src/helpers/contractHelpers";
/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

const STRAPI_TOKENS = "StrapiTokens";
const STRAPI_FARMERS = "StrapiFarmers";
export const onCreateNode = async ({
  node, // the node that was just created
  getNodes,
}: any) => {
  if (node.internal.type === STRAPI_TOKENS) {
    //  const { createParentChildLink } = actions;
    const allNodes = getNodes();

    node.strategies.map((item: any) => {
      let associatedFarmer: any = null;
      let associatedRisk: any = null;

      allNodes.forEach((farmerNode: any) => {
        if (
          farmerNode &&
          farmerNode.internal &&
          farmerNode.internal.type === STRAPI_FARMERS &&
          farmerNode.strapiId === item.farmer
        ) {
          associatedFarmer = farmerNode;
        }
        if (
          farmerNode &&
          farmerNode.internal &&
          farmerNode.internal.type === "StrapiRisks" &&
          farmerNode.strapiId === item.risk
        ) {
          associatedRisk = farmerNode;
        }
      });
      if (associatedRisk) {
        item.risk = associatedRisk;
      }
      if (associatedFarmer) {
        console.log("Found Association", associatedFarmer.name);
        item.farmer = associatedFarmer;
      }
    });
  }

  if (node.internal.type === STRAPI_FARMERS) {
    node.strategies.map((item: any) => {
      const allNodes = getNodes();
      let associatedToken = null;
      allNodes.forEach((farmerNode: any) => {
        if (
          farmerNode &&
          farmerNode.internal &&
          farmerNode.internal.type === STRAPI_TOKENS &&
          farmerNode.strapiId === item.token
        ) {
          associatedToken = farmerNode;
        }
      });
      if (associatedToken) {
        item.token = associatedToken;
      }
    });
  }
};

export const onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: [require.resolve("buffer/"), "Buffer"],
        'process.nextTick': ['don-utils', 'nextTick']
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^electron$/,
      })
    ],
    resolve: {
      fallback: {
        crypto: false,
        stream: require.resolve("stream-browserify"),
        assert: false,
        util: false,
        http: require.resolve("http-browserify"),
        https: require.resolve("https-browserify"),
        os: false,
      },
    },
  });
};

const sortStrategies = (list: any) => {
  return _.sortBy(list, (item) => {
    const risk = item.risk.Title.toLowerCase();
    if (risk === "low") {
      return -1;
    }
    if (risk === "high") {
      return 1;
    }
    return 0;
  });
};
export const createPages = async ({ graphql, actions }: any) => {
  const { createPage, createRedirect } = actions;
  const tokensdata = await graphql(`
    query {
      allStrapiTokens {
        nodes {
          network {
            chainId
            symbol
            name
            slug
          }
          slug
          boostApy
          subtitle
          description
          strategies {
            risk {
              Title
              image {
                url
              }
            }
            strategyImage {
              url
            }
            name
            apy
            active
            description
            blacklist {
              address
            }
            farmer {
              status
              name
              farmerImage {
                url
              }
              network {
                chainId
                name
                symbol
              }
              slug
              guid
              poolVersion
              poolAddress
            }
          }
        }
      }
    }
  `);
  
 

  const tokens = tokensdata.data.allStrapiTokens.nodes;


  tokens.forEach((token: any) => {
    const strategies = sortStrategies(
      token.strategies.filter(
        (item: any) =>
          item.farmer.status === "active" || item.farmer.status === "comingsoon"
      )
    );
    if (strategies.length > 0) {
      createPage({
        path: `/dashboard/${token.network.slug}/${token.slug}`,
        component: path.resolve(`./src/templates/tokenTemplate.tsx`),
        context: {
          tokens: [token],
          strategies,
        },
      });
    }
  });

  const farmersResp = await graphql(`
    query fetchFarmers {
      allStrapiFarmers(filter: { status: { in: ["active", "deprecated"] } }) {
        nodes {
          name
          description
          graphUrl
          farmerImage {
            url
          }
          twitter
          telegram
          guid
          slug
          farmerfee
          performancefee
          poolAddress
          poolVersion
          oldPoolAddress
          oldPoolVersion
          network {
            name
            chainId
            symbol
          }
          strategies {
            name
            apy
            created_at
            id
            entranceFees
            exitFees
            swapInFees
            swapOutFees
            description
            blacklist {
              address
            }
            strategyImage {
              url
            }
            token {
              boostApy
            }
          }
        }
      }
    }
  `);

  const farmers = farmersResp.data.allStrapiFarmers.nodes;
  const tvl = await calcSumOfAllPoolValues();
  
  farmers.forEach((farmer: any) => {
    const strategies = farmer.strategies;
    if (strategies.length > 0 && farmer.farmerImage) {
      createPage({
        path: `/dashboard/farmer/${farmer.slug}`,
        component: path.resolve(`./src/templates/farmerTemplate.tsx`),
        context: {
          data: {
            farmers: [farmer],
          },
          tvl,
        },
      });
    }
  });



  // Rewrite For Share Links
  createRedirect({
    fromPath: "/share/*",
    force: true,
    toPath: `${process.env.GATSBY_API_URL}/api/v2/share/:splat`,
    statusCode: 200,
  });
};
