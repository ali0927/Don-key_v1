import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Web3 from "web3";
import React from "react";
import { getWeb3 } from "don-utils";
import { memoize } from "lodash";
import { AVAX_CHAIN_ID, BINANCE_CHAIN_ID, NetworkConfigs, POLYGON_CHAIN_ID } from "../Constants";
import Web3Modal from "web3modal";
import {convertUtf8ToHex} from "@walletconnect/utils";

interface IAppState {
  address: string;
  provider: any;
  connected: boolean;
  chainId: number;
  showModal: boolean;
}

type IAppContext = IAppState & {
  getWeb3: (chainId: number) => Web3 | null;
  web3: Web3 | null;
  connectDapp: (chainId: number) => Promise<void>;
  disconnectDapp: () => Promise<void>;
};

const Web3Context = createContext<IAppContext | null>(null);

export const useWeb3Context = () => useContext(Web3Context) as IAppContext;

const INITIAL_STATE: IAppState = {
  address: "",
  provider: null,
  connected: false,
  chainId: 1,
  showModal: false,
};

const NetworkConfigsList = [
  {
    chainId: `0x${BINANCE_CHAIN_ID.toString(16)}`,
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
    chainId: `0x${POLYGON_CHAIN_ID.toString(16)}`,
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
    chainId: `0x${AVAX_CHAIN_ID.toString(16)}`,
    chainName: "Avax Mainnet",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
  },
];
const getRandom = (arr: string[]) => {
  const len = arr.length - 1;
  return arr[Math.round(Math.random() * len)];
};
const switchNetwork = async (provider: any,chainIdNum: number) => {
  const chainId = `0x${chainIdNum.toString(16)}`;
  if (provider.request) {
    
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
       
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [NetworkConfigsList.find((item) => item.chainId === chainId)],
          });
        } 
      }
      // handle other "switch" errors
    }
  
};

export const Web3Provider: React.FC<{
  children: React.ReactNode;
  loader?: React.ReactElement;
}> = ({ children, loader = <>Loading</> }) => {
  const [state, setState] = useState<IAppState>(INITIAL_STATE);
  const web3Ref = useRef<Web3 | null>(null);
  const updateState = useCallback((newState: Partial<IAppState>) => {
    setState((old) => ({ ...old, ...newState }));
  }, []);
  const getWeb3 = useCallback(
    memoize((chainId: number) => {
      const network = NetworkConfigs.find((item) => item.chainId === chainId);
      if (!network) {
        throw new Error("Unsupported Network");
      }

      return new Web3(new Web3.providers.HttpProvider(getRandom(network.rpcs)));
    }),
    []
  );

  const web3Modal = useMemo(() => {
    return new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
  }, []);



  const connectDapp = useCallback(async (chainId: number) => {
    const provider = await web3Modal.connect();

    await subscribeProvider(provider);

    const web3: any = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];


    const currentChainId = await web3.eth.chainId();

    updateState({
      provider,
      connected: true,
      address,
      chainId: currentChainId,
    });



    web3Ref.current = web3;
    if(chainId !== currentChainId){
      await switchNetwork(provider,chainId);
    }
  

  }, []);
  const disconnectDapp = useCallback(async () => {
    await resetApp();
  }, []);

  const resetApp = useCallback(async () => {
    const web3 = web3Ref.current!;
    //@ts-ignore
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      //@ts-ignore
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    web3Ref.current = null;
    updateState(INITIAL_STATE);
  }, []);

  const subscribeProvider = useCallback(async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      updateState({ address: accounts[0] });
    });
    provider.on("chainChanged", async (chainId: number) => {
      updateState({ chainId });
    });
  }, []);

  const context: IAppContext = useMemo(() => {
    return {
      ...state,
      getWeb3: getWeb3 as IAppContext["getWeb3"],
      web3: web3Ref.current,
      connectDapp,
      disconnectDapp,
    };
  }, [state]);

  return (
    <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
  );
};
