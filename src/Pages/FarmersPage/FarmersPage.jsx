import { NavBar2 } from "../../components/Navbar/NavBar";
import { Container, Form } from "react-bootstrap";
import "./FarmersStyle.scss";
import { Footer } from "components/Footer/Footer";
const FarmersPage = () => {
  return (
    <div className="bgnav">
      <NavBar2 hideWallet />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <h1 className="text-center mt-md-3">Farmers</h1>

              <form
                className="newStrategyContent"
                style={{ background: "#fff" }}
              >
                <p className="text-center">
                  You think you are a super star farmer? come and show everyone!
                  submit to being an early farmer
                </p>

                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <p className="text-center font-weight-bold">
                        Please Enter Your details Below
                      </p>
                      <Form.Group controlId="nickname">
                        <Form.Label>Nick name</Form.Label>
                        <Form.Control placeholder="Nick name" />
                      </Form.Group>
                      <Form.Group controlId="telegram">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control placeholder="Telegram User" />
                      </Form.Group>

                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>What kind of Don-key are you?</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>

      {/* Table */}
      {/* <div className="mt-4 mb-5">
        <Container>
          <div className="tablebg">
            <Table responsive>
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
                {DataFarmer.map((item, index) => {
                  var str = item.name;
                  var res = str.substring(0, 2).toLocaleUpperCase();
                  var number = item.apy;
                  if (number.toString().length >= 3) {
                    var num = number
                      .toString()
                      .replace(/\B(?=(\d{2})+(?!\d))/g, ",");
                  } else {
                    var num = number
                      .toString()
                      .replace(/\B(?=(\d{1})+(?!\d))/g, ",");
                  }

                  return (
                    <>
                      <tr>
                        <td className="nodata">{item.id}</td>
                        <td>
                          <img
                            src="/assets/images/blackstar.png"
                            className="d-inline-block"
                            alt="Image"
                          />
                        </td>
                        <td>
                          <span className="spanname"> {res}</span>
                        </td>
                        <td>
                          <span className="spanbold">{item.name} </span> <br />
                          <span className="fontlight">
                            Nb of farmers: {item.nb_farmers}
                          </span>
                        </td>
                        <td> ${item.budget}</td>
                        <td>{item.age} years</td>
                        <td className="fontlighBold">{item.buru_token} </td>
                        <td className="tdGraphic">
                          {item.chart_url ? (
                            <img
                              src={item.chart_url}
                              className="d-inline-block"
                              alt="Image"
                            />
                          ) : (
                            <img
                              src="/assets/images/graphic2.png"
                              className="d-inline-block"
                              alt="Image"
                            />
                          )}
                        </td>
                        <td className="fontdBold">{"+" + `${num}` + "%"}</td>
                      </tr>
                      {item.id == 2 ? (
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
                      ) : null}
                    </>
                  );
                })}
              </tbody>
            </Table>

            <div className="mt-4 pagePosition">
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
      <Footer />
    </div>
  );
};

export default FarmersPage;
