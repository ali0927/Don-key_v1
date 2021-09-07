import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components"
import LogoDon from "images/logo-don.png"

const Pargraph = styled.p`
   font-family: ObjectSans-Bold;
   margin: 0;
`;

const Image = styled.img`
  position: relative;
  width: 24px;
  top: -2px;
  margin-left: -2px;
  margin-right: -1px;
`;

export const Logo = () => {
  const key= " - key";
  return (
    <Navbar.Brand onClick={(e: any) => e.preventDefault()}>
      <Link
        className="d-flex align-items-center inherit-color no-underline"
        to="/"
      >
    
           <Pargraph >
               <span  style={{letterSpacing: 2}}>D
                  <Image src={LogoDon} alt="Logo not found"/>n
               </span>
               <span></span>
              <span>{key}</span>
           </Pargraph>
     
      </Link>
    </Navbar.Brand>
  );
};
