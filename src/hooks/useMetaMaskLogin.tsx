import { doLogin } from "actions/authActions";
import { useNotification } from "components/Notification";
import { useWeb3 } from "don-components";
import { AuthToken } from "don-utils";
import { useDispatch } from "react-redux";
import { getAuthTokenForPublicAddress } from "services/api";

export const useMetaMaskLogin = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const web3 = useWeb3()
  const handleMetaMaskLogin = async () => {
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
