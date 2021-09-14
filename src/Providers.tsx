import { NotificationProvider } from "components/Notification";
import { TooltipProvider } from "components/TooltipProvider";
import React from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import { Web3Provider } from "don-components";
import { StakingContractProvider } from "components/StakingContractProvider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloProvider client={client}>
      <NotificationProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Web3Provider>
            <StakingContractProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </StakingContractProvider>
          </Web3Provider>
        </SnackbarProvider>
      </NotificationProvider>
    </ApolloProvider>
  );
};
