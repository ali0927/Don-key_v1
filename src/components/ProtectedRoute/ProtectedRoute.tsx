import { IStoreState } from "interfaces";
import { LoadingPage } from "Pages/LoadingPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router-dom";

export const ProtectedRoute = (props: RouteProps) => {
  const isLoggedIn = useSelector((state: IStoreState) => state.auth.isLoggedIn);
  let extras: any = {};
  if (!isLoggedIn) {
    extras = {
      children: <LoadingPage />,
    };
  }
  return <Route {...props} {...extras} />;
};
