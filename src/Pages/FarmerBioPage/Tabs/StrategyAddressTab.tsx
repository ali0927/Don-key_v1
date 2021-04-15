import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const StrategyAddressTab = ({ title }: { title: string }) => {
  return (
    <Container>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-between mb-5"
          sm={12}
        >
          <h2>{title}</h2>
        </Col>

        <Col sm={12}></Col>
      </Row>
    </Container>
  );
};
