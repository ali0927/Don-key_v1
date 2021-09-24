import "bootstrap/dist/css/bootstrap.min.css";
import "./src/scss/styles.scss";
import { Providers } from "./src/providers";
import React from "react";

export const wrapRootElement = ({ element }) => {
  return <Providers>{element}</Providers>;
};
