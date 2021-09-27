import React from "react";
import styled from "styled-components";
import { Navigate } from "components/Navigate";
import Logo2 from "./donkeylogo-black.svg";

const Image = styled.img`
  position: relative;
  width: 100px;
`;

export const Logo = (props: {className?: string}) => {
  return (
    <Navigate
      className={props.className}
      to="/"
    >
      <Image src={Logo2} alt="Don key Logo" />
    </Navigate>
  );
};
