import { ThunkAction } from "redux-thunk";
import { IStoreState } from "./reducers/rootReducer";


export type Thunk = ThunkAction<any, IStoreState,null, any>;