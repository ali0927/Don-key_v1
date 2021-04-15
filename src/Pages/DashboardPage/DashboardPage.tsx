import { Row, Container, Col, Table } from "react-bootstrap";
import "./DashboardPage.scss";
import { leaderBoardData } from "../../JsonData/leaderboard";
import { Layout } from "components/Layout";
import { useAxios } from "hooks/useAxios";
import { LeaderBoardTable } from "components/LeaderBoardTable/LeaderBoardTable";
import { IFarmer } from "interfaces";
import { useMemo } from "react";


export const DashboardPage = () => {
  const [{ loading, data, error }] = useAxios("/api/v1/farmers");

  const farmers: IFarmer[] = useMemo(() => {
    if(data){
      return data.data.map((item: any) => {
       return {
        id: item.id,
        name: item.name,
        picture: item.picture,
        poolAddress: item.poolAddress,
        profit24: item.profit24hours,
        profit7: item.profit7days,
        profitTotal: item.profit
    } as IFarmer
      })
    }
    return []
  }, [data])


  return (
    <Layout className="bgColor" variant="loggedin">
      <div className="bgnav pt-5 pb-5">
        <Container>
          <Row>
            <Col>
              <h2 className="firstHeading mb-1">Explore Farmers</h2>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Table */}
      <div className="mt-4 mb-5 tablebgHead">
        <Container>
          <div className="tablebg tablebgAuto">
            <LeaderBoardTable isReady={!loading} farmers={farmers}  />
          </div>
        </Container>
      </div>
    </Layout>
  );
};
