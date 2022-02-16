import { useWeb3Context } from "don-components";
import { strapi } from "strapi";
import { useDispatch } from "react-redux";
import { setAuthToken } from "store/actions";

export const useSignin = () => {
  const { getConnectedWeb3 } = useWeb3Context();

  const dispatch = useDispatch();

  const signin = async () => {
    const web3 = getConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    let res: any = await strapi.post(`/customers/nonce/`, {
      address: accounts[0],
    });

    const nonce = res.data.nonce;
    var sig = await web3.eth.personal.sign(
      web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
      accounts[0],
      "pass"
    );

    const resp = await strapi.post("/customers/signin", {
      address: accounts[0],
      signature: sig,
    });

    dispatch(setAuthToken(resp.data.token));

    return resp.data;
  };

  return {
    signin,
  };
};
