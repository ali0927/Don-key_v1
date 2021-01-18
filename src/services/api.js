import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
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
