import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import ButtonComponent from "../../components/Button/Button";
import { Row, Col } from "react-bootstrap";
import "./MyaccountStyle.scss";

export default function StrategyConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="thankyouModal"
      centered
    >
      <Modal.Header closeButton className="p-0">
        {" "}
      </Modal.Header>
      <Modal.Body className="p-0">
        <Row>
          <Col md={6}>
            <div className="thankyou-left p-5">
              <img src="/assets/images/strategy/logo1.png" alt="Image" />
              <div className="mt-5 text-center">
                <img src="/assets/images/strategy/thankyou.png" alt="Image" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="bgBlack pt-5 pb-5 pl-5 pr-5">
              <h4 className="pt-5 mt-5">Thank you! All set</h4>
              <p className="mt-5 mb-5">
                Solldy thanks for the created strategy, everything went well.
                <br /> <br />
                After we conside r the strategy, you will receive a notification
                in your personal account, and your profile will have the
                opportunity to activate a confirmed strategy from the list of
                strategies. <br /> <br /> We are waiting for new strategies from
                you.
              </p>
              <ButtonComponent className="btnYellow mb-5">
                Discover best farmers
              </ButtonComponent>
              <ButtonComponent variant="btnWhite" className="ml-3 mb-5">
                Learn
              </ButtonComponent>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
