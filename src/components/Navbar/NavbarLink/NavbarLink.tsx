import * as React from "react";
import {  useLocation } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styled from "styled-components";

const styles = `
  font-weight: 400;
  font-family: Poppins;
  font-size: 16px;
  line-height: 19px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  padding: 0.5rem 1rem;
  padding-left: 0px;
  text-decoration: none !important;
  background-color: transparent;
  cursor: pointer;
  word-spacing: 0pt;
  letter-spacing: 1pt;
  position: relative;
  @media (min-width: 992px) {
    padding-left: 0.5rem;
  }

  // :hover {
  //   animation: move 1s;
  //   border-bottom: 3px solid #222222;
  // }

  @media (min-width: 800px) {
    padding-right: 3rem !important;
  }`;

const CustomizedLink = styled(Link)`
  ${styles}
`;
const Customizeda = styled.a`
  ${styles}
`;

export const NavbarLink = ({
  to,
  children,
  linkColor = "black",
  target = "openInCurrentTab",
  link,
}: {
  to: string;
  children: React.ReactNode;
  linkColor?: "white" | "black";
  link?: boolean;
  target?: "openInNewTab" | "openInCurrentTab";
}) => {
  const { pathname } = useLocation();

  const className = clsx("pr-md-5", {
    active: pathname === to,
    "nav-item": pathname !== to,
    colorBlack: linkColor === "black",
    "text-white": linkColor === "white",
  });
  if (link) {
    return (
      <Customizeda
        className={className}
        href={to}
        target={target === "openInCurrentTab" ? "_self" : "_blank"}
      >
        {children}
      </Customizeda>
    );
  }
  return (
    <CustomizedLink
      className={className}
      to={to}
      target={target === "openInCurrentTab" ? "_self" : "_blank"}
    >
      {children}
    </CustomizedLink>
  );
};
