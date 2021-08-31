import { ErrorSnackbar } from "components/Snackbars";
import { useWeb3 } from "don-components";
import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
interface IWeb3NetworkContext {
  chainId: number | null;
  setChainId: (val: number) => void;
}
export const Web3NetworkContext = createContext<IWeb3NetworkContext | null>(
  null
);

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

export const Web3NetworkDetector = () => {
  const { setChainId } = useWeb3Network();

  const web3 = useWeb3();
  async function apiCall() {
    let network = await web3.eth.getChainId();

    setChainId(network);
  }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", apiCall);
    }
  }, []);

  useEffect(() => {
    apiCall();
  }, []);
  return <></>;
};
