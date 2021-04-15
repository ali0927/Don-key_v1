import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./LoginStyle.scss";
import ButtonComponent from "../../components/Button/Button";
import { useHistory } from "react-router-dom";
import { useWalletConnectHook } from "../../hooks/useWalletConnectHook";
import { useDispatch } from "react-redux";
import { doLogin } from "../../actions/authActions/authActions";
import { AuthToken } from "don-utils";
import { Logo } from "components/Navbar/Logo";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";

const Login = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const {doMetaMaskLogin} = useMetaMaskLogin();
  const handleMetaMaskLogin = async () => {

    await doMetaMaskLogin();
    history.push("/dashboard");

  };

  useEffect(() => {
    const token = localStorage.getItem(AuthToken);
    let user = localStorage.getItem("User");
    if (user) {
      try {
        user = JSON.parse(user);
      } catch (e) {
        user = null;
      }
    }
    if (token && user) {
      dispatch(doLogin(user as any));
      history.push("/dashboard");
    } else {
      localStorage.removeItem(AuthToken);
      localStorage.removeItem("User");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleWalletConnect } = useWalletConnectHook();
  return (
    <div className="login">
      <div className="loginLeft">
        <div className="logo mt-5 ml-5">
          <Logo />
        </div>
        <div className="text-center loginForm">
          <h1 className="mb-4">Join the Don-Key</h1>
          <p className="mb-4">
            Join our farmers <br /> Be the best
          </p>
          <Form className="">
            {/* <Form.Group>
              <Form.Control type="text" placeholder="Login" />
            </Form.Group> */}

            {/* <ButtonComponent className="btnYellow mt-4 d-block w-100">
              Connect Wallet
            </ButtonComponent> */}

            <Row>
              <Col md={6}>
                <ButtonComponent
                  onClick={handleWalletConnect}
                  className="btn-outline1 mt-4 d-block w-100"
                >
                  <img
                    src="/assets/images/login/wallet.png"
                    className="d-inline-block mr-lg-3 mr-2 ml-2"
                    alt="Image"
                  />
                  Walletconnect
                </ButtonComponent>
              </Col>
              <Col md={6}>
                <ButtonComponent
                  onClick={handleMetaMaskLogin}
                  className="btn-outline1 mt-4 d-block w-100"
                >
                  <img
                    src="/assets/images/login/mask.png"
                    className="d-inline-block mr-lg-3 mr-2 ml-2"
                    alt="Image"
                  />
                  Metamask
                </ButtonComponent>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="loginImage d-md-inline-block d-none"></div>
    </div>
  );
};

export default Login;
