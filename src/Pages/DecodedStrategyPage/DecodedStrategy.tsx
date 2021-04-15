import React from "react";
import { Web3Provider } from "don-components";
import { useHistory } from "react-router";
import { NavBar } from "components/Navbar/NavBar";
import { Container, Row, Col } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { DecodedStrategyTab } from "Pages/MyAccountNew/Tabs/DecodedStrategyTab";
import { ShowMoreContent } from "components/ShowmoreContent";
import ButtonComponent from "components/Button/Button";
import { BsArrowLeft } from "react-icons/bs";

import "./DecodedStrategy.scss";

export const DecodedStrategyPage = () => {
  const history = useHistory();
  const renderPage = () => {
    return (
      <>
        <NavBar variant="loggedin" />
        <section className="bg-buru description_wrap">
          <div className="navbanHead rounded-0 pt-4 pb-5 ">
            <Container>
              <Row>
                <Col className="top_back_wrap">
                  <ButtonComponent
                    className="button_wrap_outline"
                    onClick={() => {
                      history.push("/dashboard");
                    }}
                  >
                    {<BsArrowLeft/>}Back
                  </ButtonComponent>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2 className="firstHeading head_wrapper">WOW strategy</h2>
                </Col>
              </Row>
            </Container>
          </div>

          <Container>
            <Row>
              <Col md={8} lg={9}>
                <h4 className="investment_title font-weight-bolder mb-3">
                  {" "}
                  Description
                </h4>
                <p style={{ fontSize: 15 }}>
                  <ShowMoreContent
                    length={300}
                    content=" We will run 2 main strategies:1) a long and short algo on BTC,
                    w/ a Sortino of 5.5 (will post new backtest chart shortly, but
                    it performs better). 2) Active discretionary trading both long /
                    short across all synthetic assets combining fundamental,
                    technical, quantitative and cross asset analysis (will post new
                    backtest chart shortly, but it performs better). Any changes to
                    strategy will be noted here"
                  />
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="tabssection table_wrap">
          <DecodedStrategyTab title="Edit" />
        </section>
        <Footer />
      </>
    );
  };

  return <Web3Provider>{renderPage()}</Web3Provider>;
};
