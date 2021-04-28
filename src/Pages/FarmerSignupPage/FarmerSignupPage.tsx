import * as React from "react";
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
import { IDonKeyFieldInfoState } from "components/DonKeyTextField/interfaces";
import { validate } from "./helpers";
import { ContainedButton } from "components/Button";

const Root = styled.div`
  z-index: 1;
`;

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
`;

const SignupBottomIcon = styled(SignupBottomBgIcon)`
  position: absolute;
  bottom: 0;
  margin-bottom: -19px;
`;

const CustomContainer = styled(Container)`
  margin-bottom: 9%;
`;

export const FarmerSignupPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>();

  const [nameInfoState, setNameInfoState] = React.useState<
    IDonKeyFieldInfoState | undefined
  >();
  const [desInfoState, setDesInfoState] = React.useState<
    IDonKeyFieldInfoState | undefined
  >();
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const farmer = useSelector((state: IStoreState) => state.farmer);
  const [{}, executePost] = useAxios(
    { method: "POST", url: "/api/v2/farmer" },
    { manual: true, useCache: false }
  );
  const [{ loading }, executeVerify] = useAxios(
    { method: "POST", url: "/api/v2/usernameverify" },
    { manual: true }
  );
  const [posting, setPosting] = useState(false);

  const web3 = useWeb3();
  const [spinnermsg, setSpinnerMsg] = useState("");

  const dispatch = useDispatch();
  const isFormError =
    (nameInfoState && nameInfoState.type === "error") ||
    (desInfoState && desInfoState.type === "error");
  const handleCreate = async () => {
    setPosting(true);
    try {
      const formData = new FormData();
      const isNameError = validate(name, [
        { rule: "required", errMessage: "Name is required." },
      ]);
      const isDesError = validate(description, [
        { rule: "required", errMessage: "Description is required." },
      ]);
      if (isFormError) {
        return;
      }
      if (isNameError) {
        return setNameInfoState({
          type: "error",
          msg: isNameError.msg,
        });
      }
      if (isDesError) {
        return setDesInfoState({ type: "error", msg: isDesError.msg });
      }

      if (!image) {
        return setErrorMsg("Please Provide a Picture");
      }
      formData.append("name", name);
      formData.append("description", description);
      if (image) {
        formData.append("picture", image);
      }

      setSpinnerMsg("Creating Farmer Account");
      const res = await executePost({ data: formData });

      dispatch(setFarmerDetail(res.data.data));
    } finally {
      setPosting(false);
    }
  };

  // const deployContract = async () => {
  //   const POOLJson = await import("../../JsonData/Pool.json");
  //   const contract = new web3.eth.Contract(POOLJson.abi as any);
  //   const accounts = await web3.eth.getAccounts();

  //   let payload = {
  //     data: POOLJson.bytecode,
  //   };
  //   const gasPrice = await web3.eth.getGasPrice();
  //   let parameter: any = {
  //     from: accounts[0],
  //     gas: web3.utils.toHex(8000000),
  //     gasPrice: gasPrice,
  //   };

  //   return new Promise<string>((res, rej) => {
  //     contract
  //       .deploy(payload)
  //       .send(parameter, (err, transactionHash) => {
  //         console.log("Transaction Hash :", transactionHash);
  //       })
  //       .on("error", rej)
  //       .then((newContractInstance) => {
  //         res(newContractInstance.options.address);
  //       });
  //   });
  // };

  // const handlePoolCreation = () => {
  //   setPosting(true);
  // }

  const handleChange = async (value: string) => {
    setName(value);
    setNameInfoState(undefined);
  };

  const isUserAvailable = async (value: string) => {
    const result = await executeVerify({ data: { name: value } });
    if (result.data.data) {
      return setNameInfoState({
        type: "success",
        msg: "name is available",
      });
    } else {
      return setNameInfoState({
        type: "error",
        msg: "This username is already in use.",
      });
    }
  };

  const handleBlur = async (value: string) => {
    const error = validate(value, [
      { rule: "required", errMessage: "Username is required." },
      {
        rule: "min:3",
        errMessage: "Username should contain atleast 3 Characters.",
      },
      {
        rule: "regex:^[a-zA-Z_][A-Za-z0-9 ]+$",
        errMessage:
          "Username must start with a letter. Allowed characters are A-z a-z and 0-9",
      },
      { rule: "max:25", errMessage: "Username can be max characters long." },
    ]);
    if (error) {
      setNameInfoState({
        type: "error",
        msg: error.msg,
      });
    } else {
      await isUserAvailable(value);
    }
  };

  const handleDesChange = (value: string) => {
    setDescription(value);
    setDesInfoState(undefined);
  };

  const handleDesBlur = (value: string) => {
    const error = validate(value, [
      { rule: "required", errMessage: "Description is required." },
      {
        rule: "min:10",
        errMessage: "Description should contain atleast 10 Characters.",
      },
      { rule: "max:300", errMessage: "Description can be max characters long." },
    ]);
    if (error) {
      return setDesInfoState({ type: "error", msg: error.msg });
    }
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
          <div className="mt-4">{spinnermsg}</div>
        </div>
      );
    }
    if (farmer?.status === "under_review") {
      return <div className="text-center">Your Account is under review</div>;
    }

    if (farmer?.status === "active" && !farmer?.poolAddress) {
      return (
        <div className="d-flex align-items-center justify-content-center">
          You can start Farming once your pool is Deployed
        </div>
      );
    }

    if (farmer?.poolAddress) {
      return <div className="text-center">You Have Already Signed Up</div>;
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
              loading={loading}
              info={nameInfoState}
              placeholder="Don - Key Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <DonKeyTextField
              label="Description"
              value={description}
              rows={3}
              multiline
              info={desInfoState}
              placeholder="Don - Key Description"
              onBlur={handleDesBlur}
              onChange={handleDesChange}
            />

            <Form.Group
              className="mb-5"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="signup-field-label">Picture</Form.Label>

              <FileUploadButton
                file={image}
                fileExtensions=".png,	.jpg, .jpeg, .jfif, .pjpeg, .pjp,.gif,.avif,.apng,.svg,.webp"
                errorMessage={errorMsg}
                onChange={(image) => setImage(image)}
              />
            </Form.Group>
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

            <CustomContainer className="position-relative">
              <div className="row justify-content-center">
                <SignUpForm className="col-lg-7">{renderContent()}</SignUpForm>
              </div>
            </CustomContainer>
          </Root>
          <div className="d-flex justify-content-center">
            <SignupBottomIcon />
          </div>
        </div>
      </Layout>
    </>
  );
};
