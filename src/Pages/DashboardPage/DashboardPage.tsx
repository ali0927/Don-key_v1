import clsx from "clsx";
import ButtonComponent from "components/Button/Button";
import { Footer } from "components/Footer/Footer";
import { NavBar } from "components/Navbar/NavBar";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import DataFarmer from "JsonData/DataFarmer";
import { Form, Pagination, Row, Container, Col, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import "./DashboardPage.scss";
import { leaderBoardData } from "../../JsonData/leaderboard";
export const DashboardPage = () => {
  const history = useHistory();

  return (
    <div className={clsx("bgColor")}>
      <NavBar variant="loggedin" />

      <div className="navbanHead pt-5 pb-5">
        <Container>
          <Row>
            <Col>
              <h2 className="firstHeading mb-3">Explore Strategies</h2>
            </Col>

          </Row>
        </Container>
      </div>
      <section className="popular__section">
        <Container>
          <Row>
            {Array.from({ length: 3 }).map((_) => {
              return (
                <Col md={4}>
                  <PopularStrategy />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Table */}
      <div className="mt-4 mb-5 tablebgHead">
        <Container>
          <h5 className="d-inline-block mt-4 mb-5">Leaderboard</h5>

          <div className="tablebg tablebgAuto">
            <Table responsive className="table">
              <thead>
              <tr>
                <th>Name of Farmer</th>
                <th>BUSD in Pool</th>
                <th>24 hours Profit</th>
                <th>7 days Profit</th>
                <th>Total Profit</th>
              </tr>
              </thead>

              <tbody>
              {leaderBoardData.length > 0 &&
              leaderBoardData.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td className="nodata">{item.nameOfFarmer}</td>
                      <td>
                        <span className="spanname"> {item.wbnb}</span>
                      </td>
                      <td>
                        <span className="fontlight">{item.hrsProfit}</span>
                      </td>
                      <td>{item.daysProfit}</td>
                      <td>{item.totalProfit}</td>
                    </tr>
                  </>
                );
              })}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>

      {/*  footer */}
      <Footer />
    </div>
  );
};
