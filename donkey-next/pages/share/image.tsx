import { GetServerSideProps } from "next";
import axios from "axios";
import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import parse from "url-parse";
import Head from "next/head";
import { Loader } from "don-components";

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  validateStatus: (status) =>  status < 500 && status >=200
})

type Data = { url: string; image: string };
type Meta = { title: string; description: string; author: string };
const fetchUrlFromCode = async (code: string) => {
  const res = await strapi.get("/short-links?shortcode="+ code);
  return res.data as Data[];
};

const fetchMetaFromUrl = async (url: string) => {
  const data = parse(url);
  const arr = data.pathname.split("/");
  const farmerId = arr[arr.length - 1];
  const res = await strapi.get("farmers?guid=" + farmerId);
  const farmer = res.data[0];
  return {
    title: farmer.strategies[0].name,
    author: farmer.name,
    description: farmer.description,
  } as Meta;
};

export default function SharePage({
  data,
  meta,
}: {
  data?: Data;
  meta?: Meta;
}) {
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
          images: [{ url: data.image, alt: "Strategy Info" }],
        }}
      />
      <Head>
        <meta name="twitter:image" content={data.image} />
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
    const pageMeta = await fetchMetaFromUrl(data[0].url);
    return {
      props: { data, meta: pageMeta },
    };
  } catch (e) {
    return defaultResp;
  }
};