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
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "interfaces";
import { setFarmerDetail } from "actions/farmerActions";
import { DonKeyTextField } from "components/DonKeyTextField";
import { FileUploadButton } from "components/FileUploadButton";

const Root = styled.div`
   z-index: 1;
`

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

const RootHeading = styled.p`
  max-width: 253px;
  font-family: Roboto;
  font-style: normal;
  font-size: 20px;
  color: #222222;
`;

const LargeLeftCloud = styled(LargeCloud)`
  left: 10%;
  @media (max-width: 992px) {
    left: 0;
  }
`;

const LargeRightCloud = styled(LargeCloud)`
  right: 10%;
  @media (max-width: 992px) {
     right: 0;
  }
`;

const SmallLeftCloud = styled(SmallCloud)`
  top: 23%;
  left: 21%;
  @media (max-width: 992px) {
     left: 3%;
  }
`;

const SmallRightCloud = styled(SmallCloud)`
  top: 23%;
  right: 21%;
  @media (max-width: 992px) {
    right: 3%;
  }
`

export const FarmerSignupPage = withWeb3(() => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>();

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const farmer = useSelector((state: IStoreState) => state.farmer);
  const [{ }, executePost] = useAxios(
    { method: "POST", url: "/api/v2/farmer" },
    { manual: true, useCache: false }
  );
  const [posting, setPosting] = useState(false);

  const web3 = useWeb3();
  const [spinnermsg, setSpinnerMsg] = useState("");

  const dispatch = useDispatch();
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
      setSpinnerMsg("Creating Pool Contract");
      const poolAddress = await deployContract();
      formData.append("poolAddress", poolAddress);
      setSpinnerMsg("Creating Farmer Account");
      const res = await executePost({ data: formData });
      setSpinnerMsg("Redirecting To Your Farmer Profile");
      dispatch(setFarmerDetail(res.data.data));
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
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <Spinner animation="border" color="dark" />
          <div className="mt-4">
            {spinnermsg}
          </div>
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
            <RootHeading className="text-left font-weight-bold mb-4">
              Please Enter Some Details. To get Started as a Farmer
            </RootHeading>

            <DonKeyTextField
              label="Name"
              value={name}
              placeholder="Don - Key Name"
              onChange={(value) => setName(value)}
            />

            <DonKeyTextField
              label="Description"
              value={description}
              rows={3}
              multiline
              placeholder="Don - Key Description"
              onChange={(value) => setDescription(value)}
            />

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="signup-field-label">Picture</Form.Label>

              <FileUploadButton
                file={image}
                onChange={(image) => setImage(image)} />

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
          <Root className=" pt-5 pb-5 position-relative mb-5">
            <LargeLeftCloud className="position-absolute" />
            <LargeRightCloud className="position-absolute" />

            <SmallLeftCloud className="position-absolute" />
            <SmallRightCloud className="position-absolute" />

            <Container className="position-relative">
              <div className="row justify-content-center">
                <div className="col-md-5">

                  <SignUpForm>{renderContent()}</SignUpForm>

                </div>
              </div>
            </Container>
          </Root>
          <div className="d-flex justify-content-center">
            <SignupBottomBgIcon className="signup-bottom-icon" />
          </div>
        </div>
      </Layout>
    </>
  );
});
