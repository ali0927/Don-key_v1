import { StrategyTableForInvestor } from "components/StrategyTable";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { ShowMoreContent } from "components/ShowmoreContent";
import { InvestorListTable } from "components/InvestorListTable/InvestorListTable";
import { IFarmerInter } from "interfaces";

const StyledHeading = styled.p`
  font-family: "Roboto";
  font-size: 40px;
`;

const DescriptionTitle = styled.p`
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 35.44px;
`;

export const FarmerStrategies = ({
  farmer,
  isLoaded,
}: {
  farmer: IFarmerInter;
  isLoaded?: boolean;
}) => {
  const renderContent = () => {
    if (!isLoaded) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
        </div>
      );
    }

    return (
      <div className="my-5">
        <Container>
          <Row>
            <Col
              className="d-flex align-items-center justify-content-between mb-1"
              sm={12}
            >
              <StyledHeading>Strategies</StyledHeading>
            </Col>
            <Container className="mt-2 mb-4">
              <Row>
                <Col md={12} lg={12}>
                  <div className="d-flex justify-content-center">
                    <img
                      src={farmer.strategies[0].strategyImage.url}
                      className="img-fluid"
                      style={{ maxWidth: 800, minWidth: 400 }}
                      alt="strategy image"
                    />
                  </div>
                  <DescriptionTitle>
                    {farmer.strategies[0].name || "Description"}
                  </DescriptionTitle>
                  <p style={{ fontSize: 15 }}>
                    <ShowMoreContent
                      length={80}
                      content={
                        farmer.strategies[0].description ||
                        "For my maiden strategy I am looking for high yields on BNB and ETH, as well as picking some BSC proj"
                      }
                    />
                  </p>
                </Col>
              </Row>
            </Container>
            <Col sm={12}>
              <StrategyTableForInvestor
                poolAddress={farmer.poolAddress}
                strategies={farmer.strategies}
              />
              <InvestorListTable poolAddress={farmer.poolAddress} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return <div className="py-3">{renderContent()}</div>;
};
