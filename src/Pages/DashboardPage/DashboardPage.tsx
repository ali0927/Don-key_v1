import { Row, Col } from "react-bootstrap";
import "./DashboardPage.scss";
import { Layout } from "components/Layout";
import { useAxios } from "hooks/useAxios";
import { IFarmer } from "interfaces";
import { useMemo } from "react";
import { LeaderBoardTable } from "./LeaderBoardTable";
import styled from "styled-components";
import { LoadingPage } from "Pages/LoadingPage";
import { StyledLink } from "../../components/StyledLink";
import { TopThreeFarmers } from "./TopThreeFarmers";

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


export const DashboardPage = () => {
  const [{ loading, data }] = useAxios("/api/v2/farmer");

  const farmers: IFarmer[] = useMemo(() => {
    if (data) {
      return data.data.map((item: any) => {
        return {
          GUID: item.GUID,
          name: `Don - ${item.name}`,
          description: item.description,
          picture: item.picture,
          poolAddress: item.poolAddress ,
          profit24hours: item.profit24hours || "-",
          profit7days: item.profit7days || "-",
          profit: item.profit|| "-",
          descriptionTitle: item.descriptionTitle,
          status: item.status
        } as IFarmer;
      });
    }
    return [];
  }, [data]);

  if(loading){
    return <LoadingPage />
  }
  return (
    <Layout className="bgColor dashboard-root" variant="loggedin">
      <div className="bgnav pt-5 borderCollapse">
        <CustomizedContainer>
          <Row>
            <Col>
              {farmers.length === 0 ? (
                <div className="d-flex align-items-center flex-column">
                  <Heading>No Farmers Yet</Heading>
                  <StyledLink className="mt-4" to="dashboard/farmer/signup" >
                    Become the First Farmer
                  </StyledLink>
                </div>
              ) : (
                <FarmerTitle>Explore Farmers</FarmerTitle>
              )}
            </Col>
          </Row>
          {/* {farmers.length !== 0 && <LeaderBoardSearch suggestions={farmers} lastSearch={farmers}/>} */}
        </CustomizedContainer>
      </div>

      {/* Table */}
      <div className="leaderbord-top mb-5">
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
            <TopThreeFarmers isReady={!loading} leaders={farmers}/>
            <LeaderBoardTable isReady={!loading} leaders={farmers} isDisable/>
          </CustomizedContainer>
        )}
      </div>

      {/* <GoToBuilderSection/> */}
    </Layout>
  );
};
