import React from "react";
import { Navbar } from "react-bootstrap";
import Img from "next/image";
import styled from "styled-components";
import { Navigate } from "components/Navigate";
import donkeylogo from "./donkeylogo-black.svg";

const Image = styled(Img)`
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
        <Image loading="eager" width={130} height={30} src={donkeylogo} alt="Don key Logo" />
      </Navigate>
    </Navbar.Brand>
  );
};
