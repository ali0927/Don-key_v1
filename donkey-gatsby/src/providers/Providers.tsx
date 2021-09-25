import { ApolloProvider } from "@apollo/client";
import { client } from "apolloClient";
import { NotificationProvider } from "components/Notification";
import { TooltipProvider } from "components/TooltipProvider";
import { SnackbarProvider } from "notistack";
import { Web3Provider } from "don-components";
import { StakingContractProvider } from "components/StakingContractProvider";
import { ReferralStateProvider } from "contexts/ReferralContext";
import React from "react";
import { WebsiteMeta } from "components/meta";
import { Helmet } from "react-helmet";

export const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <WebsiteMeta
        title="Don-Key"
        description="Social trading meets yield farming"
        canonical="https://www.don-key.finance"
        image="https://don-key.finance/images/donkey-icon.png"
      />
      <Helmet>
       {/** Slick slider cdns */}
      <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-92MQHF1VSY"
        />
        <script>
          {`  window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-92MQHF1VSY");`}
        </script>

        <script>
          {`  (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-WFXZ83K");`}
        </script>
      </Helmet>
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
