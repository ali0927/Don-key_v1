import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
const ButtonComponent = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={props.variant}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};
export default ButtonComponent;
