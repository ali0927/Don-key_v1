import { apiRequest } from "actions/apiActions";
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

    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        apiRequest({
          method: "GET",
          endpoint: "/api/v1/farmer",
          onDone: () => {
            console.log("logged in");
          },
          onFail: (res) => {
            if (res) {
              if (res.status === 401) {
                history.push("/login");
              }
            }
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
