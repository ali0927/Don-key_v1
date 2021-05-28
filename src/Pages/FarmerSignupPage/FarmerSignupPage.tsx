/* eslint-disable no-empty-pattern */
import * as React from "react";
import { Layout } from "components/Layout";
import { useAxios } from "hooks/useAxios";
import { DonKeyIcon, LargeCloud, SignupBottomBgIcon, SmallCloud } from "icons";
import { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { DonKeyTextField } from "components/DonKeyTextField";
import { FileUploadButton } from "components/FileUploadButton";
import { IDonKeyFieldInfoState } from "components/DonKeyTextField/interfaces";
import { validate } from "./helpers";
import { ContainedButton } from "components/Button";
import { useSnackbar } from "notistack";
import { ErrorSnackbar } from "components/Snackbars";

const Root = styled.div`
  z-index: 1;
`;

const SignUpForm = styled.div`
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

const MakeFarmerProfileBtn = styled(ContainedButton)`
  width: fit-content;
  border-radius: 5px;
  padding: 12px 15px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.03em;
  color: #070602;
  font-weight: 500;
`;

export const FarmerSignupPage = () => {
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const { enqueueSnackbar } = useSnackbar();

  const [nameInfoState, setNameInfoState] =
    React.useState<IDonKeyFieldInfoState | undefined>();
  const [desInfoState, setDesInfoState] =
    React.useState<IDonKeyFieldInfoState | undefined>();
  const [errorMsg, setErrorMsg] = useState("");
  const [telegramInfoState, setTelegramInfoState] =
  React.useState<IDonKeyFieldInfoState | undefined>();

  const [{}, executePost] = useAxios(
    { method: "POST", url: "/api/v2/farmer" },
    { manual: true, useCache: false }
  );
  const [{ loading }, executeVerify] = useAxios(
    { method: "POST", url: "/api/v2/usernameverify" },
    { manual: true }
  );
  const [posting, setPosting] = useState(false);

  //const web3 = useWeb3();
  const [spinnermsg, setSpinnerMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormError =
    (nameInfoState && nameInfoState.type === "error") ||
    (desInfoState && desInfoState.type === "error");
  const handleCreate = async () => {
    setPosting(true);
    try {
      const formData = new FormData();
      const isNameError = validate(name, [
        { rule: "required", errMessage: "Nickname is required." },
      ]);
      const isTelegramError = validate(telegram, [
        { rule: "required", errMessage: "Telegram is required." },
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
      if (isTelegramError) {
        return setTelegramInfoState({
          type: "error",
          msg: isTelegramError.msg,
        });
      }
      if (isDesError) {
        return setDesInfoState({ type: "error", msg: isDesError.msg });
      }

      if (!image) {
        return setErrorMsg("Please Provide a Picture");
      }
      formData.append("name", name);
      formData.append("telegram", telegram);
      formData.append("description", description);
      if (image) {
        formData.append("picture", image);
      }

      setSpinnerMsg("Submitting Form");
      await executePost({ data: formData });
      setIsSubmitted(true)
    } catch (error) {
      let message = "Please try again.";
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data
      ) {
        message = error.response.data["data"];
      }
      enqueueSnackbar(message, {
        content: (key, msg) => <ErrorSnackbar message={msg as string} />,
        autoHideDuration: 5000,
        persist: false,
      });
    } finally {
      setPosting(false);
    }
  };


  const handleChange = async (value: string) => {
    setName(value);
    setNameInfoState(undefined);
  };

  const handleTelegramChange = (value: string) => {
    setTelegram(value);
    setTelegramInfoState(undefined);
  }

  const isUserAvailable = async (value: string) => {
    const result = await executeVerify({ data: { name: value } });
    if (result.data.data) {
      return setNameInfoState({
        type: "success",
        msg: "Nick name is available.",
      });
    } else {
      return setNameInfoState({
        type: "error",
        msg: "Nick name is already in use.",
      });
    }
  };

  const handleBlur = async (value: string) => {
    const error = validate(value, [
      { rule: "required", errMessage: "Nickname is required." },
      {
        rule: "min:3",
        errMessage: " should contain atleast 3 Characters.",
      },
      {
        rule: "regex:^[a-zA-Z_][A-Za-z0-9 ]+$",
        errMessage:
          "Nickname must start with a letter. Allowed characters are A-z a-z and 0-9.",
      },
      { rule: "max:25", errMessage: "Nickname can be max characters long." },
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

  const handleTelegraBlur = (value: string) => {
    const error = validate(value, [
      { rule: "required", errMessage: "Telegram is required." },
      { rule: "max:100", errMessage: "Telegram can be max characters long." },
    ]);
    if (error) {
      setTelegramInfoState({
        type: "error",
        msg: error.msg,
      });
    } 
  }

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
      {
        rule: "max:300",
        errMessage: "Description can be max characters long.",
      },
    ]);
    if (error) {
      return setDesInfoState({ type: "error", msg: error.msg });
    }
    return setDesInfoState({
      type: "success",
      msg: "",
    });
  };

  useEffect(() => {
    if (errorMsg) {
      setErrorMsg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (isSubmitted) {
      return <div className="text-center">Thank you for your submission. We will be in touch soon.</div>;
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <RootHeading className="text-left font-weight-bold mb-4">
              Please Enter Some Details. To get Started as a Farmer
            </RootHeading>

            <DonKeyTextField
              label="Nickname (Required)"
              value={name}
              loading={loading}
              info={nameInfoState}
              placeholder="Don - Key Finance"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <DonKeyTextField
              label="Telegram (Required)"
              value={telegram}
              info={telegramInfoState}
              placeholder="Telegram User"
              onChange={handleTelegramChange}
              onBlur={handleTelegraBlur}
            />

            <DonKeyTextField
              label="What kind of Don-Key Are You?"
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
            <MakeFarmerProfileBtn onClick={handleCreate}>
              {" "}
              Submit
            </MakeFarmerProfileBtn>

            <StyledDonkey />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Layout variant="landing">
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
