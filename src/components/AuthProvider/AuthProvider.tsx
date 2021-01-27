import { verifyAuthToken } from "actions/authActions";
import { AuthToken } from "constants/constants";
import { IStoreState } from "interfaces";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const AuthProvider: React.FC = ({ children }) => {
  const isLoggedIn = useSelector((state: IStoreState) => state.auth.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  const verifyToken = (token: string) => {
    return new Promise<void>((res, rej) => {
      dispatch(
        verifyAuthToken({
          token,
          onDone: res,
          onFail: rej,
        })
      );
    });
  };

  // only run on first mount
  useEffect(() => {
    if (!isLoggedIn) {
      const token = localStorage.getItem(AuthToken);

      //verify token and fetch user details
      verifyToken(token as string).catch(() => {
        history.push("/login");
        localStorage.removeItem(AuthToken);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
