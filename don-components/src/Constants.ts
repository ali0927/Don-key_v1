export const ETHEREUM_RPC = ["https://speedy-nodes-nyc.moralis.io/68aef2291c7ad6299f6d0a37/eth/mainnet"];
export const BINANCE_RPC = ["https://bsc-dataseed2.defibit.io"];
export const MATIC_RPC = ["https://polygon-rpc.com"];
export const AVAX_RPC = ["https://api.avax.network/ext/bc/C/rpc"];
export const AVAX_CHAIN_ID = 43114;
export const ETHEREUM_CHAIN_ID = 1;
export const BINANCE_CHAIN_ID = 56;
export const POLYGON_CHAIN_ID = 137;

export const NetworkConfigs = [{
    chainId: ETHEREUM_CHAIN_ID,
    rpcs: ETHEREUM_RPC,
    scan: "https://ethscan.com"
}, {
    chainId: BINANCE_CHAIN_ID,
    rpcs: BINANCE_RPC,
    scan: "https://bscscan.com"
}, {
    chainId: POLYGON_CHAIN_ID,
    rpcs: MATIC_RPC,
    scan:  "https://polygonscan.com"
}, {
    chainId: AVAX_CHAIN_ID,
    rpcs: AVAX_RPC,
    scan: "https://cchain.explorer.avax.network"
}]

