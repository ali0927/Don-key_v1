import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";

export default function Routes() {
  return (
    <Router>
      <LandingPage />
    </Router>
  );
}
