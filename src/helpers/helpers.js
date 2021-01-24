import Web3 from "web3";

let web3 = undefined;



/**
 *   get Web3
 *
 * @return {Promise<Web3>}
 */
export const getWeb3 = async () => {
  if (!window.ethereum) {
    window.alert("Please install MetaMask first.");
    return;
  }

  if (!web3) {
    try {
      // Request account access if needed
      await window.ethereum.enable();

      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      web3 = new Web3(window.ethereum);
    } catch (error) {
      window.alert("You need to allow MetaMask.");
      return;
    }
  }
  return web3;
};


export const waitFor = (time) => {
  return new Promise(res => {
    setTimeout(res,time)
  })
}