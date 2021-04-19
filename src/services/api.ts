import { api, getWeb3 } from "don-utils";





export const getNonce = async (publicAddress: string) => {
  const res = await api.post("/api/v2/login/nonce", {
    walletAddress: publicAddress,
  });
  const {
    data: { data },
  } = res;
  return data.nonce;
};


export const getAuthToken = async (publicAddress: string, signature: string) => {
  const resps = await api.post("/api/v2/login", {
    signature,
    walletAddress: publicAddress,
  });
  const { token } = resps.data.data;
  const user = resps.data.user;
  return {
    token,
    user,
  };
};


export const getAuthTokenForPublicAddress = async (publicAddress: string) => {
  const nonce = await getNonce(publicAddress);
  const web3 = await getWeb3();
  //@ts-ignore
  const signature = await web3.eth.personal.sign(nonce, publicAddress);

  return await getAuthToken(publicAddress, signature);
};