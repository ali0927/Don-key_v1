const { useGatsbyNode } = require("gatsby-plugin-ts-config");


module.exports = useGatsbyNode(() => require("./gatsby-node.es.ts"), { type: "babel" });
