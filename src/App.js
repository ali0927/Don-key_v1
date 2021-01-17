import React from "react";
import { NotificationProvider } from "./components/Notification/NotificationProvider";
import Routes from "./routes/Routes";
function App() {
  return (
    <div>
      <NotificationProvider>
      <Routes />
      </NotificationProvider>
    </div>
  );
}

export default App;
