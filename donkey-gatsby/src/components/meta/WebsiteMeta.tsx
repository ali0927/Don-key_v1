import React from "react";
import { Helmet } from "react-helmet";

import ImageMeta from "./ImageMeta";

const WebsiteMeta = ({
  canonical,
  title,
  description,
  image,
}: {
  canonical: string;
  title: string;
  description: string;
  image: string;
}) => {
  // const jsonLd = {
  //   "@context": `https://schema.org/`,
  //   "@type": type,
  //   url: canonical,
  //   image: shareImage
  //     ? {
  //         "@type": `ImageObject`,
  //         url: shareImage,
  //         width: 500,
  //         height: 300,
  //       }
  //     : undefined,
  //   publisher: {
  //     "@type": `Organization`,
  //     name: settings.title,
  //     logo: {
  //       "@type": `ImageObject`,
  //       url: publisherLogo,
  //       width: 60,
  //       height: 60,
  //     },
  //   },
  //   mainEntityOfPage: {
  //     "@type": `WebPage`,
  //     "@id": "https://don-key.finance",
  //   },
  //   description,
  // };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {/* <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script> */}
      </Helmet>
      <ImageMeta image={image} />
    </>
  );
};

export default WebsiteMeta;
