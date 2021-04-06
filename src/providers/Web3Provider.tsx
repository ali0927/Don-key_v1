import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import React from "react";
import { getWeb3 } from "helpers";

const Web3Context = createContext<Web3 | null>(null);

export const useWeb3 = () => useContext(Web3Context) as Web3;
export const Web3Provider: React.FC<{
  children: React.ReactNode;
  loader?: React.ReactElement;
}> = ({ children, loader = <>Loading</> }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!web3) {
      (async () => {
        try {
          const web3instance = await getWeb3();
          if (web3instance) {
            setWeb3(web3instance);
          }
        } catch (e) {
          setError(e);
        }
      })();
    }
  }, []);

  if (error) {
    return <div>Some Error Occurred Contact Admin</div>;
  }

  if (!web3) {
    return loader;
  }

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};
