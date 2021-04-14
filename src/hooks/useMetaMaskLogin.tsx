import { doLogin } from "actions/authActions";
import { useNotification } from "components/Notification";
import { AuthToken, getWeb3 } from "don-utils";
import { useDispatch } from "react-redux";
import { getAuthTokenForPublicAddress } from "services/api";

export const useMetaMaskLogin = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const handleMetaMaskLogin = async () => {
    const web3 = await getWeb3();
    if (!web3) {
      return;
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    const { token, user } = await getAuthTokenForPublicAddress(publicAddress);

    localStorage.setItem(AuthToken, token);

    dispatch(doLogin(user));
    showNotification({
      msg: (
        <>
          <p className="text-center">Metamask Account Connected</p>
          <p className="text-center">{publicAddress}</p>
        </>
      ),
    });
  };
  return { doMetaMaskLogin: handleMetaMaskLogin };
};
