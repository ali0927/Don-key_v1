import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Login } from "pages/Login";
import { Dashboard } from "pages/Dashboard";
import { User } from "pages/User";
import { Protocol } from "pages/Protocol";
import { Farmers } from "pages/Farmers";
import { Strategy } from "pages/Strategy";



export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={User}/>
          <Route exact path="/protocols" component={Protocol} />
          <Route exact path="/farmers" component={Farmers} />
          <Route exact path="/strategies" component={Strategy} />
        </Switch>
    </Router>
  );
}
