import { DefaultSeo } from "next-seo";
import "../scss/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { Providers } from "providers/Providers";

export default function MyApp({ Component, pageProps }: any) {
  return (
    /* Here we call NextSeo and pass our default configuration to it  */

    <Providers>
      <DefaultSeo
        defaultTitle="Don-key"
        description="Social trading meets yield farming"
        canonical="https://www.don-key.finance"
        openGraph={{
          title: "Don-key",
          url: "https://don-key.finance/",
          type: "website",
          site_name: "Donkey",
          description: "Social trading meets yield farming",
          images: [{ url: "https://don-key.finance/images/donkey-icon.png" }],
        }}
        twitter={{
          site: "@Don_key_finance",
          handle: "@Don_key_finance",
          cardType: "summary_large_image",
        }}
      />

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-92MQHF1VSY"
        strategy="lazyOnload"
      />
      <Script strategy="lazyOnload">
        {`  window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-92MQHF1VSY");`}
      </Script>

      <Script strategy="lazyOnload">
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
      </Script>
      <Component {...pageProps} />
    </Providers>
  );
}
