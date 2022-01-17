import { Form, Label, Input, Select, TextArea } from "components/BugReportForm";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { DonPartnerIcon } from "icons";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { strapi } from "strapi";
import styled from "styled-components";

const PartnerTypes = [
  "DEX",
  "Yield farming optimizer",
  "Yield farming aggregator",
  "NFT market place",
  "Other",
];

const StyledTitle = styled.h1`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: bold;
  font-size: 30px;
  background: #f7f5f5;
  border-radius: 20px;
  padding: 10px 20px;
  padding-left: 60px;
  position: relative;
`;

const Subtitle = styled.p``;

const SubmitButton = styled.button`
  padding: 16px;
  font-weight: 500;
  font-size: 14px;
  color: #000;
  border-radius: 10px;
  background: linear-gradient(146.14deg, #fff037 0%, #fac200 100%);
  border: 1px solid #be9400;
  display: block;
  width: 100%;
`;

const INITIAL_STATE = {
  name: "",
  telegram: "",
  space: "DEX",
  description: "",
};

const validate = (state: typeof INITIAL_STATE) => {
  if (!state.space) {
    return { isValid: false, message: "Please select a Space" };
  }
  if (!state.name) {
    return { isValid: false, message: "Please enter name" };
  } else if (!(state.name.length >= 3)) {
    return { isValid: false, message: "Name should be at least 3 Characters" };
  }

  if (!state.telegram) {
    return { isValid: false, message: "Please enter telegram" };
  } else if (!(state.telegram.length >= 3)) {
    return {
      isValid: false,
      message: "Telegram should be at least 3 Characters",
    };
  }

  if (!state.description) {
    return { isValid: false, message: "Please enter message" };
  } else if (!(state.description.length >= 10)) {
    return {
      isValid: false,
      message: "Please enter at least 10 characters in message",
    };
  }
  return { isValid: true, message: null };
};

export const BecomeAPartnerForm = () => {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isCreating, setIsCreating] = useState(false);

  const { showFailure, showSuccess } = useTransactionNotification();

  const handleChange =
    <K extends keyof typeof INITIAL_STATE>(key: K) =>
    (e: { target: { value: string | File } }) => {
      const value = e.target.value;
      setFormState((old) => ({ ...old, [key]: value }));
    };

  const handleCreate = async () => {
    const validationResp = validate(formState);
    if (!validationResp.isValid) {
      showFailure(validationResp.message);
      return;
    }
    setIsCreating(true);
    try {
      await strapi.post("/partner-form-submissions", formState);

      setFormState(INITIAL_STATE);
      showSuccess("Your submission was saved.")
    } catch (e) {
      console.log(e);
      showFailure("Please Try Again Later");
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <Form>
      <div className="d-flex justify-content-center">
        <StyledTitle className="mb-4">
          <span style={{ position: "absolute", top: -12, left: -40 }}>
            {" "}
            <DonPartnerIcon />
          </span>
          Become a Partner
        </StyledTitle>
      </div>

      <Subtitle className="mb-4">
        Tell us about your amazing project so we can contact you and get this
        Mule pool on the road
      </Subtitle>
      <Label>
        Project Name
        <Input
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="Don-key"
        />
      </Label>
      <Label>
        Telegram
        <Input
          value={formState.telegram}
          onChange={handleChange("telegram")}
          placeholder="Telegram user"
        />
      </Label>
      <Label>
        Space
        <Select onChange={handleChange("space")} value={formState.space}>
          {PartnerTypes.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </Select>
      </Label>
      <Label>
        Write Something
        <TextArea
          rows={5}
          value={formState.description}
          onChange={handleChange("description")}
          placeholder="Description"
        ></TextArea>
      </Label>
      <SubmitButton onClick={handleCreate}>
        {" "}
        {isCreating ? <Spinner animation="border" size="sm" /> : "Submit"}
      </SubmitButton>
    </Form>
  );
};
