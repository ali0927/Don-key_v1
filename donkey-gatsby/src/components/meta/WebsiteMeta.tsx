import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";
import url from "url";

import ImageMeta from "./ImageMeta";

const WebsiteMeta = ({
  data,
  settings,
  canonical,
  title,
  description,
  image,
  type,
}: {
  data: {
    title: string;
    meta_title: string;
    meta_description: string;
    name: string;
    feature_image: string;
    description: string;
    bio: string;
    profile_image: string;
  };
  settings: {
    logo: string;
    description: string;
    title: string;
    twitter: string;
  };
  canonical: string;
  title: string;
  description: string;
  image: string;
  type: "WebSite" | "Series";
}) => {
  const publisherLogo = url.resolve("https://don-key.finance", settings.logo);
  let shareImage =
    image || data.feature_image || _.get(settings, `cover_image`, null);

  shareImage = shareImage
    ? url.resolve("https://don-key.finance", shareImage)
    : null;

  description =
    description ||
    data.meta_description ||
    data.description ||
    settings.description;
  title = `${title || data.meta_title || data.name || data.title} - ${
    settings.title
  }`;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: 500,
          height: 300,
        }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: settings.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": "https://don-key.finance",
    },
    description,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {settings.twitter && (
          <meta
            name="twitter:site"
            content={`https://twitter.com/${settings.twitter.replace(
              /^@/,
              ``
            )}/`}
          />
        )}
        {settings.twitter && (
          <meta name="twitter:creator" content={settings.twitter} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  );
};

export default WebsiteMeta;
