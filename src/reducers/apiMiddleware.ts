import { Middleware } from "redux";
import { ApiActions, onApiError, onApiSuccess } from "actions/apiActions";
import { AuthActions, doLogin, doLogout } from "actions/authActions";
import { IStoreState } from "interfaces";
import { api } from "don-utils";
import { captureException } from "helpers";

export const apiMiddleware: Middleware<any, IStoreState> = (store) => (
  next
) => async (action: ApiActions | AuthActions) => {
  next(action);

  const dispatch = store.dispatch;
  switch (action.type) {
    case "API_REQUEST":
      {
        const req = action.payload;
        try {
          const res = await api({
            method: req.method,
            url: req.endpoint,
            data: req.data,
          });
          if (res.data.user) {
            if (!store.getState().auth.user) {
              dispatch(doLogin(res.data.user));
            }
          } else {
            dispatch(doLogout());
          }
          dispatch(
            onApiSuccess({
              ...req,
              data: res.data,
              statusCode: res.status,
            })
          );
          req.onDone && req.onDone(res);
        } catch (e:any) {
          captureException(e, "apiMiddleware");
          if (e.response) {
            if (e.response.status === 401) {
              dispatch(doLogout());
            }
            req.onFail && req.onFail(e.response);
          }
          dispatch(onApiError({ ...req, err: e }));
        }
      }
      break;
    case "USER_LOGOUT": {
      // if (typeof window !== "undefined") {
      //     window.location.assign(window.location.origin + "/login");
      // }
    }
  }
};
