import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Providers } from "Providers";

// if (process.env.REACT_APP_ENV === "production") {
Sentry.init({
  dsn: "https://f5226d4ae8f2459db1606e17d1de5336@o994153.ingest.sentry.io/5952696",
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.REACT_APP_ENV,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.6,
});
// }

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<div />}>
      <Providers>
        <App />
      </Providers>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
