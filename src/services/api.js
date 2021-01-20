import axios from "axios";
import { getWeb3 } from "../helpers/helpers";

export const api = axios.create({
  baseURL: "http://18.191.241.99:3033",
});

export const getNonce = async (publicAddress) => {
  const res = await api.post("/api/v1/nonce", {
    walletAddress: publicAddress,
  });
  const {
    data: { data },
  } = res;
  return data.nonce;
};
export const getAuthToken = async (publicAddress, signature) => {
  const resps = await api.post("/api/v1/login", {
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


export const getAuthTokenForPublicAddress = async (publicAddress) => {
  const nonce = await getNonce(publicAddress);
  const web3 = await getWeb3();

  const signature = await web3.eth.personal.sign(nonce, publicAddress);

  return await getAuthToken(publicAddress, signature);
};