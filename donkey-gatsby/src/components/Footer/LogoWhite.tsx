import React from "react";
import { Navigate } from "components/Navigate";

export const LogoWhite = () => {
  return (
    <Navigate
      to="/"
      className="d-flex align-items-center inherit-color no-underline"
    >
      <p
        className="m-0"
        style={{
          fontFamily: "Avenir-Bold",
          fontWeight: "bolder",
          color: "#fff",
          fontSize: 24,
        }}
      >
        <span style={{ letterSpacing: "2px" }}>
          D
          <img
            style={{
              position: "relative",
              width: 24,
              top: 5,
              marginLeft: -2,
              marginRight: -1,
            }}
            src="/assets/images/logo-don.png"
            className="d-inline-block align-top by-logo"
            alt="Logo"
          />
          n
        </span>{" "}
        - key
      </p>
    </Navigate>
  );
};
