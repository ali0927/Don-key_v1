import { NotificationProvider } from "components/Notification";
import { TooltipProvider } from "components/TooltipProvider";
import { Web3Provider } from "don-components";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { SnackbarProvider } from "notistack";
export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </SnackbarProvider>
      </NotificationProvider>
    </Provider>
  );
};
