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
  ${theme.mediaQueries.md.down} {
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
  walletAddress: "",
  telegram: "",
  attachment: null as File | null,
};
export type IBugFormState = typeof INITIAL_STATE;

const validate = (state: typeof INITIAL_STATE) => {
  if (!state.type) {
    return { isValid: false, message: "Please select a type" };
  }
  if (!state.urgency) {
    return { isValid: false, message: "Please select urgency" };
  }
  if (!state.name) {
    return { isValid: false, message: "Please enter name" };
  } else if (!(state.name.length >= 3)) {
    return { isValid: false, message: "Name should be at least 3 Characters" };
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
  } else if (!(state.title.length >= 8)) {
    return {
      isValid: false,
      message: "Please enter at least 8 characters in title",
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
  const [sent, setIsSent] = useState<{ ticketid: number } | null>(null);

  const [formState, setFormState] = useState(INITIAL_STATE);
  const handleChange =
    <K extends keyof typeof INITIAL_STATE>(key: K) =>
    (e: { target: { value: string | File } }) => {
      const value = e.target.value;
      setFormState((old) => ({ ...old, [key]: value }));
    };
  const onClose = () => {
    setIsSent(null);
  };
  const handleCreate = async () => {
    const validationResp = validate(formState);
    if (!validationResp.isValid) {
      showFailure(validationResp.message);
      return;
    }
    setIsCreating(true);
    try {
      const resp = await createBug(formState);

      setFormState(INITIAL_STATE);
      //@ts-ignore
      inputRef.current!.value = null;
      setIsSent({ ticketid: resp.ticketid });
    } catch (e) {
      console.log(e);
      showFailure("Please Try Again Later");
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
      {sent && <SuccessOverlay ticketid={sent.ticketid} isOpen onClose={onClose} />}
      <Label>
        Type
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
      {formState.type === "investrelated" && (
        <Label>
          Wallet Address
          <Input
            value={formState.walletAddress}
            onChange={handleChange("walletAddress")}
            placeholder="Enter Wallet Address"
          />
        </Label>
      )}
      <Label>
        Urgency
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
        Name
        <Input
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="Livia Siphron"
        />
      </Label>
      <Label>
        Telegram Or Email<br />
        <SmallSpan>So we can contact you once the bug is fixed</SmallSpan>
        <Input
          value={formState.telegram}
          onChange={handleChange("telegram")}
          placeholder="@Livia_siphron / liviashipron@gmail.com"
        />
      </Label>
      <Label>
        Screenshot
        <Input
          ref={(ref) => (inputRef.current = ref)}
          onChange={handleImageSelect}
          type={"file"}
          accept="image/gif, image/jpeg, image/png, image/jpg"
        />
      </Label>
      <Label>
        Title
        <Input
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="Bug / Issue Title"
        />
      </Label>
      <Label>
        Message<br />
        <SmallSpan>Be as detailed and clear as possible</SmallSpan>
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
