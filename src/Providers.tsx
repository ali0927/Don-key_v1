import { NotificationProvider } from "components/Notification";
import { TooltipProvider } from "components/TooltipProvider";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import { Web3NetworkProvider } from "components/Web3NetworkDetector";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Web3NetworkProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </Web3NetworkProvider>
          </SnackbarProvider>
        </NotificationProvider>
      </ApolloProvider>
    </Provider>
  );
};
