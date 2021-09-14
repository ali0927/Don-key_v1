import * as React from "react";

import clsx from "clsx";
import styled, { keyframes } from "styled-components";
import { Navigate } from "components/Navigate";
import { useRouter } from "next/router";

const moveInAnimation = keyframes`
  0%   {
    border: 2px solid #222222;
    width: calc(50% - 3em);
  }
  100% {
    border: 2px solid #222222;
    width: calc(100% - 4.5em);
  }`;

const styles = `
  font-weight: 500;
  font-family: Poppins;
  font-size: 14px;
  line-height: 19px;
  display: -webkit-flex;
  display: flex;
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
    padding-left: 1.0rem;
  }
  color: #070602;

  &:hover {
    color: #070602;
  }
  

  

  @media (min-width: 800px) {
    padding-right: 3rem !important;
  }`;

// .nav-item:hover:after {
//   position: absolute;
//   content: "";
//   bottom: -6px;
//   background: #222222;
//   animation-name: ${moveInAnimation};
//   animation-duration: 1s;
//   animation-fill-mode: forwards;
// }

const CustomizedLink = styled(Navigate)`
  ${styles};
  position: relative;
  :hover:after {
    cursor: pointer;
    position: absolute;
    content: "";
    bottom: -6px;
    background: #222222;
    animation-name: ${moveInAnimation};
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
  .active:before {
    border: 2px solid #222222;
    position: absolute;
    content: "";
    bottom: -6px;
    width: 16px;
    background: #222222;
  }
  .active {
    font-weight: bold;
    position: relative;
  }
`;
const Customizeda = styled.a`
  ${styles}
  position: relative;
  :hover:after {
    cursor: pointer;
    position: absolute;
    content: "";
    bottom: -6px;
    background: #222222;
    animation-name: ${moveInAnimation};
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
  .active:before {
    border: 2px solid #222222;
    position: absolute;
    content: "";
    bottom: -6px;
    width: 16px;
    background: #222222;
  }
  .active {
    font-weight: bold;
    position: relative;
  }
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
  const router = useRouter();
  const { pathname } = router;

  const className = clsx("pr-md-5", {
    active: pathname === to,
    "nav-item": pathname !== to,
    colorBlack: linkColor === "black",
    "text-white": linkColor === "white",
  });

  const handleRoute = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(to)
  };

  if (link) {
    return (
      <Customizeda
        className={className}
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
      onClick={handleRoute}
      target={target === "openInCurrentTab" ? "_self" : "_blank"}
    >
      {children}
    </CustomizedLink>
  );
};
