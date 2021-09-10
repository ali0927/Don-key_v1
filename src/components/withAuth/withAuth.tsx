
import { doLogin } from "actions/authActions";
import { setFarmerDetail } from "actions/farmerActions";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { IStoreState, IUser } from "interfaces";
import { LoadingPage } from "Pages/LoadingPage";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";
import * as Sentry from "@sentry/react";
export const withAuth = (element?: RouteProps["children"]) => {
  if (!element) {
    return element;
  }
  const NewComp = () => {
    const isLoggedIn = useSelector(
      (state: IStoreState) => state.auth.isLoggedIn
    );
    const dispatch = useDispatch();

    const { doMetaMaskLogin } = useMetaMaskLogin();

    useEffect(() => {
   
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showLoader = !isLoggedIn;
    return (
      <>{showLoader ? createPortal(<LoadingPage />, document.body) : element}</>
    );
  };
  return <NewComp />;
};
