import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { Navigate } from "components/Navigate";
import Logo2 from "./Logo2.png";

const Image = styled.img`
  position: relative;
  width: 24px;
  top: -2px;
  margin-left: -2px;
  margin-right: -1px;
`;

export const Logo = () => {

  return (
    <Navbar.Brand onClick={(e: any) => e.preventDefault()}>
      <Navigate
        className="d-flex align-items-center inherit-color no-underline"
        to="/"
      >
        <Image loading="eager" width="85px" height="25px" src={Logo2} alt="Don key Logo" />
      </Navigate>
    </Navbar.Brand>
  );
};