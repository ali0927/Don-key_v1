import { NavBar2 } from "../../components/Navbar/NavBar";
import { Container, Form } from "react-bootstrap";
import "./FarmersStyle.scss";
import { Footer } from "components/Footer/Footer";
import ButtonComponent from "components/Button/Button";
import { useState } from "react";
import axios from "axios";
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
                name="newfarmer"
                method="POST"
                style={{ background: "#fff" }}
              >
                <p className="text-center">
                  You think you are a super star farmer? come and show everyone!
                  Submit to become an early farmer
                </p>
                <input type="hidden" name="form-name" value="newfarmer" />

                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <p className="text-center font-weight-bold">
                        Please Enter Your details Below
                      </p>
                      <p className="d-none">
                        <input type="text" name="bot-field" />
                      </p>
                      <Form.Group controlId="nickname">
                        <Form.Label>Nick name</Form.Label>
                        <Form.Control name="nickname" placeholder="Nick name" />
                      </Form.Group>
                      <Form.Group controlId="telegram">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control
                          name="telegram"
                          placeholder="Telegram User"
                        />
                      </Form.Group>

                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>What kind of Don-key are you?</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          placeholder="I'm the kind of farmer you all want to farm"
                          rows={3}
                        />
                      </Form.Group>
                      <ButtonComponent type="submit" className="btnYellow">
                        Submit
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default FarmersPage;
