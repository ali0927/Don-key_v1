import React from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./LoginStyle.scss";
import ButtonComponent from "../../components/Button/Button";

const Login = () => {





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
                <ButtonComponent className="btn-outline1 mt-4 d-block w-100">
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
