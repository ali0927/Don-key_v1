import * as React from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import clsx from "clsx";

export const NavbarLink = ({ to, children, linkColor = "black" }: { to: string; children: React.ReactNode; linkColor?: "white" | "black" }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLinkClick = (to: any) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(to);

  }

  return (
    <Link
      className={clsx("pr-md-5", { active: pathname === to, "colorBlack": linkColor === "black", "text-white": linkColor === "white" })}
      component={Nav.Link}
      to={to}
      onClick={handleLinkClick(to)}
    >
      {children}
    </Link>
      
    );
  };