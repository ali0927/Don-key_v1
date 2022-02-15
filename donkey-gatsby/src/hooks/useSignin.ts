import { useWeb3Context } from "don-components";
import { useStakingContract } from "hooks";
import { strapi } from "strapi";
import { checkBalanceForStrategy } from "helpers";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "store/reducers/rootReducer";
import { setAuthToken } from "store/actions";

export const useSignin = () => {

  const { getConnectedWeb3 } = useWeb3Context();
  const auth = useSelector((state: IStoreState) => state.auth);
  const { tier } = useStakingContract();
  const dispatch = useDispatch();
  const web3 = getConnectedWeb3();

  const signin = async () => {
    const accounts = await web3.eth.getAccounts();
    let res: any = await strapi.get(`/customers/nonce/${accounts[0]}`);
    let nonce = "";
    if (res.data.status === "error") {
      const new_customer: any = await strapi.post(`/customers`, {
        address: accounts[0]
      })
      nonce = new_customer.data.nonce;
    }
    nonce = res.data;
    var sig = await web3.eth.personal.sign(web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`), accounts[0], "pass");

    const resp = await strapi.post("/customers/sign", {
      address: accounts[0],
      signature: sig
    });

    dispatch(setAuthToken(resp.data.token));

    return resp.data;
  }
  const checkAvailability = async () => {
    if (!web3) {
      return { status: false, type: 'wallet', msg: 'Please connect your wallet.'}
    } 
    const _res = await checkBalanceForStrategy(web3);
    if ((_res || tier.tier > 0) && auth.token ) {
      return { status: true };
    } else if (!auth.token || auth.token === "") {
      return { status: false, type: 'token', msg: 'Please Sign in using your wallet.'}
    } else {
      return { status: false, type: 'balance', msg: 'You need to buy 100 DON or a Tier.'}
    }
  }

  return {
    signin,
    checkAvailability,
  };

}
