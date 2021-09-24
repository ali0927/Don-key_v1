import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Handler } from "@netlify/functions";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
const strapi = axios.create({
  baseURL: process.env.GATSBY_STRAPI_URL,
  validateStatus: (status) => status < 500 && status >= 200,
});

type Data = {
  shortcode: string;
  referralcode: string;
  walletAddress: string;
  poolAddress: string;
  url: string;
  created_at: string;
  updated_at: string;
  referral_image: {
    id: number;
  };
};
type Meta = {
  title: string;
  description: string;
  author: string;
  slug: string;
};
const fetchUrlFromCode = async (code: string) => {
  const res = await strapi.get("/short-links?shortcode=" + code);
  console.log(strapi.defaults.baseURL, "base");
  return res.data[0] as Data;
};

const fetchMetaFromPoolAddress = async (poolAddress: string) => {
  const res = await strapi.get("farmers?poolAddress=" + poolAddress);
  const farmer = res.data[0];
  return {
    title: farmer.strategies[0].name,
    author: farmer.name,
    description: farmer.description,
    slug: farmer.slug,
  } as Meta;
};

function SharePage({ data, meta }: { data?: Data; meta?: Meta }) {
  useEffect(() => {
    if (!data || !meta) {
      return;
    }
    setTimeout(() => {
      window.location.assign(data.url);
    }, 3000);
  }, [data, meta]);

  if (!data || !meta) {
    return <div>Invalid Link</div>;
  }

  const title = meta.title + " Strategy By " + meta.author;
  const imagePath = `https://${
    process.env.GATSBY_API_URL || `localhost:3000`
  }/api/v2/referral-image?image_id=${data.referral_image.id}&slug=${meta.slug}`;
  const {description} = meta;
  const canonical = "https://don-key.finance";
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Helmet
        title={title}
        meta={[
          {
            name: "description",
            content: meta.description,
          },
          {
            name: "twitter:site",
            content: "@Don_key_finance",
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:handle",
            content: "@Don_key_finance",
          },
          { name: "twitter:image", content: imagePath },
        ]}
      >

        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
      </Helmet>

      {/* <Loader /> */}
    </div>
  );
}

const handler: Handler = async (event) => {
  const params = event.queryStringParameters;
  if (!params || !params.code) {
    return {
      statusCode: 404,
      body: "Not Found",
    };
  }
  const data = await fetchUrlFromCode(params.code);
  if (!data) {
    return {
      statusCode: 404,
      body: "Not Found",
    };
  }
  const pageMeta = await fetchMetaFromPoolAddress(data.poolAddress);

  let html = ``;
  let styles = ``;
  const sheet = new ServerStyleSheet();

  try {
    html = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <SharePage data={data} meta={pageMeta} />
      </StyleSheetManager>
    );
    styles = sheet.getStyleTags();
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }
  const helmet = Helmet.renderStatic();
  const finalHtml = `
<html>
<head>
<link
href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
rel="stylesheet"
/>
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}

${styles}
<script>
window.onload = () => {
  setTimeout(() => {
    window.location.assign("${data.url}");
  }, 3000);
}
</script>

</head>
<body>
Redirecting...
</body>
</html>
`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: finalHtml,
  };
};

export { handler };
