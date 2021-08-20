import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "Pages/LandingPage";
import { ProtectedRoute } from "components/ProtectedRoute";
import { lazy, Suspense } from "react";
import { LoadingPage } from "Pages/LoadingPage";
import TeamPage from "Pages/TeamPage";
import { LotteryParticipatePage } from "Pages/LotteryPage/LotteryParticipatePage";
import { LotteryCongratulations } from "Pages/LotteryPage/LotteryCongratulations";
import FarmerSignupPage from "Pages/FarmerSignupPage";
import { WithdrawPage } from "Pages/WithdrawPage/WithdrawPage";
import Faq from "Pages/Faq/Faq";

const DashboardPage = lazy(() => import("Pages/DashboardPage"));
const FarmerBioPage = lazy(() => import("Pages/FarmerBioPage"));
const InvestmentsPageParent = lazy(() => import("Pages/InvestmentsPageParent"));
const MyReferrals = lazy(() => import("Pages/MyReferrrals"));
const TokenPage = lazy(() => import("Pages/TokenPage"));

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<LandingPage />} />
        <Route path="/farmers" children={<FarmerSignupPage />} />
        <Route path="/team" children={<TeamPage />} />
        <Route exact path="/faq" children={<Faq />} />
        <Route
          exact
          path="/lottery/participate"
          children={<LotteryParticipatePage />}
        />
        <Route
          exact
          path="/lottery/participate/congratulations"
          children={<LotteryCongratulations />}
        />
        <ProtectedRoute exact path="/withdraw" children={<WithdrawPage />} />
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
          path="/dashboard/investment"
          children={
            <Suspense fallback={<LoadingPage />}>
              <InvestmentsPageParent />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/referrals"
          children={
            <Suspense fallback={<LoadingPage />}>
              <MyReferrals />
            </Suspense>
          }
        />
        <ProtectedRoute
          exact
          path="/dashboard/:token"
          children={
            <Suspense fallback={<LoadingPage />}>
              <TokenPage />
            </Suspense>
          }
        />
      </Switch>
    </Router>
  );
}
