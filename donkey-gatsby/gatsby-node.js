const path = require(`path`)
const webpack = require('webpack');

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

   
}

exports.onCreateWebpackConfig = ({
   actions
}) => {
   actions.setWebpackConfig({
      plugins: [
         new webpack.ProvidePlugin({
            Buffer: [require.resolve("buffer/"), "Buffer"],
         }),
      ],
      resolve: {
         fallback: {
            "crypto": false,
            "stream": require.resolve("stream-browserify"),
            "assert": false,
            "util": false,
            "http":  require.resolve("http-browserify"),
            "https":  require.resolve("https-browserify"),
            "web3-bzz": require.resolve("stream-browserify"),
            "os": false
         },
      },
   })
}

exports.onCreateNode = () => {
   
}