import { apiRequest } from "actions/apiActions";
import ButtonComponent from "components/Button/Button";
import { Footer } from "components/Footer/Footer";
import { NavBar2 } from "components/Navbar/NavBar";
import { useInputState } from "hooks/useInputState";
import { InvestmentPage } from "Pages/InvestmentPage/InvestmentPage";
import { LoadingPage } from "Pages/LoadingPage";
import { Web3Provider } from "providers/Web3Provider";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { api } from "services/api";

const FarmS = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("picture", image);
    }

    await api.post("/api/v1/farmer", formData);
    window.location.reload();
  };

  return (
    <div className="bgnav">
      <NavBar2 variant="loggedin" />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <form
                className="newStrategyContent"
                style={{ background: "#fff" }}
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <p className="text-center font-weight-bold">
                        Please Enter Some Details . To get Started as a Farmer
                      </p>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="Name"
                        />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          placeholder="Description"
                        />
                      </Form.Group>

                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) => setImage((e.target as any).files[0])}
                        />
                      </Form.Group>
                      <ButtonComponent
                        onClick={handleCreate}
                        className="btnYellow"
                      >
                        Create
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

export const FarmerStrategyPage = () => {
  const [farmerInfo, setFarmerInfo] = useState();
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      apiRequest({
        method: "GET",
        endpoint: "/api/v1/farmer",
        onDone: (res) => {
          const data = res.data.data;
          if (data) {
            setFarmerInfo(data);
          }
          setIsReady(true);
        },
        onFail: () => {
          setIsReady(true)
        }
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPage = () => {
    if (!isReady) {
      return <LoadingPage />;
    }
 
    if (!farmerInfo) {
      return <InvestmentPage />;
    }
    return <FarmS />;
  };

  return <Web3Provider>{renderPage()}</Web3Provider>;
};
