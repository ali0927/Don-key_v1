import { gql, useQuery } from "@apollo/client";
import BigNumber from "bignumber.js";
import { Footer } from "components/Footer";
import { GridBackground } from "components/GridBackground";
import { InvestorCountContract } from "components/InvestorCountGraphql";
import { NavBar } from "components/Navbar";
import { PoolAmount } from "components/PoolAmount";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import { ShowMoreContent } from "components/ShowmoreContent";
import { useStrapi, useSwitchNetwork } from "hooks";
import { IFarmer, IFarmerInter, IStrategy } from "interfaces";
import { sortBy } from "lodash";
import { LoadingPage } from "Pages/LoadingPage";
import React, { useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "theme";
import { StrategyInfo } from "./StrategyInfo";
const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
  padding-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: "ObjectSans-Bold";
  font-weight: 900;
`;

const Subtitle = styled.h5`
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

const StyledLink = styled(Link)`
  color: rgba(34, 34, 34, 1);
  display: inline-block;
  margin-bottom: 4rem;
  &:hover {
    color: rgba(34, 34, 34, 1);
    opacity: 0.8;
    text-decoration: none;
  }
`;

const TokenInfoQuery = gql`
  query tokenInfo($symbol: String!) {
    tokens(where: { symbol_eq: $symbol }) {
      RiskStrategy {
        strategy {
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
            active
            guid
            poolVersion
            poolAddress
          }
        }
      }
    }
  }
`;

const sortStrategies = (list: any[]) => {
  return sortBy(list, (item) => {
    const risk = item.strategy.risk.Title.toLowerCase();
    if (risk === "low") {
      return -1;
    }
    if (risk === "high") {
      return 1;
    }
    return 0;
  });
};

const emptryArr: any[] = [];

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

export const TokenPage = () => {
  const { token } = useParams<{ token: string }>();

  const { data, loading } = useQuery(TokenInfoQuery, {
    variables: {
      symbol: token,
    },
  });
  const history = useHistory();
  const handleLeaderClick = (id: string) => () => {
    history.push(`/dashboard/farmer/${id}`);
  };
  const {switchNetwork} = useSwitchNetwork();

  const strategies = data ? data.tokens[0].RiskStrategy : emptryArr;
  const sortedStrategies: { strategy: IStrategy & { farmer: IFarmerInter } }[] =
    useMemo(() => {
      return sortStrategies(strategies).filter((item) => {
        const farmer = item.strategy.farmer as IFarmerInter;
        if (farmer.active && farmer.status === "active") {
          return true;
        } else {
          return false;
        }
      });
    }, [strategies]);
  const [isOpen, setIsOpen] = useState(false);
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <NavBar variant={"loggedin"} />
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <StyledLink to="/dashboard">
                <BackArrow /> <span className="ml-2">Back</span>
              </StyledLink>
              <Title className="mb-5">Strategy Risk Level</Title>
              <Subtitle>Description</Subtitle>
              <p className="mb-5">
                <ShowMoreContent
                  content={`We will run 2 main strategies:1) a long and short algo on BTC, w/ a Sortino of 5.5 (will post new backtest chart shortly, but it performs better).
2) Active discretionary trading both long / short across all synthetic assets combining fundamental, technical`}
                  length={150}
                />
              </p>
            </div>
          </div>
        </div>
      </Section>
      <GridBackground className="py-5">
        <div className="container">
          <div className="row">
            {sortedStrategies.map((item) => {
              return (
                <div className="col-md-4 py-3">
                  <PopularStrategy
                    apy={item.strategy.apy + "%"}
                    icon={<Image src={item.strategy.farmer.farmerImage.url} />}
                    contentTitle={item.strategy.name}
                    title={item.strategy.farmer.name}
                    content={item.strategy.description}
                    risk={item.strategy.risk.Title.toLowerCase()}
                    imageRisk={item.strategy.risk.image.url}
                    onChangeChain={switchNetwork}
                    onCardClick={handleLeaderClick(item.strategy.farmer.guid)}
                    onButtonClick={handleLeaderClick(item.strategy.farmer.guid)}
                    extraApy={new BigNumber(item.strategy.apy).plus(100).toFixed() + "%"}
                    totalValue={
                      <PoolAmount
                        poolAddress={item.strategy.farmer.poolAddress}
                      />
                    }
                    onShowLessClick={() => setIsOpen(false)}
                    onShowMoreClick={() => setIsOpen(true)}
                    showAllContent={isOpen}
                    investers={
                      <InvestorCountContract
                        poolAddresses={[item.strategy.farmer.poolAddress]}
                      />
                    }
                    strategyImage={item.strategy.strategyImage.url}
                    network={{
                      chainId: item.strategy.farmer.network.chainId,
                      networkName: item.strategy.farmer.network.name,
                      networkSymbol: item.strategy.farmer.network.symbol,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </GridBackground>
      <Footer />
    </>
  );
};
