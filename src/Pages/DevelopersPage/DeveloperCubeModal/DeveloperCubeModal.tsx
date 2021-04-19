import React from "react";
import { Button, Modal } from "react-bootstrap";
import { IDeveloperCubeModalProps } from "./interfaces/IDeveloperCubeModalProps";
import "./DeveloperCubeModal.scss";
import clsx from "clsx";

export const DeveloperCubeModal: React.FC<IDeveloperCubeModalProps> = (
  props
) => {
  const { show, headerIcon, heading, size } = props;

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Modal
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={clsx({
        "modal-content-lg": size === "sm",
      })}
      onHide={handleClose}
    >
      <Modal.Header closeButton className="p-0">
        <Modal.Title
          id="contained-modal-title-vcenter"
          as="p"
          className="d-flex align-items-center w-100"
        >
          <div className="mr-3">{headerIcon}</div>
          <div className="title">{heading}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="mt-5">{props.children}</div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};
