import { NextApiHandler } from "next";
import axios from "axios";
import { getWeb3 } from "don-components";
import { getPoolValueInUSD } from "helpers";

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  validateStatus: (status) => status < 500 && status >= 200,
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  validateStatus: (status) => status < 500 && status >= 200,
});
const GenerateImage: NextApiHandler = async (req, res) => {
  const { image_id, slug, id } = req.query;

  if ((!slug && !id) || !image_id) {
    return res.status(400).send({ msg: "Slug or Id or bgImage Absent" });
  }

  const url = id ? "/farmers?guid=" + id : "/farmers?slug=" + slug;

  const result = await strapi.get(url);

  const farmerObj = result.data[0];

  if (!farmerObj) {
    return res.status(404).send({ msg: "Farmer Not Found" });
  }

  const web3 = getWeb3(farmerObj.network.chainId);
  const strategy = farmerObj.strategies[0];

  const tvl = await getPoolValueInUSD(web3, farmerObj.poolAddress);

  const urlR = `/api/v2/referral-image?apy=${strategy.apy}&tvl=${tvl}&name=${farmerObj.name}&image_id=${image_id}`;
  const resp = await api.get(
    urlR,
    {responseType: "stream"}
  );
  res.setHeader("content-type", "image/png");
  res.setHeader("cache-control", "max-age=7200, public");
  return resp.data.pipe(res);
};

export default GenerateImage;
