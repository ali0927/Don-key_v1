import { NavBar } from "components/Navbar/NavBar";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import { EmptyIcon } from "components/Icons";
import { ShowMoreContent } from "components/ShowmoreContent";
import Web3 from "web3";
import PoolAbi from "./PoolAbi.json";
import "./FarmerBioPage.scss";
import { getWeb3 } from "don-utils";
import { withWeb3 } from "hoc";
import { useSelector, useDispatch } from "react-redux";
import { getFarmerDetails } from "actions/farmerActions";
import { useParams } from "react-router-dom";
import { TabSection } from "components/TabSection";
import { MainTab } from "Pages/FarmerBioPage/Tabs/MainTab";
import { FarmerModal } from "components/FarmerModal/FarmerModal";
import ButtonComponent from "components/Button/Button";
import { useNotification } from "components/Notification";
import { useAxios } from "hooks/useAxios";

export const tabs = [
  { text: "Main", comp: <MainTab title="Strategies" />, icon: <EmptyIcon /> },
];
const poolAddress = "0x921E8B9185Fe180Eb2a1770A1137F6e6E22E9B37";

async function fetchBalance() {
  const web3 = (await getWeb3()) as Web3;
  const accounts = await web3.eth.getAccounts();

  const WBNB = new web3.eth.Contract(PoolAbi as any, poolAddress);
  const balance = await WBNB.methods.gettInvested().call();
  return 0;
}

const DetailTable = ({
  poolAddress,
  userName,
}: {
  poolAddress: any;
  userName: string;
}) => {
  const [{ loading }, executePost] = useAxios(
    { method: "POST", url: "/api/v1/farmerinvestments" },
    { manual: true }
  );

  const [{ loading: deleting }, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v1/farmerinvestments" },
    { manual: true }
  );

  const { showNotification } = useNotification();

  const handleInvestFarmer = async () => {
    try {
      await executePost({
        data: {
          poolAddress: poolAddress,
        },
      });

      showNotification({
        msg: (
          <>
            <p className="text-center">{`Money Invested into Farmer ${userName} Successfully.`}</p>
          </>
        ),
      });
    } catch (err) {
      let errorMessage = "Money Was not Invested. Some Error Occurred";
      if (err && err.response && err.response.status === 409) {
        errorMessage = "You have already invested into this pool.";
      }

      showNotification({
        msg: (
          <>
            <p className="text-center">{errorMessage}</p>
          </>
        ),
      });
    }
  };

  const handleWithDraw = async () => {
    try {
      await executeDelete({
        data: {
          toWalletAddress: poolAddress,
        },
      });

      showNotification({
        msg: (
          <>
            <p className="text-center">{`Money Withdraw into Farmer ${userName} Successfully.`}</p>
          </>
        ),
      });
    } catch (err) {
      let errorMessage = "Could not withdraw Money. An error occurred";
      if (err && err.response && err.response.status === 404) {
        errorMessage =
          "You have already withdraw form this pull or not invested into this pool.";
      }

      showNotification({
        msg: (
          <>
            <p className="text-center">{errorMessage}</p>
          </>
        ),
      });
    }
  };

  return (
    <div className="bio-banner-rightCol">
      <Row>
        <Col md={7}>
          <div className="bg-white poolCol">
            <div className="list-box">
              <h5 className="heading-title">Pool address</h5>
              <div>{poolAddress}</div>
            </div>
          </div>
        </Col>
        <Col md={5}>
          <div className="text-white poolValueCol">
            <div className="list-box">
              <div>Total Pool Value</div>{" "}
              <h5 className="heading-title">100BUSD</h5>
            </div>
            <div className="list-box">
              <div>
                <Button
                  className="mb-3"
                  disabled={loading}
                  onClick={handleInvestFarmer}
                >
                  {" "}
                  Invest
                </Button>
              </div>
              <div>
                <Button disabled={deleting} onClick={handleWithDraw}>
                  Widthraw
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const FarmerBioPage = withWeb3(() => {
  const [balance, setBalance] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const farmerInfo = useSelector((state: any) => state.farmer);

  const dispatch = useDispatch();
  let parms = useParams();

  useEffect(() => {
    (async () => {
      const balance = await fetchBalance();
      setBalance(balance);
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    dispatch(getFarmerDetails(parms));
  }, [parms]);

  const renderContent = () => {
    if (farmerInfo === null) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
        </div>
      );
    }

    console.log(farmerInfo);

    return (
      <>
        <NavBar variant="loggedin" />
        {farmerInfo && farmerInfo.user && (
          <>
            <section className="bg-buru">
              <div className="navbanHead rounded-0 pt-5 pb-5">
                <Container>
                  <Row>
                    <Col sm={12}>
                      <div className="d-flex">
                        <h2 className="firstHeading mb-3">
                          {farmerInfo && farmerInfo.user
                            ? farmerInfo.user.name
                            : ""}
                        </h2>
                        {Object.keys(parms).length === 0 && (
                          <div>
                            <ButtonComponent
                              variant="outline-secondary"
                              className="editBio-btn"
                              onClick={() => setModalShow(true)}
                            >
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.1266 1.96013L11.0392 0.872631C10.5423 0.375778 9.73398 0.375801 9.23715 0.872631L8.81152 1.29828L11.701 4.18799L12.1266 3.76234C12.6246 3.26432 12.6247 2.45821 12.1266 1.96013Z"
                                  fill="#36352C"
                                />
                                <path
                                  d="M1.01591 9.32812L0.505881 12.0825C0.48481 12.1964 0.521092 12.3133 0.602959 12.3952C0.68492 12.4771 0.801874 12.5133 0.915569 12.4923L3.66976 11.9822L1.01591 9.32812Z"
                                  fill="#36352C"
                                />
                                <path
                                  d="M8.31449 1.79688L1.39551 8.71639L4.28498 11.6061L11.204 4.68659L8.31449 1.79688Z"
                                  fill="#36352C"
                                />
                              </svg>
                              Edit bio page
                            </ButtonComponent>
                          </div>
                        )}
                      </div>
                      <Row>
                        <Col sm={2}>
                          <div className=" managePoolImage">
                            {farmerInfo && farmerInfo.user ? (
                              <img src={farmerInfo.user.picture} alt="Image" />
                            ) : (
                              ""
                            )}
                          </div>
                        </Col>
                        <Col sm={10}>
                          <DetailTable
                            poolAddress={
                              farmerInfo.user && farmerInfo.user.poolAddress
                            }
                            userName={
                              farmerInfo && farmerInfo.user
                                ? farmerInfo.user.name
                                : ""
                            }
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
                      {" "}
                      Description
                    </h4>
                    <p style={{ fontSize: 15 }}>
                      {farmerInfo && farmerInfo.user ? (
                        <ShowMoreContent
                          length={200}
                          content={farmerInfo.user.description}
                        />
                      ) : (
                        ""
                      )}
                    </p>
                  </Col>
                  <Col sm={12}>
                    <hr />
                  </Col>
                </Row>
              </Container>
            </section>
            {Object.keys(parms).length === 0 && (
              <>
                <TabSection tabs={tabs} />
                <FarmerModal
                  isOpen={modalShow}
                  onClose={() => setModalShow(false)}
                />
              </>
            )}
            <Footer />
          </>
        )}
      </>
    );
  };

  return <>{renderContent()}</>;
});
