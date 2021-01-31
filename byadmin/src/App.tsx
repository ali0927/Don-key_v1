import React from "react";
import { Routes } from "routes";
import { ToastProvider } from "react-toast-notifications";
import "rsuite-table/dist/css/rsuite-table.css";
function App() {
  return (
    <div className="by__root">
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </div>
  );
}

export default App;
