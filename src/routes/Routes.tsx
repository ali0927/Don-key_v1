import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Login from "../Pages/Login";
import ResourcePage from "../Pages/ResourcePage";
import FarmersPage from "../Pages/FarmersPage";
import NotificationPage from "../Pages/NotificationPage";
import SelectTemplate from "../Pages/SelectTemplate";
import StrategyConfirmation from "../Pages/StrategyConfirmation";
import { ProtectedRoute } from "components/ProtectedRoute";
import { MyAccountNew } from "Pages/MyAccountNew/MyAccountNew";
import { DashboardPage } from "Pages/DashboardPage/DashboardPage";
import { InvestmentPage } from "Pages/InvestmentPage/InvestmentPage";
import TeamPage from "Pages/TeamPage/TeamPage";
import { FarmerStrategyPage } from "Pages/FarmerStrategyPage/FarmerStrategyPage";
import { lazy, Suspense } from "react";
import { FarmerSignupPage } from "Pages/FarmerSignupPage/FarmerSignupPage";
import { FarmerBioPage } from "Pages/FarmerBioPage";
import { LoadingPage } from "Pages/LoadingPage";

const Builder = lazy(() => import("../Pages/Builder"));

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<LandingPage />} />
        <Route exact path="/dashboard" children={<DashboardPage />} />
        <ProtectedRoute
          exact
          path="/dashboard/farmer/signup"
          children={<FarmerSignupPage />}
        />
        <ProtectedRoute
          exact
          path="/dashboard/farmer/:id"
          children={<FarmerBioPage />}
        />
        <Route exact path="/strategy" children={<InvestmentPage />} />
        <Route
          exact
          path="/farmer/strategy"
          children={<FarmerStrategyPage />}
        />
        <Route path="/login" children={<Login />} />
        <ProtectedRoute
          path="/strategy/build"
          children={
            <Suspense fallback={<LoadingPage />}>
              <Builder />
            </Suspense>
          }
        />
        <Route path="/resource" children={<ResourcePage />} />
        <Route path="/farmers" children={<FarmersPage />} />
        <Route path="/team" children={<TeamPage />} />
        <ProtectedRoute path="/myaccount" children={<FarmerStrategyPage />} />
        <Route path="/myaccount_new">
          <MyAccountNew />
        </Route>
        <Route path="/strategy/new" children={<SelectTemplate />} />
        <Route
          path="/strategy/confirmation"
          children={<StrategyConfirmation />}
        />
        <Route path="/notification" children={<NotificationPage />} />
      </Switch>
    </Router>
  );
}
