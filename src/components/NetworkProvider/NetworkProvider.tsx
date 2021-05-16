import { useWeb3 } from "don-components";
import { createContext, useContext, useEffect, useState } from "react";
type INetworkContext = {
  network: string | null;
  id: number | null;
  isReady: boolean;
  isEthereum: boolean;
  isBSC: boolean;
};
export const NetworksMap = {
  Ethereum: 1,
  BSC: 56,
};
const NetworkContext = createContext<INetworkContext | null>(null);
export const useNetwork = () => useContext(NetworkContext) as INetworkContext;

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [network, setNetwork] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const web3 = useWeb3();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      web3.eth.getChainId().then((id) => {
        if (id === NetworksMap.Ethereum) {
          setNetwork("Ethereum Mainnet");
        } else if (id === NetworksMap.BSC) {
          setNetwork("BSC Mainnet");
        } else {
          setNetwork("Unsupported Network");
        }
        setId(id);
        setIsReady(true);
      });
    }
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        network,
        id,
        isReady,
        isEthereum: id === NetworksMap.Ethereum,
        isBSC: NetworksMap.BSC === id,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
