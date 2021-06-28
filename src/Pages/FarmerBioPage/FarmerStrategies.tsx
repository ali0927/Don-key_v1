import { AddStrategyModal } from "components/AddStrategyModal";
import { RunStrategy } from "components/RunStrategy";
import { StrategyTableForInvestor } from "components/StrategyTable";
import { StyledLink } from "components/StyledLink";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { ShowMoreContent } from "components/ShowmoreContent";
import { InvestorListTable } from "components/InvestorListTable/InvestorListTable";

const AddNewStrategy = ({
  text,
  onDone,
}: {
  text: string;
  onDone?: () => void;
}) => {
  const [isOpen, open, close] = useToggle();

  return (
    <>
      <StyledLink
        to="/"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        {text}
      </StyledLink>
      {isOpen && (
        <AddStrategyModal isOpen={isOpen} onClose={close} onSuccess={onDone} />
      )}
    </>
  );
};

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
  farmerId,
  isInvestor,
}: {
  farmerId: string;
  isInvestor?: boolean;
}) => {
  const [{ loading: loading1, data: farmerFromApi }] = useAxios(
    `/api/v2/farmer/${farmerId}`
  );
  const [{ loading, data: strategiesData }, refetchData] = useAxios(
    `/api/v2/farmer/${farmerId}/strategies`
  );

  const renderContent = () => {
    if (loading || loading1) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
        </div>
      );
    }

    if (strategiesData.data.length === 0) {
      if (isInvestor) {
        return (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: 400 }}
          >
            {" "}
            The Farmer has No Strategies Yet
          </div>
        );
      }
      return (
        <section className="py-5">
          <Container>
            <h3 className="text-center mb-5">Build your DeFi strategy</h3>
            <div className="row justify-content-center">
              <div className="col-md-7 d-flex flex-column align-items-center">
                <div className="mb-3">
                  <AddNewStrategy
                    text={"Create Your First Strategy"}
                    onDone={refetchData}
                  />
                </div>
                <div>
                  <img
                    style={{ mixBlendMode: "multiply" }}
                    src="/assets/images/build-strategy-img.svg"
                    alt="ImageNotFound"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      );
    } else {
      return (
        <div className="my-5">
          <Container>
            <Row>
              <Col
                className="d-flex align-items-center justify-content-between mb-1"
                sm={12}
              >
                <StyledHeading>Strategies</StyledHeading>
                {!isInvestor && strategiesData.data.length === 1 ? (
                  <RunStrategy strategy={strategiesData.data[0]} />
                ) : (
                  <>
                    {!isInvestor && (
                      <AddNewStrategy
                        text="Add Strategy"
                        onDone={refetchData}
                      />
                    )}
                  </>
                )}
              </Col>
              <Container className="mt-2 mb-4">
                <Row>
                  <Col md={12} lg={12}>
                    <DescriptionTitle>
                      {strategiesData.data[0].strategyName || "Description"}
                    </DescriptionTitle>
                    <p style={{ fontSize: 15 }}>
                      <ShowMoreContent
                        length={80}
                        content={
                          strategiesData.data[0].strategyDescription ||
                          "For my maiden strategy I am looking for high yields on BNB and ETH, as well as picking some BSC proj"
                        }
                      />
                    </p>
                  </Col>
                </Row>
              </Container>
              <Col sm={12}>
                <StrategyTableForInvestor
                  poolAddress={farmerFromApi.data.farmer.poolAddress}
                  strategies={strategiesData.data}
                />
                <InvestorListTable
                  poolAddress={farmerFromApi.data.farmer.poolAddress}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  };

  return <div className="py-3">{renderContent()}</div>;
};
