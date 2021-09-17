import { NextApiHandler } from "next";
import { ReferralImage } from "components/ShareAndEarn/ShareLink/ReferralImage";
import { renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import axios from "axios";
import { getWeb3 } from "don-components";
import { getPoolValueInUSD } from "helpers";
import nodeHtmlToImage from "node-html-to-image";

function convertToInternationalCurrencySystem(labelValue: string) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}
const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  validateStatus: (status) => status < 500 && status >= 200,
});
const GenerateImage: NextApiHandler = async (req, res) => {
  const { image_id, slug, id } = req.query;

  if ((!slug && !id) || !image_id) {
    return res.status(400).send({ msg: "Slug or Id or bgImage Absent" });
  }

  const url = id ? "/farmers?guid=" + id : "/farmers?slug=" + slug;

  const result = await strapi.get(url);
  const imageData = await strapi.get(`/referral-images/${image_id}`);
  const farmerObj = result.data[0];
  const imageUrl = imageData.data?.image?.url;

  if (!imageUrl) {
    return res.status(404).send({ msg: "Image Not Found" });
  }
  if (!farmerObj) {
    return res.status(404).send({ msg: "Farmer Not Found" });
  }
  const sheet = new ServerStyleSheet();
  let html = ``;
  let styles = ``;
  const web3 = getWeb3(farmerObj.network.chainId);
  const strategy = farmerObj.strategies[0];

  const tvl = await getPoolValueInUSD(web3, farmerObj.poolAddress);

  try {
    html = renderToStaticMarkup(
      <StyleSheetManager sheet={sheet.instance}>
        <ReferralImage
          tvl={convertToInternationalCurrencySystem(tvl).toString()}
          apy={strategy.apy}
          bgImage={imageUrl as string}
          farmerName={farmerObj.name}
        />
      </StyleSheetManager>
    );
    styles = sheet.getStyleTags();
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }

  const finalHtml = `
  <html>
  <head>
  <link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  ${styles}
  </head>
  <body>
  ${html}
  </body>
  </html>
  `;
  const generatedImage = await nodeHtmlToImage({
    html: finalHtml,
    selector: "#shareEarnImage",
  });
  res.setHeader("content-type", "image/png");
  return res.send(generatedImage);
};

export default GenerateImage;
