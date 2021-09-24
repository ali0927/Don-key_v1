import * as Sentry from "@sentry/react";
export const captureException = (e: any, msg: string) => {
    const scope = new Sentry.Scope();
    if(process.env.NODE_ENV === "development"){
        console.log(e, msg);
    }
    scope.setExtra("Message", msg)
    Sentry.captureException(e, scope);
}