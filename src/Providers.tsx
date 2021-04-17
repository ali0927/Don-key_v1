import { Web3ReactProvider } from "@web3-react/core";
import { NotificationProvider } from "components/Notification";
import { TooltipProvider } from "components/TooltipProvider";
import { getLibrary } from "helpers";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <NotificationProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </NotificationProvider>
      </Web3ReactProvider>
    </Provider>
  );
};
