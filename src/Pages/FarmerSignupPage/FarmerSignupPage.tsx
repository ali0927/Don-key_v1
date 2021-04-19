import ButtonComponent from "components/Button/Button";
import { Layout } from "components/Layout";
import { useWeb3 } from "don-components";
import { withWeb3 } from "hoc";
import { useAxios } from "hooks/useAxios";
import {
  DonKeyIcon,
  LargeCloud,
  SignupBottomBgIcon,
  SmallCloud,
  SmallFolderIcon,
} from "icons";
import { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import "./FarmerSignupPage.scss";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IStoreState } from "interfaces";

const SignUpForm = styled.form`
  background-color: #fff;
  padding: 50px;
  min-height: 500px;
  border-radius: 5px;
  max-width: 437px;
`;

const StyledDonkey = styled(DonKeyIcon)`
  position: absolute;
  bottom: 20px;
  right: -64px;
`;

export const FarmerSignupPage = withWeb3(() => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const farmer = useSelector((state: IStoreState) => state.farmer);
  const [{}, executePost] = useAxios(
    { method: "PUT", url: "/api/v2/farmer" },
    { manual: true, useCache: false }
  );
  const [posting, setPosting] = useState(false);
  
  const web3 = useWeb3();
  const handleCreate = async () => {
    setPosting(true);
    try {
      const formData = new FormData();
      if (!name) {
        return setErrorMsg("Please Enter a Name");
      }
      if (!description) {
        return setErrorMsg("Please Enter a Description");
      }
      if (!image) {
        return setErrorMsg("Please Provide a Picture");
      }
      formData.append("name", name);
      formData.append("description", description);
      if (image) {
        formData.append("picture", image);
      }

      const poolAddress = await deployContract();
      formData.append("poolAddress", poolAddress);

      await executePost({ data: formData });
    } finally {
      setPosting(false);
    }

    history.push("/dashboard/farmer/me");
  };

  const deployContract = async () => {
    const POOLJson = await import("../../JsonData/Pool.json");
    const contract = new web3.eth.Contract(POOLJson.abi as any);
    const accounts = await web3.eth.getAccounts();

    let payload = {
      data: POOLJson.bytecode,
    };
    const gasPrice = await web3.eth.getGasPrice();
    let parameter: any = {
      from: accounts[0],
      gas: web3.utils.toHex(8000000),
      gasPrice: gasPrice,
    };

    return new Promise<string>((res, rej) => {
      contract
        .deploy(payload)
        .send(parameter, (err, transactionHash) => {
          console.log("Transaction Hash :", transactionHash);
        })
        .on("error", rej)
        .then((newContractInstance) => {
          res(newContractInstance.options.address);
        });
    });
  };

  useEffect(() => {
    if (errorMsg) {
      setErrorMsg("");
    }
  }, [name, description, image]);
  const renderContent = () => {
    if (posting) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
        </div>
      );
    }
    if (farmer?.poolAddress) {
      return <div className="text-center">
        You Have Already Signed Up
      </div>;
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <p className="text-left font-weight-bold root-heading mb-4">
              Please Enter Some Details. To get Started as a Farmer
            </p>

            <Form.Group controlId="name">
              <Form.Label className="signup-field-label">Name</Form.Label>
              <Form.Control
                className="signup-field signup-field-Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Don - Key Name"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label className="signup-field-label">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                className="signup-field signup-field-description p-3"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Don - Key Description"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="signup-field-label">Picture</Form.Label>

              <div className="signup-root d-flex flex-wrap align-items-center mb-5">
                <div className="signup-upload-btn d-flex align-items-center justify-content-center mr-3">
                  <SmallFolderIcon className="mr-2" />
                  <div className="choose-field-label">Choose File</div>
                  <input
                    type="file"
                    name="myfile"
                    required
                    onChange={(e) => setImage((e.target as any).files[0])}
                  />
                </div>
                <div className="choose-field-label">
                  {image ? image.name : "No file chosen"}
                </div>
              </div>
            </Form.Group>
            {errorMsg && <div className="text-danger mb-3">{errorMsg}</div>}
            <ButtonComponent
              onClick={handleCreate}
              className="btnYellow btnMakeProfile"
            >
              Make Farmer Profile
            </ButtonComponent>

            <StyledDonkey />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Layout variant="loggedin">
        <div className="position-relative overflow-hidden">
          <div className=" pt-5 pb-5 position-relative containerRoot  mb-5">
            <LargeCloud className="position-absolute leftCloud" />
            <LargeCloud className="position-absolute rightCloud" />

            <SmallCloud className="position-absolute smallLeftCloud" />
            <SmallCloud className="position-absolute smallRightCloud" />

            <Container className="position-relative">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <SignUpForm>{renderContent()}</SignUpForm>
                </div>
              </div>
            </Container>
          </div>
          <div className="d-flex justify-content-center">
            <SignupBottomBgIcon className="signup-bottom-icon" />
          </div>
        </div>
      </Layout>
    </>
  );
});
