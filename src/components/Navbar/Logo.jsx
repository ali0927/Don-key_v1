import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Navbar.Brand onClick={(e) => e.preventDefault()}>
      <Link
        className="d-flex align-items-center inherit-color no-underline"
        to="/"
      >
        <p
          className="m-0"
          style={{ fontFamily: "Avenir-Bold", fontWeight: "bolder" }}
        >
          <span style={{ letterSpacing: "2px" }}>
            D
            <img
              style={{ position: "relative", width: 24, top: 2, marginLeft: -2, marginRight: -1 }}
              src="/assets/images/logo-don.png"
              className="d-inline-block align-top by-logo"
              alt="Logo" />
            n
          </span>
          {" "}-{" "}key
        </p>
      </Link>
    </Navbar.Brand>
  );
};
