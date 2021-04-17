import { Web3Provider } from "@ethersproject/providers";

export function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}