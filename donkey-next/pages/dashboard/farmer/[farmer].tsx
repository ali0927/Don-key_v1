import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";
import { useCallback, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { strapi } from "strapi";
import { GridBackground } from "components/GridBackground";
import { FarmerStrategies } from "components/FarmerStrategies";
import { FarmerBio } from "components/FarmerBio";
import { IFarmerInter } from "interfaces";
import { calcSumOfAllPoolValues } from "helpers";

export default function Dashboard({
  data,
  tvl,
}: {
  data: { farmers: IFarmerInter[] };
  tvl: string;
}) {
  const [isInUsd, setIsInUsd] = useState(false);

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  return (
    <USDViewProvider
      value={{
        isUSD: isInUsd,
        toggle: toggleCurrency,
      }}
    >
      <RefreshProvider>
        <div style={{ background: "#F4F4F4" }}>
          <NavBar variant="loggedin" />
          <FarmerBio tvl={tvl} farmer={data.farmers[0]} investorCount={0} />
          <GridBackground>
            <FarmerStrategies isLoaded farmer={data.farmers[0]} />
          </GridBackground>
          <Footer />
        </div>
      </RefreshProvider>
    </USDViewProvider>
  );
}

const FARMER_QUERY_LIST = `
  query farmerInfo {
    farmers(where: { status_in: ["active"] }) {
      slug 
    }
  }
`;

const FARMER_QUERY = `
  query farmerInfo($slug: String!) {
    farmers(where: { slug_eq: $slug, status_in: ["active", "deprecated"] }) {
      name
      description
      farmerImage {
        url
      }
      active
      twitter
      telegram
      guid
      slug
      farmerfee
      performancefee
      poolAddress
      poolVersion
      network {
        name
        chainId
        symbol
      }
      strategies {
        name
        apy
        created_at
        id
        entranceFees
        info
        exitFees
        swapInFees
        swapOutFees
        description
        strategyImage {
          url
        }
        token {
          boostApy
        }
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await strapi.post("/graphql", { query: FARMER_QUERY_LIST });
  const farmers = resp.data.data.farmers;
  return {
    paths: farmers.map((item: any) => {
      return {
        params: { farmer: item.slug },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const resp = await strapi.post("/graphql", {
    query: FARMER_QUERY,
    variables: {
      slug: context.params?.farmer,
    },
  });
  const tvl = await calcSumOfAllPoolValues();
  if(resp.data.data.farmers.length === 0){
    return {
      notFound: true
    }
  }
  if(resp.data.data.farmers[0].strategies.length === 0){
    return {
      notFound: true
    }
  }
  return {
    props: {
      data: resp.data.data,
      tvl,
    },
    revalidate: 60
  };
};
