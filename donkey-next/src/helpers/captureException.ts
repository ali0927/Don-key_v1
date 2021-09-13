import * as Sentry from "@sentry/react";
export const captureException = (e: any, msg: string) => {
    const scope = new Sentry.Scope();
    scope.setExtra("Message", msg)
    Sentry.captureException(e, scope);
}