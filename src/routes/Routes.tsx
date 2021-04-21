import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "Pages/LandingPage";
import { ProtectedRoute } from "components/ProtectedRoute";
import React, { lazy, Suspense } from "react";
import { LoadingPage } from "Pages/LoadingPage";
import TeamPage from "Pages/TeamPage";
import FarmersPage from "Pages/FarmersPage";
import { Web3Provider } from "don-components";

const Builder = lazy(() => import("Pages/Builder"));
const DecodedStrategyPage = lazy(() => import("Pages/DecodedStrategyPage"));
const DashboardPage = lazy(() => import("Pages/DashboardPage"));
const FarmerBioPage = lazy(() => import("Pages/FarmerBioPage"));
const InvestmentsPage = lazy(() => import("Pages/InvestmentsPage"));
const DevelopersPage = lazy(() => import("Pages/DevelopersPage"));
const SelectTemplate = lazy(() => import("Pages/SelectTemplate"));
const FarmerSignupPage = lazy(() => import("Pages/FarmerSignupPage"));

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<LandingPage />} />
        <Route path="/farmers" children={<FarmersPage />} />
        <Route path="/team" children={<TeamPage />} />

        <ProtectedRoute
          exact
          path="/dashboard"
          children={
            <Suspense fallback={<LoadingPage />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/farmer/signup"
          children={
            <Suspense fallback={<LoadingPage />}>
              <FarmerSignupPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/farmer/me"
          children={
            <Suspense fallback={<LoadingPage />}>
              <FarmerBioPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/farmer/:id"
          children={
            <Suspense fallback={<LoadingPage />}>
              <FarmerBioPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/developers"
          children={
            <Suspense fallback={<LoadingPage />}>
              <DevelopersPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/investment"
          children={
            <Suspense fallback={<LoadingPage />}>
              <InvestmentsPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          path="/strategy/build"
          children={
            <Suspense fallback={<LoadingPage />}>
              <Builder />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/decoded-strategy/:strategyaddress"
          children={
            <Suspense fallback={<LoadingPage />}>
              <DecodedStrategyPage />
            </Suspense>
          }
        />
        <ProtectedRoute
          path="/strategy/new"
          children={
            <Suspense fallback={<LoadingPage />}>
              <SelectTemplate />
            </Suspense>
          }
        />
      </Switch>
    </Router>
  );
}
