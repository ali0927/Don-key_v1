const path = require(`path`);
const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://don-key.finance",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
  siteMetadata: {
    siteUrl: "https://don-key.finance",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-netlify`,
    { resolve: `gatsby-plugin-sitemap` },
    {
      resolve: `gatsby-plugin-loadable-components-ssr`,
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `images`),
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `tracedSVG`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-provide-react`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`tokens`, `strategies`, `farmers`, "risks","networks", "auctions", "protocols"],
        // singleTypes: [`home-page`, `contact`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Donkey`,
        short_name: `Donkey`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-offline`,
  ],
};
