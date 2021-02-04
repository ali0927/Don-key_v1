import { Middleware } from "redux";
import { ApiActions, onApiError, onApiSuccess } from "actions/apiActions";
import { api } from "services/api";

export const apiMiddleware: Middleware = (store) => (next) => async (
  action: ApiActions
) => {
  next(action);

  const dispatch = store.dispatch;
  switch (action.type) {
    case "API_REQUEST": {
      const req = action.payload;
      try {
        const res = await api({ method: req.method, url: req.endpoint });

        dispatch(onApiSuccess({ data: res.data, statusCode: res.status }));
        req.onDone && req.onDone(res);
      } catch (e) {
        if ("response" in e) {
          req.onFail && req.onFail(e.response);
        }
        dispatch(onApiError(e));
      }
    }
  }
};
