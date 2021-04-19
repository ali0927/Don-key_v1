import React from "react";
import {  Modal } from "react-bootstrap";

export default function ProtocolsModalPopup(props: {children: React.ReactNode; show: boolean; onHide:() => void; className?: string}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="p-0">
        
      </Modal.Header>
      <Modal.Body className="p-0">
        <p>{props.children}</p>
      </Modal.Body>
    </Modal>
  );
}
