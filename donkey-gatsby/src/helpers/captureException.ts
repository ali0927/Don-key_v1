import LogRocket from "logrocket";

export const captureException = (e: any, msg: string) => {
  // const scope = new Sentry.Scope();
  if (process.env.NODE_ENV === "development") {
    console.log(e, msg);
  }else {
    LogRocket.captureException(e, {extra: {msg}});
  }

 
  // LogRocket.captureMessage(msg);
};
