import { AxiosResponse } from "axios";
import { action } from "typesafe-actions";

export const onApiRequest = (args: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  onDone?: (res: AxiosResponse) => void;
  onFail?: (res: AxiosResponse) => void;
}) => {
  return action("API_REQUEST", args);
};

export const onApiSuccess = <T extends any>(args: {
  data: T;
  statusCode: number;
}) => {
  return action("API_REQUEST_SUCCESS", );
};

export const onApiError = (err: any) => {
    return action("API_REQUEST_ERROR", err);
};
