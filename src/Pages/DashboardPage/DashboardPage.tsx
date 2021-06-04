import { Row, Col } from "react-bootstrap";
import "./DashboardPage.scss";
import { useAxios } from "hooks/useAxios";
import { IFarmer } from "interfaces";
import { useMemo } from "react";
import { LeaderBoardTable } from "./LeaderBoardTable";
import styled from "styled-components";
import { LoadingPage } from "Pages/LoadingPage";
import { StyledLink } from "../../components/StyledLink";
import { TopThreeFarmers } from "./TopThreeFarmers";
import {theme} from "theme";
import { FarmerPageDonkeyIcon, LargeEllipse, MeadiumEllipse, SmallEllipse } from "icons";
import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";

const FarmerTitle = styled.p({
  fontFamily: "Roboto",
  fontSize: "45px",
  fontStyle: "normal",
  fontWeight: 800,
  letterSpacing: "0em",
  textAlign: "left",
  color: "#070602",
});

const CustomizedContainer = styled.div`
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
   clip-path: polygon(0 0,225% 0%,43% 119%,0% 83%);


`;

const Body = styled.div` 
    background-color: #F4F4F4;
`;

const DonkeyIconWrapper = styled.div`
      position: absolute;
    right: 8%;
    top: 28px;

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




export const DashboardPage = () => {
  const [{ loading, data }] = useAxios("/api/v2/farmer");

  const farmers: IFarmer[] = useMemo(() => {
    if (data) {
      return data.data.map((item: any) => {
        const farmer: IFarmer = {
          GUID: item.GUID,
          name: `Don - ${item.name}`,
          description: item.description,
          picture: item.picture,
          pool_version: item.pool_version,
          poolAddress: item.poolAddress,
          profit24hours: item.profit24hours || "-",
          profit7days: item.profit7days || "-",
          telegram: item.telegram,
          twitter: item.twitter,
          profit: item.profit || "-",
          descriptionTitle: item.descriptionTitle,
          status: item.status,
          apy: item.strategy.apy,
          strategyImage: item.strategy.strategyImage,
          investors: item.investors,
        };
        return  farmer
      });
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
        {/* <Paragon/> */}
        <CustomizedContainer>
          <Row>
          <Ellipse1><LargeEllipse/></Ellipse1>
          <Ellipse2><LargeEllipse/></Ellipse2>
          <Ellipse3><MeadiumEllipse/></Ellipse3>
          <Ellipse4><SmallEllipse/></Ellipse4>
            <Col>
              {farmers.length === 0 ? (
                <div className="d-flex align-items-center flex-column">
                  <Heading>No Farmers Yet</Heading>
                  <StyledLink className="mt-4" to="/farmers">
                    Become the First Farmer
                  </StyledLink>
                </div>
              ) : (
                <FarmerTitle>Explore Farmers</FarmerTitle>
              )}
             
              <DonkeyIconWrapper><FarmerPageDonkeyIcon/></DonkeyIconWrapper>
            </Col>
          </Row>
          {/* {farmers.length !== 0 && <LeaderBoardSearch suggestions={farmers} lastSearch={farmers}/>} */}
        </CustomizedContainer>
      </RootWrapper>

      {/* Table */}
      <Body className="leaderbord-top mb-5">
        {farmers.length === 0 ? (
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
            <TopThreeFarmers isReady={!loading} leaders={farmers} />
            <LeaderBoardTable isReady={!loading} leaders={farmers} isDisable />
          </CustomizedContainer>
        )}
      </Body>

      {/* <GoToBuilderSection/> */}
      <Footer/>
    </>
  );
};
