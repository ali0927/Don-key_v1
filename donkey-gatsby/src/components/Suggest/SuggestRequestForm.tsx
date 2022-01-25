import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import styled, { css } from "styled-components";
import { SuccessOverlay } from "./SuccessOverlay";
import coolicon from "./coolicon.svg";
import { useRiskImageList } from "components/Suggest/SuggestCard";
import { BsTriangleFill, BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { DonCommonmodal } from "components/DonModal";
import { ShowMoreContent } from "components/ShowmoreContent";
import { generateRandomText } from "components/SuggestionView";
import { theme } from "theme";
import ExampleSuggetionImg from "../../images/exmaple-suggestion.png";
import ExampleUser from "../../images/ex-user.png";

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
  margin-bottom: 20px;
  font-weight: 500;
  &:focus {
    outline: none;
    background-color: #fff;
    border: 1px solid rgba(245, 245, 245, 1);
  }
`;
export const Input = styled.input`
  ${InputFieldCSS}
`;
export const TextArea = styled.textarea`
  ${InputFieldCSS}
`;
export const Label = styled.label`
  color: #222222;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 17px;
  font-weight: 600;
  display: block;
`;
const CheckBeforeSend = styled.div`
background-color: #fff037;
border: 2px dashed #222222;
border-radius: 15px;
padding: 22px 27px;
margin-bottom: 70px;
`;
export const Select = styled.select`
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
export const Form = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 9.951690673828125px 59.710147857666016px 0px #262d7614;
  padding: 60px;
`;
export const SuggestRequestButton = styled.button`
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
  { name: "BSC", value: 56 },
  { name: "Ethereum", value: 1 },
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
  name: "",
  telegram: "",
  network: 1,
  apy: 10,
  title: "",
  message: ""
};
export type ISuggestFormState = typeof INITIAL_STATE;

//@ts-ignore
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const SmallSpan = styled.span`
  font-size: 12px;
  color: #767b86;
  font-weight: normal;
`;
const APYPercent = styled.label`
  position: absolute;
  right: 10px;
  top: 28px;
`
const RiskLevel = styled.div`
  background: ${(props: { color: string }) => props.color};
  width: 20%;
  height: 15px;
  margin: 2px;
  cursor: pointer;
`
const RiskLevelSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: ${(props: { level: number }) => props.level === 0 ? 'flex-end': props.level === 1 ? 'center': 'flex-start'};
`
const RiskLevelSelectorIcon = styled(BsTriangleFill)`
  color: ${(props: { level: number }) => props.level === 0 ? '#FF4500': props.level === 1 ? '#FFD700': '#00BFFF'};
`
const ShowExampleSuggestionBtn = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: 0.8rem;
  margin: 10px auto;
`
const ExampleSuggetionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  background: #FBFBFB;
`
const RiskImage = styled.img`
  width: 80px;
`
const SuggetionImage = styled.img`
  width: 60px;
  height: 60px;
  over-flow: hidden;
  border-radius: 10px;
  margin: 10px 5px;
  cursor: pointer;
  border: ${(props: { selected: boolean }) => props.selected ? '1px solid orange': 'none'}
`
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`

const ExampleSuggestions = (): Array<any> => {
  let _example = new Array(5).fill(0).map(item => {
    return {
      title: generateRandomText(15),
      apy: 12.123,
      name: generateRandomText(10),
      description: generateRandomText(300),
      risk: Math.floor(Math.random() * 3),
      date: '15 Jan 2022 15:30',
      category: 'Payments'
    }
  })  
  return _example
}

export const SuggestRequestForm = () => {
  const riskImages = useRiskImageList();
  const [riskLevel, setRiskLevel] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showFailure } = useTransactionNotification();
  const [sent, setIsSent] = useState<{ ticketid: number } | null>(null);
  const [showExampleSuggestion, setShowExampleSuggestion] = useState(false);
  const [selectedExmaple, setSelectedExample] = useState(0);

  const exmapleSuggestions = ExampleSuggestions()

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
   
  };

  const prevExample = () => {
    if (selectedExmaple > 0) setSelectedExample(selectedExmaple - 1)
  }
  const nextExample = () => {
    if (selectedExmaple < exmapleSuggestions.length - 1) setSelectedExample(selectedExmaple + 1)
  }

  return (
    <Form>
      <CheckBeforeSend>
      <h4>Before submitting a suggestion please:</h4><br/>
        <ul>
          <li>Execute a hard refresh and erase all Cache from the browser (Ctr+F5 / Cmd+Shift+R).</li>
        </ul>
      </CheckBeforeSend>
      <Label>
        Telegram Name<br />
        <SmallSpan>So we can contact you once the suggestion is applied</SmallSpan>
        <Input
          value={formState.telegram}
          onChange={handleChange("telegram")}
          placeholder="@Livia_siphron"
        />
      </Label>
      <Label>
        Suggestion Name
        <Input
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="Start write here"
        />
      </Label>
      {sent && <SuccessOverlay ticketid={sent.ticketid} isOpen onClose={onClose} />}
      <Label>
        Network
        <Select onChange={handleChange("network")} value={formState.network}>
          {Types.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </Select>
      </Label>
      <Label>
        Estimated APY
        <div style={{position: 'relative'}}>
          <Input
            value={formState.apy}
            onChange={handleChange("apy")}
            placeholder="12.24"
          />
          <APYPercent>%</APYPercent>
        </div>
      </Label>

      <Label>Risk Level</Label>
      <div>
        <div style={{display:'flex'}}>
          <RiskLevel color="#00BFFF" style={{borderRadius:'10px  0 0 10px'}} onClick={() => setRiskLevel(2)}/>
          <RiskLevel color="#32CD32" onClick={() => setRiskLevel(2)} />
          <RiskLevel color="#FFD700" onClick={() => setRiskLevel(1)} />
          <RiskLevel color="orange" onClick={() => setRiskLevel(0)} />
          <RiskLevel color="#FF4500" style={{borderRadius:'0 10px 10px 0'}} onClick={() => setRiskLevel(0)} />
        </div>
        <RiskLevelSelector level={riskLevel}>
          <div style={{display:'flex', flexDirection:'column', width:'fit-content', alignItems:'center'}}>
            <RiskLevelSelectorIcon level={riskLevel} />
            <label>{riskImages[riskLevel].Title}</label> 
          </div>
        </RiskLevelSelector>
      </div>
   
      <Label>
        Describe the risk in your words
        <Input
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="Start write here"
        />
      </Label>
      <Label>
        Suggestion Flow<br />
        <TextArea
          rows={5}
          value={formState.message}
          onChange={handleChange("message")}
          placeholder="Start write here"
        ></TextArea>
      </Label>

      <SuggestRequestButton onClick={handleCreate}>
        {isCreating ? <Spinner animation="border" size="sm" /> : "Submit Suggestion"}
      </SuggestRequestButton>

      <div style={{display: 'flex'}}>
        <ShowExampleSuggestionBtn onClick={() => setShowExampleSuggestion(true)}>
          Click here to see examples how to write a suggestion
        </ShowExampleSuggestionBtn>
      </div>
     
      <DonCommonmodal
        isOpen={showExampleSuggestion}
        title="Suggestion Examples"
        variant="common"
        onClose={() => setShowExampleSuggestion(false)}
        size="sm"
      >
        <ExampleSuggetionBox>
          <div style={{display:'flex', width:'100%'}}>
            <div style={{width:'100%'}}>
              <label style={{fontSize:'0.8rem'}}>Suggestion Name</label>
              <h5>{exmapleSuggestions[selectedExmaple].title}</h5>
            </div>
            <RiskImage src={riskImages[exmapleSuggestions[selectedExmaple].risk].image.url} />
          </div>

          <div style={{display:'flex', width:'100%', margin:'10px 0'}}>
            <div style={{width:'100%'}}>
              <UserImage src={ExampleUser} alt="user" />
              <label style={{fontSize:'0.8rem', fontWeight: 500}}>{exmapleSuggestions[selectedExmaple].name}</label>
            </div>
            <div style={{fontSize:'1rem', fontWeight: 500}}>
              <span>{exmapleSuggestions[selectedExmaple].apy}</span>
              <span style={{color: 'lightgrey', marginLeft:'4px'}}>APY</span>
            </div>
          </div>

          <div style={{fontSize:'0.8rem', overflowWrap:'anywhere'}}>
            <ShowMoreContent content={exmapleSuggestions[selectedExmaple].description} length={150} />
          </div>
        </ExampleSuggetionBox>

        <div style={{display:'flex', overflowX:'auto', justifyContent:'center'}}>
          {exmapleSuggestions.map((example, idx) => 
            <SuggetionImage src={ExampleSuggetionImg} onClick={() => setSelectedExample(idx)} selected={selectedExmaple === idx}/>
          )}
        </div>
        
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <BsArrowLeft style={{margin: '10px', cursor:'pointer'}} onClick={() => prevExample()}/>
          <span>Select Suggestion</span>
          <BsArrowRight style={{margin: '10px', cursor:'pointer'}} onClick={() => nextExample()}/>
        </div>
        
      </DonCommonmodal>

    </Form>
  );
};
