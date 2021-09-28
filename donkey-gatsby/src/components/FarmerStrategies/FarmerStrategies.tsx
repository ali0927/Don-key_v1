import { StrategyTableForInvestor } from "components/StrategyTable";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { ShowMoreContent } from "components/ShowmoreContent";
import { InvestorListTable } from "components/InvestorListTable/InvestorListTable";
import { IFarmerInter } from "interfaces";

import { breakPoints } from "breakponts";

const DescriptionTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 35.44px;

  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 14px;
    font-weight: 600;
  }

`;

const P = styled.p`
  font-size: 15px;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    color:#666666;
  }
`;

const StrategyTableRoot = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
  @media only screen and (max-width: ${breakPoints.md}) {
    margin-top: 27px;
    margin-bottom: 27px;
  }
`;

const TableHeaderRoot = styled.div`
  margin-bottom: 50px;
`;

const Image = styled.img`
  @media only screen and (min-width: ${breakPoints.lg}) {
    max-width: 800px !important;
    min-width: 400px;
  }
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
      <div className="my-4">
        <Container>
          <Row>
            <Col sm={12}>
              <TableHeaderRoot>
                <DescriptionTitle>
                  {farmer.strategies[0].name || "Description"}
                </DescriptionTitle>
                <P>
                  <ShowMoreContent
                    length={80}
                    content={
                      farmer.strategies[0].description ||
                      "For my maiden strategy I am looking for high yields on BNB and ETH, as well as picking some BSC proj"
                    }
                  />
                </P>
              </TableHeaderRoot>
              <StrategyTableForInvestor
                 chainId={farmer.network.chainId}
                farmerfee={farmer.farmerfee}
                performancefee={farmer.performancefee}
                poolAddress={farmer.poolAddress}
                strategies={farmer.strategies}
              />
              <StrategyTableRoot className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                  <Image
                    src={farmer.strategies[0].strategyImage.url}
                    className="img-fluid"
                   
                    alt="strategy image"
                  />
                </div>
                {farmer.strategies[0].info && (
                  <p style={{ fontSize: 15 }}>{farmer.strategies[0].info}</p>
                )}
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
