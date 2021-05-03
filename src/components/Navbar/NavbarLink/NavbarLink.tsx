import * as React from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styled from "styled-components";

const CustomizedLink = styled(Link)`
    font-weight: 400; 
    font-size: 16px;
    line-height: 19px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    padding: .5rem 1rem;
    padding-left: 0px;
    text-decoration: none !important;
    background-color: transparent;

    @media (min-width: 992px){
      padding-left: .5rem;
    }

    @media (min-width: 768px){
      padding-right: 3rem!important;
    }

`

export const NavbarLink = ({ to, children, linkColor = "black" }: { to: string; children: React.ReactNode; linkColor?: "white" | "black" }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLinkClick = (to: any) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(to);

  }

  return (
    <CustomizedLink
      className={clsx("pr-md-5", { active: pathname === to, "colorBlack": linkColor === "black", "text-white": linkColor === "white" })}
      // component={Nav.Link}
      to={to}
      onClick={handleLinkClick(to)}
    >
      {children}
    </CustomizedLink>
      
    );
  };