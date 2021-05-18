import { NavBar } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import "./FarmersStyle.scss";
import { Footer } from "components/Footer/Footer";
import styled from "styled-components";
import { DonKeyTextField } from "components/DonKeyTextField";
import * as React from "react";
import { IFarmerData } from "./interfaces";
import { ContainedButton } from "components/Button";

const RootWrapper = styled.div`
  background-color: #f4e41c;
`;

const CustomForm = styled.form`
  background: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 0.2rem !important;
`;

const TextField = styled(DonKeyTextField)`
  input {
    height: calc(1.5em + 0.75rem + 2px);
  }
`;

const CustomizedButton = styled(ContainedButton)`
  font-weight: 500;
  padding: 12px 15px;
  font-size: 16px;
  line-height: 19px;
  width: auto;
`;

const FarmersPage = () => {
  const [state, setState] = React.useState<IFarmerData>({
    name: "",
    telegram: "",
    donkey: "",
  });

  const handleChange = (name: keyof IFarmerData) => (value: string) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <RootWrapper>
      <NavBar variant="landing" hideWallet />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <h1 className="text-center mt-md-3">Farmers</h1>

              <CustomForm className="p-5" name="newfarmer" method="POST">
                <p className="text-center">
                  You think you are a super star farmer? Come and show everyone!
                  Submit to become an early farmer.
                </p>
                <input type="hidden" name="form-name" value="newfarmer" />

                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <p className="text-center font-weight-bold">
                        Please enter your details below
                      </p>
                      <p className="d-none">
                        <input type="text" name="bot-field" />
                      </p>
                      <TextField
                        label="Nick name"
                        value={state.name}
                        placeholder="Nick name"
                        onChange={handleChange("name")}
                        isRequired
                      />

                      <TextField
                        label="Telegram"
                        value={state.telegram}
                        placeholder="Telegram User"
                        onChange={handleChange("telegram")}
                        isRequired
                      />

                      <TextField
                        multiline
                        label="What kind of Don-key are you?"
                        value={state.donkey}
                        rows={3}
                        placeholder="I'm the kind of farmer you all want to farm"
                        onChange={handleChange("donkey")}
                      />

                      <CustomizedButton type="submit">Submit</CustomizedButton>
                    </div>
                  </div>
                </div>
              </CustomForm>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </RootWrapper>
  );
};

export default FarmersPage;
