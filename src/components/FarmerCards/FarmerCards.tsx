import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import  FarmerImg1  from "../../images/farmer-card-1.jpg";

export const FarmerCards = () => {
  return (
    <div className="farmer-cards">
      <Container>
        <Row>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <span><FarmerImg1 /> </span>
                    </Card.Body>
                </Card>


            </Col>


        </Row>
      </Container>
    </div>
  );
};
