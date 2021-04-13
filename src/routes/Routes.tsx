import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import FarmersPage from "../Pages/FarmersPage";
import TeamPage from "Pages/TeamPage/TeamPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<LandingPage />} />
        <Route path="/farmers" children={<FarmersPage />} />
        <Route path="/team" children={<TeamPage />} />
      </Switch>
    </Router>
  );
}
