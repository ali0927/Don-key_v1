import Web3 from "web3";

export function getLibrary(provider: any) {
  const library = new Web3(provider);

  return library;
}