import { AvaxId, BSCChainId, PolygonChainId } from "components/Web3NetworkDetector";

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}
const NetworkConfigs: AddEthereumChainParameter[] = [
  {
    chainId: `0x${BSCChainId.toString(16)}`,
    chainName: "BSC Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
    rpcUrls: ["https://bsc-dataseed.binance.org"],
  },
  {
    chainId: `0x${PolygonChainId.toString(16)}`,
    chainName: "Matic Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  {
    chainId: `0x${AvaxId.toString(16)}`,
    chainName: "Avax Mainnet",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
  },
];

export const useSwitchNetwork = () => {
  const switchNetwork = async (chainIdNum: number) => {
    const chainId = `0x${chainIdNum.toString(16)}`;
    if (window.ethereum) {
      const ethereum = window.ethereum;
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [NetworkConfigs.find((item) => item.chainId === chainId)],
            });
          } catch (addError) {
            // handle "add" error
            console.log("Couldnt Switch Chain");
          }
        }
        // handle other "switch" errors
      }
    }
  };
  return { switchNetwork };
};
