import React from "react";
import Navbar from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Pagination, Table } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./FarmersStyle.scss";
import ButtonComponent from "../../components/Button/Button";

const FarmersPage = () => {
  return (
    <div>
      <Navbar />

      <div className="navbanHead pt-5 pb-5">
        <Container>
          <h1 className="d-inline-block mt-md-3">Farmers</h1>

          <div className="d-inline-block pull-right selectdrop">
            <img
              src="/assets/images/dropdown.png"
              className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
              alt="Logo"
            />
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select">
                <option>Date range Month</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Container>
      </div>

      {/* Table */}
      <div className="mt-4 mb-5">
        <Container>
          <div className="tablebg">
            <Table responsive className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>RANK</th>
                  <th></th>
                  <th>NAME</th>
                  <th>
                    Budget
                    <img
                      src="/assets/images/icon1.png"
                      className="d-inline-block pl-2"
                      alt="Image"
                    />
                  </th>
                  <th>AGE</th>
                  <th> BURU TOKEN</th>
                  <th>Chart</th>
                  <th>APY</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="nodata">1</td>
                  <td>
                    <img
                      src="/assets/images/blackstar.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td>
                    <span className="spanname"> Dj</span>
                  </td>
                  <td>
                    <span className="spanbold">Djony </span> <br />
                    <span className="fontlight">Nb of farmers: 112</span>
                  </td>
                  <td> $2 280,00</td>
                  <td>3 years</td>
                  <td className="fontlighBold">280 </td>
                  <td className="tdGraphic">
                    <img
                      src="/assets/images/graphic2.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td className="fontdBold">+11,0%</td>
                </tr>

                <tr>
                  <td className="nodata">2</td>
                  <td>
                    <img
                      src="/assets/images/blackstar.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td>
                    <span className="spanname"> Sa</span>
                  </td>
                  <td>
                    <span className="spanbold">Saly </span> <br />
                    <span className="fontlight">Nb of farmers: 103</span>
                  </td>
                  <td> $2 1230,10</td>
                  <td>3 years</td>
                  <td className="fontlighBold">276 </td>
                  <td className="tdGraphic">
                    <img
                      src="/assets/images/graphic2.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td className="fontdBold">+10,5%</td>
                </tr>

                <tr>
                  <td className="nodata">3</td>
                  <td>
                    <img
                      src="/assets/images/blackstar.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td>
                    <span className="spanname"> Ja</span>
                  </td>
                  <td>
                    <span className="spanbold">Jack </span> <br />
                    <span className="fontlight">Nb of farmers: 97</span>
                  </td>
                  <td> $2 080,00</td>
                  <td>3 years</td>
                  <td className="fontlighBold">265 </td>
                  <td className="tdGraphic">
                    <img
                      src="/assets/images/graphic2.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td className="fontdBold">+10,1%</td>
                </tr>

                <tr>
                  <td className="nodata">4</td>
                  <td>
                    <img
                      src="/assets/images/blackstar.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td>
                    <span className="spanname"> Ra</span>
                  </td>
                  <td>
                    <span className="spanbold">Ramp </span> <br />
                    <span className="fontlight">Nb of farmers: 92</span>
                  </td>
                  <td> $1 980,20</td>
                  <td>3 years</td>
                  <td className="fontlighBold">260 </td>
                  <td className="tdGraphic">
                    <img
                      src="/assets/images/graphic2.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td className="fontdBold">+9,7%</td>
                </tr>

                <tr>
                  <td className="rowData" colspan="8">
                    Join our farmers team
                    <ButtonComponent
                      variant="colorBlack"
                      className="btnYellow ml-md-5 btnPadding"
                    >
                      <span> Join us </span>
                    </ButtonComponent>
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td className="nodata">5</td>
                  <td>
                    <img
                      src="/assets/images/blackstar.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td>
                    <span className="spanname"> GQ</span>
                  </td>
                  <td>
                    <span className="spanbold">Ramp </span> <br />
                    <span className="fontlight">Nb of farmers: 81</span>
                  </td>
                  <td> $1 842,00</td>
                  <td>3 years</td>
                  <td className="fontlighBold">245 </td>
                  <td className="tdGraphic">
                    <img
                      src="/assets/images/graphic2.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td className="fontdBold">+8,8%</td>
                </tr>

                <tr>
                  <td className="nodata">6</td>
                  <td>
                    <img
                      src="/assets/images/greystar.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td>
                    <span className="spanname"> NI</span>
                  </td>
                  <td>
                    <span className="spanbold">Nikol </span> <br />
                    <span className="fontlight">Nb of farmers: 80</span>
                  </td>
                  <td> $1 784,00</td>
                  <td>3 years</td>
                  <td className="fontlighBold">240 </td>
                  <td className="tdGraphic">
                    <img
                      src="/assets/images/graphic2.png"
                      className="d-inline-block"
                      alt="Image"
                    />
                  </td>
                  <td className="fontdBold">+7,8%</td>
                </tr>
              </tbody>
            </Table>

            <div className="mt-4">
              <p className="pageTable">Showing 1-10 of 120</p>
              <div className="paginationTable">
                <Pagination>
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Item>{4}</Pagination.Item>
                  <Pagination.Ellipsis />

                  <Pagination.Item>{120}</Pagination.Item>

                  <Pagination.Next />
                </Pagination>
              </div>
              <div className="dropTable">
                Show rows
                <span>
                  <img
                    src="/assets/images/selectdrop.png"
                    className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
                    alt="Logo"
                  />
                </span>
                <Form.Group>
                  <Form.Control as="select">
                    <option>100</option>
                    <option>200</option>
                    <option>300</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/*  footer */}
      <footer className="pt-5 pb-5 mb-0">
        <Container>
          <Row>
            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <img
                    src="/assets/images/footerLogo.png"
                    className="d-inline-block"
                    alt="Image"
                  />
                </div>
                <p>
                  Start building your crypto <br /> investment portfolio with{" "}
                  <br /> a trusted partner
                </p>

                <p className="pt-5">2020</p>
              </div>
            </Col>

            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <h4>Company</h4>
                </div>
                <ul className="pl-0">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Legal</a>
                  </li>
                  <li>
                    <a href="#">GDPR</a>
                  </li>
                  <li>
                    <a href="#">Partners</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <h4>For users</h4>
                </div>
                <ul className="pl-0">
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                  <li>
                    <a href="#">Farmers free tier</a>
                  </li>
                  <li>
                    <a href="#">How to Withdraw</a>
                  </li>
                  <li>
                    <a href="#">How to Verify Your Account</a>
                  </li>
                  <li>
                    <a href="#">Customer Service</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={3}>
              <div className="footcol">
                <div className="footHead mb-md-5 mb-3">
                  <h4>Privacy and Regulation</h4>
                </div>
                <ul className="pl-0">
                  <li>
                    <a href="#"> Buru Cookie Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Regulation & License</a>
                  </li>
                  <li>
                    <a href="#">General Risk Disclosure</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default FarmersPage;
