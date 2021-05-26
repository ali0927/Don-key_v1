import { doLogin } from "actions/authActions";
import { useNotification } from "components/Notification";
import { useWeb3 } from "don-components";
import { AuthToken } from "don-utils";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getAuthTokenForPublicAddress } from "services/api";

export const useMetaMaskLogin = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const history = useHistory();

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
    try{
    const { token, user } = await getAuthTokenForPublicAddress(publicAddress)

    localStorage.setItem(AuthToken, token);

    dispatch(doLogin(user));
    showNotification({
      msg: (
        <>
          <p className="text-center m-0">Metamask Account Connected</p>
          <p className="text-center m-0">{publicAddress}</p>
        </>
      ),
    });
  }
  catch(err){
   
      let errMessage = "Please try again";
      console.log(err.response)
      if(err.response && err.response.data && err.response.data.data && err.response.data.data.msg){
        errMessage = err.response.data.data.msg;
      }
      history.push("/")
      showNotification({
        msg: (
          <>
            <p className="text-center m-0">{errMessage}</p>
          </>
        ),
        type: "error",
      });
  }
  };
  return { doMetaMaskLogin: handleMetaMaskLogin };
};
