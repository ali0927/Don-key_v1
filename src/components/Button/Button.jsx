import React from "react";
import { Button } from "react-bootstrap";
const ButtonComponent = props => {
  return (
    <Button
      variant={props.variant}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};
export default ButtonComponent;
