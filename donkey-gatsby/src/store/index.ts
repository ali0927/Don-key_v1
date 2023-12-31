import LogRocket from "logrocket";
import { applyMiddleware, compose } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/rootReducer";


//@ts-ignore
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,LogRocket.reduxMiddleware())));