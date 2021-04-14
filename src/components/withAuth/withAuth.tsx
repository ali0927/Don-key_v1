import { apiRequest } from "actions/apiActions";
import { doLogin } from "actions/authActions";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { IStoreState } from "interfaces";
import { LoadingPage } from "Pages/LoadingPage";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps, useHistory } from "react-router-dom";

export const withAuth = (element?: RouteProps["children"]) => {
  if (!element) {
    return element;
  }
  const NewComp = () => {
    const isLoggedIn = useSelector(
      (state: IStoreState) => state.auth.isLoggedIn
    );
    const dispatch = useDispatch();


    const {doMetaMaskLogin} = useMetaMaskLogin();

    useEffect(() => {
      dispatch(
        apiRequest({
          method: "GET",
          endpoint: "/api/v1/farmer",
          onDone: (res) => {
            dispatch(doLogin(res.data.user))
          },
          onFail: (res) => {
           doMetaMaskLogin()
          },
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {!isLoggedIn ? createPortal(<LoadingPage />, document.body) : element}
      </>
    );
  };
  return <NewComp />;
};
