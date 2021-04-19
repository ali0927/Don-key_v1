import { Row, Container, Col, Table } from "react-bootstrap";
import "./DashboardPage.scss";
import { leaderBoardData } from "../../JsonData/leaderboard";
import { Layout } from "components/Layout";
import { useAxios } from "hooks/useAxios";
import { IFarmer } from "interfaces";
import { useMemo } from "react";
import { LeaderBoardSearch } from "./LeaderBoardSearch";
import { LeaderBoardTable } from "./LeaderBoardTable";
import { LeaderBoardData } from "./LeaderBoardJsonData";
import { GoToBuilderSection } from "./GoToBuilderSection";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FarmerTitle = styled.p({
  fontFamily: "Roboto",
  fontSize: "45px",
  fontStyle: "normal",
  fontWeight: 800,
  letterSpacing: "0em",
  textAlign: "left",
  color: "#070602",
});

const TableContiner = styled.div`
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


const StyledLink = styled(Link)`
background-color: #222;
color: #fff;
font-family:Roboto;
font-weight: 400;
font-size: 16px;
padding: 15px 40px;
box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08);
border-radius: 5px;
transition: background-color 0.3s linear;
&:hover {
  text-decoration: none;
  color: #fff;
  background-color: #333;
}
`

export const DashboardPage = () => {
  const [{ loading, data, error }] = useAxios("/api/v2/farmer");

  const farmers: IFarmer[] = useMemo(() => {
    if (data) {
      return data.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          picture: item.picture,
          poolAddress: item.poolAddress,
          profit24: item.profit24hours,
          profit7: item.profit7days,
          profitTotal: item.profit,
        } as IFarmer;
      });
    }
    return [];
  }, [data]);

  return (
    <Layout className="bgColor dashboard-root" variant="loggedin">
      <div className="bgnav pt-5 borderCollapse">
        <Container>
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
          {farmers.length !== 0 && <LeaderBoardSearch />}
        </Container>
      </div>

      {/* Table */}
      <div className="leaderbord-top mb-5s">
        {farmers.length === 0 ? (
          <TableContiner>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 mt-5 pt-5">
                  <img
                    src="/assets/images/build-strategy-img.svg"
                    style={{ mixBlendMode: "multiply" }}
                    alt="Image"
                  />
                </div>
              </div>
            </div>
          </TableContiner>
        ) : (
          <TableContiner>
            <LeaderBoardTable isReady={!loading} leaders={LeaderBoardData} />
          </TableContiner>
        )}
      </div>

      {/* <GoToBuilderSection/> */}
    </Layout>
  );
};
