import { GetServerSideProps } from "next";
import axios from "axios";
import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { Loader } from "don-components";

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
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

export default function SharePage({
  data,
  meta,
}: {
  data?: Data;
  meta?: Meta;
  origin: string;
}) {


  if (!data || !meta) {
    return <div>Invalid Link</div>;
  }

  const title = meta.title + " Strategy By " + meta.author;
  const imagePath = `/api/referral-image?image_id${data.referral_image.id}&slug=${meta.slug}`;
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
      <NextSeo
        title={title}
        description={meta.description}
        nofollow
        noindex
        twitter={{
          site: "@Don_key_finance",
          handle: "@Don_key_finance",
          cardType: "summary_large_image",
        }}
        openGraph={{
          title,
          url: data.url,
          description: meta.description,
          site_name: "Don-Key",
          article: { authors: ["don-key.finance"] },
          locale: "en",
          images: [{ url: imagePath, alt: "Strategy Info" }],
        }}
      />
      <Head>
        <meta name="twitter:image" content={imagePath} />
      </Head>
      <Loader />
    </div>
  );
}

const defaultResp = { props: { data: null } };

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const code = params?.code as string;
    if (!code) {
      return defaultResp;
    }
    const data = await fetchUrlFromCode(code);
    const pageMeta = await fetchMetaFromPoolAddress(data.poolAddress);
    return {
      props: { data, meta: pageMeta, origin: context.req.headers.host },
    };
  } catch (e) {
    return defaultResp;
  }
};
