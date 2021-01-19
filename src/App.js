import React from "react";
import { NotificationProvider } from "./components/Notification/NotificationProvider";
import { TooltipProvider } from "./components/TooltipProvider";
import Routes from "./routes/Routes";
function App() {
  return (
    <div>
      <NotificationProvider>
        <TooltipProvider>
          <Routes />
        </TooltipProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
