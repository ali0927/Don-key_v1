import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { useBugReportApi } from "hooks";
import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import styled, { css } from "styled-components";
import { SuccessOverlay } from "./SuccessOverlay";
import coolicon from "./coolicon.svg";
import { theme } from "theme";
const InputFieldCSS = css`
  background: rgba(245, 245, 245, 0.5);
  border: 1px solid rgba(245, 245, 245, 0.5);
  border-radius: 10px;
  width: 100%;
  padding: 15px 20px;
  &::placeholder {
    color: #767b86;
  }
  margin-top: 10px;
  margin-bottom: 30px;
  font-weight: 500;
  &:focus {
    outline: none;
    background-color: #fff;
    border: 1px solid rgba(245, 245, 245, 1);
  }
`;

const Input = styled.input`
  ${InputFieldCSS}
`;

const TextArea = styled.textarea`
  ${InputFieldCSS}
`;

const Label = styled.label`
  color: #222222;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 17px;
  font-weight: 600;
  display: block;
`;

const Select = styled.select`
  ${InputFieldCSS}
  outline: none;

  border: 1px solid rgba(0, 0, 0, 0.5);
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff url(${coolicon}) no-repeat calc(100% - 34px) center/8px;
  ${theme.mediaQueries.md.down}{
    background: #fff url(${coolicon}) no-repeat calc(100% - 20px) center/8px;
    padding-right: 40px;
  }
`;
const Form = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 9.951690673828125px 59.710147857666016px 0px #262d7614;
  padding: 60px;
`;

export const BugReportButton = styled.button`
  padding: 16px;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  border-radius: 10px;
  background: linear-gradient(146.14deg, #353a4b 0%, #0b0e12 100%);
  border: 0;
  display: block;
  width: 100%;
`;
const DefaultOption = { name: "Select an option", value: "" } as const;

const Types = [
  DefaultOption,
  {
    name: "Investment Issue",
    value: "investrelated",
  },
  { name: "Technical application bug", value: "technical" },
] as const;

const Urgencies = [
  DefaultOption,
  { name: "Not urgent at all", value: "low" },
  { name: "It could wait a day or two", value: "medium" },
  {
    name: "Very urgent - the sky is falling!",
    value: "high",
  },
] as const;

type IType = typeof Types[number]["value"];
type IUrgency = typeof Urgencies[number]["value"];
const INITIAL_STATE = {
  type: "" as IType,
  urgency: "" as IUrgency,
  name: "",
  email: "",
  title: "",
  message: "",
  page: "",
  walletAddress: "",
  telegram: "",
  attachment: null as File | null,
};
export type IBugFormState = typeof INITIAL_STATE;
const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validate = (state: typeof INITIAL_STATE) => {
  if (!state.type) {
    return { isValid: false, message: "Please select a type" };
  }
  if (!state.urgency) {
    return { isValid: false, message: "Please select urgency" };
  }
  if (!state.name) {
    return { isValid: false, message: "Please enter name" };
  } else if (!(state.name.length >= 5)) {
    return { isValid: false, message: "Name should be at least 5 Characters" };
  }
  
  if (!state.email) {
    return { isValid: false, message: "Please enter email" };
  } else if (!validateEmail(state.email)) {
    return { isValid: false, message: "Please enter a valid email" };
  }
  if (state.type === "technical" && !state.page) {
    return { isValid: false, message: "Please enter a page" };
  }
  if (state.type === "investrelated" && !state.walletAddress) {
    return { isValid: false, message: "Please enter wallet address" };
  }
  if (state.type === "investrelated" && state.walletAddress) {
    if (!(state.walletAddress.length >= 30)) {
      return { isValid: false, message: "Please enter a valid wallet address" };
    }
  }
  if (!state.attachment) {
    return { isValid: false, message: "Please attach a screenshot" };
  }
  if (!state.title) {
    return { isValid: false, message: "Please enter title" };
  } else if (!(state.title.length >= 10)) {
    return {
      isValid: false,
      message: "Please enter at least 10 characters in title",
    };
  }
  if (!state.message) {
    return { isValid: false, message: "Please enter message" };
  } else if (!(state.message.length >= 10)) {
    return {
      isValid: false,
      message: "Please enter at least 10 characters in message",
    };
  }
  return { isValid: true, message: null };
};

const SmallSpan = styled.span`
  font-size: 12px;
  color: #767b86;
  font-weight: normal;
`;

export const BugReportForm = () => {
  const { createBug } = useBugReportApi();

  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showFailure } = useTransactionNotification();
  const [sent, setIsSent] = useState(false);

  const [formState, setFormState] = useState(INITIAL_STATE);
  const handleChange =
    <K extends keyof typeof INITIAL_STATE>(key: K) =>
    (e: { target: { value: string | File } }) => {
      const value = e.target.value;
      setFormState((old) => ({ ...old, [key]: value }));
    };
  const onClose = () => {
    setIsSent(false);
  };
  const handleCreate = async () => {
    const validationResp = validate(formState);
    if (!validationResp.isValid) {
      showFailure(validationResp.message);
      return;
    }
    setIsCreating(true);
    try {
      await createBug(formState);

      setFormState(INITIAL_STATE);
      //@ts-ignore
      inputRef.current!.value = null;
      setIsSent(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        handleChange("attachment")({ target: { value: file } });
      }
    }
  };

  return (
    <Form>
      {sent && <SuccessOverlay duration={5} isOpen={sent} onClose={onClose} />}
      <Label>
        Type <span className="text-danger">*</span>
        <Select onChange={handleChange("type")} value={formState.type}>
          {Types.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </Select>
      </Label>
      {formState.type === "technical" && (
        <Label>
          Page <span className="text-danger">*</span>
          <Input
          value={formState.page}
          onChange={handleChange("page")}
          placeholder="Homepage"
        />
        </Label>
      )}
      {formState.type === "investrelated" && (
        <Label>
          Wallet Address <span className="text-danger">*</span>
          <Input
            value={formState.walletAddress}
            onChange={handleChange("walletAddress")}
            placeholder="Enter Wallet Address"
          />
        </Label>
      )}
      <Label>
        Urgency <span className="text-danger">*</span>
        <Select onChange={handleChange("urgency")} value={formState.urgency}>
          {Urgencies.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </Select>
      </Label>
      <Label>
        Name <span className="text-danger">*</span>
        <Input
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="Livia Siphron"
        />
      </Label>
      <Label>
        Email <span className="text-danger">*</span>
        <Input
          value={formState.email}
          onChange={handleChange("email")}
          placeholder="example@gmail.com"
        />
      </Label>
      <Label>
        Telegram
        <Input
          value={formState.telegram}
          onChange={handleChange("telegram")}
          placeholder="@Livia_siphron"
        />
      </Label>
      <Label>
        Screenshot <span className="text-danger">*</span>
        <Input
          ref={(ref) => (inputRef.current = ref)}
          onChange={handleImageSelect}
          type={"file"}
          accept="image/gif, image/jpeg, image/png, image/jpg"
        />
      </Label>
      <Label>
        Title <span className="text-danger">*</span>
        <Input
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="Bug / Issue Title"
        />
      </Label>
      <Label>
        Message <span className="text-danger">*</span> <SmallSpan>Be as detailed and clear as possible</SmallSpan>
        <TextArea
          rows={5}
          value={formState.message}
          onChange={handleChange("message")}
          placeholder="I found a bug in... I have an issue with..."
        ></TextArea>
      </Label>

      <BugReportButton onClick={handleCreate}>
        {isCreating ? <Spinner animation="border" size="sm" /> : "Send"}
      </BugReportButton>
    </Form>
  );
};
