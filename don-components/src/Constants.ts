export const ETHEREUM_RPC = ["https://main-light.eth.linkpool.io"];
export const BINANCE_RPC = ["https://bsc-dataseed.binance.org", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed1.ninicoin.io"];
export const MATIC_RPC = ["https://polygon-rpc.com", "https://rpc-mainnet.matic.quiknode.pro", "https://matic-mainnet.chainstacklabs.com"];
export const AVAX_RPC = ["https://api.avax.network/ext/bc/C/rpc"];
export const AVAX_CHAIN_ID = 43114;
export const ETHEREUM_CHAIN_ID = 1;
export const BINANCE_CHAIN_ID = 56;
export const POLYGON_CHAIN_ID = 137;

export const NetworkConfigs = [{
    chainId: ETHEREUM_CHAIN_ID,
    rpcs: ETHEREUM_RPC,
}, {
    chainId: BINANCE_CHAIN_ID,
    rpcs: BINANCE_RPC,
}, {
    chainId: POLYGON_CHAIN_ID,
    rpcs: MATIC_RPC
}, {
    chainId: AVAX_CHAIN_ID,
    rpcs: AVAX_RPC
}]

