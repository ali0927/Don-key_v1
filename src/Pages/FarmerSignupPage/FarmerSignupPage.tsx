import { UrlJsonRpcProvider } from "@ethersproject/providers";
import ButtonComponent from "components/Button/Button";
import { Layout } from "components/Layout";
import { useWeb3 } from "don-components";
import { withWeb3 } from "hoc";
import { useAxios } from "hooks/useAxios";
import { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";

export const FarmerSignupPage = withWeb3(() => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [{ data, error, loading }] = useAxios("/api/v1/farmer", {useCache: false});
  const [{}, executePost] = useAxios(
    { method: "PUT", url: "/api/v1/farmer" },
    { manual: true }
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
    if (error) {
      return "Some Error Occurred";
    }
    if (loading || posting) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
        </div>
      );
    }
    if (data?.data?.poolAddress) {
      return "Already Signed Up";
    }
    return (
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
            {errorMsg && <div className="text-danger mb-3">{errorMsg}</div>}
            <ButtonComponent onClick={handleCreate} className="btnYellow">
              Make Farmer Profile
            </ButtonComponent>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout variant="loggedin">
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <form
                className="newStrategyContent"
                style={{ background: "#fff" }}
              >
                {renderContent()}
              </form>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
});
