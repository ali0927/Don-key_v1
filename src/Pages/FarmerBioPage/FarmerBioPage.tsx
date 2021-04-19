import { NavBar } from "components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { ShowMoreContent } from "components/ShowmoreContent";
import Web3 from "web3";
import { getWeb3 } from "don-utils";
import { withWeb3 } from "hoc";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FarmerModal } from "components/FarmerModal/FarmerModal";
import { IFarmerInter, IStoreState } from "interfaces";
import { EditIcon } from "icons/EditIcon";
import { StrategyTable } from "components/StrategyTable";
import { DetailTable } from "./DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { useAxios } from "hooks/useAxios";
import { StyledLink } from "components/StyledLink";

const poolAddress = "0x921E8B9185Fe180Eb2a1770A1137F6e6E22E9B37";

async function fetchBalance(userPoolAddress = "") {
  userPoolAddress = userPoolAddress || poolAddress;

  const web3 = (await getWeb3()) as Web3;

  // NOTE: Left for reference, not required here
  // NOTE: Please take a look how to import and use Pool ABI!!!

  // const accounts = await web3.eth.getAccounts();
  // const WBNB = new web3.eth.Contract(poolContractJson.abi as any, userPoolAddress);
  // (window as any).WBNB = WBNB;

  (window as any)._web3 = web3;

  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(userPoolAddress),
    "ether"
  );

  return balance;
}

const StyledFarmerImage = styled.img`
  object-fit: cover;
  width: 100%;
  max-width: 160px;
`;

const OutlinedButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(128, 118, 2, 1);
  border-radius: 5px;
  font-size: 16px;
  color: rgba(54, 53, 44, 1);
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 15px;
  transition: all 0.3s linear;
  &:hover {
    background-color: #fff;
    border-color: #fff;
  }
`;

const StyledHeading = styled.h2`
  font-family: "Roboto";
  font-size: 30px;
`;

export const FarmerBioPage = withWeb3(() => {
  const [balance, setBalance] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const farmer = useSelector((state: IStoreState) => state.farmer);

  const { id: farmerId } = useParams<{ id: string }>();

  const [
    { loading, data: farmerFromApi },
    fetchFarmer,
  ] = useAxios(`/api/v2/farmer/${farmerId}`, { manual: true });

  useEffect(() => {
    if (farmerId && farmer?.GUID !== farmerId) {
      fetchFarmer();
    }
    (async () => {
      const balance = await fetchBalance();

      // NOTE: When working wit Ether and Weis it is not correct to operate with `int` and `float` as it have known issues
      // with precision. To work with flat numbers correctly it is better to represent it as strings and use
      // Bignumber.js or Big.js to avoid losing precision (it is extremely important when working with money!)
      setBalance(parseFloat(balance));
   
    })();
  }, []);

  const isCurrentFarmer = farmer?.GUID === farmerId || !farmerId;
  const farmerInfo: IFarmerInter = isCurrentFarmer
    ? farmer
    : farmerFromApi?.data;
  const renderStrategies = () => {
    const strategyCount = farmerInfo.strategies?.length || 0;
    if (strategyCount === 0) {
      if (isCurrentFarmer) {
        return (
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
        );
      }
    }
    if (strategyCount > 0) {
      return (
        <div className="my-5">
          <Container>
            <Row>
              <Col
                className="d-flex align-items-center justify-content-between mb-5"
                sm={12}
              >
                <StyledHeading>My Strategies</StyledHeading>
                <StyledLink to={"/strategy/new"}>Add Strategy</StyledLink>
              </Col>
              <Col sm={12}>
                <StrategyTable
                  strategies={farmerInfo.strategies!.map((item) => ({
                    name: item.name || "",
                    profit: "$200,000.0",
                    id: item.id,
                  }))}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    if ((loading && farmerId) || farmer === null) {
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
      <>
        <NavBar variant="loggedin" />
        {farmerInfo && (
          <>
            <section className="bg-buru">
              <div className="navbanHead rounded-0 pt-5 pb-5">
                <Container>
                  <Row>
                    <Col sm={12}>
                      <div className="d-flex align-items-center">
                        <h2 className="firstHeading mb-3">
                          Don - {capitalize(farmerInfo.name || "")}
                        </h2>
                        {isCurrentFarmer && (
                          <>
                            <OutlinedButton
                              className="ml-3"
                              onClick={() => setModalShow(true)}
                            >
                              <EditIcon className="mr-2" />
                              Edit bio page
                            </OutlinedButton>
                            {modalShow && (
                              <FarmerModal
                                isOpen={modalShow}
                                onClose={() => setModalShow(false)}
                              />
                            )}
                          </>
                        )}
                      </div>
                      <Row>
                        <Col sm={2}>
                          <div className="managePoolImage">
                            {farmerInfo.picture ? (
                              <StyledFarmerImage
                                src={farmerInfo.picture}
                                className="img-fluid"
                                alt="farmer"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </Col>
                        <Col sm={10}>
                          <DetailTable
                            poolAddress={farmerInfo.poolAddress || ""}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12}>
                      <div className="lastlogintext">
                        last active: 3 day ago
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
              <Container>
                <Row>
                  <Col md={8} lg={7}>
                    <h4 className="investment_title font-weight-bolder">
                      Description
                    </h4>
                    <p style={{ fontSize: 15 }}>
                      <ShowMoreContent
                        length={200}
                        content={farmerInfo.description || ""}
                      />
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>
            {renderStrategies()}
            <Footer />
          </>
        )}
      </>
    );
  };

  return <div style={{ background: "#F4F4F4" }}>{renderContent()}</div>;
});
