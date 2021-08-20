import { gql, useQuery } from "@apollo/client";
import { Footer } from "components/Footer";
import { GridBackground } from "components/GridBackground";
import { NavBar } from "components/Navbar";
import { ShowMoreContent } from "components/ShowmoreContent";
import { useStrapi } from "hooks";
import React from "react";
import { Link, useParams } from "react-router-dom";
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
          name
          apy
          active
          farmer {
            name
            farmerImage {
              url
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

const findStrategyByRisk = (list: any[], risk: "low" | "high" | "medium") => {
  return list.find((item) => item.strategy.risk.Title.toLowerCase() === risk);
};

export const TokenPage = () => {
  const { token } = useParams<{ token: string }>();

  const { data, loading } = useQuery(TokenInfoQuery, {
    variables: {
      symbol: token,
    },
  });

  const strategies = data ? data.tokens[0].RiskStrategy : [];

  if (loading) {
    return null;
  }
  const highRisk = findStrategyByRisk(strategies, "high");
  const lowRisk = findStrategyByRisk(strategies, "low");
  const mediumRisk = findStrategyByRisk(strategies, "medium");

  return (
    <>
      <NavBar variant={"loggedin"} />
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <StyledLink  to="/dashboard">
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
        <div className="container py-5">
          <div className="row">
            {lowRisk && (
              <div className="col-md-4">
                {" "}
                <StrategyInfo strategy={lowRisk.strategy} />{" "}
              </div>
            )}
            {mediumRisk && (
              <div className="col-md-4">
                {" "}
                <StrategyInfo strategy={mediumRisk.strategy} />{" "}
              </div>
            )}
            {highRisk && (
              <div className="col-md-4">
                {" "}
                <StrategyInfo strategy={highRisk.strategy} />{" "}
              </div>
            )}
          </div>
        </div>
      </GridBackground>
      <Footer />
    </>
  );
};
