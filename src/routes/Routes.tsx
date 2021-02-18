import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import {Onboarding} from "../Pages/Onboarding";
import Login from "../Pages/Login";
import ResourcePage from "../Pages/ResourcePage";
import FarmersPage from "../Pages/FarmersPage";
import MyAccount from "../Pages/MyAccount";
import NotificationPage from "../Pages/NotificationPage";
import Builder from "../Pages/Builder";
import SelectTemplate from "../Pages/SelectTemplate";
import StrategyConfirmation from "../Pages/StrategyConfirmation";
import { ProtectedRoute } from "components/ProtectedRoute";
import { MyAccountNew } from "Pages/MyAccountNew/MyAccountNew";
import { Onboarding1 } from "Pages/Onboarding/Onboarding1";


export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" children={<LandingPage />} />
          <Route exact path="/onboarding" children={<Onboarding />} />
          <Route path="/onboarding/1" children={<Onboarding1 />} />
          <Route path="/login" children={<Login />} />
          <ProtectedRoute path="/strategy/build" children={<Builder />} />
          <Route path="/resource" children={<ResourcePage />} />
          <ProtectedRoute path="/farmers" children={<FarmersPage />} />
          <ProtectedRoute path="/myaccount" children={<MyAccount />} />
          <Route path="/myaccount_new"><MyAccountNew /></Route>
          <Route path="/strategy/new" children={<SelectTemplate />} />
          <Route path="/strategy/confirmation" children={<StrategyConfirmation />} />
          <Route path="/notification" children={<NotificationPage />} />
        </Switch>
    </Router>
  );
}
