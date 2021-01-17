import React from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./LoginStyle.scss";
import ButtonComponent from "../../components/Button/Button";
import Web3 from "web3";
import { api } from "../../services/api";

let web3 = undefined;



const AuthToken = 'AuthToken';

const Login = () => {
  // useEffect(() => {}, []);

  const handleMetaMaskLogin = async () => {
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

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    const resp = await api.post("/api/v1/nonce", {
      walletAddress: publicAddress,
    });

    const { data: {data} } = resp;
    console.log(data);
    const signature = await web3.eth.personal.sign(data.nonce, publicAddress);
    console.log(signature);
    const resps = await api.post("/api/v1/login", {
      signature,
      walletAddress: publicAddress,
    });


    localStorage.setItem(AuthToken, JSON.stringify(resps.data));

  };

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
                <ButtonComponent className="btn-outline1 mt-4 d-block w-100">
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
