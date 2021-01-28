import Web3 from "web3";

let web3:  Web3 | null = null;



export const getWeb3 = async () => {
  //@ts-ignore
  if (!window.ethereum) {
    window.alert("Please install MetaMask first.");
    return;
  }

  if (!web3) {
    try {
      // Request account access if needed
      //@ts-ignore
      await window.ethereum.enable();

      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      //@ts-ignore
      web3 = new Web3(window.ethereum);
    } catch (error) {
      window.alert("You need to allow MetaMask.");
      return;
    }
  }
  return web3;
};


export const waitFor = (time: number) => {
  return new Promise(res => {
    setTimeout(res,time)
  })
}
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });


}

export const getQueryParam = (name: string) => {
  if(typeof window === "undefined"){
    return '';
  }
  const search = window.location.search;
  const queryString = decodeURIComponent(search.slice(1,search.length));
  const queryObj: any = {};
  queryString.split("&").forEach(item => {
    const items = item.split("=");
    queryObj[items[0]] = items[1];
  })
  console.log(queryObj);
  return queryObj[name];
}