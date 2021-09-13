import { StrategyTableForInvestor } from "components/StrategyTable";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { ShowMoreContent } from "components/ShowmoreContent";
import { InvestorListTable } from "components/InvestorListTable/InvestorListTable";
import { IFarmerInter } from "interfaces";

const DescriptionTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 35.44px;
`;

const StrategyTableRoot = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
`;

const TableHeaderRoot = styled.div`
  margin-bottom: 50px;
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
            <Col sm={12}>
              <TableHeaderRoot>
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
              </TableHeaderRoot>
              <StrategyTableForInvestor
                 chainId={farmer.network.chainId}
                farmerfee={farmer.farmerfee}
                performancefee={farmer.performancefee}
                poolAddress={farmer.poolAddress}
                strategies={farmer.strategies}
              />
              <StrategyTableRoot className="d-flex justify-content-center">
                <img
                  src={farmer.strategies[0].strategyImage.url}
                  className="img-fluid"
                  style={{ maxWidth: 800, minWidth: 400 }}
                  alt="strategy image"
                />
              </StrategyTableRoot>
              <InvestorListTable chainId={farmer.network.chainId} poolAddress={farmer.poolAddress} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return <div className="py-3">{renderContent()}</div>;
};
