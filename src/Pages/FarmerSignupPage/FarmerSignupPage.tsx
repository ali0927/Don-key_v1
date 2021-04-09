import ButtonComponent from "components/Button/Button";
import { Footer } from "components/Footer/Footer";
import { NavBar2 } from "components/Navbar/NavBar";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { api } from "services/api";


export const FarmerSignupPage = () => {
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
}

