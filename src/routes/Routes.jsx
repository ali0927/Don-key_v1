import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Onboarding from "../Pages/Onboarding";
import Login from "../Pages/Login";
import ResourcePage from "../Pages/ResourcePage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<LandingPage />} />
        <Route path="/onboarding" children={<Onboarding />} />
        <Route path="/login" children={<Login />} />
        <Route path="/resource" children={<ResourcePage />} />
      </Switch>
    </Router>
  );
}
