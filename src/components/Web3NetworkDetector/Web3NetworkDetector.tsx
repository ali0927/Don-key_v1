import { ErrorSnackbar } from "components/Snackbars";
import { useWeb3 } from "don-components";
import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
interface IWeb3NetworkContext {
  chainId: number | null;
  setChainId: (val: number) => void;
}
export const Web3NetworkContext =
  createContext<IWeb3NetworkContext | null>(null);

export const useWeb3Network = () =>
  useContext(Web3NetworkContext) as IWeb3NetworkContext;

export const Web3NetworkProvider: React.FC = ({ children }) => {
  const [chainId, setChainId] = useState<number | null>(null);
  const value = useMemo(() => {
    return { chainId, setChainId };
  }, [chainId]);
  return (
    <Web3NetworkContext.Provider value={value}>
      {children}
    </Web3NetworkContext.Provider>
  );
};

export const BSCChainId = 56;
export const PolygonChainId = 137;
const AllowedNetworks = [BSCChainId, PolygonChainId];

export const Web3NetworkDetector = () => {
  const { setChainId } = useWeb3Network();

  const { enqueueSnackbar } = useSnackbar();
  const web3 = useWeb3();
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  useEffect(() => {
    async function apiCall() {
      let network = await web3.eth.net.getId();
      setChainId(network);
      if (AllowedNetworks.indexOf(network) === -1) {
        enqueueSnackbar(
          "Wrong Network. You must be on Binance Smart Chain to continue. Please select the appropriate network via Metamask",
          {
            content: (key, msg) => <ErrorSnackbar message={msg as string} />,
            autoHideDuration: 10000,
            persist: false,
          }
        );
      }
    }
    apiCall();
  }, []);
  return <></>;
};
