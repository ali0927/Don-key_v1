import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import styled from "styled-components";
import { theme } from "theme";
import { LeaderBoardTable } from "components/LeaderBoardTable";
import { LargeEllipse, MeadiumEllipse, SmallEllipse } from "icons";
import React from "react";
import { useAddDonTokenonLoad } from "hooks/useAddDonTokenonLoad";
import { IStrapiToken } from "interfaces";
import { TokenInfo } from "components/TokenInfo";
import { Col, Row } from "react-bootstrap";
import { graphql, useStaticQuery } from "gatsby";
import { breakPoints } from "breakponts";
const Root = styled.div`
  background-color: ${theme.palette.background.yellow};
`;
const FarmerTitle = styled.p`
  font-size: 24px;
  font-style: normal;
  letter-spacing: 0em;
  font-weight: 800;
  text-align: left;
  color: #070602;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 45px;
  }
`;

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

const RootWrapper = styled.div`
  background-color: ${theme.palette.background.yellow};
  border-radius: 0px !important;
  clip-path: polygon(0 0, 225% 0%, 43% 119%, 0% 83%);
  padding-bottom: 5rem;
  @media only screen and (min-width: ${breakPoints.lg}) {
    padding-bottom: 8rem;
  }
`;

const Body = styled.div`
  background-color: #f4f4f4;
  margin-top: -73px;
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

export default function Dashboard() {
  useAddDonTokenonLoad();

  const data = useStaticQuery(graphql`
    query TokensList {
      allStrapiTokens {
        nodes {
          id
          symbol
          boostApy
          image {
            url
          }
          maxApy
          symbol
          slug
          status
          network {
            chainId
            type
            destination
            name
            slug
          }
          strategies {
            farmer {
              status
              strapiId
            }
          }
        }
      }
    }
  `);

  const tokens: IStrapiToken[] = data.allStrapiTokens.nodes.filter(
    (item: any) => {
      const isActive = item.status === "active";
      if (!isActive) {
        return isActive;
      } else {
        const strategies = item.strategies.filter((item: any) => {
          const farmer = item.farmer;
          // const farmer = farmers.find((item: any) => item.strapiId === farmerId);
          return farmer && farmer.status === "active";
        });

        return strategies.length > 0;
      }
    }
  );

  return (
    <>
      <Root>
        <NavBar variant={"loggedin"} />
        <RootWrapper className="pt-2 pt-lg-5 position-relative">
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
      </Root>
      <Body className="pb-5">
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
                        <TokenInfo token={item} />
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
}
