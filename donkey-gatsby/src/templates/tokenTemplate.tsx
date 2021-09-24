import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import styled from "styled-components";
import { theme } from "theme";
import { Navigate } from "components/Navigate";
import { ShowMoreContent } from "components/ShowmoreContent";
import { GridBackground } from "components/GridBackground";
import { InactiveNetworkCard } from "components/InactiveNetworkCard";
import { IFarmerInter, IStrapiToken, IStrategy } from "interfaces";

import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import { fixUrl } from "helpers";
import BigNumber from "bignumber.js";
import { PoolAmount } from "components/PoolAmount";
import { InvestorCountContract } from "components/InvestorCountGraphql";
import { useState } from "react";
import { useWeb3Context } from "don-components";
import { strapi } from "strapi";
import { sortBy } from "lodash";
import { GetStaticProps } from "next";
import { navigate } from "gatsby-link";

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
  padding-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: ""Work Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"";
  font-weight: 900;
`;

const BackArrow = (props: any) => {
  return (
    <svg
      width={21}
      height={10}
      viewBox="0 0 21 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.117 5.16a.688.688 0 01.086-.87L4.328.165a.688.688 0 01.97.97L2.347 4.09h17.59a.687.687 0 010 1.375H2.348l2.95 2.953a.687.687 0 11-.97.97L.203 5.262a.615.615 0 01-.086-.103z"
        fill="#222"
      />
    </svg>
  );
};

const StyledLink = styled(Navigate)`
  color: rgba(34, 34, 34, 1);
  display: inline-block;
  margin-bottom: 4rem;
  &:hover {
    color: rgba(34, 34, 34, 1);
    opacity: 0.8;
    text-decoration: none;
  }
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

type IFarmerBio = IStrategy & { farmer: IFarmerInter };
const FarmerBioShort = ({
  item,
  isShown,
  onShowLess,
  onShowMore,
  tokenObj,
}: {
  item: IFarmerBio;
  isShown: boolean;
  onShowMore: () => void;
  onShowLess: () => void;
  tokenObj?: any;
}) => {
  const url = `/dashboard/farmer/${item.farmer.slug}`;


  const handleLeaderClick = () => {
   navigate(url);
  };

  return (
    <div className="col-md-4 py-3">
      <PopularStrategy
        apy={item.apy + "%"}
        isCardComingsoon={item.farmer.status === "comingsoon"}
        comingsoon={item.farmer.status === "comingsoon"}
        icon={<Image src={fixUrl(item?.farmer?.farmerImage?.url)} />}
        contentTitle={item.name}
        title={item.farmer.name}
        content={item.description}
        risk={item.risk.Title.toLowerCase()}
        imageRisk={item.risk.image.url}
        onCardClick={handleLeaderClick}
        onButtonClick={handleLeaderClick}
        showOnRight={!tokenObj.boostApy}
        extraApy={
          tokenObj.boostApy && new BigNumber(item.apy).plus(100).toFixed() + "%"
        }
        totalValue={
          <PoolAmount
            chainId={item.farmer.network.chainId}
            poolAddress={item.farmer.poolAddress}
          />
        }
        onShowLessClick={onShowLess}
        onShowMoreClick={onShowMore}
        showAllContent={isShown}
        investers={
          <InvestorCountContract
            chainId={item.farmer.network.chainId}
            poolAddresses={[item.farmer.poolAddress]}
          />
        }
        strategyImage={item.strategyImage.url}
        network={{
          chainId: item.farmer.network.chainId,
          networkName: item.farmer.network.name,
          networkSymbol: item.farmer.network.symbol,
        }}
      />
    </div>
  );
};

const sortStrategies = (list: any[]) => {
  return sortBy(list, (item) => {
    const risk = item.risk.Title.toLowerCase();
    if (risk === "low") {
      return -1;
    }
    if (risk === "high") {
      return 1;
    }
    return 0;
  });
};

export default function TokenPage({
  tokens,
  strategies,
}: {
  tokens: IStrapiToken[]
  strategies: IFarmerBio[];
}) {

  // return <div />
  const { chainId, connected } = useWeb3Context();
  const tokenObj = tokens[0];
  const network = tokenObj.network;
  const subtitle = tokenObj.subtitle;
  const description = tokenObj.description;
  const isActiveNetwork = network.chainId === chainId;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <NavBar variant="loggedin" />
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <StyledLink to="/dashboard">
                <BackArrow /> <span className="ml-2">Back</span>
              </StyledLink>
              <Title className="mb-5">{subtitle || "Description"}</Title>
              <div className="row">
                <div className="col-md-8">
                  <p className="mb-5">
                    <ShowMoreContent
                      content={
                        description ||
                        `We will run 2 main strategies:1) a long and short algo on BTC, w/ a Sortino of 5.5 (will post new backtest chart shortly, but it performs better).
2) Active discretionary trading both long / short across all synthetic assets combining fundamental, technical`
                      }
                      length={150}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <GridBackground className="py-5">
        <div className="container">
          {!isActiveNetwork && connected && (
            <div className="row mb-5">
              <div className="col-12">
                <InactiveNetworkCard variant="white" correctNetwork={network} />
              </div>
            </div>
          )}
          <div className="row">
            {strategies.map((item) => {
              return (
                <FarmerBioShort
                  key={item.id}
                  isShown={isOpen}
                  onShowLess={() => setIsOpen(false)}
                  onShowMore={() => setIsOpen(true)}
                  tokenObj={tokenObj}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </GridBackground>
      <Footer />
    </div>
  );
}

const query = ` query tokensList {
    tokens {
      id
      symbol
      boostApy
      image {
        url
      }
      maxApy
      symbol
      slug
      network {
        chainId
        type
        destination
        name
        slug
      }
      status
      RiskStrategy {
        strategy {
          farmer {
            poolAddress
          }
        }
      }
    }
  }`;

const TOKEN_INFO_QUERY = `
query tokenInfo($slug: String!, $network: String!) {
    tokens(where: { slug: $slug, network: { slug: $network } }) {
      network {
        chainId
        symbol
        name
      }
      boostApy
      subtitle
      description
      strategies {
        risk {
          Title
          image {
            url
          }
        }
        strategyImage {
          url
        }
        name
        apy
        active
        description
        farmer {
          status
          name
          farmerImage {
            url
          }
          network {
            chainId
            name
            symbol
          }
          slug
          active
          guid
          poolVersion
          poolAddress
        }
      }
    }
  }
`;

export async function getStaticPaths() {
  const results = await strapi.post("/graphql", { query });
  return {
    paths: results.data.data.tokens.map((item: any) => {
      return {
        params: {
          network: item.network.slug,
          token: item.slug,
        },
      };
    }), // See the "paths" section below

    fallback: "blocking", // See the "fallback" section below
  };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { network, token } = context.params;
  const resp = await strapi.post("/graphql", {
    query: TOKEN_INFO_QUERY,
    variables: {
      slug: token,
      network: network,
    },
  });
  const data = resp.data.data;

  const strategies = sortStrategies(
    data?.tokens[0]?.strategies.filter(
      (item: any) =>
        item.farmer.status === "active" || item.farmer.status === "comingsoon"
    )
  );
  if (!strategies) {
    return {
      notFound: true,
    };
  }
  if (!(strategies.length > 0)) {
    return {
      notFound: true,
    };
  }
  return {
    props: { ...data, strategies },
  };
};
