import { getWeb3 } from "helpers/helpers";
import { IToken } from "interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "services/api";
import Web3 from "web3";
import abi from "erc-20-abi";

const getTokenBalances = async (tokens: IToken[]) => {
    const tokenWithBalances = await Promise.all(tokens.map(async (token) => {
      const web3 = await getWeb3() as Web3;
      const addrss = await web3.eth.getCoinbase();
      //@ts-ignore
      var tokenInst = new web3.eth.Contract(abi,token.tokenAddress);
  
    const balance = await tokenInst.methods.balanceOf(addrss).call();
        return {...token,balance}
    } ))
    return tokenWithBalances;
  }
const YFITokensContext = createContext<IToken[]>([]);

export const YFITokensProvider: React.FC = ({children}) => {
    const [yfiTokens, setTokens] = useState<IToken[]>([]);

    useEffect(() => {
        (async () => {
            const res = await api.get("/api/v1/protocols/yfi");
      
            const tokens = await getTokenBalances(res.data.data);
            setTokens(tokens);
      
            console.log(res.data.data);
           
          })()
    }, []);
    return <YFITokensContext.Provider value={yfiTokens}>
        {children}
    </YFITokensContext.Provider>
}

export const useYFITokens = () => useContext(YFITokensContext);

export const withYFITokens = <T, >(Comp: React.ComponentType<T>) => {
    const WithYFIprovider: React.FC<T> = (props)=> {
        return <YFITokensProvider>
            <Comp {...props} />
        </YFITokensProvider>
    }
    return WithYFIprovider;
}