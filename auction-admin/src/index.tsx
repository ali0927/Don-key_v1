import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { Web3Provider } from "don-components";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      initializeOnMount
      appId="a6CWYm0VBZKltQy4lcSOyEIAo4NoTM8hv28KCnYz"
      serverUrl="https://pmvfcikhqlef.usemoralis.com:2053/server"
    >
      <Web3Provider>
        <App />
      </Web3Provider>
      
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
