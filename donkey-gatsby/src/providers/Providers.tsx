import { ApolloProvider } from "@apollo/client";
import { client } from "apolloClient";
import { NotificationProvider } from "components/Notification";
import { TooltipProvider } from "components/TooltipProvider";
import { SnackbarProvider } from "notistack";
import { Web3Provider } from "don-components";
import { StakingContractProvider } from "components/StakingContractProvider";
import { ReferralStateProvider } from "contexts/ReferralContext";
import React from "react";

export const Providers: React.FC = ({ children }) => {
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
              <ReferralStateProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </ReferralStateProvider>
            </StakingContractProvider>
          </Web3Provider>
        </SnackbarProvider>
      </NotificationProvider>
    </ApolloProvider>
  );
};
