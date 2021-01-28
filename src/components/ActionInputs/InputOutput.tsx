
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import { CryptoCurrencyInput } from "../CryptoCurrencyInput/CryptoCurrencyInput";
import { DownArrow } from "./DownArrow";
import {IToken} from "interfaces";
import { getWeb3 } from "helpers/helpers";
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


export const InputOutput = ({ noOutput = false }) => {

  const [yfiTokens, setTokens] = useState<IToken[]>([]);


  const [selectedToken, setSelectedToken] = useState<IToken | null>();

  useEffect(() => {
    (async () => {
      const res = await api.get("/api/v1/protocols/yfi");

      const tokens = await getTokenBalances(res.data.data);
      setTokens(tokens);

      console.log(res.data.data);
     
     
      setSelectedToken(res.data.data[0]);
    })()
  }, [])
  if(!selectedToken){
    return <>Loading</>;
  }
  return (
    <div>
      <CryptoCurrencyInput
        className="mt-4"
        label="Input"
        currencies={yfiTokens}
        currency={selectedToken}
        onChange={setSelectedToken}
        placeholder="Amount"
      />
      <div className={`arrow-wrapper ${noOutput ? "justify-content-end": ''}`}>
        {!noOutput && <DownArrow />}
        <div className="arrow-max">Max</div>
      </div>
      {!noOutput && (
        <CryptoCurrencyInput
          label="Output (Estimate)"
          placeholder="0"
          currencies={yfiTokens}
          noDropdown
          currency={{...selectedToken, tokenIcon: selectedToken.vaultIcon,tokenSymbol: selectedToken.symbol}}
          onChange={setSelectedToken}
        />
      )}
    </div>
  );
};
