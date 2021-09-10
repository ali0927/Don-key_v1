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
        <Route exact path="/withdraw" children={<WithdrawPage />} />
        <Route
          exact
          path="/dashboard"
          children={
            <Suspense fallback={<LoadingPage />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/dashboard/farmer/me"
          children={
            <Suspense fallback={<LoadingPage />}>
              <FarmerBioPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/dashboard/farmer/:id"
          children={
            <Suspense fallback={<LoadingPage />}>
              <FarmerBioPage />
            </Suspense>
          }
        />

        <Route
          exact
          path="/dashboard/investment"
          children={
            <Suspense fallback={<LoadingPage />}>
              <InvestmentsPageParent />
            </Suspense>
          }
        />
        <Route
          exact
          path="/dashboard/referrals"
          children={
            <Suspense fallback={<LoadingPage />}>
              <MyReferrals />
            </Suspense>
          }
        />
        <Route
          exact
          path="/dashboard/:network/:token"
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
