import React from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./LoginStyle.scss";
import ButtonComponent from "../../components/Button/Button";
import Web3 from "web3";
import {  getAuthToken, getNonce } from "../../services/api";
import { useHistory } from "react-router-dom";
import { useNotification } from "../../components/Notification";
import { useWalletConnectHook } from "../../hooks/useWalletConnectHook";
import { AuthToken } from "../../constants";
let web3 = undefined;



const getAuthTokenForPublicAddress = async (publicAddress) => {
  const nonce = await getNonce(publicAddress);
  const web3 = await getWeb3();

  const signature = await web3.eth.personal.sign(nonce, publicAddress);

  return await getAuthToken(publicAddress, signature);
};

const getWeb3 = async () => {
  if (!window.ethereum) {
    window.alert("Please install MetaMask first.");
    return;
  }

  if (!web3) {
    try {
      // Request account access if needed
      await window.ethereum.enable();

      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      web3 = new Web3(window.ethereum);
    } catch (error) {
      window.alert("You need to allow MetaMask.");
      return;
    }
  }
  return web3;
};




const Login = () => {
  


  const history = useHistory();
  const { showNotification } = useNotification();
  const handleMetaMaskLogin = async () => {
    const web3 = await getWeb3();
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    const { token, user } = await getAuthTokenForPublicAddress(publicAddress);
    localStorage.setItem(AuthToken, token);
    localStorage.setItem("user", JSON.stringify(user));
    history.push("/myaccount");
    showNotification({
      msg: (
        <>
          <p className="text-center">Metamask Account Connected</p>
          <p className="text-center">{publicAddress}</p>
        </>
      ),
    });
  };

  const { handleWalletConnect } = useWalletConnectHook();

  return (
    <div className="login">
      <div className="loginLeft">
        <div className="logo mt-5 ml-5">
          <img
            src="/assets/images/logo.png"
            className="d-inline-block"
            alt="Image"
          />
        </div>
        <div className="text-center loginForm">
          <h1 className="mb-4">Join the Buru</h1>
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
