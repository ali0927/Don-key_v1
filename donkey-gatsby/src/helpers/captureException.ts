import LogRocket from "logrocket";

export const captureException = (e: any, msg: string) => {
  // const scope = new Sentry.Scope();
  if (process.env.NODE_ENV === "development") {
    console.log(e, msg);
  }

  LogRocket.captureException(e);
  LogRocket.captureMessage(msg);
};
