import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "./src/scss/styles.scss";
import { Providers } from "./src/providers";

import React from "react";
export const wrapRootElement = ({ element }) => {
  return <Providers>{element}</Providers>;
};
