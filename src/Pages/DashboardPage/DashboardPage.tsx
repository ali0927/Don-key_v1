import { Row, Col } from "react-bootstrap";
import "./DashboardPage.scss";
import { useMemo } from "react";
import { LeaderBoardTable } from "./LeaderBoardTable";
import styled from "styled-components";
import { LoadingPage } from "Pages/LoadingPage";
import { theme } from "theme";
import {
  LargeEllipse,
  MeadiumEllipse,
  SmallEllipse,
} from "icons";
import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { ButtonWidget } from "components/Button";
import React from "react";
import { useAddDonTokenonLoad } from "hooks/useAddDonTokenonLoad";
import { IStrapiToken } from "interfaces";
import { TokenInfo } from "components/TokenInfo";
import { gql, useQuery } from "@apollo/client";
import { sortBy } from "lodash";

const FarmerTitle = styled.p({
  fontSize: "45px",
  fontStyle: "normal",
  fontWeight: 800,
  letterSpacing: "0em",
  textAlign: "left",
  color: "#070602",
});

export const CustomizedContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1244px;
  }
`;

const Heading = styled.h3`
  text-align: center;
  font-size: 50px;
  font-weight: 800;
`;

const RootWrapper = styled.div`
  background-color: ${theme.palette.background.yellow};
  border-radius: 0px !important;
  clip-path: polygon(0 0, 225% 0%, 43% 119%, 0% 83%);
`;

const Body = styled.div`
  background-color: #f4f4f4;
`;

const Ellipse1 = styled.div`
  right: 16%;
  top: 8%;

  position: absolute;
`;

const Ellipse2 = styled.div`
  right: 23%;
  top: 41%;
  position: absolute;
`;

const Ellipse3 = styled.div`
  right: 23%;
  top: 18%;
  position: absolute;
`;

const Ellipse4 = styled.div`
  right: 26%;
  top: 0%;
  position: absolute;
`;

export const NetworkButton = styled(ButtonWidget)`
  color: #333333;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  height: 50px;
  ${(props: { active?: boolean }) =>
    props.active &&
    `
  border: 1px solid ${theme.palette.border.main};;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12);

  `}
`;

const LIST_OF_TOKENS = gql`
  query tokensList {
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
  }
`;

export const DashboardPage = () => {
  const { data, loading } = useQuery(LIST_OF_TOKENS);

  useAddDonTokenonLoad();

  const tokens: IStrapiToken[] = useMemo(() => {
    if (data) {
      return sortBy(
        data.tokens as IStrapiToken[],
        (item) => item.status !== "active"
      );
    }
    return [];
  }, [data]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <NavBar variant={"loggedin"} />
      <RootWrapper className="pt-5 borderCollapse position-relative">
        <CustomizedContainer>
          <Row>
            <Ellipse1>
              <LargeEllipse />
            </Ellipse1>
            <Ellipse2>
              <LargeEllipse />
            </Ellipse2>
            <Ellipse3>
              <MeadiumEllipse />
            </Ellipse3>
            <Ellipse4>
              <SmallEllipse />
            </Ellipse4>
            <Col>
              <FarmerTitle>Explore Farmers</FarmerTitle>
              <div className="row justify-content-between px-2">
                <div className="col-sm-8">
                  {/* <h5>Follow Farmers and Increase your yield</h5> */}
                </div>
              </div>
            </Col>
          </Row>
        </CustomizedContainer>
      </RootWrapper>
      {/* Table */}
      <Body className="leaderbord-top pb-5">
        {tokens.length === 0 ? (
          <CustomizedContainer>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 mt-5 pt-5">
                  <img
                    src="/assets/images/build-strategy-img.svg"
                    style={{ mixBlendMode: "multiply" }}
                    alt="ImageNotFound"
                  />
                </div>
              </div>
            </div>
          </CustomizedContainer>
        ) : (
          <CustomizedContainer>
            <div className="row">
              {tokens.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    {item.status !== "commingsoon" && (
                      <div className="col-lg-4">
                        <TokenInfo  token={item} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <LeaderBoardTable isDisable />
          </CustomizedContainer>
        )}
      </Body>
      <Footer /> 
    </>
  );
};
