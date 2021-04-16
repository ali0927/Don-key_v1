import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const MainTab = ({ title }: { title: string }) => {
  const farmerInfo = useSelector((state: any) => state.farmer);

  const StrategyTable = () => {
    return (
      <div className="tablebg tablebgAuto p-0">
        <Table responsive>
          <thead>
            <tr>
              <th>Name of strategy</th>
              <th>Total Profit</th>
              <th>run strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Great march of the crypto Curve DAL * *</td>
              <td>$300 100,50</td>
              <td>
                <Button variant="outline-secondary">Launch</Button>
              </td>
            </tr>
            <tr>
              <td>Great march of the crypto Curve DAL * *</td>
              <td>$300 100,50</td>
              <td>
                <Button variant="outline-secondary">Launch</Button>
              </td>
            </tr>
            <tr>
              <td>Great march of the crypto Curve DAL * *</td>
              <td>$300 100,50</td>
              <td>
                <Button variant="outline-secondary">Launch</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <>
      {farmerInfo &&
      farmerInfo.user &&
      farmerInfo.user.strategies &&
      farmerInfo.user.strategies.length > 0 ? (
        <div className="strategy-table-sec">
          <Container>
            <Row>
              <Col
                className="d-flex align-items-center justify-content-between mb-5"
                sm={12}
              >
                <h2>{title}</h2>
                <Link to={"/strategy/new"} className="add-strategy-cls">
                  Add Strategy
                </Link>
              </Col>
              <Col sm={12}>
                <StrategyTable />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <section className="bg-white build-strategy-sec text-center">
          <Container>
            <h3 className="sec-title">Build your DeFi strategy</h3>
            <Link to="/strategy/new" className="btn btn-dark">
              Create your first strategy
            </Link>
            <p>
              <img src="/assets/images/build-strategy-img.svg" alt="Image" />
            </p>
          </Container>
        </section>
      )}
    </>
  );
};
