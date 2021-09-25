import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { Navigate } from "components/Navigate";
import Logo2 from "./donkeylogo-black.svg";

const Image = styled.img`
  position: relative;
  width: 100px;
`;

export const Logo = () => {

  return (
    <Navbar.Brand onClick={(e: any) => e.preventDefault()}>
      <Navigate
        className="d-flex align-items-center inherit-color no-underline"
        to="/"
      >
        <Image  src={Logo2} alt="Don key Logo" />
      </Navigate>
    </Navbar.Brand>
  );
};
