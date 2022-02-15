export const ETHEREUM_RPC = ["https://speedy-nodes-nyc.moralis.io/68aef2291c7ad6299f6d0a37/eth/mainnet"];
export const BINANCE_RPC = ["https://bsc.getblock.io/mainnet/?api_key=b745ef0d-eca1-4493-8129-668953bd4705"];
export const BINANCE_RPC_CACHED = ["https://node-api.don-key.finance/bsc"];
export const MATIC_RPC_CACHED = ["https://node-api.don-key.finance/polygon"];
export const AVAX_RPC_CACHED = ["https://node-api.don-key.finance/avax"];
export const FANTOM_RPC_CACHED = ["https://node-api.don-key.finance/ftm"];
export const BSC_TESTNET_RPC = ["http://localhost:3000/bsc-testnet"];
// export const AVAX_RPC_CACHED = ["https://node-api.don-key.finance/avax"];
export const MATIC_RPC = ["https://polygon-rpc.com"];
export const FANTOM_RPC = ["https://rpc.ftm.tools"];
export const AVAX_RPC = ["https://api.avax.network/ext/bc/C/rpc"];
export const AVAX_CHAIN_ID = 43114;
export const ETHEREUM_CHAIN_ID = 1;
export const BINANCE_CHAIN_ID = 56;
export const POLYGON_CHAIN_ID = 137;
export const FANTOM_CHAIN_ID = 250;
export const BSC_TESTNET_CHAIN_ID = 97;


export const NetworkConfigs = [{
    chainId: ETHEREUM_CHAIN_ID,
    rpcs: ETHEREUM_RPC,
    cached_rpcs: [],
    scan: "https://ethscan.com"
}, {
    chainId: BINANCE_CHAIN_ID,
    rpcs: BINANCE_RPC,
    cached_rpcs: BINANCE_RPC_CACHED,
    scan: "https://bscscan.com"
}, {
    chainId: POLYGON_CHAIN_ID,
    rpcs: MATIC_RPC,
    cached_rpcs: MATIC_RPC_CACHED,
    scan:  "https://polygonscan.com"
}, {
    chainId: AVAX_CHAIN_ID,
    rpcs: AVAX_RPC,
    cached_rpcs: AVAX_RPC_CACHED,
    scan: "https://cchain.explorer.avax.network",
},{
    chainId: FANTOM_CHAIN_ID,
    rpcs: FANTOM_RPC,
    scan: "https://ftmscan.com",
    cached_rpcs: FANTOM_RPC_CACHED
}, {
    chainId: BSC_TESTNET_CHAIN_ID,
    rpcs: BSC_TESTNET_RPC,
    scan: "https://testnet.bscscan.com",
    cached_rpcs: BSC_TESTNET_RPC
}];

